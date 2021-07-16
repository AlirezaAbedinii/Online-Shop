from flask.helpers import url_for
from werkzeug.datastructures import cache_property
from website.models import Category, Product, Receipt
from flask import Blueprint, render_template, request, make_response, jsonify, redirect
from . import db
import sys
import json
from sqlalchemy import desc

views = Blueprint('views', __name__)

@views.route('/main')
def main():
    return render_template("main.html")

@views.route('/admin', methods=['GET', 'POST'])
def admin():
    if request.method == 'POST':
        req = request.get_json()
        if req['command'] == 'get_products':
            products = Product.query.filter_by().all()
            names, categories, prices, available_numbers, sold_numbers, images = [],[],[],[],[],[]
            res_products = []
            for product in products:
                res_products.append({"name":product.name, "category":product.category, "price":product.price,
                                     "availability_number":product.availability_number,
                                     "sold_number":product.sold_number, "image":product.image})
                
            res = make_response(jsonify({"message": res_products}), 200)
            return res
        
        if req['command'] == 'get_categories':
            categories = Category.query.filter_by().all()
            res_categories = []
            for cat in categories:
                res_categories.append({"name":cat.name})
                
            res = make_response(jsonify({"message": res_categories}), 200)
            return res
        
        
        if req['command'] == 'get_receipts':
            receipts = Receipt.query.order_by(desc(Receipt.date)).all()
            res_categories = []
            for rec in receipts:
                json_rec = {"id":rec.id, "product_name":rec.product_name,
                            "purchase_number":rec.purchase_number,	"customer_first_name":rec.customer_first_name,
                            "customer_last_name":rec.customer_last_name,	"customer_address":rec.customer_address,
                            "total_price":rec.total_price,	"date":rec.date,	"state":rec.state,
                            "customer_id":rec.customer_id}
                res_categories.append(json_rec)
                
            res = make_response(jsonify({"message": res_categories}), 200)
            return res
        
        if req['command'] == 'get_filtered_receipts':
            if req['rec_id'] not in (' ', ''):
                receipts = Receipt.query.filter_by(id = req['rec_id']).all()
            else:
                receipts = Receipt.query.order_by(desc(Receipt.date)).all()
            res_categories = []
            for rec in receipts:
                json_rec = {"id":rec.id, "product_name":rec.product_name,
                            "purchase_number":rec.purchase_number,	"customer_first_name":rec.customer_first_name,
                            "customer_last_name":rec.customer_last_name,	"customer_address":rec.customer_address,
                            "total_price":rec.total_price,	"date":rec.date,	"state":rec.state,
                            "customer_id":rec.customer_id}
                res_categories.append(json_rec)
                
            res = make_response(jsonify({"message": res_categories}), 200)
            return res
        
        
    return render_template("admin.html")


@views.route('/user')
def user():
    return render_template("user.html")


@views.route('/admin/create_product')
def create_product():
    return render_template("create_product.html")


@views.route('/admin/edit_product', methods = ['GET', 'POST'])
def edit_product():
    global current_product
    if request.method == 'POST':
        req = json.loads(request.get_data())
        current_product = req['product_name']
        render_template("edit_product.html", product_name = create_product)
        return redirect(url_for("views.edit_product"))
    print(request.method, request.get_json())
    return render_template("edit_product.html", product = current_product)


current_product = ''
    