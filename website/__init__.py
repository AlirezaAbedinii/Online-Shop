from flask import Flask, app
from flask.helpers import url_for
from flask_sqlalchemy import SQLAlchemy
from os import path
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'arezzinjast salva ham hast'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)
    
    
    from .views import views
    from .auth import auth
    
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    
    from .models import User, Admin, Product, Receipt
    
    create_database(app)

    try:
        with app.app_context():
            admin = Admin(id = "admin@admin.com", password = generate_password_hash("adminpass1", method='sha256'))
            db.session.add(admin)
            db.session.commit()
    except:
        pass
    
    return app
    

def create_database(app):
    if not path.exists('website/' + DB_NAME):
        with app.app_context():
            db.create_all()
        print('Created Database!')