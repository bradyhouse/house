fiddle-0032-FileSystemWatch
======

### Title<a name="title"></a>

File System Watch


### Creation Date<a name="creation-date"></a>

04-06-19


### Location<a name="location"></a>

Chicago, IL


### Issue<a name="issue"></a>

[Issue 301](https://github.com/bradyhouse/house/issues/301)


### Description<a name="description"></a>

How do you create a simple file watcher using node?


### Use Case<a name="use-case"></a>

1.  Using one console, enter the command `npm start`
2.  Using a second console, enter the command `echo "hello father" >> file.txt`
3.  This should produce the following output in the first

      total 32
      -rw-r--r--  1 bradyhouse  staff   706B Apr  7 08:33 README.md
      -rwxr-xr-x  1 bradyhouse  staff   650B Apr  7 08:44 app.js
      -rw-r--r--  1 bradyhouse  staff    13B Apr  7 08:44 file.txt
      -rw-r--r--  1 bradyhouse  staff   359B Apr  6 18:16 package.json    


### Tags<a name="tags"></a>

node.js, hamony, process, argv, fs, child_process, spawn
