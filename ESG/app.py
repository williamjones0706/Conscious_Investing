# Import all dependencies required to run the application 

# The OS import is used to connect to the heroku environment to get the environment variables for database connection
import os

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
else:
    from config import remote_esg_host, remote_db_port, remote_esg_dbname, remote_esg_dbuser, remote_esg_dbpwd 

engine = create_engine(f"postgres://{remote_esg_dbuser}:{remote_esg_dbpwd}@{remote_esg_host}:{remote_db_port}/{remote_esg_dbname}")
conn = engine.connect()

# Initialize Flask application
app = Flask(__name__)

# Set up SQL Alchemy connection and classes
Base = automap_base() # Declare a Base using `automap_base()`
Base.prepare(engine, reflect=True) # Use the Base class to reflect the database tables
Base.classes.keys() # Print all of the classes mapped to the Base
# ClientInfo = Base.classes.client_info # Assign the client_info class (table) to a variable called `ClientInfo`
session = Session(engine) # Create a session
print(Base.classes.keys())

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")
    
# @app.route('/api/data/esg')
# def get_esg_data():
#     conn = engine.connect()

#     esg_df = pd.read_sql("SELECT * FROM woke_investing", conn)

#     conn.close()

#     return esg_df.to_json(orient='records')

if __name__ == "__main__":
    app.run()