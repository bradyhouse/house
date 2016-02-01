from urllib.request import urlopen
from urllib.parse import urlparse
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import re
import random

pages = set()

def getInternalLinks(bsObj, includeUrl):
    internalLinks = []
    for link in bsObj.findAll("a", href = re.compile("^(\/|.*(http:\/\/" + includeUrl +")).*")):
        if link.attrs["href"] is not None:
            if link.attrs["href"] not in internalLinks:
                internalLinks.append(link.attrs["href"])
                return internalLinks

def getExternalLinks(bsObj, url):
    excludeUrl = getDomain(url)
    externalLinks = []
    for link in bsObj.findAll("a", href=re.compile("^(http)((?!" + excludeUrl + ").)*$")):
        if link.attrs["href"] is not None and len(link.attrs["href"]) != 0:
            if link.attrs["href"] not in externalLinks:
                externalLinks.append(link.attrs["href"])
                return externalLinks

def getDomain(address):
    return urlparse(address).netloc

def followExternalOnly(bsObj, url):
    externalLinks = getExternalLinks(bsObj, url)
    if len(externalLinks) == 0:
        print("Only internal links here.  Try again.")
        internalLinks = getInternalLinks(bsObj, getDomain(url))
        randInternalLink = "http://" + getDomain(url)
        randInternalLink += internalLinks[random.randint(0, len(internalLinks) - 1)]
        bsObj = BeautifulSoup(urlopen(randInternalLink), "html.parser")
        followExternalOnly(bsObj, randInternalLink)
    else:
        randomExternal = externalLinks[random.randint(0, len(externalLinks) - 1)]
        try:
            nextBsObj = BeautifulSoup(urlopen(randomExternal), "html.parser")
            print(randomExternal)
            followExternalOnly(nextBsObj, randomExternal)
        except HTTPError:
            print("Encountered error at" + randomExternal + "! Trying again")
            followExternalOnly(bsObj, url)

url = "http://oreilly.com"
bsObj = BeautifulSoup(urlopen(url), "html.parser")
followExternalOnly(bsObj, url)
