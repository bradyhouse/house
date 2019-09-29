fiddle-0031-SpawnProcess
======

### Title <a name="title"></a>

Spawn Process


### Creation Date<a name="creation-date"></a>

04-05-19


### Location<a name="location"></a>

Chicago, IL


### Issue<a name="issue"></a>

[Issue 301](https://github.com/bradyhouse/house/issues/301)


### Description<a name="description"></a>

What's possible in node by itself?  What is its core? Lets start with the `child_process` spawn function. Specifically,
can spawn be used to see contents of the running script (reflection)? Yup, `riddle me a fiddle`.


### Use Case<a name="use-case"></a>

1.  Startup the service `npm start`
2.  This should produce following on output on the command line --
      
          const spawn = require('child_process').spawn,
            clear = spawn('clear'),
            reflect = spawn('cat',['app.js']);
          
          clear.stdout.pipe(process.stdout);
          reflect.stdout.pipe(process.stdout);
      

### Tags<a name="tags"></a>

node.js, child_process, spawn
