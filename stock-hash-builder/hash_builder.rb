# Reshuffles the others.json and nasdaq.json files into a hash keyed by SYMBOL
# If we want cross-country stocks we'll need to change this key as they can have the same symbols as stocks
# in the US
# 

require 'smarter_csv'
require 'json'

# Fields associated with these files can be found here:
# http://www.nasdaqtrader.com/trader.aspx?id=symboldirdefs

NASDAQ_STOCKS_LIST = "nasdaqlisted.txt"
# Note that this file also contains global markets and NYSEARCA
# but we are ignoring these 
NYSE_AND_NYSEMKT_LIST = "otherlisted.txt"

OUTPUT_FILE_NAME = "master_stock_hash.json"

`rm #{OUTPUT_FILE_NAME}`

# TODO use require for caching this master json 

EXCHANGE_MAPPING = {
  'A': "NYSEMKT",
  'N': "NYSE"
}

def parse_others stock_hash
  records = SmarterCSV.process(NYSE_AND_NYSEMKT_LIST, {col_sep: '|'})
  records.each do |r|
    # Ignore ETFs
    if r[:etf] == "N" && (EXCHANGE_MAPPING.keys.include? r[:exchange].to_sym)
      #stock_key = r[:act_symbol] + ":" + EXCHANGE_MAPPING[r[:exchange].to_sym]
      stock_key = r[:act_symbol] 
      stock_hash[stock_key] = r[:security_name]
    end
  end
  stock_hash
end

def parse_nasdaq stock_hash
  records = SmarterCSV.process(NASDAQ_STOCKS_LIST, {col_sep: '|'})
  records.each do |r|
    if r[:etf] == "N"
      #stock_key = r[:act_symbol] + ":" + "NASDAQ"
      stock_key = r[:symbol] 
      stock_hash[stock_key] = r[:security_name]
    end
  end
  stock_hash
end

sh = parse_others Hash.new
master_stock_hash = parse_nasdaq sh

puts master_stock_hash['GOOG']

File.open(OUTPUT_FILE_NAME, "w") do |f|
  f.write(master_stock_hash.to_json)
end
