from website.models import Product
from flask import Blueprint, render_template, request, make_response, jsonify
from . import db
import sys

admin = Blueprint('admin', __name__)


@admin.route('/admin/create_product/submit', methods=['POST'])
def create_product():
    print('submit req received', file=sys.stdout)
    req = request.get_json()
    name, category, price, av, sold = req.values()
    
    product = Product(name = name, category = category, price = price, availability_number = av, sold_number = sold)
    db.session.add(product)
    db.session.commit()
    
    print('item added', file=sys.stdout)
    
    return make_response(jsonify({"message": [name, category, price, av, sold]}), 200)