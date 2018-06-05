angular2-cli (create)
======

Executing the command `./fiddle.sh "create" "angular2-cli" "fiddle-0000-Template"` produces the following output.

    {{ ʕ・ɭ・ʔ }}
    FIDDLE.SH
    FIDDLE-DELETE.SH
    
    fiddle type:	angular2-cli
    fiddle name:	fiddle-0000-Template
    
    Are you sure you want to delete this fiddle? [Y/n] Y
    The "fiddle-0000-Template" angular2-cli fiddle has been deleted successfully.
    FIDDLE-CREATE.SH
    FIDDLE-CREATE.SH
    Bash version 3.2.57(1)-release...
    06-05-18
    ├────NVMINSTALL
    v8.1.0 is already installed.
    Now using node v8.1.0 (npm v5.0.3)
    ├────NGINSTALL
    
    {{ ʕ・ɭ・ʔ }}
    FIDDLE.SH
    ├────SETUP
    ├────INSTALL
    ├────UNINSTALLNG
    removed 1 package in 0.067s
    ├────INSTALLNG
    /Users/bradyhouse/.nvm/versions/node/v8.1.0/bin/ng -> /Users/bradyhouse/.nvm/versions/node/v8.1.0/lib/node_modules/@angular/cli/bin/ng
    
    > fsevents@1.2.4 install /Users/bradyhouse/.nvm/versions/node/v8.1.0/lib/node_modules/@angular/cli/node_modules/fsevents
    > node install
    
    [fsevents] Success: "/Users/bradyhouse/.nvm/versions/node/v8.1.0/lib/node_modules/@angular/cli/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" already installed
    Pass --update-binary to reinstall or --build-from-source to recompile
    
    > @angular/cli@6.0.7 postinstall /Users/bradyhouse/.nvm/versions/node/v8.1.0/lib/node_modules/@angular/cli
    > node ./bin/ng-update-message.js
    
    + @angular/cli@6.0.7
    added 314 packages in 15.368s
    ├────CONFIGNG
    You are running version v8.1.0 of Node.js, which is not supported by Angular CLI v6.
    The official Node.js version that is supported is 8.9 and greater.
    
    Please visit https://nodejs.org/en/ to find instructions on how to update Node.js.
    └──FOO-BAR! SOMETHING WENT WRONG.
    
    ├────FUBAR! SOMETHING WENT WRONG.
    fubar! Something went wrong.
    └──NVMINSTALL: CALL TO NVM INSTALL V8.1.0 FAILED.
    
    fubar! Something went wrong.
    fubar! Something went wrong.
    ➜  scripts git:(230_update_and_shrinkwrap) ✗ ./fiddle.sh "create" "angular2-cli" "fiddle-0000-Template"
    
    {{ ʕ・ɭ・ʔ }}
    FIDDLE.SH
    FIDDLE-DELETE.SH
    
    FIDDLE-CREATE.SH
    FIDDLE-CREATE.SH
    Bash version 3.2.57(1)-release...
    06-05-18
    ├────NVMINSTALL
    v8.9.4 is already installed.
    Now using node v8.9.4 (npm v5.6.0)
    ├────NGINSTALL
    ├────NGCREATE
    CREATE fiddle-0000-Template/README.md (1023 bytes)
    CREATE fiddle-0000-Template/angular.json (3404 bytes)
    CREATE fiddle-0000-Template/package.json (1310 bytes)
    CREATE fiddle-0000-Template/tsconfig.json (384 bytes)
    CREATE fiddle-0000-Template/tslint.json (2805 bytes)
    CREATE fiddle-0000-Template/.editorconfig (245 bytes)
    CREATE fiddle-0000-Template/.gitignore (503 bytes)
    CREATE fiddle-0000-Template/src/environments/environment.prod.ts (51 bytes)
    CREATE fiddle-0000-Template/src/environments/environment.ts (631 bytes)
    CREATE fiddle-0000-Template/src/favicon.ico (5430 bytes)
    CREATE fiddle-0000-Template/src/index.html (293 bytes)
    CREATE fiddle-0000-Template/src/main.ts (370 bytes)
    CREATE fiddle-0000-Template/src/polyfills.ts (3194 bytes)
    CREATE fiddle-0000-Template/src/test.ts (642 bytes)
    CREATE fiddle-0000-Template/src/assets/.gitkeep (0 bytes)
    CREATE fiddle-0000-Template/src/styles.css (80 bytes)
    CREATE fiddle-0000-Template/src/browserslist (375 bytes)
    CREATE fiddle-0000-Template/src/karma.conf.js (964 bytes)
    CREATE fiddle-0000-Template/src/tsconfig.app.json (194 bytes)
    CREATE fiddle-0000-Template/src/tsconfig.spec.json (282 bytes)
    CREATE fiddle-0000-Template/src/tslint.json (314 bytes)
    CREATE fiddle-0000-Template/src/app/app.module.ts (314 bytes)
    CREATE fiddle-0000-Template/src/app/app.component.css (0 bytes)
    CREATE fiddle-0000-Template/src/app/app.component.html (1141 bytes)
    CREATE fiddle-0000-Template/src/app/app.component.spec.ts (989 bytes)
    CREATE fiddle-0000-Template/src/app/app.component.ts (207 bytes)
    CREATE fiddle-0000-Template/e2e/protractor.conf.js (752 bytes)
    CREATE fiddle-0000-Template/e2e/src/app.e2e-spec.ts (299 bytes)
        Directory is already under version control. Skipping initialization of git.
    ├────CREATETYPINGSRCFILE
    └──
    
    └──".FIDDLES/ANGULAR2-CLI/FIDDLE-0000-TEMPLATE" CREATED.
    
    
    FIDDLE-INDEX.SH
    06-05-18
    Done. All "angular2-cli" fiddles have been re-indexed.
 

### Additional Info

[Angular2-cli](../angular2-cli) fiddles are created using the [angular 2 CLI](https://cli.angular.io/) -- aka _ng create_. The create logic baked 
into the [fiddle.sh](../../scripts/fiddle.sh) script is based on [bash fiddle #76](../bash/fiddle-0076-Angular2CLI).  This means the [fiddle.sh](../../scripts/fiddle.sh) 
script provides some wrapper logic that integrates this CLI.
    
