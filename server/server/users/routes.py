from flask import session, request, jsonify, Blueprint
from flask_cors import cross_origin
from server.models import User,Advocate
from server import db, bcrypt
from functools import wraps
from datetime import datetime
import os
import json
import sys
import io
from openai import OpenAI
import openai
import shutil
import ast
import time
from faster_whisper import WhisperModel
from langchain.vectorstores import FAISS

FEATURE_DOCS_PATH = ''
NYAYMITRA_FEATURES_VECTORSTORE = FAISS.from_documents(FEATURE_DOCS_PATH)
NYAYMITRA_FEATURES_VECTORSTORE.save_local('')
VECTORDB = FAISS.load_local('')

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get("user_id", None)
        if user_id is None:
            return jsonify({"message": "User not logged in", "response": False}), 401
        return f(*args, **kwargs)
    return decorated_function

def single_login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get("user_id", None)
        advocate_id=session.get("advocate_id",None)
        if user_id is not None or advocate_id is not None:
            return jsonify({"message": "Another user is already logged in", "response": False}), 403
        return f(*args, **kwargs)
    return decorated_function

user_bp = Blueprint(name='users', import_name=__name__)

@user_bp.route('/register', methods=['POST'])
def user_register():
    data = request.json
    name = data.get("fullName")
    email = data.get("email")
    mobile = data.get("phoneNo")
    gender = data.get("gender")
    DOB_str = data.get("birthdate")
    DOB_final = datetime.strptime(DOB_str, '%d/%m/%Y').date()
    # Convert string to date
    address = data.get("address")
    city = data.get("city")
    pincode = data.get("pincode")
    state = data.get("state")
    password = data.get("password")
    print("password: -----------------------",gender)
    print("name: -----------------------",state)

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"message": "User already exists", "response": False}), 201

    hash_pass = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(
        name=name,
        email=email,
        mobile=mobile,
        gender=gender,
        DOB=DOB_final,
        address=address,
        city=city,
        pincode=pincode,
        state=state,
        password=hash_pass
    )

    db.session.add(new_user)
    db.session.commit()

    response = jsonify({
        "message": "User created successfully",
        "id": new_user.user_id,
        "email": new_user.email,
        "response": True
    }), 200

    return response

tools = [
    {
        'type': 'function',
        'function':{
            'name': 'retrieval_augmented_generation',
            'description': 'Fetches relevant information from the vector database and answers user\'s query',
            'parameters': {
                'type': 'object',
                'properties': {
                    'query': {
                        'type': 'string',
                        'description': 'The query to use for searching the vector database'
                    },
                },
                'required': ['query']
            }
        }
    },
]


@user_bp.route('/login', methods=['POST'])
@single_login_required
def user_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    print("password:--------------------",password)
    user = User.query.filter_by(email=email).first()
    

    if user is None:
        return jsonify({"message": "Unregistered email id", "response": False}), 201

    if not bcrypt.check_password_hash(user.password, password.encode('utf-8')):
        return jsonify({"message": "Incorrect password", "response": False}), 201
    client = OpenAI()
    assistant = client.beta.assistants.create(
        name="NYAYMITRA",
        instructions="You are a helpful assistant. Please use the functions provided to you appropriately to help the user.",
        model="gpt-3.5-turbo-0613",
        tools =  tools
    )
    session['assistant_id'] = assistant.id
    print("Assitant id is generated",session['assistant_id'])
    session["user_id"] = user.user_id
    print("user id is this:-", session.get('user_id'))

    return jsonify({"message": "User logged in successfully", "email": user.email, "response": True}), 200

@user_bp.route('/voice-chat', methods=['POST'])
@login_required
def voice_chat():
    try:
        model_size = "large-v3"
        model = WhisperModel(model_size, device="cpu", compute_type="int8")
        # Run on GPU with FP16
        # model = WhisperModel(model_size, device="cuda", compute_type="float16")

        # or run on GPU with INT8
        # model = WhisperModel(model_size, device="cuda", compute_type="int8_float16")
        # or run on CPU with INT8
       

        if 'voice' not in request.files:
            return 'No voice file provided', 400

        voice_file = request.files['voice']
        if voice_file.filename == '':
            return 'No selected file', 400

        if voice_file:
            if not os.path.exists('upload_voice'):
                os.makedirs('upload_voice')

            filename = voice_file.filename
            filepath = os.path.join('upload_voice', filename)
            voice_file.save(filepath)
            segments, info = model.transcribe("upload_voice/voice.wav", beam_size=5)
            print("Detected language '%s' with probability %f" % (info.language, info.language_probability))
            for segment in segments:
                print("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))
                text2 = segment.text
            text = str([segment.text for segment in segments])
            print("Text",text)
            print("Text2",text2)
            shutil.rmtree('upload_voice')
            return jsonify({"message": text, "email": "email", "response": True}), 200

        return 'Invalid file type', 400

    except Exception as e:
        print("Exception",e)
        return str(e), 500

    
@user_bp.route('/', methods=['GET'])
def getuser():
    user_id = session.get("user_id", None)
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"message": "User not found", "response": False}), 404

    response = {"message": "User found", "user_name": user.username, "email": user.email, "response": True}
    return jsonify(response), 200

