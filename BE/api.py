import json
from flask import Flask, jsonify, Response, make_response
from flask_cors import CORS
import requests

app = Flask(__name__)
cors = CORS(app)

@app.route('/covidDatas', methods=['GET'])
def index() -> Response:
  # with urllib.request.urlopen("https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json") as url:


    uri = 'https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'
    try:
      response = requests.get(uri) #get request json
      data =  json.loads(response.text)

      features = data['features'] #data yang kita ambil dari json di atas hanya dari array features
      # return make_response(jsonify(data), 200)
      
      deathCases = []
      positifCases = []
      recvoerCses = []
      Provinsi = []
      totalDeath = 0
      totalPositif = 0
      totalRecover = 0
      for i in features:
        # print(i['attributes'])

        # sum data 
        totalDeath += i['attributes']['Kasus_Meni']
        totalPositif += i['attributes']['Kasus_Posi']
        totalRecover += i['attributes']['Kasus_Semb']
        # end
        if i['attributes']['Provinsi'] != 'Indonesia':
          Provinsi.append(i['attributes']['Provinsi'])

          deathCases.append(i['attributes']['Kasus_Meni'])
          positifCases.append(i['attributes']['Kasus_Posi'])
          recvoerCses.append(i['attributes']['Kasus_Semb'])
        

      return make_response(jsonify({'provinsi' : Provinsi, 'deathCases' : deathCases, 'positifCases' : positifCases, 'recoverCases' : recvoerCses, 'totalDeath' : totalDeath, 'totalPositif': totalPositif, 'totalRecover' : totalRecover, 'features': features}), 200)
     
    except:
      return False

if __name__ == '__main__':
    app.debug = True
    app.run()