# Import all dependencies required to run the application 

# The OS import is used to connect to the heroku environment to get the environment variables for database connection
import os
import json
import io
# Pandas is required in order to read the sql queries into dataframes for conversion to JSON for plotting
import pandas as pd
import numpy as np

# SqlAlchemy is needed to make the connection to the database and actually pull information from it with the engine postgres URL
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# Psycorp2 is required in order to connect the the postgres database, whereas pymysql would be used for MySQL connections
import psycopg2

# Flask is used to actually deploy our application and render the html files for the webpage views the user sees
from flask import Flask, jsonify, render_template, url_for, json, request
from flask_sqlalchemy import SQLAlchemy
import pickle
from sklearn.cluster import KMeans

#  In order to work on our project both locally and in the cloud the following code tells it to either use the config file or search heroku
# for the environment variables 
IS_HEROKU = False

if('IS_HEROKU' in os.environ):
    IS_HEROKU = True

if (IS_HEROKU):
    remote_esg_host = os.environ['remote_esg_host']
    remote_db_port = os.environ['remote_db_port']
    remote_esg_dbname = os.environ['remote_esg_dbname']
    remote_esg_dbuser = os.environ['remote_esg_dbuser']
    remote_esg_dbpwd = os.environ['remote_esg_dbpwd']
    API_KEY = os.environ['mapboxkey']
else:
    from config import remote_esg_host, remote_db_port, remote_esg_dbname, remote_esg_dbuser, remote_esg_dbpwd 

engine = create_engine(f"postgres://{remote_esg_dbuser}:{remote_esg_dbpwd}@{remote_esg_host}:{remote_db_port}/{remote_esg_dbname}")
conn = engine.connect()

# Initialize Flask application
app = Flask(__name__)
model = pickle.load(open("model.pkl", 'rb'))

# Set up SQL Alchemy connection and classes
Base = automap_base() # Declare a Base using `automap_base()`
Base.prepare(engine, reflect=True) # Use the Base class to reflect the database tables
Base.classes.keys() # Print all of the classes mapped to the Base
# ClientInfo = Base.classes.client_info # Assign the client_info class (table) to a variable called `ClientInfo`
session = Session(engine) # Create a session
print(Base.classes.keys())

# Develop flask routes for each page and then the routes for the database info to feed the plots in our js files

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/company_search")
def company_search():
    """Return the company search page."""
    return render_template("company_search.html")

@app.route("/data_table")
def data_table():
    """Return the data table."""
    return render_template("data_table.html")

@app.route("/deep_dive")
def deep_dive():
    """Return the deep_dive info for industry/sector/funnel,etc."""
    return render_template("deep_dive.html")

@app.route("/esg_breakdown")
def esg_breakdown():
    """Return the history and breakdown page."""
    return render_template("esg_breakdown.html")

@app.route("/recommendations")
def recommendations():
    """Return the recommendations page."""
    return render_template("recommendations.html")


@app.route('/output',methods=["POST"])
def get_output():
    json = request.get_json()
    # input_data = pd.DataFrame(json["data"])
    input_data = [[json["data"]['E'],json["data"]['S'],json["data"]['G']]]
    # input_data = json["data"]['S']
    # input_data.append(json["data"]['E'])
    # input_data.append(json["data"]['S'])
    # input_data.append(json["data"]['G'])
    # model_input = np.array(input_data)
    # print(model_input)
    # with open("model.pkl", 'rb') as file:
    # model = pickle.load(open("model.pkl", 'rb'))
    model_predict = model.predict(input_data)
    model_predict_tuple = tuple(model_predict)
    # mdl_array = [model_output]
    # model_array = np.array([model_predict])   
    # print(model_predict) 
    # print(model_predict_tuple)
    # print(3)
    # print(model_array)
    model_predict_array = np.array([model_predict_tuple])
    # numpyData = {"array": model_predict_array}
    # print(numpyData)
    model_predict_df = pd.DataFrame(model_predict_array,index=['Result'], columns=['Output'])
    model_predict_JSON = model_predict_df.to_json(orient='index')
    print(model_predict_JSON)
    return jsonify(model_predict_JSON)

@app.route("/mapboxkey", methods=["GET", "POST"])
def mapbox():
    """Return the recommendations page."""
    if request.method == "POST":
        return 200

    else:
        return json.dumps(API_KEY)



# @app.route('/api/data/esg')
# def get_esg_data():
#     conn = engine.connect()

#     esg_df = pd.read_sql("SELECT * FROM woke_investing", conn)

#     conn.close()

#     return esg_df.to_json(orient='records')

if __name__ == "__main__":
    app.run()