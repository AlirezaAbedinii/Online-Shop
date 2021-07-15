from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class User(db.Model, UserMixin):
    id = db.Column(db.String(100), primary_key=True)
    password = db.Column(db.String(100))
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    address = db.Column(db.String(100))
    charge = db.Column(db.String(100))
    receipts = db.relationship('Receipt')
    
class Admin(db.Model):
    id = db.Column(db.String(100), primary_key=True)
    password = db.Column(db.String(100))

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    category = db.Column(db.String(100))
    price = db.Column(db.Integer)
    availability_number = db.Column(db.Integer)
    sold_number = db.Column(db.Integer)
    image = db.Column(db.String(100))
    
    
class Receipt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100))
    purchase_number = db.Column(db.Integer)
    customer_first_name = db.Column(db.String(100))
    customer_last_name = db.Column(db.String(100))
    customer_address = db.Column(db.String(100))
    total_price = db.Column(db.Integer)
    date = db.Column(db.DateTime(timezone=True), default = func.now())
    tracking_code = db.Column(db.String(100))
    state = db.Column(db.String(100))
    customer_id = db.Column(db.String(100), db.ForeignKey('user.id'))
    
    