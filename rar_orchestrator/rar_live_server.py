import time
import random
import requests as r 
import os
from flask import Flask
from flask import jsonify

app = Flask(__name__)

@app.route('/<ticker>/<short_name>')
def get_rar_resp(ticker, short_name):
    cluster_id = get_cluster_id()
    req_str = get_req_str().format(cluster_id, ticker, short_name)
    res = r.get(req_str, auth=(os.environ['RAR_USERNAME'], os.environ['RAR_PASSWORD']))
    return jsonify(res.json())

#TODO Handle cluster-switching case here
def get_cluster_id():
    return os.environ['RAR_CLUSTER_ID']

def get_req_str():
    base = "https://gateway.watsonplatform.net/"
    base += "retrieve-and-rank/api/v1/solr_clusters/"
    base += "{0}/solr/example_collection/select?q="
    base += get_solr_query()
    base += "&wt=json&fl="
    # TODO Add description
    base += "title,url,anger,joy,fear,sadness,disgust,published"
    return base

def get_solr_query():
    return "(title:{1} OR title:{2})^2 OR (body:{1} OR body:{2})"

if __name__ == "__main__":
    app.run()
