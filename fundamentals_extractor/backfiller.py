import os
import datetime as dt
import json
from BalanceSheetDataExtractor import BalanceSheetDataExtractor
import string

DATA_DIR = "ScraXBRL/data/extracted_data/"
DATE_FORMAT = '%Y-%m-%d'
ARCHIVE_DIR = 'fundamentals/'


def main(limit=True, letter="Z"):
    """ Builds a JSON file of stock fundamentals data starting with 'letter' if limit is true
        otherwise creates JSON file of all existing fundamentals data
    """
    final_data_hash = {}
    for ticker in os.listdir(DATA_DIR):
        if not limit or ticker[0] == letter:
            print ticker
            date = get_earliest_date(ticker)
            if date is not None:
                extractor = BalanceSheetDataExtractor(ticker, date)
                final_data_hash[ticker] = extractor.balance_sheet_data.to_json(date_unit='s')

    fname = letter if limit else "all"
    data_file = ARCHIVE_DIR + fname + ".json"
    remove_if_exists(data_file)
    with open(data_file, 'w+') as f:
        json.dump(final_data_hash, f)

def remove_if_exists(fname):
    try:
        os.remove(fname)
    except OSError:
        pass

def get_earliest_date(ticker):
    dates = []
    for report in ["10-K", "10-Q"]:
        try: 
            path = DATA_DIR + ticker + "/" + report + "/xml/"
            for date in os.listdir(path):
                dates.append(dt.datetime.strptime(date, DATE_FORMAT))
        except OSError: 
            print "No " + report + " report for ticker " + ticker
    if len(dates) == 0: 
        return None

    # Data extractor needs string format
    return dt.datetime.strftime(min(dates), DATE_FORMAT)

if __name__ == "__main__":
    for s in [e for e in string.ascii_uppercase if e not in ['A', 'B']]:
        main(letter=s)
