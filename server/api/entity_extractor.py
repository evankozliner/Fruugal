from nltk import ne_chunk, pos_tag, word_tokenize
from nltk.tree import Tree
import pandas as pd
import sys, json
if sys.version_info[0] >= 3:
    from urllib.request import urlopen
else:
    # Not Python 3 - today, it is most likely to be Python 2
    # But note that this might need an update when Python 4
    # might be around one day
    from urllib import urlopen

exception = pd.Series(['my', 'am', 'stock', 'price', 'i', 'want', 'info', 'information','today','now', 'purchase', 'sell', 'on', 'a', 'good', 'buy', 'price', 'is', 'should', 'got', 'how', 'to', 'trade', 'bad', 'what', 'it', 'of', 'do', 'with','info'])

def fix_string(sentence):
    retStr = ""
    new_sentence = sentence.lower()
    tokens = word_tokenize(new_sentence)
    pos_tags = pos_tag(tokens)
    initial_chunks = ne_chunk(pos_tags, binary=True)
    for chunk in initial_chunks:
        # check if the chunk is a tree
        if type(chunk) == Tree:
            for leaf in chunk.leaves():
                if leaf[1] == "NN" and leaf[0] not in exception.values:
                    retStr += leaf[0].title()
                else:
                    retStr += leaf[0]
                retStr += " "
        elif chunk:
            if chunk[1] == "NN" and chunk[0] not in exception.values:
                retStr += chunk[0].title()
            else:
                retStr += chunk[0]
            retStr += " "
    return retStr

# TODO use our local csv for these methods
def is_a_ticker(ticker):
    ticker = ticker.upper()
    url = 'http://finance.yahoo.com/d/quotes.csv?s=%s&f=%s' % (ticker, 'n')
    response = urlopen(url)
    content = response.read().decode().strip().strip('"')
    return True if content != 'N/A' else False

def is_a_major_exchange_ticker(ticker):
    ticker = ticker.upper()
    url = 'http://finance.yahoo.com/d/quotes.csv?s=%s&f=%s' % (ticker, 'x')
    response = urlopen(url)
    content = response.read().decode().strip().strip('"')
    return True if content == 'NMS' or content == 'NYQ' or content == 'NSQ' else False

def check_chunks_for_symbol(initial_chunks):
    #check for symbol
    found_symbol = ""
    for chunk in initial_chunks:
        if found_symbol and found_symbol[1] == 1:
            break
        # check if the chunk is a tree
        if type(chunk) == Tree:
            for leaf in chunk.leaves():
                if (leaf[1] == "NNP" or leaf[1] == "PDT" or leaf[1] == "NNPS") and is_a_ticker(leaf[0]):
                    if (is_a_major_exchange_ticker(leaf[0])):
                        found_symbol = [leaf[0], 1]
                    else:
                        found_symbol = [leaf[0], 0]
        elif chunk:
            if chunk[1] == "NNP" and is_a_ticker(chunk[0]):
                if (is_a_major_exchange_ticker(chunk[0])):
                    found_symbol = [chunk[0], 1]
                else:
                    found_symbol = [chunk[0], 0]
    return found_symbol

def check_chunks_for_name(initial_chunks):
    #check for found
    found_name = ""
    for chunk in initial_chunks:
        # check if the chunk is a tree
        if type(chunk) == Tree:
            for leaf in chunk.leaves():
                if (leaf[1] == "NNP" or leaf[1] == "NNPS"):
                    found_name += leaf[0]
                    found_name += " "
            if (found_name != ""):
                return found_name
        elif chunk:
            if chunk[1] == "NNP":
                found_name += chunk[0]
                return found_name

    for chunk in initial_chunks:
        # check if the chunk is a tree
        if type(chunk) == Tree:
            for leaf in chunk.leaves():
                if (leaf[1] == "NN" or leaf[1] == "NNS"):
                    found_name += leaf[0]
                    found_name += " "
            if (found_name != ""):
                return found_name
        elif chunk:
            if chunk[1] == "NN":
                found_name += chunk[0]
                return found_name

    return found_name

def get_ticker_fix(chunks):
    minor_chunk = ""
    for chunk in chunks:
        if chunk in exception.values:
            continue
        if is_a_major_exchange_ticker(chunk):
            return chunk
        elif is_a_ticker(chunk):
            minor_chunk = chunk
    return minor_chunk

def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():

    #get our data as an array from read_in()
    lines = read_in()

    sentence = lines
    #sentence = "Should I sell my netflix stock";
    #tokens = word_tokenize(sentence)
    #pos_tags = pos_tag(tokens)
    #initial_chunks = ne_chunk(pos_tags, binary=True)

    ticker_response = get_ticker_fix(sentence.lower().split( ))

    #ticker_response = check_chunks_for_symbol(initial_chunks)
    #company_name_response = check_chunks_for_name(ne_chunk(pos_tag(word_tokenize(fix_string(sentence))), binary = True))

    print(ticker_response)

#start process
if __name__ == '__main__':
    main()