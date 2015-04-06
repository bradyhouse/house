fiddles
=====

![Screenshot](screenshot.png)

Root fiddle collection directory. To startup the included node.js web server from this directory, use the following command:
    
    ➜  house git:(master) ✗ cd scripts
    ➜  scripts git:(master) ✗ ./fiddle-start.sh "all"
    
    
This should produce the following output:

    FIDDLE-START.SH
    v0.11.14-pre
    http://localhost:8889 ~ is dead.
    node file server started @ http://localhost:8889
    A Node.js file server has been started for all fiddles.
    
    appending output to nohup.out
    
To stop the web server, use following command:
    
    ➜  scripts git:(master) ✗ ./fiddle-stop.sh

This should produce the following output:

    FIDDLE-STOP.SH
    http://localhost:8889 ~ is dead.



