import time
import random
import requests as r 
import os
from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin
from nltk.tokenize import RegexpTokenizer

app = Flask(__name__)

CORS(app)

@app.route('/<ticker>/<short_name>')
def get_rar_resp(ticker, short_name):
    cluster_id = get_cluster_id()
    req_str = get_req_str(short_name).format(cluster_id, ticker, filter_short_name(short_name))
    res = r.get(req_str, auth=(os.environ['RAR_USERNAME'], os.environ['RAR_PASSWORD']))
    return jsonify(res.json())

# TODO make this better, quick hack
def filter_short_name(short_name):
    print short_name
    tokenizer = RegexpTokenizer(r'\w+')
    print tokenizer.tokenize(short_name)[0]
    return tokenizer.tokenize(short_name)[0]

#TODO Handle cluster-switching case here
def get_cluster_id():
    return os.environ['RAR_CLUSTER_ID']

def get_req_str(short_name):
    base = "https://gateway.watsonplatform.net/"
    base += "retrieve-and-rank/api/v1/solr_clusters/"
    base += "{0}/solr/example_collection/select?q="
    base += get_solr_query(short_name)
    base += "&wt=json&fl="
    # TODO Add description
    base += "title,url,anger,joy,fear,sadness,disgust,published,description"
    return base

# TODO use short name to make more adept SOLR query
def get_solr_query(short_name):
    return "(title:{1} OR title:{2})^5 OR (description: {1} OR description: {2})^3 OR (body:{1} OR body:{2})"

if __name__ == "__main__":
    app.run(port=4040)
