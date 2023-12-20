from flask import session, request, jsonify, Blueprint
from flask_cors import cross_origin
from server.models import Advocate, AdvoConnect
from server import db, bcrypt
import json
from functools import wraps
from datetime import datetime
import os

advocate_bp = Blueprint(name='advocates', import_name=__name__)


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get("advocate_id", None)
        if user_id is None:
            return jsonify({"message": "User not logged in", "response": False}), 401
        return f(*args, **kwargs)

    return decorated_function


def single_login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get("advocate_id", None)
        if user_id is not None:
            return jsonify({"message": "Another user is already logged in", "response": False}), 403
        return f(*args, **kwargs)

    return decorated_function


@advocate_bp.route('/register', methods=['POST'])
def advocate_register():
    data = request.form  # Assuming the data is in form format

    # Extract data from the form
    fname = data.get("firstName")
    lname = data.get("lastName")
    email = data.get("email")
    mobile = data.get("mobile")
    password = data.get("password")
    office_address = data.get("officeAddress")
    pincode = data.get("pincode")
    state = data.get("state")
    city = data.get("city")
    gender = data.get("gender")
    experience = data.get("experience")
    specialization = data.get("specialization")
    court_type = data.get("typeCourt")
    languages = data.getlist("languages")
    resume_file = request.files['llbDocument']
    min_cost=data.get("min_cost_per_hr")
    print("Languages:- ", languages)
    # languages = languages_str.split(",") if languages_str else []

    languages_json = json.dumps(languages)

    # Check if the email already exists
    user_exists = Advocate.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"message": "User already exists", "response": False}), 201

    # Save the uploaded resume file
    resume_filename = save_resume(resume_file)
    # Hash password and create a new user to save to the database
    hash_pass = bcrypt.generate_password_hash(password).decode('utf-8')
    # Create an Advocate instance
    new_advocate = Advocate(
        fname=fname,
        lname=lname,
        email=email,
        phone_number=mobile,
        password=hash_pass,  # You should hash the password before saving it
        office_address=office_address,
        pincode=pincode,
        state=state,
        gender=gender,
        city=city,
        experience=experience,
        specialization=specialization,
        court_type=court_type,
        languages=languages_json,
        min_cost_per_hr=min_cost,
        degree_doc=resume_filename  # Save the filename in the database
    )

    # Add and commit to the database
    db.session.add(new_advocate)
    db.session.commit()

    # Return response
    response = jsonify({
        "message": "Advocate created successfully",
        "id": new_advocate.advocate_id,
        "email": new_advocate.email,
        "response": True
    }), 200

    return response


def save_resume(resume_file):
    if resume_file:
        # Save the file to the uploads folder
        filename = f"{datetime.utcnow().strftime('%Y%m%d%H%M%S%f')}_{resume_file.filename}"
        if os.path.exists('advocate_docs'):
            resume_file.save(os.path.join('advocate_docs', filename))
        else:
            os.makedirs('advocate_docs')
            resume_file.save(os.path.join('advocate_docs', filename))

        return filename
    return None


@advocate_bp.route('/login', methods=['POST'])
@single_login_required
def advocate_login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # check user is registered or not
    user = Advocate.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"message": "Unregistered email id", "response": False}), 201

    # check password
    if not bcrypt.check_password_hash(user.password, password.encode('utf-8')):
        return jsonify({"message": "Incorrect password", "response": False}), 201

    # start user session
    session["advocate_id"] = user.advocate_id
    print("advocate id is this:-", session.get('advocate_id'))

    # return response
    return jsonify({"message": "Advocate logged in successfully", "first_name": user.fname, "email": user.email,
                    "response": True}), 200


@advocate_bp.route('/', methods=['GET'])
@login_required
def get_user():
    # check if user is logged in
    user_id = session.get("advocate_id", None)
    if user_id is None:
        return jsonify({"message": "Advocate not logged in", "response": False}), 401

    # check if user exists
    user = Advocate.query.get(user_id)
    if user is None:
        return jsonify({"message": "Advocate not found", "response": False}), 404

    response = {"message": "User found", "advocate_id": user.advocate_id,
                "email": user.email, "response": True}
    return jsonify(response), 200


@advocate_bp.route('/logout', methods=['GET'])
@login_required
def advocate_logout():
    session.pop('advocate_id', None)  # Remove advocate ID from the session
    return jsonify({'message': 'Advocate logged out successfully'})


@advocate_bp.route('/get-meetings', methods=['GET'])
def get_advocate_connects():
    advocate_id = session.get("advocate_id", None)
    if advocate_id is None:
        return jsonify({"message": "Advocate not logged in", "response": False}), 401

    advo_connects = AdvoConnect.query.filter_by(
        advocate_id=advocate_id, accepted=False).all()

    advo_connects_data = [connect.to_dict() for connect in advo_connects]

    return jsonify({"advo_connects": advo_connects_data, "response": True}), 200
