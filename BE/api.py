from flask import Flask, render_template
import requests
import json

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
  req = requests.get('https://covid19.mathdro.id/api/countries/Indonesia')
  print(req.content)
  data = json.loads(req.content)
  return render_template('index.html', data=data)