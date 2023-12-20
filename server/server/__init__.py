from flask import Flask,request,jsonify,session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_session import Session
from server.config import config
from flask_cors import CORS
from flask_cors import cross_origin
from bs4 import BeautifulSoup
from datetime import timedelta
import requests
from flask_migrate import Migrate
from server.category import get_response

db = SQLAlchemy()
bcrypt = Bcrypt()
from server.models import LawCatgBenf,QueryStats,Advocate

url = "https://www.livelaw.in/"  # Replace with the actual URL you want to scrape


def create_app(config_class=config):
    app = Flask(__name__)
    CORS(app, supports_credentials=True,origins=['http://127.0.0.1:5174/'])
    app.config.from_object(config)
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)
    db.init_app(app)
    app.config["SESSION_SQLALCHEMY"] = db
    bcrypt.init_app(app)
    migrate = Migrate(app, db)

    
    
    @app.route('/category',methods=['POST'])
    @cross_origin(supports_credentials=True)
    def category():
        query = request.json.get('query')
        mostcommon = request.json.get('mostcommon')
        print("query",query)
        if not query:
            return jsonify({'error': 'Invalid request. Please provide query in JSON format.'}), 400
        try:
            # Extract user_id and advocate_id from the session
            # user_id = session.get('user_id')
            # advocate_id = session.get('advocate_id')
            user_id = 1
            query = db.session.query(LawCatgBenf.category).filter_by(doc_name=mostcommon)
            all_values = query.first()
            print("Entry 2",all_values)
            # Store in the database based on the category
            entry = QueryStats(query=query,category=category,user_id=user_id)
            db.session.add(entry)
            db.session.commit()
            return jsonify({'message': 'Data saved successfully', 'response': True}), 200
        except Exception as e:
            print("Error: ",e)
            return jsonify({'error': str(e)}), 500

 
    @app.route('/get_news', methods=['GET'])
    def get_news():
        # Fetch HTML content from the URL
        response = requests.get(url)
        html_content = response.text

        soup = BeautifulSoup(html_content, 'html.parser')

        # Extracting information from the provided HTML
        news_list = []

        # Keep track of titles to avoid repetition
        seen_titles = set()

        # Limit to the first 6 articles
        for article in soup.find_all('div', class_='row')[10:20]:
            # Extract title
            title_tag = article.find('h1')
            title = title_tag.text.strip() if title_tag else None

            # If title is None, use the content of the p tag as the title
            if title is None:
                p_tag = article.find('p')
                title = p_tag.text.strip() if p_tag else None

            # Check if title exists and is not a duplicate
            if title and title not in seen_titles:
                seen_titles.add(title)

                # Check if 'a' tag (link) exists before accessing href attribute
                a_tag = article.find('a')
                link = url + a_tag['href'] if a_tag and 'href' in a_tag.attrs else None


                # Exclude title content from description
                description = article.find('p').text.strip() if article.find('p') else None
                if description and title:
                    description = description.replace(title, 'Check out the link for more').strip()

                news_item = {
                    'title': title,
                    'link': link,
                    'description': description
                }

                news_list.append(news_item)


        return jsonify(news_list)

    from server.users.routes import user_bp
    from server.advocate.routes import advocate_bp
    from server.admin.routes import admin_bp

    # Register the blueprint
    app.register_blueprint(user_bp,url_prefix='/user')
    app.register_blueprint(advocate_bp,url_prefix='/advocate')
    app.register_blueprint(admin_bp,url_prefix='/admin')

    # with app.app_context():
    #     db.create_all()
    with app.app_context():
        # db.session.query(Advocate).delete()
        db.session.commit()
    return app
