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

@app.route('/join', methods=['GET'])
def join():
      data = db.session.query(Matkul.id_matkul, Matkul.nama_matkul, Mahasiswa.name, Mahasiswa.email, Mahasiswa.id_matkul) \
            .filter(Matkul.id_matkul==Mahasiswa.id_matkul) \
            .filter(Matkul.id_matkul==1) \
            .all()
      print(f'{data}')
      x = transform(data)
      return make_response(jsonify({'data': x}), 200)

@app.route('/where', methods=['POST'])
def defrtu():
      request_json         = request.get_json()
      name             = request_json.get('name')       
      email             = request_json.get('email')

      data = db.session.query(Mahasiswa) \
            .filter(func.lower(Mahasiswa.name) == func.lower(name)) \
            .all()
      
      datax = db.session.query(Mahasiswa) \
            .filter(func.lower(Mahasiswa.email) == func.lower(email)) \
            .all()

      if data and datax:
            return make_response(jsonify({'msg':'Username and Email has been used', 'status_code': 409}), 200)

      if data:
            return make_response(jsonify({'msg':' users has been used', 'status_code': 409}), 200)

      if datax:
            return make_response(jsonify({'msg':' email has been used', 'status_code': 409}), 200)
      else:

            print(f'{data}')
            x = transform(data)
      return make_response(jsonify({'msg' : 'Yayy'}), 200)

@app.route('/getData', methods=['GET'])
def getById():
      data = db.session.query(Matkul.id_matkul, Matkul.nama_matkul, Mahasiswa.name, Mahasiswa.email, Mahasiswa.id_matkul) \
            .filter(Matkul.id_matkul==Mahasiswa.id_matkul) \
            .filter(Mahasiswa.id == '33') \
            .all()
      print(f'{data}')
      x = transform(data)
      return make_response(jsonify({'data': x}), 200)

@app.route('/time', methods=['GET'])
def timeid():
      data = format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
      return make_response(jsonify({'msg': data}), 200)

@app.route('/getMatkul', methods=['GET'])
def getMatkulO():
      data = db.session.query(Matkul).count()
      print(f'{data}')
      # x = transform_mt(data)
      return make_response(jsonify({'data': data}), 200)



@app.route('/api')
def index():
#      try:
           myMahasiswa = Mahasiswa.query.all()
           print('\n### All Users:')
           for mhs in myMahasiswa:
                 print(f'{mhs.name} with ID {mhs.id}')
                 data = transform(myMahasiswa)
                 return make_response(jsonify({'data': data}), 200)
            #      except Exception as e:
            #            print(e)

@app.route('/profile/<name>')
def dre(name):
      myMahasiswa = Mahasiswa.query.filter_by(name=name).first()
      print('\n### All Users:')
      for mhs in myMahasiswa:
            print(f'{mhs.name} with ID {mhs.id}')
            data = transform(myMahasiswa)
            return make_response(jsonify({'data': data}), 200)

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
      # print(mahasiswa.id)
      # mahasiswa.i
      # db.session.refresh(mahasiswa)
      db.session.commit()
      idx = mahasiswa.id
      vins = [idx]
      datap = db.session.query(Matkul).all()
      x = transform_mt(datap)

      for idk in vins:
            # print(idk)
            # n = list(idk)
            for data in x:
                  
            #       s = ''.join(n)
                  # print(idk, data['matkul_id'])
                  sam = ''.join(str(e) for e in vins)
                  # print(sam)
                  idf = data['matkul_id']
                  nk = Matkul(
                        idk,
                        data['matkul_id']
                        )
                  # db.session.add(nk)
                  # db.session.flush()  
                  # db.session.commit()
      # print(mahasiswa.id)
      # mahasiswa.i
      # db.session.refresh(mahasiswa)
      # db.session.commit()
                  # junkirk = data['matkul_id']
            # print(f'{data}')
            # fres = {
            #       'id_mah'   : idf,
            #       'id_mod' : id_mod
            # }
      return jsonify({'data': sam}), 200

@app.route('/demi', methods=['GET'])  
def loli():
      
      # search   = request.args.get('search')
      # # sql = text('select * from Matkul where nama_matkul =:matkul',{'matkul': 'ipa'})
      # # indo = 'ipa'
      # # result = db.engine.execute(
      # #       text('select id_matkul,nama_matkul from Matkul where nama_matkul = :matkul'),
      # #       matkul = indo
      # # )

      # # result = db.session.query(Mahasiswa).filter(~Matkul.id_matkul.in_(Mahasiswa.id_matkul)).all()
      # # subq = db.session.query(Mahasiswa.id_matkul)
      
      # # x = transform_mt(subq)

      # result = db.session.query(Matkul.id_matkul).filter(Matkul.id_matkul != 4).filter(Matkul.id_matkul.notin_(db.session.query(Mahasiswa.id_matkul))).all()
      # # result = db.session.query(Mahasiswa.id).all()
      # # data = transform_mt(result)

      # # resultx = db.session.query(Matkul)

      # # if search:

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
      # j = data[0]['nama_matkul']
      # print(j)
     
      return jsonify({'data' : data, 'cums':x})

@app.route('/nubi', methods=['GET'])  
def nubi():
      s = 'hubs', 'maks'

      # print(loki)
      x = []
      for i in s:
            # x = i
            x.append(i)
            print(x)
      # loki = ",".join(s) 
      return make_response(jsonify({'data' : x}))

# def fuls(data):

#       for 
def singleTransform(x):
      # data = {
      #       'id': myMahasiswa.id,
      #       'name': myMahasiswa.name,
      #       }
      data = {
            # 'nama_matkul' : x.nama_matkul
            
                  'matkul_id' : x.id_matkul,
                  'nama_matkul' : x.nama_matkul
                  
            }
      return data

def singleMatkul(xd):
      # data = {
            # 'id': xd.id
            # 'name': myMahasiswa.name,
            # }
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