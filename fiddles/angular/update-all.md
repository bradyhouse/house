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
    
        ├────UPDATING FIDDLE-0009-NGSTORECOUNTER ...
        ├────UPDATEFIDDLE
        ├────UPDATE
        ├────NVMINSTALL
        v8.9.4 is already installed.
        Now using node v8.9.4 (npm v5.6.0)
        ├────NCUINSTALL
        ├────SHRINKWRAPINSTALL
        
        {{ ʕ・ɭ・ʔ }}
        
        ├────SETUP
        ├────INSTALL
        ├────IINSTALLSHRINKWRAP
        + shrinkwrap@0.4.0
        updated 1 package in 3.714s
        Done. shrinkwrap installed successfully.
        
        
        ├────RMNODEMODULES
        ├────RMPACKAGELOCK
        ├────NPMCHECKUPDATES
        Using /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0009-NgStoreCounter/package.json
        ⸨░░░░░░░░░░░░░░░░░░⸩ ⠇ :
         @types/jasmine  2.8.7  →  2.8.8
         ts-node         6.0.5  →  6.1.0
         @angular/common                     ^6.0.3  →   ^6.0.4
         @angular/compiler                   ^6.0.3  →   ^6.0.4
         @angular/core                       ^6.0.3  →   ^6.0.4
         @angular/forms                      ^6.0.3  →   ^6.0.4
         @angular/http                       ^6.0.3  →   ^6.0.4
         @angular/platform-browser           ^6.0.3  →   ^6.0.4
         @angular/platform-browser-dynamic   ^6.0.3  →   ^6.0.4
         @angular/router                     ^6.0.3  →   ^6.0.4
         core-js                             ^2.4.1  →   ^2.5.7
         ts-helpers                          ^1.1.1  →   ^1.1.2
         @angular/cli                        ^6.0.7  →   ^6.0.8
         @angular/compiler-cli               ^6.0.3  →   ^6.0.4
         @types/node                        ^10.1.4  →  ^10.3.2
         karma-chrome-launcher               ^2.0.0  →   ^2.2.0
         karma-jasmine                       ^1.0.2  →   ^1.1.2
         typescript                          ^2.7.2  →   ^2.9.1
         @angular-devkit/build-angular       ~0.6.5  →   ~0.6.8
        Upgraded /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0009-NgStoreCounter/package.json
        
        ├────REVERTTYPESCRIPT
        npm WARN deprecated nodemailer@2.7.2: All versions below 4.0.1 of Nodemailer are deprecated. See https://nodemailer.com/status/
        npm WARN deprecated mailcomposer@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.9: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        npm WARN deprecated uws@9.14.0: stop using this version
        npm WARN deprecated gulp-util@3.0.7: gulp-util is deprecated - replace it, following the guidelines at https://medium.com/gulpjs/gulp-util-ca3b1f9f9ac5
        npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
        npm WARN deprecated buildmail@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.10: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        
        > fsevents@1.2.4 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0009-NgStoreCounter/node_modules/fsevents
        > node install
        
        [fsevents] Success: "/Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0009-NgStoreCounter/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" already installed
        Pass --update-binary to reinstall or --build-from-source to recompile
        
        > uws@9.14.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0009-NgStoreCounter/node_modules/uws
        > node-gyp rebuild > build_log.txt 2>&1 || exit 0
        
        
        > node-sass@4.9.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0009-NgStoreCounter/node_modules/node-sass
        > node scripts/install.js
        
        Cached binary found at /Users/bradyhouse/.npm/node-sass/4.9.0/darwin-x64-57_binding.node
        
        > node-sass@4.9.0 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0009-NgStoreCounter/node_modules/node-sass
        > node scripts/build.js
        
        Binary found at /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0009-NgStoreCounter/node_modules/node-sass/vendor/darwin-x64-57/binding.node
        Testing binary
        Binary is fine
        
        > @angular/cli@6.0.8 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0009-NgStoreCounter/node_modules/@angular/cli
        > node ./bin/ng-update-message.js
        
        npm notice created a lockfile as package-lock.json. You should commit this file.
        npm WARN @ngrx/core@1.2.0 requires a peer of rxjs@^5.0.0-beta.12 but none is installed. You must install peer dependencies yourself.
        npm WARN @angular/compiler-cli@6.0.4 requires a peer of typescript@>=2.7.2 <2.8 but none is installed. You must install peer dependencies yourself.
        npm WARN @ngtools/webpack@6.0.8 requires a peer of typescript@~2.4.0 || ~2.5.0 || ~2.6.0 || ~2.7.0 but none is installed. You must install peer dependencies yourself.
        npm WARN tsickle@0.29.0 requires a peer of typescript@>=2.4.2 <2.9 but none is installed. You must install peer dependencies yourself.
        
        added 1282 packages in 53.952s
        npm WARN @ngrx/core@1.2.0 requires a peer of rxjs@^5.0.0-beta.12 but none is installed. You must install peer dependencies yourself.
        
        + typescript@2.7.2
        added 1 package and updated 1 package in 10.785s
        ├────UPDATEANGULARCLI
                    Found a modern configuration file. Nothing to be done.
        ├────NPMSHRINKWRAP
        npm notice package-lock.json has been renamed to npm-shrinkwrap.json. npm-shrinkwrap.json will be used for future installations.
        └──UPDATE COMPLETE.
        
        ├────UPDATING FIDDLE-0010-SLICKGRIDQUICKFILTER ...
        ├────UPDATEFIDDLE
        ├────UPDATE
        ├────NVMINSTALL
        v8.9.4 is already installed.
        Now using node v8.9.4 (npm v5.6.0)
        ├────NCUINSTALL
        ├────SHRINKWRAPINSTALL
        
        {{ ʕ・ɭ・ʔ }}
        
        ├────SETUP
        ├────INSTALL
        ├────IINSTALLSHRINKWRAP
        + shrinkwrap@0.4.0
        updated 1 package in 1.399s
        Done. shrinkwrap installed successfully.
        
        
        ├────RMNODEMODULES
        ├────RMPACKAGELOCK
        ├────NPMCHECKUPDATES
        Using /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0010-SlickGridQuickFilter/package.json
        ⸨░░░░░░░░░░░░░░░░░░⸩ ⠇ :
         @angular/cli    6.0.7  →    6.0.8
         @types/node   ~10.1.4  →  ~10.3.2
         ts-node        ~6.0.5  →   ~6.1.0
         @angular/animations                 ^6.0.3  →    ^6.0.4
         @angular/common                     ^6.0.3  →    ^6.0.4
         @angular/compiler                   ^6.0.3  →    ^6.0.4
         @angular/core                       ^6.0.3  →    ^6.0.4
         @angular/forms                      ^6.0.3  →    ^6.0.4
         @angular/http                       ^6.0.3  →    ^6.0.4
         @angular/platform-browser           ^6.0.3  →    ^6.0.4
         @angular/platform-browser-dynamic   ^6.0.3  →    ^6.0.4
         @angular/router                     ^6.0.3  →    ^6.0.4
         core-js                             ^2.4.1  →    ^2.5.7
         immutable                           ^3.8.1  →    ^3.8.2
         jquery                              ^3.2.1  →    ^3.3.1
         lodash                             ^4.17.4  →  ^4.17.10
         mdi                                ^2.0.46  →   ^2.2.43
         slickgrid                           ^2.3.3  →   ^2.3.19
         underscore                          ^1.8.3  →    ^1.9.1
         zone.js                            ^0.8.14  →   ^0.8.26
         @angular/compiler-cli               ^6.0.3  →    ^6.0.4
         @angular/language-service           ^6.0.3  →    ^6.0.4
         @types/jasmine                      ~2.8.7  →    ~2.8.8
         @types/jasminewd2                   ~2.0.2  →    ~2.0.3
         karma-jasmine                       ~1.1.0  →    ~1.1.2
         typescript                          ^2.7.2  →    ^2.9.1
         @angular-devkit/build-angular       ~0.6.5  →    ~0.6.8
        Upgraded /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0010-SlickGridQuickFilter/package.json
        
        ├────REVERTTYPESCRIPT
        npm WARN deprecated mdi@2.2.43: The mdi package was renamed to @mdi/font after v2.2.43. Please rename in your package.json for future updates.
        npm WARN deprecated nodemailer@2.7.2: All versions below 4.0.1 of Nodemailer are deprecated. See https://nodemailer.com/status/
        npm WARN deprecated istanbul-lib-hook@1.2.1: 1.2.0 should have been a major version bump
        npm WARN deprecated mailcomposer@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.9: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        npm WARN deprecated uws@9.14.0: stop using this version
        npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
        npm WARN deprecated buildmail@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.10: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        
        > fsevents@1.2.4 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0010-SlickGridQuickFilter/node_modules/fsevents
        > node install
        
        [fsevents] Success: "/Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0010-SlickGridQuickFilter/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" already installed
        Pass --update-binary to reinstall or --build-from-source to recompile
        
        > uws@9.14.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0010-SlickGridQuickFilter/node_modules/uws
        > node-gyp rebuild > build_log.txt 2>&1 || exit 0
        
        
        > node-sass@4.9.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0010-SlickGridQuickFilter/node_modules/node-sass
        > node scripts/install.js
        
        Cached binary found at /Users/bradyhouse/.npm/node-sass/4.9.0/darwin-x64-57_binding.node
        
        > node-sass@4.9.0 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0010-SlickGridQuickFilter/node_modules/node-sass
        > node scripts/build.js
        
        Binary found at /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0010-SlickGridQuickFilter/node_modules/node-sass/vendor/darwin-x64-57/binding.node
        Testing binary
        Binary is fine
        
        > @angular/cli@6.0.8 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0010-SlickGridQuickFilter/node_modules/@angular/cli
        > node ./bin/ng-update-message.js
        
        npm notice created a lockfile as package-lock.json. You should commit this file.
        npm WARN bootstrap@4.1.1 requires a peer of popper.js@^1.14.3 but none is installed. You must install peer dependencies yourself.
        npm WARN @angular/compiler-cli@6.0.4 requires a peer of typescript@>=2.7.2 <2.8 but none is installed. You must install peer dependencies yourself.
        npm WARN karma-jasmine-html-reporter@1.1.0 requires a peer of jasmine@>=3 but none is installed. You must install peer dependencies yourself.
        npm WARN @ngtools/webpack@6.0.8 requires a peer of typescript@~2.4.0 || ~2.5.0 || ~2.6.0 || ~2.7.0 but none is installed. You must install peer dependencies yourself.
        npm WARN tsickle@0.29.0 requires a peer of typescript@>=2.4.2 <2.9 but none is installed. You must install peer dependencies yourself.
        
        added 1259 packages in 53.128s
        npm WARN bootstrap@4.1.1 requires a peer of popper.js@^1.14.3 but none is installed. You must install peer dependencies yourself.
        npm WARN karma-jasmine-html-reporter@1.1.0 requires a peer of jasmine@>=3 but none is installed. You must install peer dependencies yourself.
        
        + typescript@2.7.2
        added 1 package and updated 1 package in 10.873s
        ├────UPDATEANGULARCLI
                    Found a modern configuration file. Nothing to be done.
        ├────NPMSHRINKWRAP
        npm notice package-lock.json has been renamed to npm-shrinkwrap.json. npm-shrinkwrap.json will be used for future installations.
        └──UPDATE COMPLETE.
        
        ├────UPDATING FIDDLE-0011-CSSANIMATION ...
        ├────UPDATEFIDDLE
        ├────UPDATE
        ├────NVMINSTALL
        v8.9.4 is already installed.
        Now using node v8.9.4 (npm v5.6.0)
        ├────NCUINSTALL
        ├────SHRINKWRAPINSTALL
        
        {{ ʕ・ɭ・ʔ }}
        
        ├────SETUP
        ├────INSTALL
        ├────IINSTALLSHRINKWRAP
        + shrinkwrap@0.4.0
        updated 1 package in 1.527s
        Done. shrinkwrap installed successfully.
        
        
        ├────RMNODEMODULES
        ├────RMPACKAGELOCK
        ├────NPMCHECKUPDATES
        Using /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0011-CssAnimation/package.json
        ⸨░░░░░░░░░░░░░░░░░░⸩ ⠏ :
         @angular/cli    6.0.7  →    6.0.8
         @types/node   ~10.1.4  →  ~10.3.2
         ts-node        ~6.0.5  →   ~6.1.0
         @angular/animations                 ^6.0.3  →   ^6.0.4
         @angular/common                     ^6.0.3  →   ^6.0.4
         @angular/compiler                   ^6.0.3  →   ^6.0.4
         @angular/core                       ^6.0.3  →   ^6.0.4
         @angular/forms                      ^6.0.3  →   ^6.0.4
         @angular/http                       ^6.0.3  →   ^6.0.4
         @angular/platform-browser           ^6.0.3  →   ^6.0.4
         @angular/platform-browser-dynamic   ^6.0.3  →   ^6.0.4
         @angular/router                     ^6.0.3  →   ^6.0.4
         core-js                             ^2.4.1  →   ^2.5.7
         jquery                              ^3.2.1  →   ^3.3.1
         zone.js                            ^0.8.14  →  ^0.8.26
         @angular/compiler-cli               ^6.0.3  →   ^6.0.4
         @angular/language-service           ^6.0.3  →   ^6.0.4
         @types/jasmine                      ~2.8.7  →   ~2.8.8
         @types/jasminewd2                   ~2.0.2  →   ~2.0.3
         karma-jasmine                       ~1.1.0  →   ~1.1.2
         typescript                          ^2.7.2  →   ^2.9.1
         @angular-devkit/build-angular       ~0.6.5  →   ~0.6.8
        Upgraded /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0011-CssAnimation/package.json
        
        ├────REVERTTYPESCRIPT
        npm WARN deprecated nodemailer@2.7.2: All versions below 4.0.1 of Nodemailer are deprecated. See https://nodemailer.com/status/
        npm WARN deprecated istanbul-lib-hook@1.2.1: 1.2.0 should have been a major version bump
        npm WARN deprecated mailcomposer@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.9: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        npm WARN deprecated uws@9.14.0: stop using this version
        npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
        npm WARN deprecated buildmail@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.10: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        
        > fsevents@1.2.4 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0011-CssAnimation/node_modules/fsevents
        > node install
        
        [fsevents] Success: "/Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0011-CssAnimation/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" already installed
        Pass --update-binary to reinstall or --build-from-source to recompile
        
        > uws@9.14.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0011-CssAnimation/node_modules/uws
        > node-gyp rebuild > build_log.txt 2>&1 || exit 0
        
        
        > node-sass@4.9.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0011-CssAnimation/node_modules/node-sass
        > node scripts/install.js
        
        Cached binary found at /Users/bradyhouse/.npm/node-sass/4.9.0/darwin-x64-57_binding.node
        
        > node-sass@4.9.0 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0011-CssAnimation/node_modules/node-sass
        > node scripts/build.js
        
        Binary found at /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0011-CssAnimation/node_modules/node-sass/vendor/darwin-x64-57/binding.node
        Testing binary
        Binary is fine
        
        > @angular/cli@6.0.8 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0011-CssAnimation/node_modules/@angular/cli
        > node ./bin/ng-update-message.js
        
        npm notice created a lockfile as package-lock.json. You should commit this file.
        npm WARN bootstrap@4.1.1 requires a peer of popper.js@^1.14.3 but none is installed. You must install peer dependencies yourself.
        npm WARN @angular/compiler-cli@6.0.4 requires a peer of typescript@>=2.7.2 <2.8 but none is installed. You must install peer dependencies yourself.
        npm WARN karma-jasmine-html-reporter@1.1.0 requires a peer of jasmine@>=3 but none is installed. You must install peer dependencies yourself.
        npm WARN @ngtools/webpack@6.0.8 requires a peer of typescript@~2.4.0 || ~2.5.0 || ~2.6.0 || ~2.7.0 but none is installed. You must install peer dependencies yourself.
        npm WARN tsickle@0.29.0 requires a peer of typescript@>=2.4.2 <2.9 but none is installed. You must install peer dependencies yourself.
        
        added 1250 packages in 46.535s
        npm WARN bootstrap@4.1.1 requires a peer of popper.js@^1.14.3 but none is installed. You must install peer dependencies yourself.
        npm WARN karma-jasmine-html-reporter@1.1.0 requires a peer of jasmine@>=3 but none is installed. You must install peer dependencies yourself.
        
        + typescript@2.7.2
        added 1 package and updated 1 package in 10.781s
        ├────UPDATEANGULARCLI
                    Found a modern configuration file. Nothing to be done.
        ├────NPMSHRINKWRAP
        npm notice package-lock.json has been renamed to npm-shrinkwrap.json. npm-shrinkwrap.json will be used for future installations.
        └──UPDATE COMPLETE.
        
        ├────UPDATING FIDDLE-0012-PANELREORDERING ...
        ├────UPDATEFIDDLE
        ├────UPDATE
        ├────NVMINSTALL
        v8.9.4 is already installed.
        Now using node v8.9.4 (npm v5.6.0)
        ├────NCUINSTALL
        ├────SHRINKWRAPINSTALL
        
        {{ ʕ・ɭ・ʔ }}
        
        ├────SETUP
        ├────INSTALL
        ├────IINSTALLSHRINKWRAP
        + shrinkwrap@0.4.0
        updated 1 package in 4.47s
        Done. shrinkwrap installed successfully.
        
        
        ├────RMNODEMODULES
        ├────RMPACKAGELOCK
        ├────NPMCHECKUPDATES
        Using /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0012-PanelReOrdering/package.json
        ⸨░░░░░░░░░░░░░░░░░░⸩ ⠸ :
         @angular/cli    6.0.7  →    6.0.8
         @types/node   ~10.1.4  →  ~10.3.2
         ts-node        ~6.0.5  →   ~6.1.0
         @angular/animations                 ^6.0.3  →    ^6.0.4
         @angular/common                     ^6.0.3  →    ^6.0.4
         @angular/compiler                   ^6.0.3  →    ^6.0.4
         @angular/core                       ^6.0.3  →    ^6.0.4
         @angular/forms                      ^6.0.3  →    ^6.0.4
         @angular/http                       ^6.0.3  →    ^6.0.4
         @angular/platform-browser           ^6.0.3  →    ^6.0.4
         @angular/platform-browser-dynamic   ^6.0.3  →    ^6.0.4
         @angular/router                     ^6.0.3  →    ^6.0.4
         core-js                             ^2.4.1  →    ^2.5.7
         jquery                              ^3.2.1  →    ^3.3.1
         lodash                             ^4.17.4  →  ^4.17.10
         mdi                                ^2.0.46  →   ^2.2.43
         zone.js                            ^0.8.14  →   ^0.8.26
         @angular/compiler-cli               ^6.0.3  →    ^6.0.4
         @angular/language-service           ^6.0.3  →    ^6.0.4
         @types/jasmine                      ~2.8.7  →    ~2.8.8
         @types/jasminewd2                   ~2.0.2  →    ~2.0.3
         karma-jasmine                       ~1.1.0  →    ~1.1.2
         typescript                          ^2.7.2  →    ^2.9.1
         @angular-devkit/build-angular       ~0.6.5  →    ~0.6.8
        Upgraded /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0012-PanelReOrdering/package.json
        
        ├────REVERTTYPESCRIPT
        npm WARN deprecated mdi@2.2.43: The mdi package was renamed to @mdi/font after v2.2.43. Please rename in your package.json for future updates.
        npm WARN deprecated nodemailer@2.7.2: All versions below 4.0.1 of Nodemailer are deprecated. See https://nodemailer.com/status/
        npm WARN deprecated istanbul-lib-hook@1.2.1: 1.2.0 should have been a major version bump
        npm WARN deprecated mailcomposer@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.9: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        npm WARN deprecated uws@9.14.0: stop using this version
        npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
        npm WARN deprecated buildmail@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.10: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        
        > fsevents@1.2.4 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0012-PanelReOrdering/node_modules/fsevents
        > node install
        
        [fsevents] Success: "/Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0012-PanelReOrdering/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" already installed
        Pass --update-binary to reinstall or --build-from-source to recompile
        
        > uws@9.14.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0012-PanelReOrdering/node_modules/uws
        > node-gyp rebuild > build_log.txt 2>&1 || exit 0
        
        
        > node-sass@4.9.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0012-PanelReOrdering/node_modules/node-sass
        > node scripts/install.js
        
        Cached binary found at /Users/bradyhouse/.npm/node-sass/4.9.0/darwin-x64-57_binding.node
        
        > node-sass@4.9.0 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0012-PanelReOrdering/node_modules/node-sass
        > node scripts/build.js
        
        Binary found at /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0012-PanelReOrdering/node_modules/node-sass/vendor/darwin-x64-57/binding.node
        Testing binary
        Binary is fine
        
        > @angular/cli@6.0.8 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0012-PanelReOrdering/node_modules/@angular/cli
        > node ./bin/ng-update-message.js
        
        npm notice created a lockfile as package-lock.json. You should commit this file.
        npm WARN bootstrap@4.1.1 requires a peer of popper.js@^1.14.3 but none is installed. You must install peer dependencies yourself.
        npm WARN @angular/compiler-cli@6.0.4 requires a peer of typescript@>=2.7.2 <2.8 but none is installed. You must install peer dependencies yourself.
        npm WARN karma-jasmine-html-reporter@1.1.0 requires a peer of jasmine@>=3 but none is installed. You must install peer dependencies yourself.
        npm WARN @ngtools/webpack@6.0.8 requires a peer of typescript@~2.4.0 || ~2.5.0 || ~2.6.0 || ~2.7.0 but none is installed. You must install peer dependencies yourself.
        npm WARN tsickle@0.29.0 requires a peer of typescript@>=2.4.2 <2.9 but none is installed. You must install peer dependencies yourself.
        
        added 1255 packages in 53.697s
        npm WARN bootstrap@4.1.1 requires a peer of popper.js@^1.14.3 but none is installed. You must install peer dependencies yourself.
        npm WARN karma-jasmine-html-reporter@1.1.0 requires a peer of jasmine@>=3 but none is installed. You must install peer dependencies yourself.
        
        + typescript@2.7.2
        added 1 package and updated 1 package in 10.297s
        ├────UPDATEANGULARCLI
                    Found a modern configuration file. Nothing to be done.
        ├────NPMSHRINKWRAP
        npm notice package-lock.json has been renamed to npm-shrinkwrap.json. npm-shrinkwrap.json will be used for future installations.
        └──UPDATE COMPLETE.
        
        ├────UPDATING FIDDLE-0013-ANGULARANIMATION ...
        ├────UPDATEFIDDLE
        ├────UPDATE
        ├────NVMINSTALL
        v8.9.4 is already installed.
        Now using node v8.9.4 (npm v5.6.0)
        ├────NCUINSTALL
        ├────SHRINKWRAPINSTALL
        
        {{ ʕ・ɭ・ʔ }}
        
        ├────SETUP
        ├────INSTALL
        ├────IINSTALLSHRINKWRAP
        + shrinkwrap@0.4.0
        updated 1 package in 1.482s
        Done. shrinkwrap installed successfully.
        
        
        ├────RMNODEMODULES
        ├────RMPACKAGELOCK
        ├────NPMCHECKUPDATES
        Using /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0013-AngularAnimation/package.json
        ⸨░░░░░░░░░░░░░░░░░░⸩ ⠹ :
         @angular/cli  6.0.7  →  6.0.8
         @angular/animations                 ^6.0.3  →   ^6.0.4
         @angular/common                     ^6.0.3  →   ^6.0.4
         @angular/compiler                   ^6.0.3  →   ^6.0.4
         @angular/core                       ^6.0.3  →   ^6.0.4
         @angular/forms                      ^6.0.3  →   ^6.0.4
         @angular/http                       ^6.0.3  →   ^6.0.4
         @angular/platform-browser           ^6.0.3  →   ^6.0.4
         @angular/platform-browser-dynamic   ^6.0.3  →   ^6.0.4
         @angular/router                     ^6.0.3  →   ^6.0.4
         core-js                             ^2.4.1  →   ^2.5.7
         zone.js                            ^0.8.14  →  ^0.8.26
         @angular/compiler-cli               ^6.0.3  →   ^6.0.4
         @angular/language-service           ^6.0.3  →   ^6.0.4
         @types/jasmine                      ~2.8.7  →   ~2.8.8
         @types/jasminewd2                   ~2.0.2  →   ~2.0.3
         @types/node                        ~10.3.0  →  ~10.3.2
         codelyzer                           ^4.0.1  →   ^4.3.0
         karma-jasmine                       ~1.1.0  →   ~1.1.2
         typescript                          ^2.7.2  →   ^2.9.1
        Upgraded /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0013-AngularAnimation/package.json
        
        ├────REVERTTYPESCRIPT
        npm WARN deprecated mdi@2.2.43: The mdi package was renamed to @mdi/font after v2.2.43. Please rename in your package.json for future updates.
        npm WARN deprecated istanbul-lib-hook@1.2.1: 1.2.0 should have been a major version bump
        npm WARN deprecated nodemailer@2.7.2: All versions below 4.0.1 of Nodemailer are deprecated. See https://nodemailer.com/status/
        npm WARN deprecated uws@9.14.0: stop using this version
        npm WARN deprecated mailcomposer@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.9: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
        npm WARN deprecated buildmail@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.10: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        
        > fsevents@1.2.4 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0013-AngularAnimation/node_modules/fsevents
        > node install
        
        [fsevents] Success: "/Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0013-AngularAnimation/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" already installed
        Pass --update-binary to reinstall or --build-from-source to recompile
        
        > uws@9.14.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0013-AngularAnimation/node_modules/uws
        > node-gyp rebuild > build_log.txt 2>&1 || exit 0
        
        
        > node-sass@4.9.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0013-AngularAnimation/node_modules/node-sass
        > node scripts/install.js
        
        Cached binary found at /Users/bradyhouse/.npm/node-sass/4.9.0/darwin-x64-57_binding.node
        
        > node-sass@4.9.0 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0013-AngularAnimation/node_modules/node-sass
        > node scripts/build.js
        
        Binary found at /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0013-AngularAnimation/node_modules/node-sass/vendor/darwin-x64-57/binding.node
        Testing binary
        Binary is fine
        
        > @angular/cli@6.0.8 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0013-AngularAnimation/node_modules/@angular/cli
        > node ./bin/ng-update-message.js
        
        npm notice created a lockfile as package-lock.json. You should commit this file.
        npm WARN bootstrap@4.1.1 requires a peer of popper.js@^1.14.3 but none is installed. You must install peer dependencies yourself.
        npm WARN @angular/compiler-cli@6.0.4 requires a peer of typescript@>=2.7.2 <2.8 but none is installed. You must install peer dependencies yourself.
        npm WARN karma-jasmine-html-reporter@1.1.0 requires a peer of jasmine@>=3 but none is installed. You must install peer dependencies yourself.
        npm WARN @angular-devkit/build-webpack@0.7.0-beta.2 requires a peer of webpack@~4.6.0 but none is installed. You must install peer dependencies yourself.
        npm WARN @ngtools/webpack@6.1.0-beta.2 requires a peer of typescript@~2.4.0 || ~2.5.0 || ~2.6.0 || ~2.7.0 but none is installed. You must install peer dependencies yourself.
        npm WARN tsickle@0.29.0 requires a peer of typescript@>=2.4.2 <2.9 but none is installed. You must install peer dependencies yourself.
        
        added 1259 packages in 52.547s
        npm WARN @angular-devkit/build-webpack@0.7.0-beta.2 requires a peer of webpack@~4.6.0 but none is installed. You must install peer dependencies yourself.
        npm WARN bootstrap@4.1.1 requires a peer of popper.js@^1.14.3 but none is installed. You must install peer dependencies yourself.
        npm WARN karma-jasmine-html-reporter@1.1.0 requires a peer of jasmine@>=3 but none is installed. You must install peer dependencies yourself.
        
        + typescript@2.7.2
        added 1 package and updated 1 package in 11.615s
        ├────UPDATEANGULARCLI
                    Found a modern configuration file. Nothing to be done.
        ├────NPMSHRINKWRAP
        npm notice package-lock.json has been renamed to npm-shrinkwrap.json. npm-shrinkwrap.json will be used for future installations.
        └──UPDATE COMPLETE.
        
        ├────UPDATING FIDDLE-0014-FACEBOOKAUTHO ...
        ├────UPDATEFIDDLE
        ├────UPDATE
        ├────NVMINSTALL
        v8.9.4 is already installed.
        Now using node v8.9.4 (npm v5.6.0)
        ├────NCUINSTALL
        ├────SHRINKWRAPINSTALL
        
        {{ ʕ・ɭ・ʔ }}
        
        ├────SETUP
        ├────INSTALL
        ├────IINSTALLSHRINKWRAP
        + shrinkwrap@0.4.0
        updated 1 package in 1.532s
        Done. shrinkwrap installed successfully.
        
        
        ├────RMNODEMODULES
        ├────RMPACKAGELOCK
        ├────NPMCHECKUPDATES
        Using /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0014-FacebookAuthO/package.json
        ⸨░░░░░░░░░░░░░░░░░░⸩ ⠙ :
         ts-node  ~6.0.5  →  ~6.1.0
         @angular/animations                 ^6.0.3  →   ^6.0.4
         @angular/common                     ^6.0.3  →   ^6.0.4
         @angular/compiler                   ^6.0.3  →   ^6.0.4
         @angular/core                       ^6.0.3  →   ^6.0.4
         @angular/forms                      ^6.0.3  →   ^6.0.4
         @angular/http                       ^6.0.3  →   ^6.0.4
         @angular/platform-browser           ^6.0.3  →   ^6.0.4
         @angular/platform-browser-dynamic   ^6.0.3  →   ^6.0.4
         @angular/router                     ^6.0.3  →   ^6.0.4
         auth0-js                            ^9.6.0  →   ^9.6.1
         body-parser                        ^1.18.2  →  ^1.18.3
         core-js                             ^2.4.1  →   ^2.5.7
         express                            ^4.16.2  →  ^4.16.3
         express-jwt                         ^5.3.0  →   ^5.3.1
         mongoose                            ^5.1.3  →   ^5.1.4
         zone.js                            ^0.8.14  →  ^0.8.26
         @angular/cli                        ^6.0.7  →   ^6.0.8
         @angular/compiler-cli               ^6.0.3  →   ^6.0.4
         @angular/language-service           ^6.0.3  →   ^6.0.4
         @types/jasmine                      ~2.8.7  →   ~2.8.8
         @types/jasminewd2                   ~2.0.2  →   ~2.0.3
         @types/node                        ~10.3.0  →  ~10.3.2
         codelyzer                           ^4.0.1  →   ^4.3.0
         karma-jasmine                       ~1.1.0  →   ~1.1.2
         typescript                          ^2.7.2  →   ^2.9.1
        Upgraded /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0014-FacebookAuthO/package.json
        
        ├────REVERTTYPESCRIPT
        npm WARN deprecated nodemailer@2.7.2: All versions below 4.0.1 of Nodemailer are deprecated. See https://nodemailer.com/status/
        npm WARN deprecated istanbul-lib-hook@1.2.1: 1.2.0 should have been a major version bump
        npm WARN deprecated mailcomposer@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.9: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        npm WARN deprecated uws@9.14.0: stop using this version
        npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
        npm WARN deprecated buildmail@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.10: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        
        > fsevents@1.2.4 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0014-FacebookAuthO/node_modules/fsevents
        > node install
        
        [fsevents] Success: "/Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0014-FacebookAuthO/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" already installed
        Pass --update-binary to reinstall or --build-from-source to recompile
        
        > uws@9.14.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0014-FacebookAuthO/node_modules/uws
        > node-gyp rebuild > build_log.txt 2>&1 || exit 0
        
        
        > node-sass@4.9.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0014-FacebookAuthO/node_modules/node-sass
        > node scripts/install.js
        
        Cached binary found at /Users/bradyhouse/.npm/node-sass/4.9.0/darwin-x64-57_binding.node
        
        > node-sass@4.9.0 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0014-FacebookAuthO/node_modules/node-sass
        > node scripts/build.js
        
        Binary found at /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0014-FacebookAuthO/node_modules/node-sass/vendor/darwin-x64-57/binding.node
        Testing binary
        Binary is fine
        
        > @angular/cli@6.0.8 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0014-FacebookAuthO/node_modules/@angular/cli
        > node ./bin/ng-update-message.js
        
        npm notice created a lockfile as package-lock.json. You should commit this file.
        npm WARN @angular/compiler-cli@6.0.4 requires a peer of typescript@>=2.7.2 <2.8 but none is installed. You must install peer dependencies yourself.
        npm WARN karma-jasmine-html-reporter@1.1.0 requires a peer of jasmine@>=3 but none is installed. You must install peer dependencies yourself.
        npm WARN @angular-devkit/build-webpack@0.7.0-beta.2 requires a peer of webpack@~4.6.0 but none is installed. You must install peer dependencies yourself.
        npm WARN @ngtools/webpack@6.1.0-beta.2 requires a peer of typescript@~2.4.0 || ~2.5.0 || ~2.6.0 || ~2.7.0 but none is installed. You must install peer dependencies yourself.
        npm WARN ajv-keywords@3.2.0 requires a peer of ajv@^6.0.0 but none is installed. You must install peer dependencies yourself.
        npm WARN tsickle@0.29.0 requires a peer of typescript@>=2.4.2 <2.9 but none is installed. You must install peer dependencies yourself.
        
        added 1335 packages in 55.273s
        npm WARN @angular-devkit/build-webpack@0.7.0-beta.2 requires a peer of webpack@~4.6.0 but none is installed. You must install peer dependencies yourself.
        npm WARN ajv-keywords@3.2.0 requires a peer of ajv@^6.0.0 but none is installed. You must install peer dependencies yourself.
        npm WARN karma-jasmine-html-reporter@1.1.0 requires a peer of jasmine@>=3 but none is installed. You must install peer dependencies yourself.
        
        + typescript@2.7.2
        added 1 package and updated 1 package in 12s
        ├────UPDATEANGULARCLI
                    Found a modern configuration file. Nothing to be done.
        ├────NPMSHRINKWRAP
        npm notice package-lock.json has been renamed to npm-shrinkwrap.json. npm-shrinkwrap.json will be used for future installations.
        └──UPDATE COMPLETE.
        
        ├────UPDATING FIDDLE-0015-NGXBOOTSTRAPMODALS ...
        ├────UPDATEFIDDLE
        ├────UPDATE
        ├────NVMINSTALL
        v8.9.4 is already installed.
        Now using node v8.9.4 (npm v5.6.0)
        ├────NCUINSTALL
        ├────SHRINKWRAPINSTALL
        
        {{ ʕ・ɭ・ʔ }}
        
        ├────SETUP
        ├────INSTALL
        ├────IINSTALLSHRINKWRAP
        + shrinkwrap@0.4.0
        updated 1 package in 3.71s
        Done. shrinkwrap installed successfully.
        
        
        ├────RMNODEMODULES
        ├────RMPACKAGELOCK
        ├────NPMCHECKUPDATES
        Using /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0015-NgxBootstrapModals/package.json
        ⸨░░░░░░░░░░░░░░░░░░⸩ ⠙ :
         ngx-bootstrap  ^2.0.5  →  ^3.0.0
         @angular/cli    6.0.7  →   6.0.8
         ts-node        ~6.0.5  →  ~6.1.0
         @angular/animations                 ^6.0.3  →   ^6.0.4
         @angular/common                     ^6.0.3  →   ^6.0.4
         @angular/compiler                   ^6.0.3  →   ^6.0.4
         @angular/core                       ^6.0.3  →   ^6.0.4
         @angular/forms                      ^6.0.3  →   ^6.0.4
         @angular/http                       ^6.0.3  →   ^6.0.4
         @angular/platform-browser           ^6.0.3  →   ^6.0.4
         @angular/platform-browser-dynamic   ^6.0.3  →   ^6.0.4
         @angular/router                     ^6.0.3  →   ^6.0.4
         core-js                             ^2.4.1  →   ^2.5.7
         jquery                              ^3.2.1  →   ^3.3.1
         zone.js                            ^0.8.14  →  ^0.8.26
         @angular/compiler-cli               ^6.0.3  →   ^6.0.4
         @angular/language-service           ^6.0.3  →   ^6.0.4
         @types/jasmine                      ~2.8.7  →   ~2.8.8
         @types/jasminewd2                   ~2.0.2  →   ~2.0.3
         @types/node                        ~10.3.0  →  ~10.3.2
         karma-jasmine                       ~1.1.0  →   ~1.1.2
         typescript                          ^2.7.2  →   ^2.9.1
        Upgraded /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0015-NgxBootstrapModals/package.json
        
        ├────REVERTTYPESCRIPT
        npm WARN deprecated nodemailer@2.7.2: All versions below 4.0.1 of Nodemailer are deprecated. See https://nodemailer.com/status/
        npm WARN deprecated istanbul-lib-hook@1.2.1: 1.2.0 should have been a major version bump
        npm WARN deprecated mailcomposer@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.9: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        npm WARN deprecated uws@9.14.0: stop using this version
        npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
        npm WARN deprecated buildmail@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.10: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        
        > fsevents@1.2.4 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0015-NgxBootstrapModals/node_modules/fsevents
        > node install
        
        [fsevents] Success: "/Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0015-NgxBootstrapModals/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" already installed
        Pass --update-binary to reinstall or --build-from-source to recompile
        
        > uws@9.14.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0015-NgxBootstrapModals/node_modules/uws
        > node-gyp rebuild > build_log.txt 2>&1 || exit 0
        
        
        > node-sass@4.9.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0015-NgxBootstrapModals/node_modules/node-sass
        > node scripts/install.js
        
        Cached binary found at /Users/bradyhouse/.npm/node-sass/4.9.0/darwin-x64-57_binding.node
        
        > node-sass@4.9.0 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0015-NgxBootstrapModals/node_modules/node-sass
        > node scripts/build.js
        
        Binary found at /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0015-NgxBootstrapModals/node_modules/node-sass/vendor/darwin-x64-57/binding.node
        Testing binary
        Binary is fine
        
        > @angular/cli@6.0.8 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0015-NgxBootstrapModals/node_modules/@angular/cli
        > node ./bin/ng-update-message.js
        
        npm notice created a lockfile as package-lock.json. You should commit this file.
        npm WARN bootstrap@4.1.1 requires a peer of popper.js@^1.14.3 but none is installed. You must install peer dependencies yourself.
        npm WARN ngx-bootstrap@3.0.0 requires a peer of @angular/forms@6.0.1 but none is installed. You must install peer dependencies yourself.
        npm WARN @angular/compiler-cli@6.0.4 requires a peer of typescript@>=2.7.2 <2.8 but none is installed. You must install peer dependencies yourself.
        npm WARN karma-jasmine-html-reporter@1.1.0 requires a peer of jasmine@>=3 but none is installed. You must install peer dependencies yourself.
        npm WARN @angular-devkit/build-webpack@0.7.0-beta.2 requires a peer of webpack@~4.6.0 but none is installed. You must install peer dependencies yourself.
        npm WARN @ngtools/webpack@6.1.0-beta.2 requires a peer of typescript@~2.4.0 || ~2.5.0 || ~2.6.0 || ~2.7.0 but none is installed. You must install peer dependencies yourself.
        npm WARN tsickle@0.29.0 requires a peer of typescript@>=2.4.2 <2.9 but none is installed. You must install peer dependencies yourself.
        
        added 1259 packages in 54.04s
        npm WARN @angular-devkit/build-webpack@0.7.0-beta.2 requires a peer of webpack@~4.6.0 but none is installed. You must install peer dependencies yourself.
        npm WARN bootstrap@4.1.1 requires a peer of popper.js@^1.14.3 but none is installed. You must install peer dependencies yourself.
        npm WARN karma-jasmine-html-reporter@1.1.0 requires a peer of jasmine@>=3 but none is installed. You must install peer dependencies yourself.
        npm WARN ngx-bootstrap@3.0.0 requires a peer of @angular/forms@6.0.1 but none is installed. You must install peer dependencies yourself.
        
        + typescript@2.7.2
        added 1 package and updated 1 package in 11.369s
        ├────UPDATEANGULARCLI
                    Found a modern configuration file. Nothing to be done.
        ├────NPMSHRINKWRAP
         npm notice package-lock.json has been renamed to npm-shrinkwrap.json. npm-shrinkwrap.json will be used for future installations.
        └──UPDATE COMPLETE.
        
        ├────UPDATING FIDDLE-0018-SLICKGRIDSPARKLINE ...
        ├────UPDATEFIDDLE
        ├────UPDATE
        ├────NVMINSTALL
        v8.9.4 is already installed.
        Now using node v8.9.4 (npm v5.6.0)
        ├────NCUINSTALL
        ├────SHRINKWRAPINSTALL
        
        {{ ʕ・ɭ・ʔ }}
        
        ├────SETUP
        ├────INSTALL
        ├────IINSTALLSHRINKWRAP
        + shrinkwrap@0.4.0
        updated 1 package in 1.571s
        Done. shrinkwrap installed successfully.
        
        
        ├────RMNODEMODULES
        ├────RMPACKAGELOCK
        ├────NPMCHECKUPDATES
        Using /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0018-SlickGridSparkLine/package.json
        ⸨░░░░░░░░░░░░░░░░░░⸩ ⠹ :
         @angular/cli    6.0.7  →    6.0.8
         @types/node   ~10.1.4  →  ~10.3.2
         ts-node        ~6.0.5  →   ~6.1.0
         @angular/animations                 ^6.0.3  →    ^6.0.4
         @angular/common                     ^6.0.3  →    ^6.0.4
         @angular/compiler                   ^6.0.3  →    ^6.0.4
         @angular/core                       ^6.0.3  →    ^6.0.4
         @angular/forms                      ^6.0.3  →    ^6.0.4
         @angular/http                       ^6.0.3  →    ^6.0.4
         @angular/platform-browser           ^6.0.3  →    ^6.0.4
         @angular/platform-browser-dynamic   ^6.0.3  →    ^6.0.4
         @angular/router                     ^6.0.3  →    ^6.0.4
         core-js                             ^2.4.1  →    ^2.5.7
         immutable                           ^3.8.1  →    ^3.8.2
         jquery                              ^3.2.1  →    ^3.3.1
         lodash                             ^4.17.4  →  ^4.17.10
         mdi                                ^2.0.46  →   ^2.2.43
         moment                             ^2.20.1  →   ^2.22.2
         slickgrid                           ^2.3.3  →   ^2.3.19
         underscore                          ^1.8.3  →    ^1.9.1
         zone.js                            ^0.8.14  →   ^0.8.26
         @angular/compiler-cli               ^6.0.3  →    ^6.0.4
         @angular/language-service           ^6.0.3  →    ^6.0.4
         @types/jasmine                      ~2.8.7  →    ~2.8.8
         @types/jasminewd2                   ~2.0.2  →    ~2.0.3
         karma-jasmine                       ~1.1.0  →    ~1.1.2
         typescript                          ^2.7.2  →    ^2.9.1
        Upgraded /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0018-SlickGridSparkLine/package.json
        
        ├────REVERTTYPESCRIPT
        npm WARN deprecated mdi@2.2.43: The mdi package was renamed to @mdi/font after v2.2.43. Please rename in your package.json for future updates.
        npm WARN deprecated nodemailer@2.7.2: All versions below 4.0.1 of Nodemailer are deprecated. See https://nodemailer.com/status/
        npm WARN deprecated istanbul-lib-hook@1.2.1: 1.2.0 should have been a major version bump
        npm WARN deprecated mailcomposer@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.9: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        npm WARN deprecated uws@9.14.0: stop using this version
        npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
        npm WARN deprecated buildmail@4.0.1: This project is unmaintained
        npm WARN deprecated socks@1.1.10: If using 2.x branch, please upgrade to at least 2.1.6 to avoid a serious bug with socket data flow and an import issue introduced in 2.1.0
        
        > fsevents@1.2.4 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0018-SlickGridSparkLine/node_modules/fsevents
        > node install
        
        [fsevents] Success: "/Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0018-SlickGridSparkLine/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" already installed
        Pass --update-binary to reinstall or --build-from-source to recompile
        
        > uws@9.14.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0018-SlickGridSparkLine/node_modules/uws
        > node-gyp rebuild > build_log.txt 2>&1 || exit 0
        
        
        > node-sass@4.9.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0018-SlickGridSparkLine/node_modules/node-sass
        > node scripts/install.js
        
        Cached binary found at /Users/bradyhouse/.npm/node-sass/4.9.0/darwin-x64-57_binding.node
        
        > node-sass@4.9.0 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0018-SlickGridSparkLine/node_modules/node-sass
        > node scripts/build.js
        
        Binary found at /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0018-SlickGridSparkLine/node_modules/node-sass/vendor/darwin-x64-57/binding.node
        Testing binary
        Binary is fine
        
        > @angular/cli@6.0.8 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0018-SlickGridSparkLine/node_modules/@angular/cli
        > node ./bin/ng-update-message.js
        
        npm notice created a lockfile as package-lock.json. You should commit this file.
        npm WARN bootstrap@4.1.1 requires a peer of popper.js@^1.14.3 but none is installed. You must install peer dependencies yourself.
        npm WARN @angular/compiler-cli@6.0.4 requires a peer of typescript@>=2.7.2 <2.8 but none is installed. You must install peer dependencies yourself.
        npm WARN karma-jasmine-html-reporter@1.1.0 requires a peer of jasmine@>=3 but none is installed. You must install peer dependencies yourself.
        npm WARN @angular-devkit/build-webpack@0.7.0-beta.2 requires a peer of webpack@~4.6.0 but none is installed. You must install peer dependencies yourself.
        npm WARN @ngtools/webpack@6.1.0-beta.2 requires a peer of typescript@~2.4.0 || ~2.5.0 || ~2.6.0 || ~2.7.0 but none is installed. You must install peer dependencies yourself.
        npm WARN tsickle@0.29.0 requires a peer of typescript@>=2.4.2 <2.9 but none is installed. You must install peer dependencies yourself.
        
        added 1269 packages in 53.605s
        npm WARN @angular-devkit/build-webpack@0.7.0-beta.2 requires a peer of webpack@~4.6.0 but none is installed. You must install peer dependencies yourself.
        npm WARN bootstrap@4.1.1 requires a peer of popper.js@^1.14.3 but none is installed. You must install peer dependencies yourself.
        npm WARN karma-jasmine-html-reporter@1.1.0 requires a peer of jasmine@>=3 but none is installed. You must install peer dependencies yourself.
        
        + typescript@2.7.2
        added 1 package and updated 1 package in 11.369s
        ├────UPDATEANGULARCLI
                    Found a modern configuration file. Nothing to be done.
        ├────NPMSHRINKWRAP
        npm notice package-lock.json has been renamed to npm-shrinkwrap.json. npm-shrinkwrap.json will be used for future installations.
        └──UPDATE COMPLETE.
