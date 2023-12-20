from flask import session, request, jsonify, Blueprint,send_file
from flask_cors import cross_origin
from server.models import User,LawCatgBenf,Admin,Advocate,QueryStats
from server import db, bcrypt
from functools import wraps
from datetime import datetime
import os
import json
from sqlalchemy.orm import aliased
from collections import defaultdict
from openai import OpenAI
import ast
import fitz

import shutil
from chatbots.utils import add_data_to_pinecone_vectorstore,autocategorize_law,finetune_for_document_drafting
import sys 
import os

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get("admin_id", None)
        if user_id is None:
            return jsonify({"message": "Admin not logged in", "response": False}), 401
        return f(*args, **kwargs)
    return decorated_function


admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.route('/login', methods=['POST'])
def admin_login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    og_email='admin@gmail.com'
    og_password='password'
    

    if email==og_email and password==og_password:
        session["admin_id"] = 1
        return jsonify({"message": "Admin logged in successfully", "response": True}), 200

    return jsonify({"message": "Invalid credentials", "response": False}), 401
    
@admin_bp.route('/update-vectordb', methods=['POST'])
def update_vectorb():
    try:
        # Create 'uploads' directory if it doesn't exist
        upload_dir = 'update_docs'
        real_dir = 'nyaymitra_data/categorized_docs'
        print("Update vectordb")
        # Iterate over each file in the request
        for file in request.files.getlist('documents'):
            print()
            os.makedirs(upload_dir, exist_ok=True)
            filename = file.filename
            filepath = os.path.join(upload_dir, filename)
            file.save(filepath)
            vectordb = add_data_to_pinecone_vectorstore(upload_dir)
            json_data = autocategorize_law(filepath)
            print("the output json received",json)
            beneficiary = json_data['beneficiary']
            if isinstance(beneficiary, list):
                beneficiary_list = beneficiary
            else:
                beneficiary_list = beneficiary.split(",")

            beneficiary_json = json.dumps(beneficiary_list)
            new_admin = LawCatgBenf(doc_name=filename,category=json_data['category'],beneficiaries=beneficiary_json)
            # Add the new admin to the database
            db.session.add(new_admin)
            db.session.commit()
            real_filepath = os.path.join(real_dir,json_data['category'] ,filename)
            if os.path.exists(os.path.join(real_dir,json_data['category'])):
                file.save(real_filepath)
            else:
                os.makedirs(os.path.join(real_dir,json_data['category']), exist_ok=True)
                file.save(real_filepath)
            shutil.rmtree(upload_dir)
        return jsonify({"message": "Documents saved successfully", "response": True}), 200
    except Exception as e:
        print("Printing error",e)
        return jsonify({"message": f"Error: {str(e)}", "response": False}), 500

@admin_bp.route('/generate-questions', methods=['POST'])
def generate_questions():
    try:
        question = request.form.get('question')
        phrases = paraphrase_text(question)
        print("Phrases--------------------",phrases)
        return jsonify({"message": "Questions generated successfully",'questions': phrases["questions"] ,"response": True}), 200
    except Exception as e:
        print("Printing error",e)
        return jsonify({"message": f"Error: {str(e)}", "response": False}), 500
        
@admin_bp.route('/update-drafting', methods=['POST'])
def update_drafting():
    try:
        data = request.form
        questions = data.getlist('questions')
        # Create 'uploads' directory if it doesn't exist
        upload_dir = 'nyaymitra_data/drafting_doc'
        output_directory = "nyaymitra_data/drafting_json"
        output_file = "nyaymitra_data/drafting_json/output.jsonl"
        print("Update drafting")
        if not os.path.exists(output_directory):
            os.makedirs(output_directory, exist_ok=True)
        # Iterate over each file in the request
        system_content = "NyayMitra is a factual chatbot which generates the complete legal document according to the user query."
        for file in request.files.getlist('documents'):
            filename = file.filename
            file_path = os.path.join(upload_dir, filename)
            if os.path.exists(upload_dir):
                file.save(file_path)
            else:
                os.makedirs(upload_dir, exist_ok=True)
                file.save(file_path)
            text = extract_text_from_pdf(os.path.join(upload_dir,file.filename))
            generate_jsonl(system_content, questions, text, output_file)
        finetune_for_document_drafting(output_file)
        return jsonify({"message": "Documents saved successfully", "response": True}), 200
    except Exception as e:
        print("Printing error",e)
        return jsonify({"message": f"Error: {str(e)}", "response": False}), 500

