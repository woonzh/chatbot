#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Jan  2 18:46:30 2019

@author: zhenhao
"""

import flask
from flask import Flask, request, make_response, render_template, redirect
from flask_cors import CORS
from flask_restful import Resource, Api
import json

import connector

app = Flask(__name__)
api = Api(app)
CORS(app)

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/trump')
def trump():
    return render_template('trump.html')

@app.route('/mobile')
def mobile():
    return render_template('mobile.html')

@app.route('/query', methods=['GET', 'OPTIONS'])
def passwordcheck():
    if request.method == 'GET':
        query= request.args.get("query" ,type = str, default="")
        
        ret=connector.main(query)
            
        resp = flask.Response(json.dumps(ret))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Methods']= 'GET,PUT,POST,DELETE,OPTIONS'
        resp.headers['Access-Control-Allow-Credentials'] = 'true'
        return resp
    
if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)
     app.run(debug=True, host='localhost', port=5000)