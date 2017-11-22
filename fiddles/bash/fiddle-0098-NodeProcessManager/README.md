fiddle-0098-NodeProcessManager
======

### Title

fiddle-0098-NodeProcessManager


### Creation Date

11-21-17


### Location

Wakeforest, NC


### Issue

[Issue #203](https://github.com/bradyhouse/house/issues/203)


### Description

Bash fiddle that explores how to initiate the [angular-seeder](https://github.com/mgechev/angular-seed) repo's end-to-end (e2e) process using a
a single terminal session (or thread).  Specifically, the POC does the following: 

  1.  Clones and installs the Angular-Seed github repo
  2.  Installs [Node Process Manager (pm2)](https://www.npmjs.com/package/pm2)
  3.  Uses Node Process Manager (pm2) to startup selenium web driver
  4.  Uses Node Process Manager (pm2) to startup the repo's on board dev web server
  5.  Kicks of the repo's e2e run process
  6.  Once the e2e process completes (5), its uses pm2 to kill the two secondary threads (3,4)


### Prerequisites

*  node v7.9.0 (npm v4.2.0)
*  Java 

### Use Case

#### To Run ...

From the root directory, execute the `run.sh` script:

    ./run.sh

If everything is working properly, it should generate the following output:

    RUN.SH
    Bash version 3.2.57(1)-release...
    ┌──IS JAVA INSTALLED...
    true
    ┌──IS NPM INSTALLED...
    true
    ┌──IS GIT INSTALLED...
    true
    ┌──CLONING ANGULAR-SEEDER REPO...
    Cloning into 'angular-seed'...
    remote: Counting objects: 212, done.
    remote: Compressing objects: 100% (199/199), done.
    remote: Total 212 (delta 11), reused 82 (delta 3), pack-reused 0
    Receiving objects: 100% (212/212), 238.66 KiB | 0 bytes/s, done.
    Resolving deltas: 100% (11/11), done.
    Checking connectivity... done.
    ┌──INSTALLING DEPENDENCIES...
    npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
    npm WARN deprecated express@2.5.11: express 2.x series is deprecated
    npm WARN deprecated connect@1.9.2: connect 1.x series is deprecated
    npm WARN deprecated minimatch@2.0.10: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
    npm WARN deprecated minimatch@0.2.14: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
    npm WARN deprecated graceful-fs@1.2.3: graceful-fs v3.0.0 and before will fail on node releases >= v7.0. Please update to graceful-fs@^4.0.0 as soon as possible. Use 'npm ls graceful-fs' to find it in the tree.
    npm WARN prefer global 8fold-marked@0.3.8 should be installed with -g
    npm WARN prefer global live-server@1.1.0 should be installed with -g
    npm WARN prefer global node-gyp@3.6.2 should be installed with -g
    
    > fsevents@1.1.3 install /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/node_modules/fsevents
    > node install
    
    [fsevents] Success: "/Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/node_modules/fsevents/lib/binding/Release/node-v51-darwin-x64/fse.node" is installed via remote
    
    > node-sass@4.7.2 install /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/node_modules/node-sass
    > node scripts/install.js
    
    Cached binary found at /Users/bradyhouse/.npm/node-sass/4.7.2/darwin-x64-51_binding.node
    
    > node-sass@4.7.2 postinstall /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/node_modules/node-sass
    > node scripts/build.js
    
    Binary found at /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/node_modules/node-sass/vendor/darwin-x64-51/binding.node
    Testing binary
    Binary is fine
    
    > angular-seed@1.0.0 postinstall /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed
    > gulp check.versions && gulp build.bundle.rxjs && gulp webdriver && gulp print.banner
    
    [07:44:16] Requiring external module ts-node/register
    [07:44:17] Loading tasks folder /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.assets.dev
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.assets.prod
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundle.rxjs
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundles.app.aot
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundles.app.rollup.aot
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundles.app
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundles
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.docs
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.html_css
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.index.dev
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.index.prod
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.dev
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.e2e
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.prod.aot
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.prod.rollup.aot
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.prod
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.test
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.sme.prod.aot
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.sme.prod.rollup.aot
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.sme.prod
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.tools
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/check.tools
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/check.versions
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.all
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.coverage
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.dev
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.e2e
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.prod
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.sme
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.tools
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clear.files
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/compile.ahead.prod
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/copy.prod.rollup.aot
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/copy.prod
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/e2e
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/generate.manifest
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/i18n.build
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/i18n.merge
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/karma.run
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/karma.run.with_coverage
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/karma.run.without_coverage
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/karma.watch
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/minify.bundles
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/minify.index
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/noop
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/print.banner
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/serve.coverage
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/serve.coverage.watch
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/serve.docs
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/server.prod
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/server.start
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/start.deving
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/sw.manifest.static
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/test.watch
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/transpile.bundles.rollup.aot
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/tslint
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/watch.dev
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/watch.e2e
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/watch.test
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/webdriver
    [07:44:17] Loading tasks folder /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/project
    [07:44:17] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/project/sample.task
    [07:44:17] Using gulpfile ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/gulpfile.ts
    [07:44:17] Starting 'check.versions'...
    [07:44:17] Finished 'check.versions' after 29 ms
    [07:44:19] Requiring external module ts-node/register
    [07:44:20] Loading tasks folder /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.assets.dev
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.assets.prod
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundle.rxjs
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundles.app.aot
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundles.app.rollup.aot
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundles.app
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundles
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.docs
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.html_css
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.index.dev
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.index.prod
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.dev
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.e2e
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.prod.aot
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.prod.rollup.aot
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.prod
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.test
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.sme.prod.aot
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.sme.prod.rollup.aot
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.sme.prod
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.tools
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/check.tools
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/check.versions
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.all
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.coverage
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.dev
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.e2e
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.prod
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.sme
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.tools
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clear.files
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/compile.ahead.prod
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/copy.prod.rollup.aot
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/copy.prod
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/e2e
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/generate.manifest
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/i18n.build
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/i18n.merge
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/karma.run
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/karma.run.with_coverage
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/karma.run.without_coverage
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/karma.watch
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/minify.bundles
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/minify.index
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/noop
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/print.banner
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/serve.coverage
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/serve.coverage.watch
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/serve.docs
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/server.prod
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/server.start
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/start.deving
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/sw.manifest.static
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/test.watch
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/transpile.bundles.rollup.aot
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/tslint
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/watch.dev
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/watch.e2e
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/watch.test
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/webdriver
    [07:44:20] Loading tasks folder /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/project
    [07:44:20] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/project/sample.task
    [07:44:20] Using gulpfile ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/gulpfile.ts
    [07:44:20] Starting 'build.bundle.rxjs'...
    [07:44:36] Finished 'build.bundle.rxjs' after 17 s
    [07:44:37] Requiring external module ts-node/register
    [07:44:38] Loading tasks folder /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.assets.dev
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.assets.prod
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundle.rxjs
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundles.app.aot
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundles.app.rollup.aot
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundles.app
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundles
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.docs
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.html_css
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.index.dev
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.index.prod
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.dev
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.e2e
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.prod.aot
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.prod.rollup.aot
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.prod
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.test
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.sme.prod.aot
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.sme.prod.rollup.aot
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.sme.prod
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.tools
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/check.tools
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/check.versions
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.all
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.coverage
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.dev
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.e2e
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.prod
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.sme
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.tools
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clear.files
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/compile.ahead.prod
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/copy.prod.rollup.aot
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/copy.prod
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/e2e
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/generate.manifest
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/i18n.build
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/i18n.merge
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/karma.run
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/karma.run.with_coverage
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/karma.run.without_coverage
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/karma.watch
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/minify.bundles
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/minify.index
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/noop
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/print.banner
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/serve.coverage
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/serve.coverage.watch
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/serve.docs
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/server.prod
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/server.start
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/start.deving
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/sw.manifest.static
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/test.watch
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/transpile.bundles.rollup.aot
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/tslint
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/watch.dev
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/watch.e2e
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/watch.test
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/webdriver
    [07:44:38] Loading tasks folder /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/project
    [07:44:38] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/project/sample.task
    [07:44:38] Using gulpfile ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/gulpfile.ts
    [07:44:38] Starting 'webdriver'...
    [07:44:39] I/file_manager - creating folder /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/node_modules/protractor/node_modules/webdriver-manager/selenium
    [07:44:41] I/update - chromedriver: unzipping chromedriver_2.33.zip
    [07:44:41] I/update - chromedriver: setting permissions to 0755 for /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.33
    [07:44:47] I/update - geckodriver: unzipping geckodriver-v0.19.1.tar.gz
    [07:44:47] I/update - geckodriver: setting permissions to 0755 for /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver-v0.19.1
    [07:44:47] Finished 'webdriver' after 8.86 s
    [07:44:48] Requiring external module ts-node/register
    [07:44:49] Loading tasks folder /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.assets.dev
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.assets.prod
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundle.rxjs
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundles.app.aot
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundles.app.rollup.aot
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundles.app
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.bundles
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.docs
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.html_css
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.index.dev
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.index.prod
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.dev
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.e2e
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.prod.aot
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.prod.rollup.aot
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.prod
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.js.test
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.sme.prod.aot
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.sme.prod.rollup.aot
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.sme.prod
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/build.tools
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/check.tools
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/check.versions
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.all
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.coverage
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.dev
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.e2e
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.prod
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.sme
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clean.tools
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/clear.files
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/compile.ahead.prod
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/copy.prod.rollup.aot
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/copy.prod
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/e2e
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/generate.manifest
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/i18n.build
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/i18n.merge
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/karma.run
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/karma.run.with_coverage
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/karma.run.without_coverage
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/karma.watch
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/minify.bundles
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/minify.index
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/noop
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/print.banner
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/serve.coverage
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/serve.coverage.watch
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/serve.docs
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/server.prod
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/server.start
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/start.deving
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/sw.manifest.static
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/test.watch
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/transpile.bundles.rollup.aot
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/tslint
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/watch.dev
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/watch.e2e
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/watch.test
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/seed/webdriver
    [07:44:49] Loading tasks folder /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/project
    [07:44:49] Registering task ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/tools/tasks/project/sample.task
    [07:44:49] Using gulpfile ~/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/gulpfile.ts
    [07:44:49] Starting 'print.banner'...
    
    Welcome to angular-seed
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    [07:44:49] Finished 'print.banner' after 25 ms
    angular-seed@1.0.0 /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed
    ├─┬ @angular-devkit/build-optimizer@0.0.33
    │ ├─┬ loader-utils@1.1.0
    │ │ ├── big.js@3.2.0
    │ │ └── emojis-list@2.1.0
    │ ├── source-map@0.5.7
    │ └─┬ webpack-sources@1.0.2
    │   ├── source-list-map@2.0.0
    │   └── source-map@0.6.1
    ├─┬ @angular/animations@5.0.2
    │ └── tslib@1.8.0
    ├── @angular/common@5.0.2
    ├── @angular/compiler@5.0.2
    ├─┬ @angular/compiler-cli@5.0.2
    │ ├─┬ chokidar@1.7.0
    │ │ ├── async-each@1.0.1
    │ │ ├─┬ fsevents@1.1.3
    │ │ │ └─┬ node-pre-gyp@0.6.39
    │ │ │   ├── detect-libc@1.0.2
    │ │ │   ├─┬ hawk@3.1.3
    │ │ │   │ ├── boom@2.10.1
    │ │ │   │ ├── cryptiles@2.0.5
    │ │ │   │ ├── hoek@2.16.3
    │ │ │   │ └── sntp@1.0.9
    │ │ │   ├─┬ mkdirp@0.5.1
    │ │ │   │ └── minimist@0.0.8
    │ │ │   ├─┬ nopt@4.0.1
    │ │ │   │ ├── abbrev@1.1.0
    │ │ │   │ └─┬ osenv@0.1.4
    │ │ │   │   ├── os-homedir@1.0.2
    │ │ │   │   └── os-tmpdir@1.0.2
    │ │ │   ├─┬ npmlog@4.1.0
    │ │ │   │ ├─┬ are-we-there-yet@1.1.4
    │ │ │   │ │ └── delegates@1.0.0
    │ │ │   │ ├── console-control-strings@1.1.0
    │ │ │   │ ├─┬ gauge@2.7.4
    │ │ │   │ │ ├── aproba@1.1.1
    │ │ │   │ │ ├── has-unicode@2.0.1
    │ │ │   │ │ ├── object-assign@4.1.1
    │ │ │   │ │ ├── signal-exit@3.0.2
    │ │ │   │ │ ├─┬ string-width@1.0.2
    │ │ │   │ │ │ ├── code-point-at@1.1.0
    │ │ │   │ │ │ └─┬ is-fullwidth-code-point@1.0.0
    │ │ │   │ │ │   └── number-is-nan@1.0.1
    │ │ │   │ │ ├─┬ strip-ansi@3.0.1
    │ │ │   │ │ │ └── ansi-regex@2.1.1
    │ │ │   │ │ └── wide-align@1.1.2
    │ │ │   │ └── set-blocking@2.0.0
    │ │ │   ├─┬ rc@1.2.1
    │ │ │   │ ├── deep-extend@0.4.2
    │ │ │   │ ├── ini@1.3.4
    │ │ │   │ ├── minimist@1.2.0
    │ │ │   │ └── strip-json-comments@2.0.1
    │ │ │   ├─┬ request@2.81.0
    │ │ │   │ ├── aws-sign2@0.6.0
    │ │ │   │ ├── aws4@1.6.0
    │ │ │   │ ├── caseless@0.12.0
    │ │ │   │ ├─┬ combined-stream@1.0.5
    │ │ │   │ │ └── delayed-stream@1.0.0
    │ │ │   │ ├── extend@3.0.1
    │ │ │   │ ├── forever-agent@0.6.1
    │ │ │   │ ├─┬ form-data@2.1.4
    │ │ │   │ │ └── asynckit@0.4.0
    │ │ │   │ ├─┬ har-validator@4.2.1
    │ │ │   │ │ ├─┬ ajv@4.11.8
    │ │ │   │ │ │ ├── co@4.6.0
    │ │ │   │ │ │ └─┬ json-stable-stringify@1.0.1
    │ │ │   │ │ │   └── jsonify@0.0.0
    │ │ │   │ │ └── har-schema@1.0.5
    │ │ │   │ ├─┬ http-signature@1.1.1
    │ │ │   │ │ ├── assert-plus@0.2.0
    │ │ │   │ │ ├─┬ jsprim@1.4.0
    │ │ │   │ │ │ ├── assert-plus@1.0.0
    │ │ │   │ │ │ ├── extsprintf@1.0.2
    │ │ │   │ │ │ ├── json-schema@0.2.3
    │ │ │   │ │ │ └── verror@1.3.6
    │ │ │   │ │ └─┬ sshpk@1.13.0
    │ │ │   │ │   ├── asn1@0.2.3
    │ │ │   │ │   ├── assert-plus@1.0.0
    │ │ │   │ │   ├── bcrypt-pbkdf@1.0.1
    │ │ │   │ │   ├─┬ dashdash@1.14.1
    │ │ │   │ │   │ └── assert-plus@1.0.0
    │ │ │   │ │   ├── ecc-jsbn@0.1.1
    │ │ │   │ │   ├─┬ getpass@0.1.7
    │ │ │   │ │   │ └── assert-plus@1.0.0
    │ │ │   │ │   ├── jodid25519@1.0.2
    │ │ │   │ │   ├── jsbn@0.1.1
    │ │ │   │ │   └── tweetnacl@0.14.5
    │ │ │   │ ├── is-typedarray@1.0.0
    │ │ │   │ ├── isstream@0.1.2
    │ │ │   │ ├── json-stringify-safe@5.0.1
    │ │ │   │ ├─┬ mime-types@2.1.15
    │ │ │   │ │ └── mime-db@1.27.0
    │ │ │   │ ├── oauth-sign@0.8.2
    │ │ │   │ ├── performance-now@0.2.0
    │ │ │   │ ├── qs@6.4.0
    │ │ │   │ ├── safe-buffer@5.0.1
    │ │ │   │ ├── stringstream@0.0.5
    │ │ │   │ ├─┬ tough-cookie@2.3.2
    │ │ │   │ │ └── punycode@1.4.1
    │ │ │   │ ├── tunnel-agent@0.6.0
    │ │ │   │ └── uuid@3.0.1
    │ │ │   ├─┬ rimraf@2.6.1
    │ │ │   │ └─┬ glob@7.1.2
    │ │ │   │   ├── fs.realpath@1.0.0
    │ │ │   │   ├── inflight@1.0.6
    │ │ │   │   ├─┬ minimatch@3.0.4
    │ │ │   │   │ └─┬ brace-expansion@1.1.7
    │ │ │   │   │   ├── balanced-match@0.4.2
    │ │ │   │   │   └── concat-map@0.0.1
    │ │ │   │   └── path-is-absolute@1.0.1
    │ │ │   ├── semver@5.3.0
    │ │ │   ├─┬ tar@2.2.1
    │ │ │   │ ├── block-stream@0.0.9
    │ │ │   │ ├─┬ fstream@1.0.11
    │ │ │   │ │ └── graceful-fs@4.1.11
    │ │ │   │ └── inherits@2.0.3
    │ │ │   └─┬ tar-pack@3.4.0
    │ │ │     ├─┬ debug@2.6.8
    │ │ │     │ └── ms@2.0.0
    │ │ │     ├── fstream-ignore@1.0.5
    │ │ │     ├─┬ once@1.4.0
    │ │ │     │ └── wrappy@1.0.2
    │ │ │     ├─┬ readable-stream@2.2.9
    │ │ │     │ ├── buffer-shims@1.0.0
    │ │ │     │ ├── core-util-is@1.0.2
    │ │ │     │ ├── isarray@1.0.0
    │ │ │     │ ├── process-nextick-args@1.0.7
    │ │ │     │ ├── string_decoder@1.0.1
    │ │ │     │ └── util-deprecate@1.0.2
    │ │ │     └── uid-number@0.0.6
    │ │ ├── glob-parent@2.0.0
    │ │ ├── inherits@2.0.3
    │ │ ├─┬ is-binary-path@1.0.1
    │ │ │ └── binary-extensions@1.11.0
    │ │ ├── is-glob@2.0.1
    │ │ └─┬ readdirp@2.1.0
    │ │   └── set-immediate-shim@1.0.1
    │ ├── minimist@1.2.0
    │ ├── reflect-metadata@0.1.10
    │ ├── tsickle@0.24.1
    │ └── UNMET PEER DEPENDENCY typescript@2.4.2
    ├── @angular/core@5.0.2
    ├── @angular/forms@5.0.2
    ├── @angular/http@5.0.2
    ├── @angular/language-service@5.0.2
    ├── @angular/platform-browser@5.0.2
    ├── @angular/platform-browser-dynamic@5.0.2
    ├─┬ @angular/platform-server@5.0.2
    │ ├── domino@1.0.30
    │ └── xhr2@0.1.4
    ├── @angular/router@5.0.2
    ├── @angular/service-worker@5.0.2
    ├─┬ @compodoc/compodoc@1.0.4
    │ ├── 8fold-marked@0.3.8
    │ ├─┬ @compodoc/ngd-transformer@2.0.0-alpha.5
    │ │ ├── @compodoc/ngd-core@2.0.0-alpha.3
    │ │ ├── dot@1.1.2
    │ │ └── viz.js@1.8.0
    │ ├─┬ cheerio@1.0.0-rc.2
    │ │ ├─┬ css-select@1.2.0
    │ │ │ ├── boolbase@1.0.0
    │ │ │ ├── css-what@2.1.0
    │ │ │ ├── domutils@1.5.1
    │ │ │ └── nth-check@1.0.1
    │ │ ├─┬ dom-serializer@0.1.0
    │ │ │ └── domelementtype@1.1.3
    │ │ ├── entities@1.1.1
    │ │ ├─┬ htmlparser2@3.9.2
    │ │ │ ├── domelementtype@1.3.0
    │ │ │ └── domhandler@2.4.1
    │ │ └── parse5@3.0.3
    │ ├── colors@1.1.2
    │ ├── commander@2.11.0
    │ ├── findit@2.0.0
    │ ├─┬ fs-extra@4.0.2
    │ │ ├── jsonfile@4.0.0
    │ │ └── universalify@0.1.1
    │ ├─┬ glob@7.1.2
    │ │ ├── fs.realpath@1.0.0
    │ │ ├─┬ inflight@1.0.6
    │ │ │ └── wrappy@1.0.2
    │ │ └── once@1.4.0
    │ ├─┬ handlebars@4.0.11
    │ │ ├── async@1.5.2
    │ │ └── source-map@0.4.4
    │ ├── html-entities@1.2.1
    │ ├── json5@0.5.1
    │ ├─┬ live-server@1.1.0
    │ │ ├── colors@1.1.2
    │ │ ├─┬ connect@3.4.1
    │ │ │ └── finalhandler@0.4.1
    │ │ ├─┬ cors@2.8.4
    │ │ │ └── object-assign@4.1.1
    │ │ ├── event-stream@3.3.4
    │ │ ├─┬ faye-websocket@0.11.1
    │ │ │ └─┬ websocket-driver@0.7.0
    │ │ │   ├── http-parser-js@0.4.9
    │ │ │   └── websocket-extensions@0.1.3
    │ │ ├─┬ http-auth@2.4.11
    │ │ │ ├─┬ apache-crypt@1.1.2
    │ │ │ │ └── unix-crypt-td-js@1.0.0
    │ │ │ ├── apache-md5@1.0.6
    │ │ │ └── node-uuid@1.4.8
    │ │ ├─┬ morgan@1.9.0
    │ │ │ ├── basic-auth@2.0.0
    │ │ │ ├─┬ debug@2.6.9
    │ │ │ │ └── ms@2.0.0
    │ │ │ └── on-headers@1.0.1
    │ │ ├── object-assign@4.1.1
    │ │ ├─┬ opn@5.1.0
    │ │ │ └── is-wsl@1.1.0
    │ │ ├── proxy-middleware@0.15.0
    │ │ ├─┬ serve-index@1.9.1
    │ │ │ ├── batch@0.6.1
    │ │ │ └─┬ debug@2.6.9
    │ │ │   └── ms@2.0.0
    │ │ └─┬ watchr@2.6.0
    │ │   ├─┬ eachr@3.2.0
    │ │   │ └── editions@1.3.3
    │ │   ├── extendr@3.2.2
    │ │   ├── extract-opts@3.3.1
    │ │   ├─┬ ignorefs@1.2.0
    │ │   │ └── ignorepatterns@1.1.0
    │ │   ├── safefs@4.1.0
    │ │   ├─┬ scandirectory@2.5.0
    │ │   │ ├── safefs@3.2.2
    │ │   │ └─┬ taskgroup@4.3.1
    │ │   │   └─┬ csextends@1.1.1
    │ │   │     └── coffee-script@1.12.7
    │ │   ├─┬ taskgroup@5.0.1
    │ │   │ └── ambi@2.5.0
    │ │   └── typechecker@4.4.1
    │ ├── lodash@4.17.4
    │ ├── lunr@1.0.0
    │ ├─┬ os-name@2.0.1
    │ │ ├── macos-release@1.1.0
    │ │ └── win-release@1.1.1
    │ ├─┬ shelljs@0.7.8
    │ │ └── rechoir@0.6.2
    │ ├── traverse@0.6.6
    │ └─┬ ts-simple-ast@0.86.0
    │   ├── code-block-writer@4.2.1
    │   ├─┬ globby@6.1.0
    │   │ └── object-assign@4.1.1
    │   └── object-assign@4.1.1
    ├── @types/async@2.0.45
    ├─┬ @types/browser-sync@0.0.37
    │ ├── @types/chokidar@1.7.3
    │ └─┬ @types/micromatch@2.3.29
    │   └── @types/parse-glob@3.0.29
    ├─┬ @types/express@4.0.39
    │ ├── @types/body-parser@1.16.8
    │ ├── @types/express-serve-static-core@4.0.57
    │ └─┬ @types/serve-static@1.13.1
    │   └── @types/mime@2.0.0
    ├─┬ @types/gulp@4.0.5
    │ ├─┬ @types/undertaker@1.1.3
    │ │ └── @types/undertaker-registry@1.0.1
    │ └─┬ @types/vinyl-fs@2.4.8
    │   └── @types/glob-stream@3.1.31
    ├─┬ @types/gulp-filter@3.0.31
    │ ├── @types/minimatch@3.0.1
    │ └── @types/vinyl@2.0.1
    ├─┬ @types/gulp-htmlmin@1.3.31
    │ └─┬ @types/html-minifier@1.1.30
    │   ├── @types/clean-css@3.4.30
    │   ├── @types/relateurl@0.2.28
    │   └─┬ @types/uglify-js@2.6.29
    │     └── @types/source-map@0.5.2
    ├── @types/gulp-load-plugins@0.0.31
    ├── @types/gulp-protractor@1.0.31
    ├── @types/gulp-sass@0.0.31
    ├─┬ @types/gulp-util@3.0.34
    │ ├── @types/through2@2.0.33
    │ └─┬ chalk@2.3.0
    │   ├─┬ ansi-styles@3.2.0
    │   │ └─┬ color-convert@1.9.1
    │   │   └── color-name@1.1.3
    │   └── supports-color@4.5.0
    ├── @types/jasmine@2.8.2
    ├── @types/node@8.0.53
    ├─┬ @types/rimraf@2.0.2
    │ └── @types/glob@5.0.33
    ├── @types/run-sequence@0.0.30
    ├── @types/selenium-webdriver@3.0.8
    ├── @types/systemjs@0.20.6
    ├── @types/yargs@8.0.2
    ├── async@2.6.0
    ├─┬ autoprefixer@7.1.6
    │ ├─┬ browserslist@2.9.0
    │ │ └── electron-to-chromium@1.3.27
    │ ├── caniuse-lite@1.0.30000769
    │ ├── normalize-range@0.1.2
    │ ├── num2fraction@1.2.2
    │ ├─┬ postcss@6.0.14
    │ │ ├─┬ chalk@2.3.0
    │ │ │ └── ansi-styles@3.2.0
    │ │ ├── source-map@0.6.1
    │ │ └── supports-color@4.5.0
    │ └── postcss-value-parser@3.3.0
    ├─┬ browser-sync@2.18.13
    │ ├─┬ browser-sync-client@2.5.1
    │ │ └── fresh@0.3.0
    │ ├─┬ browser-sync-ui@0.6.3
    │ │ ├── async-each-series@0.1.1
    │ │ ├─┬ stream-throttle@0.1.3
    │ │ │ └── limiter@1.1.2
    │ │ └─┬ weinre@2.0.0-pre-I0Z7U9OV
    │ │   ├─┬ express@2.5.11
    │ │   │ ├─┬ connect@1.9.2
    │ │   │ │ └── formidable@1.0.17
    │ │   │ ├── mime@1.2.4
    │ │   │ ├── mkdirp@0.3.0
    │ │   │ └── qs@0.4.2
    │ │   └── underscore@1.7.0
    │ ├── bs-recipes@1.3.4
    │ ├─┬ connect@3.5.0
    │ │ ├─┬ debug@2.2.0
    │ │ │ └── ms@0.7.1
    │ │ ├── finalhandler@0.5.0
    │ │ └── utils-merge@1.0.0
    │ ├── dev-ip@1.0.1
    │ ├─┬ easy-extender@2.3.2
    │ │ └── lodash@3.10.1
    │ ├─┬ eazy-logger@3.0.2
    │ │ └─┬ tfunk@3.1.0
    │ │   └── object-path@0.9.2
    │ ├── emitter-steward@1.0.0
    │ ├─┬ fs-extra@3.0.1
    │ │ └── jsonfile@3.0.1
    │ ├─┬ http-proxy@1.15.2
    │ │ ├── eventemitter3@1.2.0
    │ │ └── requires-port@1.0.0
    │ ├── immutable@3.8.1
    │ ├─┬ localtunnel@1.8.3
    │ │ ├─┬ debug@2.6.8
    │ │ │ └── ms@2.0.0
    │ │ ├── openurl@1.1.1
    │ │ ├─┬ request@2.81.0
    │ │ │ ├── aws-sign2@0.6.0
    │ │ │ ├── aws4@1.6.0
    │ │ │ ├── caseless@0.12.0
    │ │ │ ├─┬ combined-stream@1.0.5
    │ │ │ │ └── delayed-stream@1.0.0
    │ │ │ ├── forever-agent@0.6.1
    │ │ │ ├─┬ form-data@2.1.4
    │ │ │ │ └── asynckit@0.4.0
    │ │ │ ├─┬ har-validator@4.2.1
    │ │ │ │ ├─┬ ajv@4.11.8
    │ │ │ │ │ └── co@4.6.0
    │ │ │ │ └── har-schema@1.0.5
    │ │ │ ├─┬ hawk@3.1.3
    │ │ │ │ ├── boom@2.10.1
    │ │ │ │ ├── cryptiles@2.0.5
    │ │ │ │ ├── hoek@2.16.3
    │ │ │ │ └── sntp@1.0.9
    │ │ │ ├─┬ http-signature@1.1.1
    │ │ │ │ ├── assert-plus@0.2.0
    │ │ │ │ ├─┬ jsprim@1.4.1
    │ │ │ │ │ ├── assert-plus@1.0.0
    │ │ │ │ │ ├── extsprintf@1.3.0
    │ │ │ │ │ ├── json-schema@0.2.3
    │ │ │ │ │ └─┬ verror@1.10.0
    │ │ │ │ │   └── assert-plus@1.0.0
    │ │ │ │ └─┬ sshpk@1.13.1
    │ │ │ │   ├── asn1@0.2.3
    │ │ │ │   ├── assert-plus@1.0.0
    │ │ │ │   ├── bcrypt-pbkdf@1.0.1
    │ │ │ │   ├─┬ dashdash@1.14.1
    │ │ │ │   │ └── assert-plus@1.0.0
    │ │ │ │   ├── ecc-jsbn@0.1.1
    │ │ │ │   ├─┬ getpass@0.1.7
    │ │ │ │   │ └── assert-plus@1.0.0
    │ │ │ │   ├── jsbn@0.1.1
    │ │ │ │   └── tweetnacl@0.14.5
    │ │ │ ├── is-typedarray@1.0.0
    │ │ │ ├── json-stringify-safe@5.0.1
    │ │ │ ├── oauth-sign@0.8.2
    │ │ │ ├── performance-now@0.2.0
    │ │ │ ├── qs@6.4.0
    │ │ │ ├── stringstream@0.0.5
    │ │ │ ├─┬ tough-cookie@2.3.3
    │ │ │ │ └── punycode@1.4.1
    │ │ │ ├── tunnel-agent@0.6.0
    │ │ │ └── uuid@3.1.0
    │ │ └─┬ yargs@3.29.0
    │ │   ├── camelcase@1.2.1
    │ │   ├── cliui@3.2.0
    │ │   └── window-size@0.1.4
    │ ├─┬ micromatch@2.3.11
    │ │ ├── arr-diff@2.0.0
    │ │ ├─┬ braces@1.8.5
    │ │ │ ├─┬ expand-range@1.8.2
    │ │ │ │ └─┬ fill-range@2.2.3
    │ │ │ │   ├── is-number@2.1.0
    │ │ │ │   ├── isobject@2.1.0
    │ │ │ │   ├─┬ randomatic@1.1.7
    │ │ │ │   │ ├─┬ is-number@3.0.0
    │ │ │ │   │ │ └── kind-of@3.2.2
    │ │ │ │   │ └── kind-of@4.0.0
    │ │ │ │   └── repeat-string@1.6.1
    │ │ │ ├── preserve@0.2.0
    │ │ │ └── repeat-element@1.1.2
    │ │ ├─┬ expand-brackets@0.1.5
    │ │ │ └── is-posix-bracket@0.1.1
    │ │ ├── extglob@0.3.2
    │ │ ├── filename-regex@2.0.1
    │ │ ├── is-extglob@1.0.0
    │ │ ├─┬ kind-of@3.2.2
    │ │ │ └── is-buffer@1.1.6
    │ │ ├── normalize-path@2.1.1
    │ │ ├─┬ object.omit@2.0.1
    │ │ │ └── is-extendable@0.1.1
    │ │ ├─┬ parse-glob@3.0.4
    │ │ │ ├── glob-base@0.3.0
    │ │ │ └── is-dotfile@1.0.3
    │ │ └─┬ regex-cache@0.4.4
    │ │   └─┬ is-equal-shallow@0.1.3
    │ │     └── is-primitive@2.0.0
    │ ├─┬ opn@4.0.2
    │ │ ├── object-assign@4.1.1
    │ │ └─┬ pinkie-promise@2.0.1
    │ │   └── pinkie@2.0.4
    │ ├─┬ portscanner@2.1.1
    │ │ ├── async@1.5.2
    │ │ └─┬ is-number-like@1.0.8
    │ │   └── lodash.isfinite@3.3.2
    │ ├── qs@6.2.1
    │ ├── resp-modifier@6.0.2
    │ ├── rx@4.1.0
    │ ├─┬ serve-index@1.8.0
    │ │ ├── batch@0.5.3
    │ │ ├─┬ http-errors@1.5.1
    │ │ │ └── setprototypeof@1.0.2
    │ │ └─┬ mime-types@2.1.17
    │ │   └── mime-db@1.30.0
    │ ├─┬ serve-static@1.12.2
    │ │ └─┬ send@0.15.2
    │ │   ├─┬ debug@2.6.4
    │ │   │ └── ms@0.7.3
    │ │   ├── fresh@0.5.0
    │ │   ├─┬ http-errors@1.6.2
    │ │   │ └── setprototypeof@1.0.3
    │ │   ├── mime@1.3.4
    │ │   └── ms@1.0.0
    │ ├── server-destroy@1.0.1
    │ ├─┬ socket.io@1.6.0
    │ │ ├─┬ debug@2.3.3
    │ │ │ └── ms@0.7.2
    │ │ ├─┬ engine.io@1.8.0
    │ │ │ ├── accepts@1.3.3
    │ │ │ ├── base64id@0.1.0
    │ │ │ ├─┬ debug@2.3.3
    │ │ │ │ └── ms@0.7.2
    │ │ │ ├─┬ engine.io-parser@1.3.1
    │ │ │ │ ├── after@0.8.1
    │ │ │ │ ├── arraybuffer.slice@0.0.6
    │ │ │ │ ├── base64-arraybuffer@0.1.5
    │ │ │ │ ├── blob@0.0.4
    │ │ │ │ ├─┬ has-binary@0.1.6
    │ │ │ │ │ └── isarray@0.0.1
    │ │ │ │ └── wtf-8@1.0.0
    │ │ │ └─┬ ws@1.1.1
    │ │ │   ├── options@0.0.6
    │ │ │   └── ultron@1.0.2
    │ │ ├─┬ has-binary@0.1.7
    │ │ │ └── isarray@0.0.1
    │ │ ├── object-assign@4.1.0
    │ │ ├─┬ socket.io-adapter@0.5.0
    │ │ │ └─┬ debug@2.3.3
    │ │ │   └── ms@0.7.2
    │ │ └─┬ socket.io-parser@2.3.1
    │ │   ├── component-emitter@1.1.2
    │ │   ├── isarray@0.0.1
    │ │   └── json3@3.3.2
    │ ├─┬ socket.io-client@1.6.0
    │ │ ├── backo2@1.0.2
    │ │ ├── component-bind@1.0.0
    │ │ ├── component-emitter@1.2.1
    │ │ ├─┬ debug@2.3.3
    │ │ │ └── ms@0.7.2
    │ │ ├─┬ engine.io-client@1.8.0
    │ │ │ ├── component-emitter@1.2.1
    │ │ │ ├── component-inherit@0.0.3
    │ │ │ ├─┬ debug@2.3.3
    │ │ │ │ └── ms@0.7.2
    │ │ │ ├── has-cors@1.1.0
    │ │ │ ├── parsejson@0.0.3
    │ │ │ ├── parseqs@0.0.5
    │ │ │ ├── xmlhttprequest-ssl@1.5.3
    │ │ │ └── yeast@0.1.2
    │ │ ├── indexof@0.0.1
    │ │ ├── object-component@0.0.3
    │ │ ├─┬ parseuri@0.0.5
    │ │ │ └─┬ better-assert@1.0.2
    │ │ │   └── callsite@1.0.0
    │ │ └── to-array@0.1.4
    │ ├── ua-parser-js@0.7.12
    │ └─┬ yargs@6.4.0
    │   ├── camelcase@3.0.0
    │   ├── cliui@3.2.0
    │   ├── os-locale@1.4.0
    │   ├─┬ read-pkg-up@1.0.1
    │   │ ├─┬ find-up@1.1.2
    │   │ │ └── path-exists@2.1.0
    │   │ └─┬ read-pkg@1.1.0
    │   │   ├── load-json-file@1.1.0
    │   │   └── path-type@1.1.0
    │   ├─┬ string-width@1.0.2
    │   │ ├── code-point-at@1.1.0
    │   │ └─┬ is-fullwidth-code-point@1.0.0
    │   │   └── number-is-nan@1.0.1
    │   ├── which-module@1.0.0
    │   ├── window-size@0.2.0
    │   └─┬ yargs-parser@4.2.1
    │     └── camelcase@3.0.0
    ├─┬ codelyzer@4.0.1
    │ ├── app-root-path@2.0.1
    │ ├─┬ css-selector-tokenizer@0.7.0
    │ │ ├── cssesc@0.1.0
    │ │ ├── fastparse@1.1.1
    │ │ └─┬ regexpu-core@1.0.0
    │ │   ├── regenerate@1.3.3
    │ │   ├── regjsgen@0.2.0
    │ │   └─┬ regjsparser@0.1.5
    │ │     └── jsesc@0.5.0
    │ ├── cssauron@1.4.0
    │ ├── semver-dsl@1.0.1
    │ └── sprintf-js@1.1.1
    ├── connect-history-api-fallback@1.5.0
    ├── core-js@2.5.1
    ├─┬ cssnano@3.10.0
    │ ├─┬ autoprefixer@6.7.7
    │ │ ├── browserslist@1.7.7
    │ │ └── caniuse-db@1.0.30000769
    │ ├── decamelize@1.2.0
    │ ├── defined@1.0.0
    │ ├─┬ has@1.0.1
    │ │ └── function-bind@1.1.1
    │ ├── object-assign@4.1.1
    │ ├─┬ postcss@5.2.18
    │ │ ├── js-base64@2.3.2
    │ │ └─┬ supports-color@3.2.3
    │ │   └── has-flag@1.0.0
    │ ├─┬ postcss-calc@5.3.1
    │ │ ├─┬ postcss@5.2.18
    │ │ │ └─┬ supports-color@3.2.3
    │ │ │   └── has-flag@1.0.0
    │ │ ├── postcss-message-helpers@2.0.0
    │ │ └─┬ reduce-css-calc@1.3.0
    │ │   ├── balanced-match@0.4.2
    │ │   ├── math-expression-evaluator@1.2.17
    │ │   └─┬ reduce-function-call@1.0.2
    │ │     └── balanced-match@0.4.2
    │ ├─┬ postcss-colormin@2.2.2
    │ │ ├─┬ colormin@1.1.2
    │ │ │ ├─┬ color@0.11.4
    │ │ │ │ └── color-string@0.3.0
    │ │ │ └── css-color-names@0.0.4
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-convert-values@2.6.1
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-discard-comments@2.0.4
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-discard-duplicates@2.1.0
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-discard-empty@2.1.0
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-discard-overridden@0.1.1
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-discard-unused@2.2.3
    │ │ ├─┬ postcss@5.2.18
    │ │ │ └─┬ supports-color@3.2.3
    │ │ │   └── has-flag@1.0.0
    │ │ └── uniqs@2.0.0
    │ ├─┬ postcss-filter-plugins@2.0.2
    │ │ ├─┬ postcss@5.2.18
    │ │ │ └─┬ supports-color@3.2.3
    │ │ │   └── has-flag@1.0.0
    │ │ └─┬ uniqid@4.1.1
    │ │   └── macaddress@0.2.8
    │ ├─┬ postcss-merge-idents@2.1.7
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-merge-longhand@2.0.2
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-merge-rules@2.1.2
    │ │ ├── browserslist@1.7.7
    │ │ ├─┬ caniuse-api@1.6.1
    │ │ │ ├── browserslist@1.7.7
    │ │ │ ├── lodash.memoize@4.1.2
    │ │ │ └── lodash.uniq@4.5.0
    │ │ ├─┬ postcss@5.2.18
    │ │ │ └─┬ supports-color@3.2.3
    │ │ │   └── has-flag@1.0.0
    │ │ ├─┬ postcss-selector-parser@2.2.3
    │ │ │ ├── flatten@1.0.2
    │ │ │ ├── indexes-of@1.0.1
    │ │ │ └── uniq@1.0.1
    │ │ └── vendors@1.0.1
    │ ├─┬ postcss-minify-font-values@1.0.5
    │ │ ├── object-assign@4.1.1
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-minify-gradients@1.0.5
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-minify-params@1.2.2
    │ │ ├── alphanum-sort@1.0.2
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-minify-selectors@2.1.1
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-normalize-charset@1.1.1
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-normalize-url@3.0.8
    │ │ ├── is-absolute-url@2.1.0
    │ │ ├─┬ normalize-url@1.9.1
    │ │ │ ├── object-assign@4.1.1
    │ │ │ ├── prepend-http@1.0.4
    │ │ │ ├─┬ query-string@4.3.4
    │ │ │ │ ├── object-assign@4.1.1
    │ │ │ │ └── strict-uri-encode@1.1.0
    │ │ │ └─┬ sort-keys@1.1.2
    │ │ │   └── is-plain-obj@1.1.0
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-ordered-values@2.2.3
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-reduce-idents@2.4.0
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-reduce-initial@1.0.1
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-reduce-transforms@1.0.4
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ ├─┬ postcss-svgo@2.1.6
    │ │ ├─┬ is-svg@2.1.0
    │ │ │ └── html-comment-regex@1.1.1
    │ │ ├─┬ postcss@5.2.18
    │ │ │ └─┬ supports-color@3.2.3
    │ │ │   └── has-flag@1.0.0
    │ │ └─┬ svgo@0.7.2
    │ │   ├─┬ coa@1.0.4
    │ │   │ └── q@1.5.1
    │ │   ├─┬ csso@2.3.2
    │ │   │ └── clap@1.2.3
    │ │   ├── sax@1.2.4
    │ │   └── whet.extend@0.9.9
    │ ├─┬ postcss-unique-selectors@2.0.2
    │ │ └─┬ postcss@5.2.18
    │ │   └─┬ supports-color@3.2.3
    │ │     └── has-flag@1.0.0
    │ └─┬ postcss-zindex@2.2.0
    │   └─┬ postcss@5.2.18
    │     └─┬ supports-color@3.2.3
    │       └── has-flag@1.0.0
    ├── deep-extend@0.5.0
    ├─┬ event-stream@3.3.4
    │ ├── duplexer@0.1.1
    │ ├── from@0.1.7
    │ ├── map-stream@0.1.0
    │ ├── pause-stream@0.0.11
    │ ├── split@0.3.3
    │ ├── stream-combiner@0.0.4
    │ └── through@2.3.8
    ├─┬ express@4.16.2
    │ ├─┬ accepts@1.3.4
    │ │ └── negotiator@0.6.1
    │ ├── array-flatten@1.1.1
    │ ├─┬ body-parser@1.18.2
    │ │ ├── bytes@3.0.0
    │ │ ├─┬ debug@2.6.9
    │ │ │ └── ms@2.0.0
    │ │ ├─┬ http-errors@1.6.2
    │ │ │ └── setprototypeof@1.0.3
    │ │ ├── iconv-lite@0.4.19
    │ │ ├── qs@6.5.1
    │ │ └── raw-body@2.3.2
    │ ├── content-disposition@0.5.2
    │ ├── content-type@1.0.4
    │ ├── cookie@0.3.1
    │ ├── cookie-signature@1.0.6
    │ ├─┬ debug@2.6.9
    │ │ └── ms@2.0.0
    │ ├── depd@1.1.1
    │ ├── encodeurl@1.0.1
    │ ├── escape-html@1.0.3
    │ ├── etag@1.8.1
    │ ├─┬ finalhandler@1.1.0
    │ │ └── unpipe@1.0.0
    │ ├── fresh@0.5.2
    │ ├── merge-descriptors@1.0.1
    │ ├── methods@1.1.2
    │ ├─┬ on-finished@2.3.0
    │ │ └── ee-first@1.1.1
    │ ├── parseurl@1.3.2
    │ ├── path-to-regexp@0.1.7
    │ ├─┬ proxy-addr@2.0.2
    │ │ ├── forwarded@0.1.2
    │ │ └── ipaddr.js@1.5.2
    │ ├── qs@6.5.1
    │ ├── range-parser@1.2.0
    │ ├── safe-buffer@5.1.1
    │ ├─┬ send@0.16.1
    │ │ ├── debug@2.6.9
    │ │ ├── destroy@1.0.4
    │ │ └── ms@2.0.0
    │ ├── setprototypeof@1.1.0
    │ ├── statuses@1.3.1
    │ ├─┬ type-is@1.6.15
    │ │ └── media-typer@0.3.0
    │ ├── utils-merge@1.0.1
    │ └── vary@1.1.2
    ├── express-history-api-fallback@2.2.1
    ├─┬ gulp@3.9.1
    │ ├── archy@1.0.0
    │ ├─┬ chalk@1.1.3
    │ │ ├── ansi-styles@2.2.1
    │ │ ├─┬ has-ansi@2.0.0
    │ │ │ └── ansi-regex@2.1.1
    │ │ ├── strip-ansi@3.0.1
    │ │ └── supports-color@2.0.0
    │ ├── deprecated@0.0.1
    │ ├── interpret@1.0.4
    │ ├─┬ liftoff@2.3.0
    │ │ ├─┬ fined@1.1.0
    │ │ │ ├── expand-tilde@2.0.2
    │ │ │ ├─┬ is-plain-object@2.0.4
    │ │ │ │ └── isobject@3.0.1
    │ │ │ ├─┬ object.defaults@1.1.0
    │ │ │ │ ├── array-each@1.0.1
    │ │ │ │ ├── array-slice@1.0.0
    │ │ │ │ ├── for-own@1.0.0
    │ │ │ │ └── isobject@3.0.1
    │ │ │ ├─┬ object.pick@1.3.0
    │ │ │ │ └── isobject@3.0.1
    │ │ │ └─┬ parse-filepath@1.0.1
    │ │ │   ├─┬ is-absolute@0.2.6
    │ │ │   │ └─┬ is-relative@0.2.1
    │ │ │   │   └─┬ is-unc-path@0.1.2
    │ │ │   │     └── unc-path-regex@0.1.2
    │ │ │   ├── map-cache@0.2.2
    │ │ │   └─┬ path-root@0.1.1
    │ │ │     └── path-root-regex@0.1.2
    │ │ ├── flagged-respawn@0.3.2
    │ │ ├── lodash.isplainobject@4.0.6
    │ │ ├── lodash.isstring@4.0.1
    │ │ └── lodash.mapvalues@4.6.0
    │ ├─┬ orchestrator@0.3.8
    │ │ ├─┬ end-of-stream@0.1.5
    │ │ │ └── once@1.3.3
    │ │ ├── sequencify@0.0.7
    │ │ └── stream-consume@0.1.0
    │ ├── pretty-hrtime@1.0.3
    │ ├── semver@4.3.6
    │ ├─┬ v8flags@2.1.1
    │ │ └── user-home@1.1.1
    │ └─┬ vinyl-fs@0.3.14
    │   ├── defaults@1.0.3
    │   ├─┬ glob-stream@3.1.18
    │   │ ├── glob@4.5.3
    │   │ ├─┬ glob2base@0.0.12
    │   │ │ └── find-index@0.1.1
    │   │ ├── minimatch@2.0.10
    │   │ ├── ordered-read-streams@0.1.0
    │   │ ├─┬ through2@0.6.5
    │   │ │ └─┬ readable-stream@1.0.34
    │   │ │   ├── isarray@0.0.1
    │   │ │   └── string_decoder@0.10.31
    │   │ └── unique-stream@1.0.0
    │   ├─┬ glob-watcher@0.0.6
    │   │ └─┬ gaze@0.5.2
    │   │   └─┬ globule@0.1.0
    │   │     ├─┬ glob@3.1.21
    │   │     │ ├── graceful-fs@1.2.3
    │   │     │ └── inherits@1.0.2
    │   │     ├── lodash@1.0.2
    │   │     └─┬ minimatch@0.2.14
    │   │       ├── lru-cache@2.7.3
    │   │       └── sigmund@1.0.1
    │   ├─┬ graceful-fs@3.0.11
    │   │ └── natives@1.1.0
    │   ├─┬ strip-bom@1.0.0
    │   │ ├── first-chunk-stream@1.0.0
    │   │ └── is-utf8@0.2.1
    │   ├─┬ through2@0.6.5
    │   │ └─┬ readable-stream@1.0.34
    │   │   ├── isarray@0.0.1
    │   │   └── string_decoder@0.10.31
    │   └─┬ vinyl@0.4.6
    │     └── clone@0.2.0
    ├─┬ gulp-cached@1.1.1
    │ ├── lodash.defaults@4.2.0
    │ └─┬ through2@2.0.3
    │   └── xtend@4.0.1
    ├─┬ gulp-cheerio@0.6.2
    │ ├─┬ cheerio@0.22.0
    │ │ ├── lodash.assignin@4.2.0
    │ │ ├── lodash.bind@4.2.1
    │ │ ├── lodash.filter@4.6.0
    │ │ ├── lodash.flatten@4.4.0
    │ │ ├── lodash.foreach@4.5.0
    │ │ ├── lodash.map@4.6.0
    │ │ ├── lodash.merge@4.6.0
    │ │ ├── lodash.pick@4.4.0
    │ │ ├── lodash.reduce@4.6.0
    │ │ ├── lodash.reject@4.6.0
    │ │ └── lodash.some@4.6.0
    │ ├─┬ gulp-util@2.2.20
    │ │ ├─┬ chalk@0.5.1
    │ │ │ ├── ansi-styles@1.1.0
    │ │ │ ├─┬ has-ansi@0.1.0
    │ │ │ │ └── ansi-regex@0.2.1
    │ │ │ ├── strip-ansi@0.3.0
    │ │ │ └── supports-color@0.2.0
    │ │ ├── dateformat@1.0.12
    │ │ ├── lodash._reinterpolate@2.4.1
    │ │ ├─┬ lodash.template@2.4.1
    │ │ │ ├── lodash._escapestringchar@2.4.1
    │ │ │ ├─┬ lodash.defaults@2.4.1
    │ │ │ │ └── lodash._objecttypes@2.4.1
    │ │ │ ├─┬ lodash.escape@2.4.1
    │ │ │ │ ├─┬ lodash._escapehtmlchar@2.4.1
    │ │ │ │ │ └── lodash._htmlescapes@2.4.1
    │ │ │ │ └─┬ lodash._reunescapedhtml@2.4.1
    │ │ │ │   └── lodash.keys@2.4.1
    │ │ │ ├─┬ lodash.keys@2.4.1
    │ │ │ │ ├── lodash._isnative@2.4.1
    │ │ │ │ ├── lodash._shimkeys@2.4.1
    │ │ │ │ └── lodash.isobject@2.4.1
    │ │ │ ├── lodash.templatesettings@2.4.1
    │ │ │ └─┬ lodash.values@2.4.1
    │ │ │   └── lodash.keys@2.4.1
    │ │ ├── minimist@0.2.0
    │ │ ├─┬ through2@0.5.1
    │ │ │ └── xtend@3.0.0
    │ │ └── vinyl@0.2.3
    │ └─┬ through2@0.6.5
    │   ├─┬ readable-stream@1.0.34
    │   │ ├── isarray@0.0.1
    │   │ └── string_decoder@0.10.31
    │   └── xtend@4.0.1
    ├─┬ gulp-concat@2.6.1
    │ ├── concat-with-sourcemaps@1.0.4
    │ └─┬ vinyl@2.1.0
    │   ├── clone@2.1.1
    │   ├── clone-buffer@1.0.0
    │   ├── clone-stats@1.0.0
    │   ├── cloneable-readable@1.0.0
    │   ├── remove-trailing-separator@1.1.0
    │   └── replace-ext@1.0.0
    ├─┬ gulp-concat-css@2.3.0
    │ ├─┬ lodash.defaults@3.1.2
    │ │ ├─┬ lodash.assign@3.2.0
    │ │ │ ├── lodash._baseassign@3.2.0
    │ │ │ └─┬ lodash._createassigner@3.1.1
    │ │ │   └── lodash._bindcallback@3.0.1
    │ │ └── lodash.restparam@3.6.1
    │ ├─┬ parse-import@2.0.0
    │ │ └─┬ get-imports@1.0.0
    │ │   └── import-regex@1.1.0
    │ ├─┬ rework@1.0.1
    │ │ └── convert-source-map@0.3.5
    │ ├─┬ rework-import@2.1.0
    │ │ ├─┬ globby@2.1.0
    │ │ │ ├── async@1.5.2
    │ │ │ └── glob@5.0.15
    │ │ └─┬ url-regex@3.2.0
    │ │   └── ip-regex@1.0.3
    │ ├─┬ rework-plugin-url@1.1.0
    │ │ └─┬ rework-plugin-function@1.0.2
    │ │   └── rework-visit@1.0.0
    │ └─┬ through2@1.1.1
    │   └─┬ readable-stream@1.1.14
    │     ├── isarray@0.0.1
    │     └── string_decoder@0.10.31
    ├─┬ gulp-filter@5.0.1
    │ ├─┬ multimatch@2.1.0
    │ │ └── array-union@1.0.2
    │ └── streamfilter@1.0.5
    ├─┬ gulp-htmlmin@3.0.0
    │ ├── bufferstreams@1.1.1
    │ ├─┬ html-minifier@3.5.6
    │ │ ├─┬ camel-case@3.0.0
    │ │ │ ├─┬ no-case@2.3.2
    │ │ │ │ └── lower-case@1.1.4
    │ │ │ └── upper-case@1.1.3
    │ │ ├── clean-css@4.1.9
    │ │ ├── he@1.1.1
    │ │ ├─┬ ncname@1.0.0
    │ │ │ └── xml-char-classes@1.0.0
    │ │ ├── param-case@2.1.1
    │ │ ├── relateurl@0.2.7
    │ │ └─┬ uglify-js@3.1.10
    │ │   └── source-map@0.6.1
    │ ├── object-assign@4.1.1
    │ ├─┬ readable-stream@2.3.3
    │ │ ├── core-util-is@1.0.2
    │ │ ├── isarray@1.0.0
    │ │ ├── process-nextick-args@1.0.7
    │ │ ├── string_decoder@1.0.3
    │ │ └── util-deprecate@1.0.2
    │ └── tryit@1.0.3
    ├─┬ gulp-inject@4.3.0
    │ ├── arrify@1.0.1
    │ ├── escape-string-regexp@1.0.5
    │ ├─┬ group-array@0.3.3
    │ │ ├── arr-flatten@1.1.0
    │ │ ├─┬ for-own@0.1.5
    │ │ │ └── for-in@1.0.2
    │ │ ├── get-value@2.0.6
    │ │ ├─┬ split-string@1.0.1
    │ │ │ └── extend-shallow@2.0.1
    │ │ └─┬ union-value@0.2.4
    │ │   ├── arr-union@3.1.0
    │ │   └─┬ set-value@0.4.3
    │ │     └── to-object-path@0.3.0
    │ └─┬ stream-to-array@2.3.0
    │   └── any-promise@1.3.0
    ├─┬ gulp-inline-ng2-template@4.0.0
    │ ├── clone@1.0.3
    │ ├─┬ es6-templates@0.2.3
    │ │ └─┬ recast@0.11.23
    │ │   ├── ast-types@0.9.6
    │ │   └── esprima@3.1.3
    │ ├── extend@3.0.1
    │ └── isarray@0.0.1
    ├─┬ gulp-load-plugins@1.5.0
    │ ├── array-unique@0.2.1
    │ ├─┬ fancy-log@1.3.0
    │ │ └── time-stamp@1.1.0
    │ ├─┬ findup-sync@0.4.3
    │ │ ├─┬ detect-file@0.1.0
    │ │ │ └── fs-exists-sync@0.1.0
    │ │ └─┬ resolve-dir@0.1.1
    │ │   ├── expand-tilde@1.2.2
    │ │   └─┬ global-modules@0.2.3
    │ │     ├── global-prefix@0.1.5
    │ │     └── is-windows@0.2.0
    │ ├─┬ gulplog@1.0.0
    │ │ └── glogg@1.0.0
    │ ├─┬ has-gulplog@0.1.0
    │ │ └── sparkles@1.0.0
    │ └─┬ resolve@1.5.0
    │   └── path-parse@1.0.5
    ├── gulp-plumber@1.1.0
    ├─┬ gulp-postcss@7.0.0
    │ ├─┬ postcss-load-config@1.2.0
    │ │ ├─┬ cosmiconfig@2.2.2
    │ │ │ ├── is-directory@0.3.1
    │ │ │ ├── object-assign@4.1.1
    │ │ │ ├─┬ parse-json@2.2.0
    │ │ │ │ └─┬ error-ex@1.3.1
    │ │ │ │   └── is-arrayish@0.2.1
    │ │ │ └── require-from-string@1.2.1
    │ │ ├── object-assign@4.1.1
    │ │ ├─┬ postcss-load-options@1.2.0
    │ │ │ └── object-assign@4.1.1
    │ │ └─┬ postcss-load-plugins@2.3.0
    │ │   └── object-assign@4.1.1
    │ └── vinyl-sourcemaps-apply@0.2.1
    ├─┬ gulp-progeny@0.4.0
    │ └─┬ progeny@0.11.0
    │   └─┬ fs-mode@1.0.1
    │     └─┬ cbify@1.0.0
    │       └── fn-args@1.0.0
    ├─┬ gulp-protractor@4.1.0
    │ └── dargs@5.1.0
    ├── gulp-rename@1.2.2
    ├─┬ gulp-replace@0.6.1
    │ ├─┬ istextorbinary@1.0.2
    │ │ ├── binaryextensions@1.0.1
    │ │ └── textextensions@1.0.2
    │ └─┬ replacestream@4.0.3
    │   └── object-assign@4.1.1
    ├─┬ gulp-sass@3.1.0
    │ ├── lodash.clonedeep@4.5.0
    │ └─┬ node-sass@4.7.2
    │   ├── async-foreach@0.1.3
    │   ├─┬ cross-spawn@3.0.1
    │   │ └─┬ lru-cache@4.1.1
    │   │   ├── pseudomap@1.0.2
    │   │   └── yallist@2.1.2
    │   ├─┬ gaze@1.1.2
    │   │ └── globule@1.2.0
    │   ├── get-stdin@4.0.1
    │   ├── in-publish@2.0.0
    │   ├── lodash.assign@4.2.0
    │   ├── lodash.mergewith@4.6.0
    │   ├─┬ meow@3.7.0
    │   │ ├─┬ camelcase-keys@2.1.0
    │   │ │ └── camelcase@2.1.1
    │   │ ├─┬ loud-rejection@1.6.0
    │   │ │ └─┬ currently-unhandled@0.4.1
    │   │ │   └── array-find-index@1.0.2
    │   │ ├── map-obj@1.0.1
    │   │ ├─┬ normalize-package-data@2.4.0
    │   │ │ ├── hosted-git-info@2.5.0
    │   │ │ ├── is-builtin-module@1.0.0
    │   │ │ └─┬ validate-npm-package-license@3.0.1
    │   │ │   ├─┬ spdx-correct@1.0.2
    │   │ │   │ └── spdx-license-ids@1.2.2
    │   │ │   └── spdx-expression-parse@1.0.4
    │   │ ├── object-assign@4.1.1
    │   │ ├─┬ redent@1.0.0
    │   │ │ ├── indent-string@2.1.0
    │   │ │ └── strip-indent@1.0.1
    │   │ └── trim-newlines@1.0.0
    │   ├── nan@2.8.0
    │   ├─┬ node-gyp@3.6.2
    │   │ ├── fstream@1.0.11
    │   │ ├── osenv@0.1.4
    │   │ ├── semver@5.3.0
    │   │ └─┬ tar@2.2.1
    │   │   └── block-stream@0.0.9
    │   ├─┬ npmlog@4.1.2
    │   │ ├─┬ are-we-there-yet@1.1.4
    │   │ │ └── delegates@1.0.0
    │   │ ├── console-control-strings@1.1.0
    │   │ └─┬ gauge@2.7.4
    │   │   ├── aproba@1.2.0
    │   │   ├── has-unicode@2.0.1
    │   │   ├── object-assign@4.1.1
    │   │   └── wide-align@1.1.2
    │   ├─┬ request@2.79.0
    │   │ ├── caseless@0.11.0
    │   │ ├─┬ har-validator@2.0.6
    │   │ │ └─┬ is-my-json-valid@2.16.1
    │   │ │   ├── generate-function@2.0.0
    │   │ │   ├─┬ generate-object-property@1.2.0
    │   │ │   │ └── is-property@1.0.2
    │   │ │   └── jsonpointer@4.0.1
    │   │ ├── qs@6.3.2
    │   │ ├── tunnel-agent@0.4.3
    │   │ └── uuid@3.1.0
    │   ├─┬ sass-graph@2.2.4
    │   │ ├─┬ scss-tokenizer@0.2.3
    │   │ │ └── source-map@0.4.4
    │   │ └─┬ yargs@7.1.0
    │   │   ├── camelcase@3.0.0
    │   │   ├── cliui@3.2.0
    │   │   └── yargs-parser@5.0.0
    │   ├── stdout-stream@1.4.0
    │   └─┬ true-case-path@1.0.2
    │     └── glob@6.0.4
    ├─┬ gulp-sourcemaps@2.6.1
    │ ├─┬ @gulp-sourcemaps/identity-map@1.0.1
    │ │ └── acorn@5.2.1
    │ ├── @gulp-sourcemaps/map-sources@1.0.0
    │ ├── acorn@4.0.13
    │ ├── convert-source-map@1.5.0
    │ ├─┬ css@2.2.1
    │ │ ├── source-map@0.1.43
    │ │ ├─┬ source-map-resolve@0.3.1
    │ │ │ ├── atob@1.1.3
    │ │ │ ├── resolve-url@0.2.1
    │ │ │ └── source-map-url@0.3.0
    │ │ └── urix@0.1.0
    │ ├─┬ debug-fabulous@0.2.1
    │ │ ├─┬ debug@3.1.0
    │ │ │ └── ms@2.0.0
    │ │ ├─┬ memoizee@0.4.11
    │ │ │ ├── d@1.0.0
    │ │ │ ├── es6-weak-map@2.0.2
    │ │ │ ├── event-emitter@0.3.5
    │ │ │ ├── is-promise@2.1.0
    │ │ │ ├── lru-queue@0.1.0
    │ │ │ ├── next-tick@1.0.0
    │ │ │ └── timers-ext@0.1.2
    │ │ └── object-assign@4.1.1
    │ ├── detect-newline@2.1.0
    │ ├── graceful-fs@4.1.11
    │ ├── strip-bom-string@1.0.0
    │ └─┬ vinyl@1.2.0
    │   └── clone-stats@0.0.1
    ├── gulp-template@4.0.0
    ├─┬ gulp-tslint@8.1.2
    │ └── map-stream@0.0.7
    ├─┬ gulp-typescript@3.2.3
    │ └─┬ vinyl-fs@2.4.4
    │   ├─┬ duplexify@3.5.1
    │   │ ├── end-of-stream@1.4.0
    │   │ └── stream-shift@1.0.0
    │   ├─┬ glob-stream@5.3.5
    │   │ ├── glob@5.0.15
    │   │ ├─┬ glob-parent@3.1.0
    │   │ │ └─┬ is-glob@3.1.0
    │   │ │   └── is-extglob@2.1.1
    │   │ ├── ordered-read-streams@0.3.0
    │   │ ├─┬ through2@0.6.5
    │   │ │ └─┬ readable-stream@1.0.34
    │   │ │   ├── isarray@0.0.1
    │   │ │   └── string_decoder@0.10.31
    │   │ ├── to-absolute-glob@0.1.1
    │   │ └─┬ unique-stream@2.2.1
    │   │   └─┬ json-stable-stringify@1.0.1
    │   │     └── jsonify@0.0.0
    │   ├─┬ gulp-sourcemaps@1.6.0
    │   │ └── convert-source-map@1.5.0
    │   ├── is-valid-glob@0.3.0
    │   ├── lazystream@1.0.0
    │   ├── lodash.isequal@4.5.0
    │   ├── object-assign@4.1.1
    │   ├── strip-bom@2.0.0
    │   ├── strip-bom-stream@1.0.0
    │   ├── through2-filter@2.0.0
    │   ├── vali-date@1.0.0
    │   └── vinyl@1.2.0
    ├─┬ gulp-uglify@3.0.0
    │ ├── make-error-cause@1.2.2
    │ └─┬ uglify-js@3.1.10
    │   └── source-map@0.6.1
    ├─┬ gulp-util@3.0.8
    │ ├── array-differ@1.0.0
    │ ├── array-uniq@1.0.3
    │ ├── beeper@1.1.1
    │ ├── dateformat@2.2.0
    │ ├── lodash._reescape@3.0.0
    │ ├── lodash._reevaluate@3.0.0
    │ ├── lodash._reinterpolate@3.0.0
    │ ├─┬ lodash.template@3.6.2
    │ │ ├── lodash._basecopy@3.0.1
    │ │ ├── lodash._basetostring@3.0.1
    │ │ ├── lodash._basevalues@3.0.0
    │ │ ├── lodash._isiterateecall@3.0.9
    │ │ ├─┬ lodash.escape@3.2.0
    │ │ │ └── lodash._root@3.0.1
    │ │ ├─┬ lodash.keys@3.1.2
    │ │ │ ├── lodash._getnative@3.9.1
    │ │ │ ├── lodash.isarguments@3.1.0
    │ │ │ └── lodash.isarray@3.0.4
    │ │ └── lodash.templatesettings@3.1.1
    │ ├─┬ multipipe@0.1.2
    │ │ └─┬ duplexer2@0.0.2
    │ │   └─┬ readable-stream@1.1.14
    │ │     ├── isarray@0.0.1
    │ │     └── string_decoder@0.10.31
    │ ├── object-assign@3.0.0
    │ ├── replace-ext@0.0.1
    │ └── vinyl@0.5.3
    ├─┬ gulp-watch@4.3.11
    │ ├── anymatch@1.3.2
    │ ├─┬ glob-parent@3.1.0
    │ │ ├─┬ is-glob@3.1.0
    │ │ │ └── is-extglob@2.1.1
    │ │ └── path-dirname@1.0.2
    │ ├── object-assign@4.1.1
    │ ├── path-is-absolute@1.0.1
    │ ├── vinyl@1.2.0
    │ └─┬ vinyl-file@2.0.0
    │   ├── pify@2.3.0
    │   ├─┬ strip-bom-stream@2.0.0
    │   │ └── first-chunk-stream@2.0.0
    │   └── vinyl@1.2.0
    ├── intl@1.2.5
    ├─┬ is-ci@1.0.10
    │ └── ci-info@1.1.2
    ├── isstream@0.1.2
    ├── jasmine-core@2.8.0
    ├── jasmine-spec-reporter@4.2.1
    ├─┬ karma@1.7.1
    │ ├── bluebird@3.5.1
    │ ├── combine-lists@1.0.1
    │ ├─┬ connect@3.6.5
    │ │ ├─┬ debug@2.6.9
    │ │ │ └── ms@2.0.0
    │ │ ├── finalhandler@1.0.6
    │ │ └── utils-merge@1.0.1
    │ ├── di@0.0.1
    │ ├─┬ dom-serialize@2.2.1
    │ │ ├── custom-event@1.0.1
    │ │ ├── ent@2.2.0
    │ │ └── void-elements@2.0.1
    │ ├─┬ expand-braces@0.1.2
    │ │ ├── array-slice@0.2.3
    │ │ └─┬ braces@0.1.5
    │ │   └─┬ expand-range@0.1.1
    │ │     ├── is-number@0.1.1
    │ │     └── repeat-string@0.2.2
    │ ├── isbinaryfile@3.0.2
    │ ├── lodash@3.10.1
    │ ├─┬ log4js@0.6.38
    │ │ ├─┬ readable-stream@1.0.34
    │ │ │ ├── isarray@0.0.1
    │ │ │ └── string_decoder@0.10.31
    │ │ └── semver@4.3.6
    │ ├── mime@1.4.1
    │ ├─┬ optimist@0.6.1
    │ │ ├── minimist@0.0.10
    │ │ └── wordwrap@0.0.3
    │ ├── qjobs@1.1.5
    │ ├─┬ socket.io@1.7.3
    │ │ ├─┬ debug@2.3.3
    │ │ │ └── ms@0.7.2
    │ │ ├─┬ engine.io@1.8.3
    │ │ │ ├── accepts@1.3.3
    │ │ │ ├── base64id@1.0.0
    │ │ │ ├─┬ debug@2.3.3
    │ │ │ │ └── ms@0.7.2
    │ │ │ ├─┬ engine.io-parser@1.3.2
    │ │ │ │ └── after@0.8.2
    │ │ │ └── ws@1.1.2
    │ │ ├── object-assign@4.1.0
    │ │ └─┬ socket.io-client@1.7.3
    │ │   ├── component-emitter@1.2.1
    │ │   ├─┬ debug@2.3.3
    │ │   │ └── ms@0.7.2
    │ │   └─┬ engine.io-client@1.8.3
    │ │     └─┬ debug@2.3.3
    │ │       └── ms@0.7.2
    │ ├── tmp@0.0.31
    │ └─┬ useragent@2.2.1
    │   ├── lru-cache@2.2.4
    │   └── tmp@0.0.30
    ├─┬ karma-chrome-launcher@2.2.0
    │ ├─┬ fs-access@1.0.1
    │ │ └── null-check@1.0.0
    │ └─┬ which@1.3.0
    │   └── isexe@2.0.0
    ├─┬ karma-coverage@1.1.1
    │ ├── dateformat@1.0.12
    │ ├─┬ istanbul@0.4.5
    │ │ ├── abbrev@1.0.9
    │ │ ├── async@1.5.2
    │ │ ├─┬ escodegen@1.8.1
    │ │ │ ├── estraverse@1.9.3
    │ │ │ ├─┬ optionator@0.8.2
    │ │ │ │ ├── deep-is@0.1.3
    │ │ │ │ ├── fast-levenshtein@2.0.6
    │ │ │ │ ├── levn@0.3.0
    │ │ │ │ ├── prelude-ls@1.1.2
    │ │ │ │ ├── type-check@0.3.2
    │ │ │ │ └── wordwrap@1.0.0
    │ │ │ └── source-map@0.2.0
    │ │ ├── esprima@2.7.3
    │ │ ├── glob@5.0.15
    │ │ ├─┬ js-yaml@3.7.0
    │ │ │ └─┬ argparse@1.0.9
    │ │ │   └── sprintf-js@1.0.3
    │ │ ├─┬ nopt@3.0.6
    │ │ │ └── abbrev@1.1.1
    │ │ ├── resolve@1.1.7
    │ │ ├─┬ supports-color@3.2.3
    │ │ │ └── has-flag@1.0.0
    │ │ └── wordwrap@1.0.0
    │ └── lodash@3.10.1
    ├── karma-jasmine@1.1.0
    ├─┬ karma-mocha-reporter@2.2.5
    │ ├─┬ chalk@2.3.0
    │ │ ├── ansi-styles@3.2.0
    │ │ └── supports-color@4.5.0
    │ ├─┬ log-symbols@2.1.0
    │ │ └─┬ chalk@2.3.0
    │ │   ├── ansi-styles@3.2.0
    │ │   └── supports-color@4.5.0
    │ └─┬ strip-ansi@4.0.0
    │   └── ansi-regex@3.0.0
    ├── karma-remap-istanbul@0.6.0
    ├── merge-stream@1.0.1
    ├─┬ minimatch@3.0.4
    │ └─┬ brace-expansion@1.1.8
    │   ├── balanced-match@1.0.0
    │   └── concat-map@0.0.1
    ├── open@0.0.5
    ├─┬ protractor@5.2.0
    │ ├── @types/node@6.0.92
    │ ├── @types/q@0.0.32
    │ ├── @types/selenium-webdriver@2.53.43
    │ ├── blocking-proxy@0.0.5
    │ ├─┬ jasmine@2.8.0
    │ │ └── exit@0.1.2
    │ ├── jasminewd2@2.2.0
    │ ├── q@1.4.1
    │ ├─┬ saucelabs@1.3.0
    │ │ └─┬ https-proxy-agent@1.0.0
    │ │   └─┬ agent-base@2.1.1
    │ │     └── semver@5.0.3
    │ ├─┬ selenium-webdriver@3.6.0
    │ │ └─┬ jszip@3.1.5
    │ │   ├── core-js@2.3.0
    │ │   ├── es6-promise@3.0.2
    │ │   ├─┬ lie@3.1.1
    │ │   │ └── immediate@3.0.6
    │ │   ├── pako@1.0.6
    │ │   └─┬ readable-stream@2.0.6
    │ │     └── string_decoder@0.10.31
    │ ├── source-map-support@0.4.18
    │ ├─┬ webdriver-js-extender@1.0.0
    │ │ ├── @types/selenium-webdriver@2.53.43
    │ │ └─┬ selenium-webdriver@2.53.3
    │ │   ├── adm-zip@0.4.4
    │ │   ├── tmp@0.0.24
    │ │   └─┬ xml2js@0.4.4
    │ │     └── sax@0.6.1
    │ └─┬ webdriver-manager@12.0.6
    │   ├── adm-zip@0.4.7
    │   ├─┬ del@2.2.2
    │   │ ├── globby@5.0.0
    │   │ ├── is-path-cwd@1.0.0
    │   │ ├─┬ is-path-in-cwd@1.0.0
    │   │ │ └─┬ is-path-inside@1.0.0
    │   │ │   └── path-is-inside@1.0.2
    │   │ └── object-assign@4.1.1
    │   ├── ini@1.3.5
    │   └─┬ xml2js@0.4.19
    │     └── xmlbuilder@9.0.4
    ├─┬ remap-istanbul@0.9.5
    │ ├── amdefine@1.0.1
    │ ├─┬ gulp-util@3.0.7
    │ │ └── dateformat@1.0.12
    │ └─┬ through2@2.0.1
    │   └─┬ readable-stream@2.0.6
    │     └── string_decoder@0.10.31
    ├── rimraf@2.6.2
    ├── rollup@0.51.8
    ├─┬ rollup-plugin-commonjs@8.2.6
    │ ├── acorn@5.2.1
    │ ├── estree-walker@0.5.0
    │ ├─┬ magic-string@0.22.4
    │ │ └── vlq@0.2.3
    │ └─┬ rollup-pluginutils@2.0.1
    │   └── estree-walker@0.3.1
    ├── rollup-plugin-includepaths@0.2.2
    ├─┬ rollup-plugin-node-resolve@3.0.0
    │ ├─┬ browser-resolve@1.11.2
    │ │ └── resolve@1.1.7
    │ ├── builtin-modules@1.1.1
    │ └── is-module@1.0.0
    ├── run-sequence@2.2.0
    ├─┬ rxjs@5.5.2
    │ └── symbol-observable@1.0.4
    ├── semver@5.4.1
    ├── serve-static@1.13.1
    ├── slash@1.0.0
    ├─┬ source-map-explorer@1.5.0
    │ ├── btoa@1.1.2
    │ ├── convert-source-map@1.5.0
    │ ├── docopt@0.6.2
    │ └── underscore@1.8.3
    ├─┬ supports-color@5.0.0
    │ └── has-flag@2.0.0
    ├── systemjs@0.20.19
    ├─┬ systemjs-builder@0.16.12
    │ ├─┬ babel-core@6.26.0
    │ │ ├─┬ babel-generator@6.26.0
    │ │ │ ├─┬ detect-indent@4.0.0
    │ │ │ │ └─┬ repeating@2.0.1
    │ │ │ │   └── is-finite@1.0.2
    │ │ │ ├── jsesc@1.3.0
    │ │ │ └── trim-right@1.0.1
    │ │ ├── babel-helpers@6.24.1
    │ │ ├── babel-messages@6.23.0
    │ │ ├─┬ babel-register@6.26.0
    │ │ │ └── home-or-tmp@2.0.0
    │ │ ├─┬ babel-runtime@6.26.0
    │ │ │ └── regenerator-runtime@0.11.0
    │ │ ├── babel-template@6.26.0
    │ │ ├─┬ babel-traverse@6.26.0
    │ │ │ ├─┬ debug@2.6.9
    │ │ │ │ └── ms@2.0.0
    │ │ │ ├── globals@9.18.0
    │ │ │ └─┬ invariant@2.2.2
    │ │ │   └── loose-envify@1.3.1
    │ │ ├─┬ babel-types@6.26.0
    │ │ │ └── to-fast-properties@1.0.3
    │ │ ├── babylon@6.18.0
    │ │ ├── convert-source-map@1.5.0
    │ │ ├─┬ debug@2.6.9
    │ │ │ └── ms@2.0.0
    │ │ └── private@0.1.8
    │ ├── babel-plugin-syntax-dynamic-import@6.18.0
    │ ├── babel-plugin-transform-amd-system-wrapper@0.3.7
    │ ├── babel-plugin-transform-cjs-system-wrapper@0.6.2
    │ ├─┬ babel-plugin-transform-es2015-modules-systemjs@6.24.1
    │ │ └── babel-helper-hoist-variables@6.24.1
    │ ├── babel-plugin-transform-global-system-wrapper@0.3.4
    │ ├── babel-plugin-transform-system-register@0.0.1
    │ ├── data-uri-to-buffer@0.0.4
    │ ├─┬ es6-template-strings@2.0.1
    │ │ ├─┬ es5-ext@0.10.35
    │ │ │ ├── es6-iterator@2.0.3
    │ │ │ └── es6-symbol@3.1.1
    │ │ └── esniff@1.1.0
    │ ├─┬ mkdirp@0.5.1
    │ │ └── minimist@0.0.8
    │ ├── rollup@0.36.4
    │ ├─┬ systemjs@0.19.47
    │ │ └── when@3.7.8
    │ ├─┬ traceur@0.0.105
    │ │ ├── commander@2.9.0
    │ │ ├── glob@5.0.15
    │ │ ├── semver@4.3.6
    │ │ └─┬ source-map-support@0.2.10
    │ │   └── source-map@0.1.32
    │ └─┬ uglify-js@2.8.29
    │   ├── uglify-to-browserify@1.0.2
    │   └─┬ yargs@3.10.0
    │     ├─┬ cliui@2.1.0
    │     │ ├─┬ center-align@0.1.3
    │     │ │ ├─┬ align-text@0.1.4
    │     │ │ │ └── longest@1.0.1
    │     │ │ └── lazy-cache@1.0.4
    │     │ ├── right-align@0.1.3
    │     │ └── wordwrap@0.0.2
    │     └── window-size@0.1.0
    ├─┬ temp@0.8.3
    │ ├── os-tmpdir@1.0.2
    │ └── rimraf@2.2.8
    ├─┬ tildify@1.2.0
    │ └── os-homedir@1.0.2
    ├─┬ traceur@0.0.111
    │ ├─┬ commander@2.9.0
    │ │ └── graceful-readlink@1.0.1
    │ ├── glob@5.0.15
    │ ├── rsvp@3.6.2
    │ ├── semver@4.3.6
    │ └─┬ source-map-support@0.2.10
    │   └── source-map@0.1.32
    ├─┬ ts-node@3.3.0
    │ ├─┬ chalk@2.3.0
    │ │ ├── ansi-styles@3.2.0
    │ │ └── supports-color@4.5.0
    │ ├── diff@3.4.0
    │ ├── make-error@1.3.0
    │ ├─┬ tsconfig@6.0.0
    │ │ ├── strip-bom@3.0.0
    │ │ └── strip-json-comments@2.0.1
    │ ├─┬ v8flags@3.0.1
    │ │ └─┬ homedir-polyfill@1.0.1
    │ │   └── parse-passwd@1.0.0
    │ └── yn@2.0.0
    ├─┬ tslint@5.8.0
    │ ├─┬ babel-code-frame@6.26.0
    │ │ ├── esutils@2.0.2
    │ │ └── js-tokens@3.0.2
    │ ├─┬ chalk@2.3.0
    │ │ ├── ansi-styles@3.2.0
    │ │ └── supports-color@4.5.0
    │ └── tsutils@2.12.2
    ├── UNMET PEER DEPENDENCY typescript@2.6.1
    ├─┬ walk@2.3.9
    │ └── foreachasync@3.0.0
    ├─┬ yargs@10.0.3
    │ ├─┬ cliui@3.2.0
    │ │ ├── string-width@1.0.2
    │ │ └── wrap-ansi@2.1.0
    │ ├─┬ find-up@2.1.0
    │ │ └─┬ locate-path@2.0.0
    │ │   ├─┬ p-locate@2.0.0
    │ │   │ └── p-limit@1.1.0
    │ │   └── path-exists@3.0.0
    │ ├── get-caller-file@1.0.2
    │ ├─┬ os-locale@2.1.0
    │ │ ├─┬ execa@0.7.0
    │ │ │ ├─┬ cross-spawn@5.1.0
    │ │ │ │ ├── lru-cache@4.1.1
    │ │ │ │ └─┬ shebang-command@1.2.0
    │ │ │ │   └── shebang-regex@1.0.0
    │ │ │ ├── get-stream@3.0.0
    │ │ │ ├── is-stream@1.1.0
    │ │ │ ├─┬ npm-run-path@2.0.2
    │ │ │ │ └── path-key@2.0.1
    │ │ │ ├── p-finally@1.0.0
    │ │ │ ├── signal-exit@3.0.2
    │ │ │ └── strip-eof@1.0.0
    │ │ ├─┬ lcid@1.0.0
    │ │ │ └── invert-kv@1.0.0
    │ │ └─┬ mem@1.1.0
    │ │   └── mimic-fn@1.1.0
    │ ├── require-directory@2.1.1
    │ ├── require-main-filename@1.0.1
    │ ├── set-blocking@2.0.0
    │ ├─┬ string-width@2.1.1
    │ │ ├── is-fullwidth-code-point@2.0.0
    │ │ └─┬ strip-ansi@4.0.0
    │ │   └── ansi-regex@3.0.0
    │ ├── which-module@2.0.0
    │ ├── y18n@3.2.1
    │ └─┬ yargs-parser@8.0.0
    │   └── camelcase@4.1.0
    └── zone.js@0.8.18
    
    npm WARN @angular/compiler-cli@5.0.2 requires a peer of typescript@>=2.4.2 <2.5 but none was installed.
    npm WARN tsickle@0.24.1 requires a peer of typescript@2.4.2 but none was installed.
    ┌──REBUILDING SASS PIECES...
    
    > node-sass@4.7.2 install /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/node_modules/node-sass
    > node scripts/install.js
    
    node-sass build Binary found at /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/node_modules/node-sass/vendor/darwin-x64-51/binding.node
    
    > node-sass@4.7.2 postinstall /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/node_modules/node-sass
    > node scripts/build.js
    
    Binary found at /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/node_modules/node-sass/vendor/darwin-x64-51/binding.node
    Testing binary
    Binary is fine
    node-sass@4.7.2 /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed/node_modules/node-sass
    ┌──INSTALLING PM2...
    /Users/bradyhouse/.nvm/versions/node/v7.9.0/bin/pm2 -> /Users/bradyhouse/.nvm/versions/node/v7.9.0/lib/node_modules/pm2/bin/pm2
    /Users/bradyhouse/.nvm/versions/node/v7.9.0/bin/pm2-dev -> /Users/bradyhouse/.nvm/versions/node/v7.9.0/lib/node_modules/pm2/bin/pm2-dev
    /Users/bradyhouse/.nvm/versions/node/v7.9.0/bin/pm2-runtime -> /Users/bradyhouse/.nvm/versions/node/v7.9.0/lib/node_modules/pm2/bin/pm2-runtime
    /Users/bradyhouse/.nvm/versions/node/v7.9.0/bin/pm2-docker -> /Users/bradyhouse/.nvm/versions/node/v7.9.0/lib/node_modules/pm2/bin/pm2-docker
    /Users/bradyhouse/.nvm/versions/node/v7.9.0/lib
    └── pm2@2.7.2
    
    ┌──STARTING WEBDRIVER...
    [PM2] Applying action restartProcessId on app [npm](ids: 0)
    [PM2] [npm](0) ✓
    [PM2] Process successfully started
    ┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────┬───────────┬────────┬──────────┐
    │ App name │ id │ mode │ pid   │ status │ restart │ uptime │ cpu │ mem       │ user   │ watching │
    ├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────┼───────────┼────────┼──────────┤
    │ npm      │ 0  │ fork │ 56763 │ online │ 48      │ 0s     │ 0%  │ 15.6 MB   │ bradyhouse │ disabled │
    └──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────┴───────────┴────────┴──────────┘
     Use `pm2 show <id|name>` to get more details about an app
    ┌──STARTING E2E SERVER...
    [PM2] Applying action restartProcessId on app [npm](ids: 0)
    [PM2] [npm](0) ✓
    [PM2] Process successfully started
    ┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────┬───────────┬────────┬──────────┐
    │ App name │ id │ mode │ pid   │ status │ restart │ uptime │ cpu │ mem       │ user   │ watching │
    ├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────┼───────────┼────────┼──────────┤
    │ npm      │ 0  │ fork │ 56792 │ online │ 49      │ 0s     │ 2%  │ 15.2 MB   │ bradyhouse │ disabled │
    └──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────┴───────────┴────────┴──────────┘
     Use `pm2 show <id|name>` to get more details about an app
    ┌──SLEEPING FOR 60 SECONDS...
    \n[#############################################################]
    ┌──STARTING E2E ...
    
    > angular-seed@1.0.0 e2e /Users/bradyhouse/github/house/fiddles/bash/fiddle-0098-NodeProcessManager/angular-seed
    > protractor
    
    (node:56925) DeprecationWarning: os.tmpDir() is deprecated. Use os.tmpdir() instead.
    [07:46:12] I/launcher - Running 1 instances of WebDriver
    [07:46:12] I/direct - Using ChromeDriver directly...
    Started
    ........
    
    
    8 specs, 0 failures
    Finished in 12.837 seconds
    
    [07:46:25] I/launcher - 0 instance(s) of WebDriver still running
    [07:46:25] I/launcher - chrome #01 passed
    ┌──CLEANUP ...
    [PM2] Applying action stopProcessId on app [all](ids: 0)
    [PM2] [npm](0) ✓
    ┌──────────┬────┬──────┬─────┬─────────┬─────────┬────────┬─────┬────────┬────────┬──────────┐
    │ App name │ id │ mode │ pid │ status  │ restart │ uptime │ cpu │ mem    │ user   │ watching │
    ├──────────┼────┼──────┼─────┼─────────┼─────────┼────────┼─────┼────────┼────────┼──────────┤
    │ npm      │ 0  │ fork │ 0   │ stopped │ 49      │ 0      │ 0%  │ 0 B    │ bradyhouse │ disabled │
    └──────────┴────┴──────┴─────┴─────────┴─────────┴────────┴─────┴────────┴────────┴──────────┘
     Use `pm2 show <id|name>` to get more details about an app
    └──E2E COMPLETE



### Tags

bash, node, angular-seed, e2e, pm2, sleep, protractor, webdriver-manager
