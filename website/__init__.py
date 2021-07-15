from flask import Flask, app
from flask.helpers import url_for
from flask_sqlalchemy import SQLAlchemy
from os import path
from werkzeug.security import generate_password_hash, check_password_hash
import sys

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
    
    create_database(app)
    
    create_admin(app=app) 
    create_products(app)  
    
    return app
    

def create_database(app):
    if not path.exists('website/' + DB_NAME):
        with app.app_context():
            db.create_all()
        print('Created Database!')
        
def create_admin(app):
    from .models import Admin
    with app.app_context():
        if not Admin.query.filter_by(id="admin@admin.com").first():
            admin = Admin(id = "admin@admin.com", password = generate_password_hash("adminpass1", method='sha256'))
            db.session.add(admin)
            db.session.commit()
            print('admin added to db', file=sys.stdout)
        else:
            print('admin already exists in db', file=sys.stdout)
    
def create_products(app):
    from .models import Product
    with app.app_context():
        if not Product.query.filter_by().first():
            for i in range(40):
                product = Product(name=f'محصول {i+1}',category=f'دسته بندی{i+1}',price=(i+1)*10000,availability_number=i+1,sold_number=0,image='/static/Pictures/Product_sample_picture.png')
                db.session.add(product)
                db.session.commit()
            print('products added to db', file=sys.stdout)
        else:
            print('products already exists in db', file=sys.stdout)
            