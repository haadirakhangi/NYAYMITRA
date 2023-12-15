from flask import session, request, jsonify, Blueprint
from flask_cors import cross_origin
from server.models import User
from server import db, bcrypt
from functools import wraps
from datetime import datetime
import os
import shutil
from faster_whisper import WhisperModel

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
@cross_origin(supports_credentials=True)
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
    print("name: -----------------------",password)
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

@user_bp.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
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

    session["user_id"] = user.user_id
    print("user id is this:-", session.get('user_id'))

    return jsonify({"message": "User logged in successfully", "email": user.email, "response": True}), 200

@user_bp.route('/voice-chat', methods=['POST'])
@cross_origin(supports_credentials=True)
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
@cross_origin(supports_credentials=True)
@login_required
def getuser():
    user_id = session.get("user_id", None)
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"message": "User not found", "response": False}), 404

    response = {"message": "User found", "user_name": user.username, "email": user.email, "response": True}
    return jsonify(response), 200

@user_bp.route('/logout', methods=['GET'])
@cross_origin(supports_credentials=True)
@login_required
def user_logout():
    session.pop('user_id', None)
    return jsonify({'message': 'User logged out successfully'})
