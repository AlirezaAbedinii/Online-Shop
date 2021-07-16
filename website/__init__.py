from flask import Flask, app
from flask.helpers import url_for
from flask_sqlalchemy import SQLAlchemy
from os import name, path
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
    from .admin import admin
    
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(admin, url_prefix='/')
    
    create_database(app)
    
    create_admin(app=app) 
    create_products(app)  
    create_users(app)
    
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
    from .models import Product, Category
    with app.app_context():
        if not Category.query.filter_by().first():
            category = Category(name="دسته بندی نشده")
            db.session.add(category)
            db.session.commit()
        if not Product.query.filter_by().first():
            for i in range(40):
                product = Product(name=f'محصول {i+1}',price=(i+1)*10000,availability_number=i+1,sold_number=0,image='/static/Pictures/Product_sample_picture.png')
                db.session.add(product)
                db.session.commit()
            print('products added to db', file=sys.stdout)
        else:
            print('products already exists in db', file=sys.stdout)
            

def create_users(app):
    from .models import User, Receipt, Product
    with app.app_context():
        if not User.query.filter_by(id="alireza@arezz.com").first():
            user = User(id = "alireza@arezz.com", password = generate_password_hash("arezzpass1", method='sha256'), first_name='alireza',
                        last_name = "abedini", address='آدرس علیرضا', charge = 200000)
            db.session.add(user)
            db.session.commit()
            print('user added to db', file=sys.stdout)
        else:
            print('user already exists in db', file=sys.stdout)
        
        if not Receipt.query.filter_by().first():
            alireza = User.query.filter_by(id="alireza@arezz.com").first()
            product = Product.query.filter_by(id=1).first()
            product2 = Product.query.filter_by(id=2).first()
            product3 = Product.query.filter_by(id=3).first()
            receipt = Receipt(product_name = product.name, purchase_number = 1, customer_first_name = alireza.first_name,
                              customer_last_name = alireza.last_name, customer_address = alireza.address,
                              total_price = product.price * 1, customer_id = alireza.id)
            
            receipt2 = Receipt(product_name = product2.name, purchase_number = 1, customer_first_name = alireza.first_name,
                              customer_last_name = alireza.last_name, customer_address = alireza.address, 
                              total_price = product2.price * 1, customer_id = alireza.id)
            
            receipt3 = Receipt(product_name = product3.name, purchase_number = 1, customer_first_name = alireza.first_name,
                              customer_last_name = alireza.last_name, customer_address = alireza.address, 
                              total_price = product3.price * 1, customer_id = alireza.id)
            
            db.session.add(receipt)
            db.session.add(receipt2)
            db.session.add(receipt3)
            db.session.commit()
            print('receipts added to db', file=sys.stdout)
        else:
            print('receipts already exists in db', file=sys.stdout)
            
        
        