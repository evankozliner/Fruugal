#!flask/bin/python

from flask import Flask
from flask import jsonify
from BalanceSheetDataExtractor import BalanceSheetDataExtractor
import ScraXBRL.DataViewer as dv
import os
import datetime

app = Flask(__name__)

DATE_FORMAT = '%Y-%m-%d'
DIVIDEND_INDICATOR = 'ShareholdersEquitySummaryOfDividendsDeclaredAndPaidDetail'
DIVIDENDS_KEY = 'CommonStockDividendsPerShareDeclared'

# Gets the latest divdends for a company
@app.route('/dividends/<ticker>')
def dividends(ticker):
    date, sheet_type = get_latest_balance_sheet(ticker)
    company = dv.DataView(ticker, date, sheet_type)
    if DIVIDEND_INDICATOR in company.data['pre']['roles']:
        return jsonify(extract_dividends(company))

    return "This company either does not provide dividends, or we could not find their dividend information.\n"

@app.route('/balance_sheet/<ticker>')
def balance_sheet(ticker):


def extract_dividends(company):
        dividends_data = company.data['pre']['roles'][DIVIDEND_INDICATOR]\
                ['tree']['EquityAbstract']['sub'][DIVIDENDS_KEY]['val']
        return [ [k[0] + "," + k[1], dividends_data[k]] for k in dividends_data ]

def get_latest_balance_sheet(ticker):
    """ Returns the latest balance sheet string and what kind of balance sheet it is."""
    K_data_path = 'data/extracted_data/' + ticker + '/10-K/xml'
    Q_data_path = 'data/extracted_data/' + ticker + '/10-Q/xml'
    K_date, K_date_str = get_latest_date_by_path(K_data_path)
    Q_date, Q_date_str = get_latest_date_by_path(Q_data_path)

    # 10-Q appears to be essentially the 4th 10-K
    if K_date > Q_date:
        return K_date_str, '10-K'
    return Q_date_str, '10-Q'

def get_latest_date_by_path(path):
    dates = os.listdir(path)
    dates = [datetime.datetime.strptime(date, DATE_FORMAT) for date in dates]
    latest_date = sorted(dates)[-1]
    return latest_date, latest_date.strftime(DATE_FORMAT)

if __name__ == '__main__':
    app.run()
