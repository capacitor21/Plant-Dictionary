from flask import Flask, request, jsonify, make_response, render_template
from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy import inspect
from sqlalchemy.sql import text
import json

app = Flask(__name__)

metadata = MetaData()
plants = Table('plants', metadata,
    Column('name', String(100), primary_key=True),
    Column('species', String(100)),
    Column('genus', String(100)),
    Column('water', String(100)),
    Column('light', String(100)),
    Column('picturePath', String(100))
)

with open('keys.json', 'r') as keys:
    awsKey = json.load(keys)['awsKey']

engine = create_engine(awsKey)
metadata.create_all(engine)

inspector = inspect(engine)
print(inspector.get_columns('plants'))

@app.route('/', methods = ['GET'])
def home():
    return render_template("index.html")

@app.route('/plants', methods = ['GET'])
def index():
    row = ""
    with engine.connect() as con:
        rs = con.execute('SELECT * FROM plants')
        results = {'Plants': []}
        for row in rs:
            fields = {
                'name':row[0],
                'species' : row[1],
                'genus' : row[2],
                'water' : row[3],
                'light' : row[4],
                'picturePath' : row[5]
            }
            results['Plants'].append(fields)
    return make_response(jsonify(results))


@app.route('/plants', methods = ['POST'])
def create_plant():
    data = request.get_json()
    name = data['name']
    species = data['species']
    genus = data['genus']
    water = data['water']
    light = data['light']
    picturePath = data['picturePath']

    with engine.connect() as con:
        insert = (f'INSERT INTO plants VALUES(\'{name}\', \'{species}\', \'{genus}\', \'{water}\', \'{light}\', \'{picturePath}\')')
        con.execute(insert)

    return make_response(jsonify('success'))



app.run()
