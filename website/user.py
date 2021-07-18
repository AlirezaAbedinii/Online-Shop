from sqlalchemy.sql.expression import and_
from website.models import Admin, Basket, Category, Product, Receipt
from flask import Blueprint, render_template, request, make_response, jsonify
from . import db
import sys
import json
from flask_login import  login_required,current_user

user = Blueprint('user', __name__)


@user.route('/user/add_to_shop_basket', methods=['POST'])
# @login_required
def user_Tes():
    print('req received', file=sys.stdout)
    req = request.get_json()
    # user_id = current_user.id
    user_id = "alireza@arezz.com"
    product_name = req['product_name']
    product_count = req['product_count']
    
    shopped_product = Product.query.filter_by(name = product_name).first()
    
    if shopped_product.availability_number >= product_count:
        shopped_product = Product.query.filter_by(name = product_name).first()
        shopped_product.availability_number -= product_count
        
        if not Basket.query.filter(and_(Basket.customer_id == user_id, Basket.product_name == product_name)).first():
            new_basket = Basket(customer_id = user_id, product_name=product_name, product_count=product_count)
        else:
             new_basket = Basket.query.filter(and_(Basket.customer_id == user_id, Basket.product_name == product_name)).first()
             new_basket.product_count += product_count
        
        
        
        db.session.add(new_basket)
        db.session.commit()
        res = make_response(jsonify({"message": "به سبد خرید اضافه شد"}), 200)
        return res
        
    else:
        return make_response(jsonify({"message": "موجودی محصول کمتر از مقدار انتخاب شده است"}), 405)
