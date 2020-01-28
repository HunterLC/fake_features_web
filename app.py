from flask import Flask, url_for, request, redirect, session, make_response, jsonify, render_template
from flask_cors import *

app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/')
def hello_world():
    return render_template('login.html')

@app.route('/detect')
def detect_ui():
    return render_template('start.html')

@app.route('/getTable',methods=['POST','GET'])
def get_table():
    print("前端正在请求表格...")
    response = {"status": 200,
                "msg1": '130,140,150,190,106,125,110',
                "msg2": '170,40,50,90,150,25,200'}
    return jsonify(response)

@app.route('/login',methods=['POST','GET'])
def login():
    print("前端正在请求登录...")
    if request.method == 'POST':
        print('用户名'+request.form['user'])
        print('密码'+request.form['password'])
        if request.form['user'] == 'admin' and request.form['password'] == '123456':
            print('成功了')
            response = {"status": 200,
                        "msg":"success"}
            return jsonify(response)
        else:
            print('错误了')
            response = {"status": 200,
                        "msg": "error"}
            return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)