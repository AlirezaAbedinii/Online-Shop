from flask import Blueprint, render_template

views = Blueprint('views', __name__)

@views.route('/main')
def main():
    return render_template("main.html")

@views.route('/admin')
def admin():
    return render_template("admin.html")


@views.route('/user')
def user():
    return render_template("user.html")
