import pandas as pd
import random
from datetime import datetime

# Sample Indian first names and last names
indian_first_names = [
    "Aarav", "Aarushi", "Advik", "Amaira", "Arjun", "Avni", "Daivik", "Esha", "Ishaan", "Ishika",
    "Kabir", "Kiara", "Mihika", "Mohit", "Neha", "Pranav", "Riya", "Rudra", "Saanvi", "Shaurya",
    "Shreya", "Tanvi", "Ved", "Vidhi", "Vihaan", "Yuvan", "Zara",
    "Aadi", "Aarohi", "Aryan", "Avishi", "Dhruv", "Diya", "Hrithik", "Ishani", "Ishant", "Ishita",
    "Kavya", "Kiaan", "Mira", "Neev", "Niyati", "Rohan", "Samaira", "Shlok", "Sia", "Vivaan",
    "Yash", "Yuvaan", "Zoya", "Aditya", "Ananya", "Atharva", "Bhavya", "Chahat", "Eshan", "Ishani",
    "Ishwar", "Jhanvi", "Kritika", "Misha", "Om", "Pari", "Raghav", "Saisha", "Shiv", "Suhana",
    "Tanishq", "Vansh", "Viha", "Yuvika", "Zain"
]

indian_last_names = [
    "Kumar", "Singh", "Jha", "Sharma", "Verma", "Gupta", "Mishra", "Yadav", "Choudhary", "Das",
    "Pathak", "Patel", "Pandey", "Thakur", "Rao", "Reddy", "Chauhan", "Roy", "Malhotra", "Shah","Pradhan","Naik","Deshmukh","Khan"
]

# Generate Indian-style email addresses
def generate_indian_email(first_name, last_name):
    email_provider = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "rediffmail.com"]
    email = f"{first_name.lower()}.{last_name.lower()}@{random.choice(email_provider)}"
    return email

# Generate Indian-style phone numbers
def generate_indian_phone():
    return f"{random.randint(800000000, 9999999999)}"

# Sample Indian locations and type of courts
indian_locations = ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow"]
indian_courts = ["Supreme Court", "High Court", "District Court", "Sessions Court", "Magistrate Court"]

# State-City mapping with pin codes
state_city_mapping = {
    "Delhi": {"cities": ["Delhi"], "pincode": "1100"},
    "Maharashtra": {"cities": ["Mumbai", "Pune"], "pincode": "4110"},
    "West Bengal": {"cities": ["Kolkata"], "pincode": "7000"},
    "Tamil Nadu": {"cities": ["Chennai"], "pincode": "6000"},
    "Karnataka": {"cities": ["Bangalore"], "pincode": "5600"},
    "Telangana": {"cities": ["Hyderabad"], "pincode": "5000"},
    "Gujarat": {"cities": ["Ahmedabad"], "pincode": "3800"},
    "Rajasthan": {"cities": ["Jaipur"], "pincode": "3020"},
    "Uttar Pradesh": {"cities": ["Lucknow"], "pincode": "2260"}
}

# Sample Indian locations and type of courts
indian_courts = ["Supreme Court", "High Court", "District Court", "Sessions Court", "Magistrate Court"]

# Generate 500 entries
data = {
    "fname": [random.choice(indian_first_names) for _ in range(500)],
    "lname": [random.choice(indian_last_names) for _ in range(500)],
}

# Add additional columns
data["email"] = [generate_indian_email(first, last) for first, last in zip(data["fname"], data["lname"])]
data["password"] = [None] * 500
data["office_address"] = [None] * 500
data["gender"] = [random.choice(["Male", "Female"]) for _ in range(500)]
data["pincode"] = [None] * 500
data["state"] = [random.choice(list(state_city_mapping.keys())) for _ in range(500)]
data["city"] = [random.choice(state_city_mapping[state]["cities"]) for state in data["state"]]
data["pincode"] = [state_city_mapping[state]["pincode"] + str(random.randint(10, 99)) for state in data["state"]]
data["phone_number"] = [generate_indian_phone() for _ in range(500)]
data["experience"] = [random.randint(1, 30) for _ in range(500)]
data["specialization"] = [random.choice(["Criminal Law", "Family Law", "Corporate Law", "Immigration Law", "Personal Injury Law", "Civil Rights Law", "Real Estate Law"]) for _ in range(500)]
data["court_type"] = [random.choice(indian_courts) for _ in range(500)]
data["languages"] = [random.sample(["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada"], random.randint(1, 8)) for _ in range(500)]
data["rating"] = [round(random.uniform(3.0, 5.0), 2) for _ in range(500)]
data["date_joined"] = [datetime.utcnow()] * 500
data["degree_doc"] = [None] * 500
data["verified"] = [True] * 500
data["min_cost_per_hr"] = [random.randint(2000, 7000) for _ in range(500)]

# Create DataFrame
advocate_df = pd.DataFrame(data)

# Display the first few rows of the dataset
print(advocate_df.head())

csv_data = advocate_df.to_csv('data_with_columns_states_pins_corrected.csv', index=True)
print('\nCSV String:\n', csv_data)