from urllib.request import urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import re

def findAll(url, tag, props):
    try:
        html = urlopen(url)
    except HTTPError as e:
        return None
    try:
        bsObj = BeautifulSoup(html.read(), "html.parser")
        list = bsObj.findAll(tag, props)
    except AttributeError as e:
        return None
    return list

def findTableRows(url, props, stripTitle):
    try:
        html = urlopen(url)
    except HTTPError as e:
        return None
    try:
        bsObj = BeautifulSoup(html.read(), "html.parser")
        if stripTitle == "true":
            children = bsObj.find("table", props).tr.next_siblings
        else:
            children = bsObj.find("table", props).children
    except AttributeError as e:
        return None
    return children


productImages = findAll("http://www.pythonscraping.com/pages/page3.html", "img", {"src": re.compile("\.\.\/img\/gifts/img.*\.jpg")})

if productImages == None:
    print("No product Images found")
else:
    for productImage in productImages:
        print(productImage["src"])
    print("----")
