from flask import Blueprint, render_template, request

auth = Blueprint('auth', __name__)

@auth.route('/signin', methods=['GET', 'POST'])
def signin():
    
    return render_template("signin.html")

@auth.route('/signup', methods = ['GET', 'POST'])
def signup():
    return render_template("signup.html")