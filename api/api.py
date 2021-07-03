from flask import Flask, request, jsonify, make_response, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import join
from sqlalchemy.sql import select
from datetime import datetime
from sqlalchemy import func, desc, or_
from sqlalchemy import text

app = Flask(__name__)

# server
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin@localhost/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# init

class Mahasiswa(db.Model):
      # id = db.Column(db.Integer, primary_key=True)
      id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=True)
      name = db.Column(db.String(20), unique=True)
      email = db.Column(db.String(20))
      id_matkul = db.Column(db.Integer)

      def __init__(self, name, email, id_matkul):
            self.name = name
            self.email = email
            self.id_matkul = id_matkul
      
      def __repr__(self):
            return '<Mahasiswa %r>' % self.name

class Matkul(db.Model):
      id_matkul = db.Column(db.Integer, primary_key=True)
      nama_matkul = db.Column(db.String)

      def __init__(self, id_matkul, nama_matkul):
            self.nama_matkul = nama_matkul
            self.id_matkul = id_matkul
      
      def __repr__(self):
            return '<Matkul %r>' % self.id_matkul

@app.route('/post', methods=['POST'])
def post_u():
      request_json     = request.get_json()
      value1           = request_json.get('name')
      value2           = request_json.get('email')
      mahasiswa = Mahasiswa(
            value1,
            value2,
            2)
      db.session.add(mahasiswa)
      db.session.flush()  
     
      db.session.commit()
      idx = mahasiswa.id
      vins = [idx]
      datap = db.session.query(Matkul).all()
      x = transform_mt(datap)

      for idk in vins:
            
            for data in x:
                  
                  sam = ''.join(str(e) for e in vins)
                  # print(sam)
                  idf = data['matkul_id']
                  nk = Matkul(
                        idk,
                        data['matkul_id']
                        )
     
      return jsonify({'data': sam}), 200

@app.route('/demi', methods=['GET'])  
def loli():
      
      result = db.session.query(Matkul).order_by(Matkul.id_matkul.desc()).all()

      data = transform(result)
      x = []
      for i in data:
            idops = i['matkul_id']
            nama = i['nama_matkul']
            # print(idops)
            findX = db.session.query(Mahasiswa).filter(Mahasiswa.id_matkul == idops).count()
            x.append(findX)
            print(findX)
     
     
      return jsonify({'data' : data, 'cums':x})


def singleTransform(x):

      data = {
            
            'matkul_id' : x.id_matkul,
            'nama_matkul' : x.nama_matkul
                  
      }
      return data

def singleMatkul(xd):
     
      data = {
            'matkul_id' : xd.id_matkul,
      #       # 'nama_matkul' : xd.nama_matkul
            }
      return data


def transform(users):
      array = []
      for i in users:
            array.append(singleTransform(i))
      return array

def transform_mt(users):
      array = []
      for i in users:
            array.append(singleMatkul(i))
      return array


if __name__ == '__main__':
      app.run()