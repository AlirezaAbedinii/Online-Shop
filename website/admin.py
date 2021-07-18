from website.models import Admin, Category, Product, Receipt
from flask import Blueprint, render_template, request, make_response, jsonify, flash
from . import db
import sys
import json
from flask_login import  login_required,current_user

admin = Blueprint('admin', __name__)


@admin.route('/admin/create_product/submit', methods=['POST'])
@login_required
def create_product():
    print('submit req received', file=sys.stdout)
    req = request.get_json()
    name, category, price, av, sold = req.values()
    
    if not Category.query.filter_by(name = category).first():
            category = 'دسته بندی نشده'
            print("invalid category", sys.stdout)
            flash("دسته بندی وارد شده نامعتبر است", category="warning")
    
    if not Product.query.filter_by(name=name).first():
        product = Product(name = name, category = category, price = price, availability_number = av, sold_number = sold)
        db.session.add(product)
        db.session.commit()
        
        print('item added', file=sys.stdout)
        
        flash("محصول موردنظر با موقیت اضافه شد", category="success")
        return make_response(jsonify({"message": [name, category, price, av, sold]}), 200)
    else:
        flash("A product with this name already exists!", category="error")
        return make_response(jsonify({"message": "product name must be unique"}), 405)
    
    
    
@admin.route('/admin/edit_product/delete', methods=['POST'])
@login_required
def delete_product():
    print('delete req received', file=sys.stdout)
    req = json.loads(request.get_data())
    name = req['product_name']
    Product.query.filter_by(name = name).delete()
    db.session.commit()
    flash("محصول مورد نظر با موفقیت حذف شد", category="success")
    return make_response(jsonify({"message": f'{name} deleted successfuly'}), 200)

@admin.route('/admin/edit_product/submit', methods=['POST'])
@login_required
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
@login_required
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



@admin.route('/admin/add_category', methods=['POST'])
@login_required
def add_category():
    print('umad add', flush=True)
    print('add req received', file=sys.stdout)
    req = request.get_json()
    name = req['cat_name']
    
    if not Category.query.filter_by(name = name).first():
        category = Category(name = name)
        db.session.add(category)
        db.session.commit()
        
        return make_response(jsonify({"message": f'{name} added successfuly'}), 200)
    
    
    
    return make_response(jsonify({"message": f'{name} already exists'}), 405)



@admin.route('/admin/edit_category', methods=['POST'])
@login_required
def edit_category():
    print('edit req received', file=sys.stdout)
    req = request.get_json()
    old_name = req['old_name']
    new_name = req['cat_name']
    if old_name not in  ('دسته بندی نشده', '', ' '):
        updated_cats=Category.query.filter_by(name = old_name).update({Category.name: new_name})
        db.session.commit()
        
        updated_prods = Product.query.filter_by(category = old_name).update({Product.category: new_name})
        db.session.commit()
        
        return make_response(jsonify({"message": f'{old_name} updated successfuly to {new_name} for {updated_cats} categories and {updated_prods} products'}), 200)
    
    
    
    return make_response(jsonify({"message": f'{old_name} cant be updated'}), 405)



@admin.route('/admin/edit_receipt', methods=['POST'])
@login_required
def edit_receipt():
    print('edit req received', file=sys.stdout)
    req = request.get_json()
    id = req['old_name']
    new_state = req['rec_name']
    if new_state in  ('در حال انجام', 'انجام شده', 'لغو شده'):
        updated_recs=Receipt.query.filter_by(id = id).update({Receipt.state: new_state})
        db.session.commit()
        
        return make_response(jsonify({"message": f'{id} updated successfuly to {new_state} for {updated_recs} receipts'}), 200)
    
    
    
    return make_response(jsonify({"message": f'{id} cant be updated'}), 405)
