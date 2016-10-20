fiddle-0021-DirectoryWatcher
======

### Title

Directory Watcher


### Creation Date

10-04-16


### Location

Chicago, IL


### Issue

[Issue #82](https://github.com/bradyhouse/house/issues/82)


### Description

POC exploring the integration of the following `npm` packages:

*   [watchdirectory](https://www.npmjs.com/package/watchdirectory)
*   [file-move](https://www.npmjs.com/package/file-move)
*   [verify-path](https://www.npmjs.com/package/verify-path)
*   [npmlog](https://www.npmjs.com/package/npmlog)
*   [cluster](https://www.npmjs.com/package/cluster)
*   [moment](https://www.npmjs.com/package/moment)
*   [create-file](https://www.npmjs.com/package/create-file)
*   [jfile](https://www.npmjs.com/package/jfile)


#### System Use Case

1.  app starts
2.  app verifies the configured watch directory exists
3.  app verifies the configured archive directory exists
4.  app determines the current system date
5.  app processes all files in the root watch directory, sub-directories are ignored
    *   app verifies the archive contains a sub-directory, `YYYYMMDD`, for the current system date
    *   app verifies the `archive/YYYYMMDD/{type}` directories contains a sub-directory for each file type found
    *   app moves the file based on extension to the appropriate `archive/YYYYMMDD` sub-directory
    *   app adds the new path of file to the `archive/index.adoc` file
6.  User saves a file to the `watch` directory
7.  Step 5 repeats


### Procedure

#### Local Configuration

*   Update the `config/directories.js` file with the target archive and watch directories.  Note, 
    if the archive directory does not exist, then app will create it.
    

#### Startup using fiddle.sh

1.  navigate to the `scripts` directory
2.  execute the command `./fiddle.sh "start" "node" "0021"`.  If successful, this should produce
    the following output:
    
        H o u s e
        oooooooooooo  o8o        .o8        .o8  oooo
         888       8  `"'        888        888   888
         888         oooo   .oooo888   .oooo888   888   .ooooo.
         888oooo8     888  d88   888  d88   888   888  d88   88b
         888          888  888   888  888   888   888  888ooo888
         888          888  888   888  888   888   888  888    .o
        o888o        o888o  Y8bod88P   Y8bod88P  o888o  Y8bod8P
        
        FIDDLE.SH
        FIDDLE-START.SH
        ├────STARTSERVER
        npm WARN deprecated safe-write-file@1.1.2: use npm output-file instead
        fiddle-0021-DirectoryWatcher@0.0.0 /Users/bradyhouse/github/house/fiddles/node/fiddle-0021-DirectoryWatcher
        ├─┬ cluster@0.7.7
        │ ├── log@1.4.0
        │ └─┬ mkdirp@0.5.1
        │   └── minimist@0.0.8
        ├─┬ create-file@1.0.1
        │ ├── is-existing-file@1.0.0
        │ └── safe-write-file@1.1.2
        ├── file-move@0.0.3
        ├── jfile@1.1.12
        ├── moment@2.15.1
        ├─┬ npmlog@4.0.0
        │ ├─┬ are-we-there-yet@1.1.2
        │ │ ├── delegates@1.0.0
        │ │ └─┬ readable-stream@2.1.5
        │ │   ├── buffer-shims@1.0.0
        │ │   ├── core-util-is@1.0.2
        │ │   ├── inherits@2.0.3
        │ │   ├── isarray@1.0.0
        │ │   ├── process-nextick-args@1.0.7
        │ │   ├── string_decoder@0.10.31
        │ │   └── util-deprecate@1.0.2
        │ ├── console-control-strings@1.1.0
        │ ├─┬ gauge@2.6.0
        │ │ ├── aproba@1.0.4
        │ │ ├── has-color@0.1.7
        │ │ ├── has-unicode@2.0.1
        │ │ ├── object-assign@4.1.0
        │ │ ├── signal-exit@3.0.1
        │ │ ├─┬ string-width@1.0.2
        │ │ │ ├─┬ code-point-at@1.0.1
        │ │ │ │ └── number-is-nan@1.0.1
        │ │ │ └── is-fullwidth-code-point@1.0.0
        │ │ ├─┬ strip-ansi@3.0.1
        │ │ │ └── ansi-regex@2.0.0
        │ │ └── wide-align@1.1.0
        │ └── set-blocking@2.0.0
        ├── verify-path@1.0.3
        └── watchdirectory@0.1.5
        
        
        > fiddle-0021-DirectoryWatcher@0.0.0 start /Users/bradyhouse/github/house/fiddles/node/fiddle-0021-DirectoryWatcher
        > node --harmony app.js
        
        info 22:11:11 Starting 1 workers...
        info 22:11:12 events > on-archive-start
        info 22:11:12 events > on-create-directory ( /Users/bradyhouse/Desktop/@ )
        info 22:11:12 events > on-create-directory ( /Users/bradyhouse/Desktop/@/2016-10-19 )
        info 22:11:12 events > on-create-index
        info 22:11:12 events > on-watch



### Tags

node.js, hamony, process, argv, fs, verify-path, file-move, watchdirectory, npmlog, moment, cluster, create-file, jfile