def paraphrase_text(admin_query):
    module_generation_prompt = """Paraphrase the given query and return it in a json format where the key is 'questions' and the value is a list of ten paraphrased questions.
    QUERY: {query}"""

    client = OpenAI()
    completion = client.chat.completions.create(
            model = 'gpt-3.5-turbo-1106',
            messages = [
                {'role':'user', 'content': module_generation_prompt.format(query= admin_query)},
            ],
            response_format = {'type':'json_object'},
            seed = 42,
    )
    output = ast.literal_eval(completion.choices[0].message.content)

    return output

@admin_bp.route('/register', methods=['POST'])
def admin_register():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # Check if an admin with the given email already exists
    existing_admin = Admin.query.filter_by(email=email).first()
    if existing_admin:
        return jsonify({"message": "Admin with this email already exists", "response": False}), 409

    # Create a new admin
    new_admin = Admin(email=email, password=password)

    # Add the new admin to the database
    db.session.add(new_admin)
    db.session.commit()

    return jsonify({"message": "Admin registered successfully", "response": True}), 201


@admin_bp.route('/dashboard')
@login_required 
def dashboard():
    user_alias = aliased(User)

    query_results = (
        db.session.query(QueryStats.user_id, User.state,User.city,QueryStats.category)
        .join(user_alias,QueryStats.user_id==user_alias.user_id)
        .all()
    )

    user_data_dict = defaultdict(lambda: defaultdict(lambda: {'state': None, 'city': None, 'categories': defaultdict(int)}))
    for state, city, category in query_results:
        user_data_dict[state][city]['state'] = state
        user_data_dict[state][city]['city'] = city
        user_data_dict[state][city]['categories'][category] += 1

    # Convert the nested dictionary to a list for easier access
    result_list = []
    for state, cities in user_data_dict.items():
        for city, data in cities.items():
            result_list.append(data)
    return result_list

@admin_bp.route('/advocate-details')
# @login_required
def advocate_details():
    # Fetch all advocate details for verification
    advocates = Advocate.query.filter_by(verified=False).all()

    # Prepare the data in JSON format
    advocate_details = [connect.to_dict() for connect in advocates]
    for advocate in advocate_details:
        advocate['languages'] = json.loads(advocate['languages'])
        advocate['languages'] = ', '.join(advocate['languages'])
    return jsonify({'advocates': advocate_details})

@admin_bp.route('/verify-advocate',methods=['POST'])
# @login_required
def verify_advocate():
    # Fetch the advocate by ID
    data = request.json
    advocate_id = data.get('advocateId')
    advocate = Advocate.query.get(advocate_id)

    if advocate:
        # Perform the verification (update the 'verified' field to True)
        advocate.verified = True
        db.session.commit()

        # Return a JSON response indicating success
        return jsonify({'message': 'Advocate verified successfully', 'response': True})

    # If the advocate is not found, return an error JSON response
    return jsonify({'message': 'Advocate not found', 'response': False}), 404

@admin_bp.route('/reject-advocate', methods=['POST'])
def reject_advocate():
    # Fetch the advocate by ID
    data = request.json
    advocate_id = data.get('advocateId')
    advocate = Advocate.query.get(advocate_id)

    if advocate:
        # Remove the advocate entry from the database
        db.session.delete(advocate)
        db.session.commit()

        # Return a JSON response indicating success
        return jsonify({'message': 'Advocate rejected and removed successfully', 'response': True})

    # If the advocate is not found, return an error JSON response
    return jsonify({'message': 'Advocate not found', 'response': False}), 404

