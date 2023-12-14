from flask import session, request, jsonify, Blueprint
from flask_cors import cross_origin
from server.models import Common_Law,Civil_Law,Criminal_Law
from server import db, bcrypt
from functools import wraps
from datetime import datetime
import os
import shutil

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get("admin", None)
        if user_id is None:
            return jsonify({"message": "User not logged in", "response": False}), 401
        return f(*args, **kwargs)
    return decorated_function


admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.route('/login', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def admin_login():
    og_email='admin@gmail.com'
    og_password='admin123'
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # user = User.query.filter_by(email=email).first()
    if (email==og_email) and (password==og_password):
        session["admin"] = 2
        print(session.get('admin'))
        return jsonify({"message": "Admin logged in successfully", "response": True}), 200
    
    return jsonify ({"message": "Invalid", "response": False}), 404
    
@admin_bp.route('/update-vectordb', methods=['POST'])
@cross_origin(supports_credentials=True)
def update_vectorb():
    try:
        # Create 'uploads' directory if it doesn't exist
        upload_dir = 'update_docs'
        os.makedirs(upload_dir, exist_ok=True)

        # Iterate over each file in the request
        for file in request.files.getlist('documents'):
            filename = file.filename
            filepath = os.path.join(upload_dir, filename)
            
            # Save the file to the 'uploads' directory
            file.save(filepath)
        shutil.rmtree(upload_dir)
        return jsonify({"message": "Documents saved successfully", "response": True}), 200
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}", "response": False}), 500
    

@admin_bp.route('/logout')
@cross_origin(supports_credentials=True)
@login_required
def admin_logout():
    session.pop('admin', None)
    return jsonify({'message': 'Admin logged out successfully'})

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