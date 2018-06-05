Angular2 CLI (update all)
======

Executing the command `./fiddle.sh "update" "angular2-cli"` produces the following output 
(see below).  This command, is used to update the dependencies of all fiddles in the angular-cli collection. 

       {{ ʕ・ɭ・ʔ }}
        FIDDLE.SH
        ├────UPDATEFIDDLE
        ├────UPDATE
        ├────NVMINSTALL
        v8.9.4 is already installed.
        Now using node v8.9.4 (npm v5.6.0)
        ├────NCUINSTALL
        ├────RMNODEMODULES
        ├────RMPACKAGELOCK
        ├────NPMCHECKUPDATES
        Using /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0000-Template/package.json
        ⸨░░░░░░░░░░░░░░░░░░⸩ ⠇ :
         @angular-devkit/build-angular      ~0.6.5  →  ~0.7.0-beta.1
         typescript                         ~2.7.2  →         ~2.9.1
         @types/node                        ~8.9.4  →        ~10.3.1
         codelyzer                          ~4.2.1  →         ~4.3.0
         jasmine-core                      ~2.99.1  →         ~3.1.0
         karma                              ~1.7.1  →         ~2.0.2
         karma-coverage-istanbul-reporter   ~1.4.2  →         ~2.0.1
         karma-jasmine-html-reporter        ^0.2.2  →         ^1.1.0
         ts-node                            ~5.0.1  →         ~6.1.0
         tslint                             ~5.9.1  →        ~5.10.0
         core-js         ^2.5.4  →  ^2.5.7
         rxjs            ^6.0.0  →  ^6.2.0
         @angular/cli    ~6.0.5  →  ~6.0.7
         @types/jasmine  ~2.8.6  →  ~2.8.8
         karma-jasmine   ~1.1.1  →  ~1.1.2
         protractor      ~5.3.0  →  ~5.3.2
        Upgraded /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0000-Template/package.json
        
        ├────REVERTTYPESCRIPT
        npm WARN deprecated nodemailer@2.7.2: All versions below 4.0.1 of Nodemailer are deprecated. See https://nodemailer.com/status/
        npm WARN deprecated socks@1.1.9: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        npm WARN deprecated mailcomposer@4.0.1: This project is unmaintained
        npm WARN deprecated uws@9.14.0: stop using this version
        npm WARN deprecated buildmail@4.0.1: This project is unmaintained
        npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
        npm WARN deprecated socks@1.1.10: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        WARN notice [SECURITY] timespan has the following vulnerability: 1 low. Go here for more details: https://nodesecurity.io/advisories?search=timespan&version=2.3.0 - Run `npm i npm@latest -g` to upgrade your npm version, and then `npm audit` to get more info.
        WARN notice [SECURITY] tunnel-agent has the following vulnerability: 1 moderate. Go here for more details: https://nodesecurity.io/advisories?search=tunnel-agent&version=0.4.3 - Run `npm i npm@latest -g` to upgrade your npm version, and then `npm audit` to get more info.
        WARN notice [SECURITY] hoek has the following vulnerability: 1 moderate. Go here for more details: https://nodesecurity.io/advisories?search=hoek&version=2.16.3 - Run `npm i npm@latest -g` to upgrade your npm version, and then `npm audit` to get more info.
        
        > fsevents@1.2.4 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0000-Template/node_modules/fsevents
        > node install
        
        [fsevents] Success: "/Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0000-Template/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" already installed
        Pass --update-binary to reinstall or --build-from-source to recompile
        
        > uws@9.14.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0000-Template/node_modules/uws
        > node-gyp rebuild > build_log.txt 2>&1 || exit 0
        
        
        > node-sass@4.9.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0000-Template/node_modules/node-sass
        > node scripts/install.js
        
        Cached binary found at /Users/bradyhouse/.npm/node-sass/4.9.0/darwin-x64-57_binding.node
        
        > node-sass@4.9.0 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0000-Template/node_modules/node-sass
        > node scripts/build.js
        
        Binary found at /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0000-Template/node_modules/node-sass/vendor/darwin-x64-57/binding.node
        Testing binary
        Binary is fine
        
        > @angular/cli@6.0.7 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0000-Template/node_modules/@angular/cli
        > node ./bin/ng-update-message.js
        
        npm notice created a lockfile as package-lock.json. You should commit this file.
        npm WARN @angular/compiler-cli@6.0.3 requires a peer of typescript@>=2.7.2 <2.8 but none is installed. You must install peer dependencies yourself.
        npm WARN karma-jasmine-html-reporter@1.1.0 requires a peer of jasmine@>=3 but none is installed. You must install peer dependencies yourself.
        npm WARN tslint@5.10.0 requires a peer of typescript@>=2.1.0 || >=2.1.0-dev || >=2.2.0-dev || >=2.3.0-dev || >=2.4.0-dev || >=2.5.0-dev || >=2.6.0-dev || >=2.7.0-dev || >=2.8.0-dev || >=2.9.0-dev but none is installed. You must install peer dependencies yourself.
        npm WARN @ngtools/webpack@6.1.0-beta.1 requires a peer of typescript@~2.4.0 || ~2.5.0 || ~2.6.0 || ~2.7.0 but none is installed. You must install peer dependencies yourself.
        npm WARN tsickle@0.27.5 requires a peer of typescript@>=2.4.2 <2.8 but none is installed. You must install peer dependencies yourself.
        npm WARN tsutils@2.27.1 requires a peer of typescript@>=2.1.0 || >=2.1.0-dev || >=2.2.0-dev || >=2.3.0-dev || >=2.4.0-dev || >=2.5.0-dev || >=2.6.0-dev || >=2.7.0-dev || >=2.8.0-dev || >=2.9.0-dev || >= 3.0.0-dev but none is installed. You must install peer dependencies yourself.
        
        added 1225 packages in 58.779s
        npm WARN karma-jasmine-html-reporter@1.1.0 requires a peer of jasmine@>=3 but none is installed. You must install peer dependencies yourself.
        
        + typescript@2.7.2
        added 1 package in 8.862s
        ├────UPDATEANGULARCLI
                    Found a modern configuration file. Nothing to be done.
        └──UPDATE COMPLETE.
        
        ...
    
    
