fiddle-0008-WikipediaScrapy
======

### Title

fiddle-0008-WikipediaScrapy


### Creation Date

02-13-16


### Location

Chicago, IL


### Description

Python fiddle exploring the scrapy web crawler example discussed in Chapter 3 of Ryan Mitchell's book,
**Web Scraping with Python**.


### Dependencies

1. [Scrapy](http://doc.scrapy.org/en/latest/intro/install.html)
    * Alternately, checkout [fiddles/bash/fiddle-0055-InstallScrapy](../../fiddles/bash/fiddle-0055-InstallScrapy)
2. [NPM Live Server](https://www.npmjs.com/package/live-server)
    * Alternately, checkout [fiddles/bash/fiddle-0056-InstallLiveServer](../../fiddles/bash/fiddle-0056-InstallLiveServer)


### Functional Use Case

Navigate to the "wikiSpider" sub-directory and execute the following commands:

        scrapy crawl dmoz -o items.json
        live-server



### Tags

python
