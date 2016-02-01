from urllib.request import urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import re

pages = set()

def getWikipediaArticleLinks(url):
    html = urlopen("https://en.wikipedia.org" + url)
    bsObj = BeautifulSoup(html.read(), "html.parser")
    for link in bsObj.findAll("a", href=re.compile("^(/wiki/)")):
        if "href" in link.attrs:
            if link.attrs["href"] not in pages:
                newPage = link.attrs["href"]
                print(newPage)
                pages.add(newPage)
                getWikipediaArticleLinks(newPage)

getWikipediaArticleLinks("")

