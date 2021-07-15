from flask import Blueprint, render_template, request, redirect, url_for, jsonify, make_response
from flask.wrappers import Response
from sqlalchemy.sql.elements import between 
from .models import User, Admin
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
import  re

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
        message = {"mail": "unk","pass":"unk","name":"valid","lname":"valid","address":"valid"}
        if len(name.strip())>255:
            message['name']='invalid'
        if len(lname.strip())>255:
            message['lname']='invalid'
        if len(address)>1000:
            message['address']='invalid'   
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if "".__eq__(password):
            message['pass'] ="pass empty"
        elif len(password)<8: 
            message = {"pass": "pass min len invalid"}
        elif len(password)>255: 
            message['pass'] = "pass max len invalid"
        elif re.search('[0-9]',password) is None:
            message['pass'] ="pass num invalid"
        elif re.search('[a-z]',password) is None:
            message['pass'] = "pass char invalid"
        else:
            message['pass'] = "pass valid"
            
        if "".__eq__(email):
            message['mail'] ="mail empty"
        elif len(email)>255: 
            message['mail'] ="mail len invalid"
        elif (re.match(regex, email) is None):
            message['mail'] = "mail invalid"
        else:
            message['mail'] ='mail valid'
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
