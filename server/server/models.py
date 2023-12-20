from server import db
from datetime import datetime

class User(db.Model):
    """User of the app."""
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    mobile = db.Column(db.String(10))
    gender = db.Column(db.String(10))
    DOB = db.Column(db.Date)
    address = db.Column(db.String(255))
    city = db.Column(db.String(50))
    pincode = db.Column(db.String(10))
    state = db.Column(db.String(50))
    password = db.Column(db.String(50), nullable=False)
    date_joined = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'fname': self.fname,
            'lname': self.lname,
            'email': self.email,
            'gender':self.gender,
            'pincode': self.pincode,
            'state': self.state,
            'city': self.city,
            'mobile': self.mobile,
            'dob':self.DOB,
            'date_joined': self.date_joined.strftime('%Y-%m-%d %H:%M:%S')
        }
    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'
    
class Advocate(db.Model):
    advocate_id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50))
    office_address = db.Column(db.String(255), nullable=True)
    gender = db.Column(db.String(10))
    pincode = db.Column(db.String(10), nullable=True)
    state = db.Column(db.String(50), nullable=True)
    city = db.Column(db.String(50), nullable=True)
    phone_number = db.Column(db.String(10), nullable=True)
    experience = db.Column(db.Integer, nullable=True)
    specialization = db.Column(db.String(50), nullable=True)
    court_type = db.Column(db.String(50), nullable=True)
    languages = db.Column(db.String(255), nullable=True)
    rating = db.Column(db.Float(precision=2), nullable=True)
    min_cost_per_hr=db.Column(db.Integer,nullable=False)
    date_joined = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Add file field
    degree_doc = db.Column(db.String(100), nullable=True)
    
    # Add boolean field
    verified = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'advocate_id': self.advocate_id,
            'fname': self.fname,
            'lname': self.lname,
            'email': self.email,
            'office_address': self.office_address,
            'pincode': self.pincode,
            'state': self.state,
            'city': self.city,
            'phone_number': self.phone_number,
            'experience': self.experience,
            'specialization': self.specialization,
            'court_type': self.court_type,
            'languages': self.languages,
            'rating': self.rating,
            'date_joined': self.date_joined.strftime('%Y-%m-%d %H:%M:%S'),
            'degree_doc': self.degree_doc,
            'min_cost_per_hr':self.min_cost_per_hr,
            'verified': self.verified
        }
    
    def __repr__(self):
        return f'<Advocate user_id={self.advocate_id} email={self.email}>'
    
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)


    def to_dict(self):
        return {
            'admin_id':self.id,
            'email':self.email
        }
    def __repr__(self):
        return f"Admin('{self.email}')"

class LawCatgBenf(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    doc_name=db.Column(db.String(50),nullable=False)
    category=db.Column(db.String(50))
    beneficiaries=db.Column(db.String(255), nullable=True)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            'doc_name':self.doc_name,
            'category':self.category,
            'beneficiaries':self.beneficiaries
        }
    def __repr__(self):
        return f'<Law Category user_id={self.user_id} advocate_id={self.advocate_id} category={self.category} beneficiaries={self.beneficiaries}>'
    

class QueryStats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    query = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=True)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    


    def to_dict(self):
        return {
            'query_id':self.id, 
            'category':self.category,
            'beneficiaries':self.beneficiaries
        }

class AdvoConnect(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=True)
    advocate_id = db.Column(db.Integer, db.ForeignKey('advocate.advocate_id'), nullable=True)
    accepted = db.Column(db.Boolean, default=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            'connect_id': self.id,
            'subject': self.subject,
            'description': self.description,
            'date': self.date,
            'time': self.time.strftime('%H:%M'),  # Format time as HH:MM
            'user_id': self.user_id,
            'advocate_id': self.advocate_id
        }
