from flask import Blueprint, render_template, request, redirect, url_for, jsonify, make_response
from flask.wrappers import Response
from sqlalchemy.sql.elements import between 
from .models import User, Admin
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
import  re
from flask_login import login_user, login_required, logout_user

auth = Blueprint('auth', __name__)
def my_redirect(path):
    return redirect(url_for('path'))

@auth.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        print('umad')
        req = request.get_json()
        email, password= req.values()
        message = {"mail": "unk","pass":"unk"} 
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


@auth.route('/signup/submit', methods = ['GET','POST'])
def signup_submit():
    if request.method=='POST':
        req = request.get_json()
        name, lname, email, password, address = req.values()
        message = {"mail": "unk","pass":"unk","name":"valid","lname":"valid","address":"valid"}
        result={'state':'fail'}
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
        if message['mail']=='mail valid' and message['pass']=='pass valid':
            usr=User.query.filter_by(id=email).first()
            if usr is None:
                new_user=User(id=email,password=generate_password_hash(password,method='sha256'),first_name=name,last_name=lname,address=address)
                result['state']='success'
                db.session.add(new_user)
                db.session.commit()
                print(new_user)
                #my_redirect('views.main')
            #return redirect(url_for('views.main'))
            else: 
                result['state']='duplicate'
                #my_redirect('views.signin')
        res = make_response(jsonify(result), 200)
        return res 

    
@auth.route('/signin/test', methods=['POST'])
def test():
    # return render_template("signin.html")
    return make_response(jsonify({"message": "hello"}), 200)
@auth.route('/signin/submit', methods = ['GET','POST'])
def signin_submit():
    if request.method=='POST':
        req = request.get_json()
        email, password = req.values()
        message = {"mail": "unk","pass":"unk"}
        result={'state':'fail'}  
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
        if message['mail']=='mail valid' and message['pass']=='pass valid':
            usr=User.query.filter_by(id=email).first()
            if usr is None:
                result['state']='no user'
                ##new_user=User(id=email,password=generate_password_hash(password,method='sha256'),first_name=name,last_name=lname,address=address)
                ##result['state']='success'
                ##db.session.add(new_user)
                ##db.session.commit()
                ##print(new_user)
                #my_redirect('views.main')
            #return redirect(url_for('views.main'))
            else: 
                if check_password_hash(usr.password,password):
                    result['state']='success'
                else:
                    result['state']='failure'
                ##result['state']='duplicate'
                #my_redirect('views.signin')
        else:
            result['state']='error'
        res = make_response(jsonify(result), 200)
        return res 