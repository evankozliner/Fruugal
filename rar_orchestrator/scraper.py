# Scrapes articles based off of Reuters RSS feed links, stored titles 

# Only the sketchiest of scripts!

# In case you don't have the articles table:
#CREATE TABLE articles(id int primary key not null, hash string unique, url string non null, title string non null, description string non null, published date, solr_enabled boolean);

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
SOURCES = ["reuters", "ars-technica", "business-insider", "financial-times", "the-wall-street-journal", 'bloomberg', 'google-news', 'time']

#feed_url = 'http://feeds.reuters.com/reuters/technologyNews'
#r = req.get("https://newsapi.org/v1/articles?source=techcrunch&apiKey=" + os.environ["NEWS_API_KEY"]).json

def main():
    conn = sqlite3.connect('articles.db')
    #feed = fp.parse(feed_url)

    # TODO Sentiment 
    for source in SOURCES:
        print "Scraping " + source
        res = req.get("https://newsapi.org/v1/articles?source=" + source +
                "&sortBy=latest&apiKey=" + os.environ["NEWS_API_KEY"]).json()
        if 'articles' in res.keys():
            scrape_articles(res['articles'], conn)
        else:
            print "Non recent-resource:"
            res = req.get("https://newsapi.org/v1/articles?source=" + source +
                    "&apiKey=" + os.environ["NEWS_API_KEY"]).json()
            scrape_articles(res['articles'], conn)
    
    print "Sleeping for 2 minutes before checking again."
    time.sleep(60 * 2)

def scrape_articles(articles, conn):
    for article in articles:
        url = article['url']
        title = article['title']
        if conn.execute("select * from articles where url = ?", [url]).fetchone() is  None:
            print "Recording article: " + title
            if 'publishedAt' in article.keys() and article['publishedAt'] != None:
                #print article['publishedAt']
                date_str = date_parser.parse(article['publishedAt']).strftime("%Y-%m-%d %H:%M")
            else:
                date_str = ""
            hashed_url = hashlib.md5(url).hexdigest()

            # TODO handle 503s and log them 
            try: 
                page = urllib2.urlopen(url)
            except urllib2.HTTPError as err:
                print "HTTP exception: Skipping article"
                return

            # Corresponds with SOLR id, decided to keep an integer ID colum because the SOLR documentation
            # highly reccomends it (read the schema file and it has a note on this)
            try:
                latest_id = conn.execute("select id from articles order by id desc limit 1;").fetchone()[0]
                latest_id += 1 
            except TypeError:
                # Handle first article
                latest_id = 1

            res = get_sentiment(url)

            # column names: id, hash, url, title, description, published, solr_enabled, anger, joy
            # fear, sadness, disgust
            data = [latest_id, 
                    hashed_url, 
                    url, 
                    article['title'], 
                    article['description'], 
                    date_str, 
                    "0",
                    res['anger'],
                    res['joy'],
                    res['fear'],
                    res['sadness'],
                    res['disgust']]
    
            conn.execute("insert into articles values (?,?,?,?,?,?,?,?,?,?,?,?)", data)
            conn.commit()
            with open(OUTPUT_DIR + hashed_url + ".html", 'w') as f:
                f.write(page.read())

def get_sentiment(url):
    key=os.environ['ALCHEMY_KEY']
    alchemy_language = AlchemyLanguageV1(api_key=key)
    try:
        raw_res = alchemy_language.emotion(url=url)
    except Exception:
        return {'anger': '', 'fear': '', 'joy': '', 'sadness': '', 'disgust': ''}
    return raw_res['docEmotions']

#CREATE TABLE articles(id int primary key not null, hash string unique, url string non null, title string non null, description string non null, published date, solr_enabled boolean, anger float, joy float, fear float, sadness float, disgust float);


def write_data():
    conn = sqlite3.connect('articles.db')
    raw_json = build_data()
    with open(DATA_DIR + "data-" + data_num + ".json") as f:
        f.write(raw_json)

# Sketchy method to get the data into the non json-rfc format ibm requests
def build_data(conn):
    conn.row_factory = dict_factory
    cur = conn.cursor()
    data = []
    for row in cur.execute("select * from articles where solr_enabled=0"):
        print row['id']
        data.append(('add', 
            { "doc": {
                "id": row['id'],
                "url": row['url'],
                "body": extract_body(row['id'], conn),
                "title": row['title']}}))
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
    while True:
        main()

# TODO 
# Create a collection for RAR
# Add different data sources 
# Add 'collections' column to articles to map new source to a different collection 
