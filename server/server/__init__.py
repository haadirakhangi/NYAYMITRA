from flask import Flask,request,jsonify,session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_session import Session
from server.config import config
from flask_cors import CORS
from flask_cors import cross_origin

db = SQLAlchemy()
bcrypt = Bcrypt()


def create_app(config_class=config):
    app = Flask(__name__)
    CORS(app) 
    app.config.from_object(config)

    db.init_app(app)
    app.config["SESSION_SQLALCHEMY"] = db
    bcrypt.init_app(app)

    from server.category import get_response
    from server.models import Common_Law,Civil_Law,Criminal_Law
    @app.route('/category',methods=['POST'])
    @cross_origin(supports_credentials=True)
    def category():
        query = request.json.get('query')
        answer = request.json.get('answer')
        print("query",query)
        if not query:
            return jsonify({'error': 'Invalid request. Please provide query in JSON format.'}), 400

        try:
            json_answer = get_response(query)
            print(json_answer)
            category = json_answer.get('Category')
            print(category)
            sub_category = json_answer.get('Sub-Category')

            # Extract user_id and advocate_id from the session
            # user_id = session.get('user_id')
            # advocate_id = session.get('advocate_id')
            user_id = 1
            advocate_id = None
            # Store in the database based on the category
            if category == 'Common_Law':
                entry = Common_Law(query=query, sub_category=sub_category, user_id=user_id, advocate_id=advocate_id,answer=answer)
            elif category == 'Criminal_Law':
                entry = Criminal_Law(query=query, sub_category=sub_category, user_id=user_id, advocate_id=advocate_id,answer=answer)
            elif category == 'Civil_Law':
                entry = Civil_Law(query=query, sub_category=sub_category, user_id=user_id, advocate_id=advocate_id,answer=answer)
            else:
                return jsonify({'error': 'Invalid category.'}), 400

            # Commit to the database
            with app.app_context():
                db.session.add(entry)
                db.session.commit()

            return jsonify({'success': 'Data stored successfully.'})

        except Exception as e:
            return jsonify({'error': str(e)}), 500



    from server.users.routes import user_bp
    from server.advocate.routes import advocate_bp
    from server.admin.routes import admin_bp

    # Register the blueprint
    app.register_blueprint(user_bp,url_prefix='/user')
    app.register_blueprint(advocate_bp,url_prefix='/advocate')
    app.register_blueprint(admin_bp,url_prefix='/admin')

    # with app.app_context():
    #     db.create_all()
    # with app.app_context():
    #     db.session.commit()
    return app
