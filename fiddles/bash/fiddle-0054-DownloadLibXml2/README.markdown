fiddle-0054-DownloadLibXml2
======

### Title

Install Scrapy


### Creation Date

02-01-16


### Location

Chicago, IL


### Description

Shell script for downloading [libxml2](http://xmlsoft.org/sources/) using curl.  Once downloaded, use the following
procedure to install the library:

    $ cd libxml2-2.7.2
    $ ./configure --with-python=$(which python)
    $ make
    $ sudo make install

Note, this library is needed to use the [scrapy](scrapy.org) python library.


### Tags

bash, curl, libxml2-2.7.2


### Forked From

[fiddle-0052-InstallBeautifulSoup](../fiddle-0052-InstallBeautifulSoup)
