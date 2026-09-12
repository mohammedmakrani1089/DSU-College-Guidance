import os
from flask import Flask
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    
    print("SECRET KEY:", app.secret_key)
    
    
    from app.routes.home import home_bp
    # from app.routes.auth import auth_bp
    
    
    app.register_blueprint(home_bp)
    # app.register_blueprint(auth_bp)
    
    
    return app
    
    
    