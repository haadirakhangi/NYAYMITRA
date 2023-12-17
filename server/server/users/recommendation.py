from flask import session, request, jsonify, Blueprint,Flask
from flask_cors import cross_origin
from server.models import User
from server import db, bcrypt
from functools import wraps
from datetime import datetime
from server import create_app
import os
import shutil
from openai import OpenAI
import openai
from dotenv import load_dotenv
import ast

load_dotenv()
# Set your OpenAI API key
openai.api_key = os.environ.get("OPENAI_API_KEY")

from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)



app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.instance_path, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Load advocate data

db = SQLAlchemy(app)
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


@app.route("/recommendations",methods=['POST'])
def test():
    user_query = request.args.get('query')

    if user_query:

        spec = get_specialization_from_text(user_input=user_query)
        query = f"SELECT * FROM advocate WHERE specialization={spec}"
        result = db.session.execute(query)

        # result to a list of dictionaries for JSON response
        result_dict = [dict(row) for row in result]
        return jsonify(result_dict)
        
    else:
        return "Please provide a query parameter."



# Route to handle the filters and sorting
@app.route('/filter_lawyers', methods=['POST'])
def filter_lawyers():
    filters = request.get_json()

    # Construct the SQL query based on the filters
    query = f"SELECT * FROM advocate WHERE 1=1"
    for key, value in filters.items():
        if key == 'language' and value:
            # If filtering by language, check if any language in the list matches
            query += f" AND language LIKE '%{value}%'"
        elif value:
            query += f" AND {key} = '{value}'"


    query += " ORDER BY rating DESC;"

    result = db.session.execute(query)

    # result to a list of dictionaries for JSON response
    result_dict = [dict(row) for row in result]
    return jsonify(result_dict)