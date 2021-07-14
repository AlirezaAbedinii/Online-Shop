from flask import Blueprint, render_template, request, redirect, url_for, jsonify, make_response 
from .models import User, Admin
from werkzeug.security import generate_password_hash, check_password_hash
from . import db

auth = Blueprint('auth', __name__)

@auth.route('/signin', methods=['GET', 'POST'])
def signin():
    
    return render_template("signin.html")

@auth.route('/signup', methods = ['GET', 'POST'])
def signup():
    return render_template("signup.html")