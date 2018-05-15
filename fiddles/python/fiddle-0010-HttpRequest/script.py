import os
import urllib2
import json



def main():
    r = urllib2.urlopen("https://bradyhouse.github.io/stockQuote/assets/json/intraday.json").read()
    data = json.loads(r)
    print (data)

main()
os._exit(1)
