from dotenv import load_dotenv
from datetime import timedelta
import os

load_dotenv()

class config():
    # app configuration
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SESSION_COOKIE_HTTPONLY = False
    # sqlalchemy configurations
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
    SESSION_COOKIE_SAMESITE = 'None'
    # session configurations
    SESSION_TYPE = 'sqlalchemy'
    SESSION_COOKIE_SECURE = True
    # SESSION_PERMANENT=True
    # PERMANENT_SESSION_LIFETIME=timedelta(minutes=30)
    # SESSION_COOKIE_SAMESITE = 'None'
    # session cookie configuration
    # SESSION_COOKIE_NAME = 'user_session'
    # SESSION_COOKIE_MAX_AGE = timedelta(minutes=30)


