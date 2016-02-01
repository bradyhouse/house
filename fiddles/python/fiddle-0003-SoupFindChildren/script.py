from urllib.request import urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup

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



products = findTableRows("http://www.pythonscraping.com/pages/page3.html", {"id": "giftList"}, "true")

if products == None:
    print("No products found")
else:
    for product in products:
        print(product)
    print("----")
