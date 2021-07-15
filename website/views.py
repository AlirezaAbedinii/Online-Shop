from website.models import Product
from flask import Blueprint, render_template, request, make_response, jsonify
from . import db
import sys

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
    return render_template("admin.html")


@views.route('/user')
def user():
    return render_template("user.html")


@views.route('/test')
def test():
    return render_template("test.html", testing = "AYOOO")