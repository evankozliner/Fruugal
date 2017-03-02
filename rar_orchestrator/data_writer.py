import feedparser as fp
import os
import urllib2 
import hashlib 
import time
import sqlite3
import requests as req
import json
import urllib
from bs4 import BeautifulSoup
from watson_developer_cloud import AlchemyLanguageV1
import dateutil.parser as date_parser

OUTPUT_DIR = "scraped_articles/"
DATA_DIR = "data/"

def main():
    conn = sqlite3.connect('articles.db')
    raw_json = build_data(conn)
    data_num = str(get_data_num())
    with open(DATA_DIR + "data-" + data_num + ".json", 'w+') as f:
        f.write(raw_json)
    upload_articles(data_num, raw_json)

def upload_articles(data_num, payload):
    auth = (os.environ['RAR_USERNAME'], os.environ['RAR_PASSWORD'])
    raw_url ="https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/{0}"
    raw_url += "/solr/admin/collections/update"
    url = raw_url.format(os.environ['RAR_CLUSTER_ID'])
    req.post(url, auth=auth, data=json.dumps(payload))

def post_all():
    for f in os.listdir(DATA_DIR):


def get_data_num():
    # No one will ever read this right
    return max([int("".join(filter(lambda x: x.isdigit(),list(fn)))) for fn in os.listdir("data")]) + 1

# Sketchy method to get the data into the non json-rfc format ibm requests
def build_data(conn):
    conn.row_factory = dict_factory
    cur = conn.cursor()
    data = []
    for row in cur.execute("select * from articles where solr_enabled=0"):
        if row['url'] is not None and row['url'] != "":
            data.append(('add', 
                { "doc": {
                    "id": row['id'],
                    "fear": row['fear'],
                    "anger": row['anger'],
                    "joy": row['joy'],
                    "sadness": row['sadness'],
                    "disgust": row['disgust'],
                    "published": row['published'],
                    "url": row['url'],
                    "body": extract_body(row['id'], conn),
                    "description": row['description'],
                    "title": row['title']}}))
            conn.execute("update articles set solr_enabled=1 where id=?", [row['id']])
            conn.commit()
    final_json = '{%s}' % ',\n'.join(['"{}": {}'.format(action, json.dumps(dictionary)) 
        for action, dictionary in data])
    return final_json
    
def extract_body(idx, conn):
    conn.row_factory = dict_factory
    hash_val = conn.execute("select * from articles where id=" + str(idx)).fetchone()['hash']

    file_path = OUTPUT_DIR + hash_val + ".html"

    with open(file_path) as f:
        # Probably not as sophisticated a parsing as we need but will do for now
        text = get_text(f.read()).replace("\n", " ")
    return text


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def get_text(html):
    soup = BeautifulSoup(html)

    # kill all script and style elements
    for script in soup(["script", "style"]):
        script.extract()    # rip it out
    
    text = soup.get_text()
    lines = (line.strip() for line in text.splitlines())
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
    return '\n'.join(chunk for chunk in chunks if chunk)


if __name__ == "__main__":
    main()
