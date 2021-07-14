from flask import Blueprint, render_template, request, redirect, url_for, jsonify, make_response
from flask.wrappers import Response
from sqlalchemy.sql.elements import between 
from .models import User, Admin
from werkzeug.security import generate_password_hash, check_password_hash
from . import db

auth = Blueprint('auth', __name__)

@auth.route('/signin', methods=['GET', 'POST'])
def signin():
    return render_template("signin.html")


@auth.route('/signup', methods = ['GET', 'POST'])
def signup():
    if request.method == 'POST':
        print('umad')
        req = request.get_json()
        name, lname, email, password, address = req.values()
        message = {"message": "invalid"}
        if len(name.strip())>0 and len(name.strip())<255:
            message = {"message": "valid"}
        
        res = make_response(jsonify(message), 200)
        return res
    return render_template("signup.html")


@auth.route('/signup/submit', methods = ['POST'])
def signup_submit():
    print('umad')
    req = request.get_json()
    res = make_response(jsonify({"message": "json received"}), 200)
    return res

    
@auth.route('/signin/test', methods=['POST'])
def test():
    # return render_template("signin.html")
    return make_response(jsonify({"message": "hello"}), 200)
