from flask import session, request, jsonify, Blueprint
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

    # Check if the provided email exists
    admin = Admin.query.filter_by(email=email).first()

    if admin and bcrypt.check_password_hash(admin.password, password):
        session["admin_id"] = admin.id
        return jsonify({"message": "Admin logged in successfully", "response": True}), 200

    return jsonify({"message": "Invalid credentials", "response": False}), 401
    
@admin_bp.route('/update-vectordb', methods=['POST'])
def update_vectorb():
    try:
        # Create 'uploads' directory if it doesn't exist
        upload_dir = 'update_docs'
        real_dir = 'nyaymitra_data'
        print("Update vectordb")
        # Iterate over each file in the request
        for file in request.files.getlist('documents'):
            os.makedirs(upload_dir, exist_ok=True)
            filename = file.filename
            filepath = os.path.join(upload_dir, filename)
            file.save(filepath)
            # vectordb = add_data_to_pinecone_vectorstore(upload_dir)
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

@admin_bp.route('/advocate_details')
@login_required
def advocate_details():
    # Fetch all advocate details for verification
    advocates = Advocate.query.all()

    # Prepare the data in JSON format
    advocate_data = []
    for advocate in advocates:
        advocate_info = {
            'id': advocate.advocate_id,
            'name': f'{advocate.fname} {advocate.lname}',
            'email': advocate.email,
            'resume': advocate.resume if advocate.resume else None,
            'verified': advocate.verified,
        }
        advocate_data.append(advocate_info)

    return jsonify({'advocates': advocate_data})

@admin_bp.route('/verify_advocate/<int:advocate_id>')
@login_required
def verify_advocate(advocate_id):
    # Fetch the advocate by ID
    advocate = Advocate.query.get(advocate_id)

    if advocate:
        # Perform the verification (update the 'verified' field to True)
        advocate.verified = True
        db.session.commit()

        # Return a JSON response indicating success
        return jsonify({'message': 'Advocate verified successfully', 'response': True})

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