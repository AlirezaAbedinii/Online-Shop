from website.models import Admin, Category, Product
from flask import Blueprint, render_template, request, make_response, jsonify
from . import db
import sys
import json

admin = Blueprint('admin', __name__)


@admin.route('/admin/create_product/submit', methods=['POST'])
def create_product():
    print('submit req received', file=sys.stdout)
    req = request.get_json()
    name, category, price, av, sold = req.values()
    
    if not Category.query.filter_by(name = category).first():
            category = 'دسته بندی نشده'
            print("invalid category", sys.stdout)
    
    if not Product.query.filter_by(name=name).first():
        product = Product(name = name, category = category, price = price, availability_number = av, sold_number = sold)
        db.session.add(product)
        db.session.commit()
        
        print('item added', file=sys.stdout)
        
    
        return make_response(jsonify({"message": [name, category, price, av, sold]}), 200)
    else:
        return make_response(jsonify({"message": "product name must be unique"}), 405)
    
    
    
@admin.route('/admin/edit_product/delete', methods=['POST'])
def delete_product():
    print('delete req received', file=sys.stdout)
    req = json.loads(request.get_data())
    name = req['product_name']
    Product.query.filter_by(name = name).delete()
    db.session.commit()
    return make_response(jsonify({"message": f'{name} deleted successfuly'}), 200)

@admin.route('/admin/edit_product/submit', methods=['POST'])
def update_product():
    print('change req received', file=sys.stdout)
    req = request.get_json()
    old_name, name, category, price, av, sold, image = req.values()
    print(f'name of product is {name}')
    
    product = Product.query.filter_by(name = old_name).first()
    
    if name != '':
        product.name = name
        
    if category != '' and Category.query.filter_by(name = category).first():
        product.category = category
    if price != '':
        product.price = price
    if av != '':
        product.availability_number = av
    
    if sold != '':
        product.sold_number = sold
        
    if image != '':
        product.image = image
    
    db.session.commit()
    return make_response(jsonify({"message": f'{name} edited successfuly'}), 200)

@admin.route('/admin/delete_category', methods=['POST'])
def delete_category():
    print('delete req received', file=sys.stdout)
    req = json.loads(request.get_data())
    name = req['cat_name']
    if name != 'دسته بندی نشده':
        Category.query.filter_by(name = name).delete()
        db.session.commit()
        updated_products = Product.query.filter_by(category = name).update({Product.category: 'دسته بندی نشده'})
        db.session.commit()
        
        return make_response(jsonify({"message": f'{name} deleted successfuly and {updated_products} product\' category updated'}), 200)
    
    
    
    return make_response(jsonify({"message": f'{name} cant be deleted'}), 405)