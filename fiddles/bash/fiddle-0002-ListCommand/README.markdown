fiddle-0002-ListCommand
======

### Title

Variations on _ls_


### Creation Date

06-23-15


### Location

Chicago, IL


### Description

Shell script aimed at table 3-2 of the 4th edition of Jason Eckert's book <b>Linux+ Guide to Linux
Certification (ISBN: 978-1-305-10716-8)</b>. This table list all of the parameter supported by the
linux "ls" command.  This script attempts exercise them all for specified directory.


### Tags

bash, ls

### STDOUT

    ./script.sh $(pwd)

    ls -a ... # List All files

    .
    ..
    README.markdown
    script.log
    script.sh

    ls -A ... # List Almost all files everything but ('.' or '..')

    README.markdown
    script.log
    script.sh

    ls -C ... # list in column format

    README.markdown	script.log	script.sh

    ls -d ... # list directories

    /Users/root/github/house/fiddles/bash/fiddle-0002-ListCommand

    ls -f ... # list file names

    .
    ..
    README.markdown
    script.log
    script.sh

    ls -F ... # list file names classified by file type

    README.markdown
    script.log
    script.sh*

    ls -l ... # list filenames in long format
    total 24
    -rw-r--r--  1 root  domain users   470 Jun 23 19:01 README.markdown
    -rw-r--r--  1 root  domain users   547 Jun 24 15:33 script.log
    -rwxr-xr-x  1 root  domain users  2743 Jun 24 08:28 script.sh

    ls -lh ... # list filenames with human readable file sizes

    total 24
    -rw-r--r--  1 root  domain users   470B Jun 23 19:01 README.markdown
    -rw-r--r--  1 root  domain users   816B Jun 24 15:33 script.log
    -rwxr-xr-x  1 root  domain users   2.7K Jun 24 08:28 script.sh

    ls -lG ... # long format without group information

    total 24
    -rw-r--r--  1 root  domain users   470 Jun 23 19:01 README.markdown
    -rw-r--r--  1 root  domain users  1080 Jun 24 15:33 script.log
    -rwxr-xr-x  1 root  domain users  2743 Jun 24 08:28 script.sh

    ls -r ... # list reverse sorted

    script.sh
    script.log
    README.markdown

    ls -R ... # list recursively

    README.markdown
    script.log
    script.sh

    ls -s ... # list file size in kilobytes

    total 24
    8 README.markdown
    8 script.log
    8 script.sh

    ls -S ... # list files sorted by size

    script.sh
    script.log
    README.markdown

    ls -t ... # list files sorted by modification time

    script.log
    script.sh
    README.markdown

    ls -U ... # list file names without sorting

    README.markdown
    script.log
    script.sh

    ls -x ... # list filenames in rows rather than in columns

    README.markdown	script.log	script.sh