def generate_jsonl(system_content, user_questions, assistant_content, output_file):
    # Iterate over each question
    for question in user_questions:
        messages = []
        messages.append({"role": "system", "content": system_content})
        messages.append({"role": "user", "content": question})
        messages.append({"role": "assistant", "content": assistant_content})

        # Write the messages for the current question to the output file
        with open(output_file, 'a') as f:
            json.dump({"messages": messages}, f)
            f.write('\n')

@admin_bp.route('/get-doc', methods=['POST'])
def view_document():
    data = request.json
    document_url = data.get('documentUrl')
    current_script_directory = os.path.dirname(os.path.abspath(__file__))
    chatbots_directory = os.path.abspath(os.path.join(current_script_directory, '..'))
    server_side_directory = os.path.abspath(os.path.join(chatbots_directory, '..'))
    sys.path.append(server_side_directory)
    pdf_file_path = os.path.join(server_side_directory,'advocate_docs', document_url)
    pdf_file_path = os.path.normpath(pdf_file_path)


    return send_file(pdf_file_path, mimetype='application/pdf')


@admin_bp.route('/view', methods=['GET'])
def view_documents():
    # Assuming the script is located in the 'server' directory
    current_script_directory = os.path.dirname(os.path.abspath(__file__))
    chatbots_directory = os.path.abspath(os.path.join(current_script_directory, '..'))
    server_side_directory = os.path.abspath(os.path.join(chatbots_directory, '..'))
    sys.path.append(server_side_directory)
    ROOT_FOLDER = os.path.join(server_side_directory,'nyaymitra_data', 'categorized_docs')

    # Fetch category folders
    categories = [category for category in os.listdir(ROOT_FOLDER) if os.path.isdir(os.path.join(ROOT_FOLDER, category))]

    # Fetch documents and beneficiaries for each category
    documents_data = {}
    for category in categories:
        category_folder_path = os.path.join(ROOT_FOLDER, category)
        document_names = [doc_name for doc_name in os.listdir(category_folder_path) if doc_name.endswith('.pdf')]

        # Fetch beneficiaries from LawCatgBenf model
        beneficiaries_data = []
        for doc_name in document_names:
            law_catg_benf = LawCatgBenf.query.filter_by(doc_name=doc_name).first()
            if law_catg_benf:
                beneficiaries_data.append({
                    "doc_name": doc_name,
                    "beneficiaries": json.loads(law_catg_benf.beneficiaries)
                })

        documents_data[category] = beneficiaries_data

    return jsonify({"documents": documents_data, "response": True})

@admin_bp.route('/get-cat-doc', methods=['POST'])
def view_catg_document():
    data = request.json
    doc_name = data.get('docName')
    category = data.get('category')

    current_script_directory = os.path.dirname(os.path.abspath(__file__))
    server_side_directory = os.path.abspath(os.path.join(current_script_directory, '..'))
    server_side_directory = os.path.abspath(os.path.join(server_side_directory, '..'))
    sys.path.append(server_side_directory)
    pdf_file_path = os.path.join(server_side_directory, 'nyaymitra_data', 'categorized_docs', category, doc_name)
    print(pdf_file_path)
    # pdf_file_path = os.path.normpath(pdf_file_path)

    if os.path.exists(pdf_file_path):
        # If the file exists, serve it
        pdf_file_path = os.path.normpath(pdf_file_path)
        return send_file(pdf_file_path, mimetype='application/pdf')
    else:
        # If the file does not exist, return an error response
        return jsonify({'error': 'File not found'}), 404

def extract_text_from_pdf(pdf_file):
    text = ""
    try:
        with fitz.open(pdf_file) as pdf_document:
            for page_number in range(pdf_document.page_count):
                page = pdf_document[page_number]
                text += page.get_text()
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")

    return text