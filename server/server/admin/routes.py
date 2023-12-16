from flask import session, request, jsonify, Blueprint
from flask_cors import cross_origin
from server.models import User,LawCatgBenf,Admin,Advocate
from server import db, bcrypt
from functools import wraps
from datetime import datetime
import os
import shutil
from chatbots.utils import add_data_to_pinecone_vectorstore

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get("admin_id", None)
        if user_id is None:
            return jsonify({"message": "Admin not logged in", "response": False}), 401
        return f(*args, **kwargs)
    return decorated_function


admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

# @admin_bp.route('/login', methods=['POST'])
# @cross_origin(supports_credentials=True)
# def admin_login():
#     data = request.json
#     email = data.get("email")
#     password = data.get("password")

#     # Check if the provided email exists
#     admin = Admin.query.filter_by(email=email).first()

#     if admin and bcrypt.check_password_hash(admin.password, password):
#         session["admin_id"] = admin.id
#         return jsonify({"message": "Admin logged in successfully", "response": True}), 200

#     return jsonify({"message": "Invalid credentials", "response": False}), 401
    
@admin_bp.route('/update-vectordb', methods=['POST'])
@cross_origin(supports_credentials=True)
def update_vectorb():
    try:
        # Create 'uploads' directory if it doesn't exist
        upload_dir = 'update_docs'
        print("I AM BEING CALLLED")
        os.makedirs(upload_dir, exist_ok=True)
 
        # Iterate over each file in the request
        for file in request.files.getlist('documents'):
            filename = file.filename
            filepath = os.path.join(upload_dir, filename)
            
            # Save the file to the 'uploads' directory
            file.save(filepath)
        vectordb = add_data_to_pinecone_vectorstore(upload_dir)
        shutil.rmtree(upload_dir)
        return jsonify({"message": "Documents saved successfully", "response": True}), 200
    except Exception as e:
        print("Printing error",e)
        return jsonify({"message": f"Error: {str(e)}", "response": False}), 500
    
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
    # Join the LawCatgBenf table with the User and Advocate tables using foreign keys
    query = db.session.query(LawCatgBenf.category,
                             User.city.label('location'),
                             User.state,
                             db.func.count().label('count'))

    # Join with User table
    query = query.join(User, LawCatgBenf.user_id == User.user_id)

    # Group by category, location, and state
    query = query.group_by(LawCatgBenf.category, 'location', User.state)

    # Execute the query
    user_results = query.all()

    # Join the LawCatgBenf table with the Advocate table using foreign keys
    query = db.session.query(LawCatgBenf.category,
                             Advocate.city.label('location'),
                             Advocate.state,
                             db.func.count().label('count'))

    # Join with Advocate table
    query = query.join(Advocate, LawCatgBenf.advocate_id == Advocate.advocate_id)

    # Group by category, location, and state
    query = query.group_by(LawCatgBenf.category, 'location', Advocate.state)

    # Execute the query
    advocate_results = query.all()

    # Combine user and advocate results into a single dictionary
    insights = {}

    for result in user_results:
        category = result.category
        location = result.location
        state = result.state
        count = result.count

        key = (location, state)
        if key not in insights:
            insights[key] = {}
        insights[key][category] = count

    for result in advocate_results:
        category = result.category
        location = result.location
        state = result.state
        count = result.count

        key = (location, state)
        if key not in insights:
            insights[key] = {}
        insights[key][category] = count

    return jsonify(insights)
    
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