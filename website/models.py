from . import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.string(100), primary_key=True)
    password = db.Column(db.string(100))
    first_name = db.Column(db.string(100))
    last_name = db.Column(db.string(100))
    address = db.Column(db.string(100))
    charge = db.Column(db.string(100))
    
class Admin(db.Model):
    id = db.Column(db.string(100), primary_key=True)
    password = db.Column(db.string(100))

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.string(100))
    category = db.Column(db.string(100))
    price = db.Column(db.Integer)
    availability_number = db.Column(db.Integer)
    sold_number = db.Column(db.Integer)
    image = db.Column(db.string(100))
    
    
    