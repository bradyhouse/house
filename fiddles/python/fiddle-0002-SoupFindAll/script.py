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

nameList = findAll("http://www.pythonscraping.com/pages/warandpeace.html", "span", {"class": "green"})

if nameList == None:
    print("Nothing found matching the specified criteria")
else:
    for name in nameList:
        print(name.get_text())
    print("----")
    print(len(nameList))
