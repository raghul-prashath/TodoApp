# Store this code in 'app.py' file
from flask import Flask, request
import os
import sys
import mysql.connector
import json
  
app = Flask(__name__)
app.secret_key = 'adarsh'

mydb = mysql.connector.connect(
	    host="mysql",
	    user="user",
	    password="password",
        port="3306"
	  )

with open(os.path.join(sys.path[0], "init.sql"), "r") as file1:
    sql_cmds = file1.read()

sql_cmds1 = sql_cmds.split(";")
for i in range(0, len(sql_cmds1)-1):
    query = sql_cmds1[i] + ';'
    cursor = mydb.cursor()
    cursor.execute(query)
mydb.commit()
  
@app.route('/api/addList', methods =['GET', 'POST'])
def addList(): 
    add_user = """INSERT INTO works( work ) VALUES ( '%s' )"""
    data_user = request.json['work']
    cursor.execute(add_user % data_user)
    mydb.commit()
    add_user = """SELECT * from works"""
    cursor.execute(add_user)
    rows = cursor.fetchall()
    return json.dumps(rows)

@app.route('/api/removeList', methods =['GET', 'POST'])
def removeList():
    add_user = """DELETE FROM works WHERE work = '%s' """
    data_user = request.json['work']
    cursor.execute(add_user % data_user)
    mydb.commit()
    add_user = """SELECT * from works"""
    cursor.execute(add_user)
    rows = cursor.fetchall()
    return json.dumps(rows)

@app.route('/api/getList', methods =['GET', 'POST'])
def getList():
    add_user = """SELECT * from works"""
    cursor.execute(add_user)
    rows = cursor.fetchall()
    return json.dumps(rows)


if __name__ == "__main__":
    app.run()
