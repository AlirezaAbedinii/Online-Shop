from flask import Blueprint, render_template
from flask_login import  login_required,current_user

views = Blueprint('views', __name__)

@views.route('/main')
def main():
    return render_template("main.html",user=current_user)

@views.route('/admin')
def admin():
    return render_template("admin.html")


@views.route('/user')
#@login_required
def user():
    return render_template("user.html")

@views.route('/signin')
def signin():
    return render_template("signin.html")

@views.route('/test')
def test():
    return render_template("test.html", testing = "AYOOO")