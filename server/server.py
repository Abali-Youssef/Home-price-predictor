from flask import request,Flask,jsonify
import utils

app = Flask(__name__)

@app.route('/get_loc_names', methods=['GET'])
def get_loc_names():
    response=jsonify({
        'locations':utils.get_loc_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/get_price',methods=['POST'])
def get_price() :
    location=request.form['location']
    bath=int(request.form['bath'])
    bhk=int(request.form['bhk'])
    total_sqft=float(request.form['total_sqft'])
    response=jsonify({
        "price":utils.get_estimated_price(location,total_sqft,bhk,bath)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/hello', methods=['GET'])
def hello():
    return 'boom'


if __name__ == "__main__" :
    print("starting python Flask server for price prediction application")
    utils.load_saved_artifacts()
    app.run()
