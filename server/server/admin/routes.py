from flask import session, request, jsonify, Blueprint
from flask_cors import cross_origin
from server.models import Common_Law,Civil_Law,Criminal_Law,Admin,Advocate
from server import db, bcrypt
from functools import wraps
from datetime import datetime
import os
import shutil
from chatbots.utils import add_data_to_pinecone_vectorstore

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get("admin", None)
        if user_id is None:
            return jsonify({"message": "User not logged in", "response": False}), 401
        return f(*args, **kwargs)
    return decorated_function


admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
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
@cross_origin(supports_credentials=True)
def admin_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if the provided email exists
    admin = Admin.query.filter_by(email=email).first()

    if admin and bcrypt.check_password_hash(admin.password, password):
        session["admin_id"] = admin.id
        return jsonify({"message": "Admin logged in successfully", "response": True}), 200

    return jsonify({"message": "Invalid credentials", "response": False}), 401

@admin_bp.route('/register', methods=['POST'])
@cross_origin(supports_credentials=True)
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
   # Fetch laws from different categories
    common_laws = Common_Law.query.all()
    criminal_laws = Criminal_Law.query.all()
    civil_laws = Civil_Law.query.all()

    # Segregate laws according to sub-categories
    common_subcategories = set(law.sub_category for law in common_laws)
    criminal_subcategories = set(law.sub_category for law in criminal_laws)
    civil_subcategories = set(law.sub_category for law in civil_laws)

    # Count sub-category occurrences in each location
    common_counts = {}
    criminal_counts = {}
    civil_counts = {}

    # Additional insights according to location and sub-categories
    location_insights = {}

    for law in common_laws:
        common_counts.setdefault(law.location, {}).setdefault(law.sub_category, 0)
        common_counts[law.location][law.sub_category] += 1

        # Location insights
        location_insights.setdefault(law.location, {}).setdefault('common', []).append(law.sub_category)

    for law in criminal_laws:
        criminal_counts.setdefault(law.location, {}).setdefault(law.sub_category, 0)
        criminal_counts[law.location][law.sub_category] += 1

        # Location insights
        location_insights.setdefault(law.location, {}).setdefault('criminal', []).append(law.sub_category)

    for law in civil_laws:
        civil_counts.setdefault(law.location, {}).setdefault(law.sub_category, 0)
        civil_counts[law.location][law.sub_category] += 1

        # Location insights
        location_insights.setdefault(law.location, {}).setdefault('civil', []).append(law.sub_category)

        return jsonify({"Insights": "Created succesfully", "response": True}), 200
    
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