@user_bp.route('/logout', methods=['GET'])
@login_required
def user_logout():
    session.pop('user_id', None)
    return jsonify({'message': 'User logged out successfully'})


@user_bp.route('/document-summarization', methods=['POST'])
@login_required
def document_summarization():
    directory = "chatbots/document_sum/user_data"
    directory_faiss = "chatbots/document_sum/faiss_index"
    for file in request.files.getlist('documents'):
        print("doc sended")
        filename = file.filename
        if not os.path.exists(directory):
            os.makedirs(directory)
        # Creating The Directory For Faiss Index
        if not os.path.exists(directory_faiss):
            os.makedirs(directory_faiss)
        filepath = os.path.join(directory, filename)
        file.save(filepath)
    return jsonify({"message": "User logged in successfully","response": True}), 200


prompt_summary = """As a legal assistant, your role is to determine the appropriate legal specialization based on user queries. The available specializations are: Criminal Court, Civil Court, Immigration Court, Family Law, Personal Injury Law, Real Estate Law, and Corporate Law. Focus on identifying one of these specializations. Given a user query related to legal matters, your task is to analyze the content and discern all the applicable legal specialization. The output should be in JSON format, with the key "specialization_name" and the corresponding values are a list of identified legal specializations.

User Query: {query}
"""

def get_specialization_from_text(user_input):
    # Use OpenAI API to analyze user input and extract specialization
    client = OpenAI()
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=[
            {
                "role": "user",
                "content": prompt_summary.format(query=user_input),
            },
        ],
        response_format={"type": "json_object"},
    )

    # Extract the recognized specialization from the API response
    recognized_specialization = ast.literal_eval(response.choices[0].message.content)
    return recognized_specialization["specialization_name"]


@user_bp.route('/get-advocate', methods=['POST'])
@login_required
def get_advocate():
    data = request.json
    search_value = data.get('search', '')
    spec = get_specialization_from_text(user_input=search_value)
    print("Specualizaton:-----------------",spec)
    advocates_data = [advocate.to_dict() for advocate in Advocate.query.filter_by(specialization=spec).all()]
    print("Result",advocates_data)
    return jsonify({"message": "User logged in successfully","response": True}), 200


def wait_on_run(run_id, thread_id):
    client = OpenAI()
    while True:
        run = client.beta.threads.runs.retrieve(
            thread_id=thread_id,
            run_id=run_id,
        )
        print('RUN STATUS', run.status)
        time.sleep(0.5)
        if run.status in ['failed', 'completed', 'requires_action']:
            return run

client = OpenAI()
def submit_tool_outputs(thread_id, run_id, tools_to_call):
    tools_outputs = []
    for tool in tools_to_call:
        output = None
        tool_call_id = tool.id
        tool_name = tool.function.name
        tool_args = tool.function.arguments
        print('TOOL CALLED:',tool_name)
        print('ARGUMENTS:', tool_args)
        tool_to_use = available_tools.get(tool_name)
        output = tool_to_use(**tool_args)
        if output:
            tools_outputs.append({'tool_call_id': tool_call_id, 'output': output})
        
    return client.beta.threads.runs.submit_tool_outputs(thread_id=thread_id, run_id=run_id, tool_outputs= tools_outputs)


def retrieval_augmented_generation(query, vectordb = VECTORDB):
    
    relevant_docs = vectordb.similarity_search(query)
    print(relevant_docs)
    rel_docs = [doc.page_content for doc in relevant_docs]
    return rel_docs

available_tools = {
    'generate_information': retrieval_augmented_generation,
}

@user_bp.route('/chatbot-route', methods=['POST'])
@login_required
def chatbot_route():
    data = request.get_json()
    print(data)
    tool_check = []
    query = data.get('userdata', '')
    if query:         
        assistant_id = session['assistant_id']
        print('ASSISTANT ID',assistant_id)
        thread = client.beta.threads.create()
        print('THREAD ID', thread.id)
        
        message = client.beta.threads.messages.create(
            thread_id= thread.id,
            role="user",
            content= query,
        )
        run = client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=session['assistant_id'],
        )
        run = wait_on_run(run.id, thread.id)

        if run.status == 'failed':
            print(run.error)
        elif run.status == 'requires_action':
            run = submit_tool_outputs(thread.id, run.id, run.required_action.submit_tool_outputs.tool_calls)
            run = wait_on_run(thread.id, run.id)
        messages = client.beta.threads.messages.list(thread_id=thread.id,order="asc")
        print('message',messages)
        content = None
        for thread_message in messages.data:
            content = thread_message.content
        print("Content List",content)
        if len(tool_check) == 0:
            chatbot_reply = content[0].text.value
            print("Chatbot reply",chatbot_reply)
            response = {'chatbotResponse': chatbot_reply,'function_name': 'normal_search'}
        return jsonify(response)
    else:
        return jsonify({'error': 'User message not provided'}), 400