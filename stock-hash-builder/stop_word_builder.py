import json
import string

from nltk.corpus import stopwords


stop = list(set(stopwords.words('english')))
exclude = list(string.punctuation)

with open("stopwords.json", "w") as outfile:
    json.dump(stop, outfile)

with open("punctuation.json", "w") as outfile:
    json.dump(exclude, outfile)



