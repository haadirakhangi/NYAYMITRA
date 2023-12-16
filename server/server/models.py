from server import db
from datetime import datetime

class User(db.Model):
    """User of the app."""
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    mobile = db.Column(db.String(15))
    gender = db.Column(db.String(10))
    DOB = db.Column(db.Date)
    address = db.Column(db.String(255))
    city = db.Column(db.String(50))
    pincode = db.Column(db.String(10))
    state = db.Column(db.String(50))
    password = db.Column(db.String(50), nullable=False)
    date_joined = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'
    
class Advocate(db.Model):
    advocate_id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50))
    office_address = db.Column(db.String(255), nullable=True)
    pincode = db.Column(db.String(10), nullable=True)
    state = db.Column(db.String(50), nullable=True)
    city = db.Column(db.String(50), nullable=True)
    phone_number = db.Column(db.String(10), nullable=True)
    experience = db.Column(db.Integer, nullable=True)
    specialization = db.Column(db.String(50), nullable=True)
    court_type = db.Column(db.String(50), nullable=True)
    languages = db.Column(db.String(255), nullable=True)
    rating = db.Column(db.Float(precision=2), nullable=True)
    date_joined = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Add file field
    resume = db.Column(db.LargeBinary, nullable=True)
    
    # Add boolean field
    verified = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Advocate user_id={self.advocate_id} email={self.email}>'

class Common_Law(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    query = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.String(255))
    sub_category = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=True)
    advocate_id = db.Column(db.Integer, db.ForeignKey('advocate.advocate_id'), nullable=True)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f'<Common Law user_id={self.user_id} advocate_id={self.advocate_id} query={self.query} sub-category={self.sub_category}>'

class Criminal_Law(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    query = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.String(255))
    sub_category = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=True)
    advocate_id = db.Column(db.Integer, db.ForeignKey('advocate.advocate_id'), nullable=True)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f'<Criminal Law user_id={self.user_id} advocate_id={self.advocate_id} query={self.query} sub-category={self.sub_category}>'

class Civil_Law(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    query = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.String(255))
    sub_category = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=True)
    advocate_id = db.Column(db.Integer, db.ForeignKey('advocate.advocate_id'), nullable=True)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f'<Civil Law user_id={self.user_id} advocate_id={self.advocate_id} query={self.query} sub-category={self.sub_category}>'

    
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f"Admin('{self.email}')"

class LawCatgBenf(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    doc_name=db.Column(db.String(50),nullable=False)
    category=db.Column(db.String(50))
    beneficiaries=db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=True)
    advocate_id = db.Column(db.Integer, db.ForeignKey('advocate.advocate_id'), nullable=True)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f'<Law Category user_id={self.user_id} advocate_id={self.advocate_id} category={self.category} beneficiaries={self.beneficiaries}>'