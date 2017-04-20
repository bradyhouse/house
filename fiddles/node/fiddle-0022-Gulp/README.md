fiddle-0022-Gulp
======

### Title

Gulp Hello World


### Creation Date

04-17-17


### Location

Chicago, IL


### Issue

[Issue 154](https://github.com/bradyhouse/house/issues/154)


### Description

Fiddle exploring how to use gulp (v4.0) to `build` a simple web app comprised of multiple css and js files. Note,
this POC is adapted from the example discussed in Chapter 2 of Travis Maynard's book [Getting Started with Gulp](#).


### Use Case

To install and run the fiddle, from the root [scripts](../../scripts), directory enter the command: `./fiddle.sh "start"
 "node" "0022"`.  This should produce the following output in the console.

    npm WARN package.json fiddle-0022-Gulp@0.0.0 No repository field.
    npm WARN deprecated minimatch@2.0.10: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
    npm WARN deprecated find-file@0.1.4: Use the globby package instead
    npm WARN deprecated minimatch@0.2.14: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
    npm WARN deprecated graceful-fs@1.2.3: graceful-fs v3.0.0 and before will fail on node releases >= v7.0. Please update to graceful-fs@^4.0.0 as soon as possible. Use 'npm ls graceful-fs' to find it in the tree.
    |
    > pngquant-bin@3.1.1 postinstall /Users/bradyhouse/github/house/fiddles/node/fiddle-0022-Gulp/node_modules/gulp-imagemin/node_modules/imagemin/node_modules/imagemin-pngquant/node_modules/pngquant-bin
    > node lib/install.js
    
      ✔ pngquant pre-build test passed successfully
    
    > optipng-bin@3.1.4 postinstall /Users/bradyhouse/github/house/fiddles/node/fiddle-0022-Gulp/node_modules/gulp-imagemin/node_modules/imagemin/node_modules/imagemin-optipng/node_modules/optipng-bin
    > node lib/install.js
    
      ✔ optipng pre-build test passed successfully
    
    > gifsicle@3.0.4 postinstall /Users/bradyhouse/github/house/fiddles/node/fiddle-0022-Gulp/node_modules/gulp-imagemin/node_modules/imagemin/node_modules/imagemin-gifsicle/node_modules/gifsicle
    > node lib/install.js
    
      ✔ gifsicle pre-build test passed successfully
    
    > jpegtran-bin@3.2.0 postinstall /Users/bradyhouse/github/house/fiddles/node/fiddle-0022-Gulp/node_modules/gulp-imagemin/node_modules/imagemin/node_modules/imagemin-jpegtran/node_modules/jpegtran-bin
    > node lib/install.js
    
      ✔ jpegtran pre-build test passed successfully
    
    > fsevents@1.1.1 install /Users/bradyhouse/github/house/fiddles/node/fiddle-0022-Gulp/node_modules/gulp/node_modules/glob-watcher/node_modules/chokidar/node_modules/fsevents
    > node install
    
    [fsevents] Success: "/Users/bradyhouse/github/house/fiddles/node/fiddle-0022-Gulp/node_modules/gulp/node_modules/glob-watcher/node_modules/chokidar/node_modules/fsevents/lib/binding/Release/node-v46-darwin-x64/fse.node" already installed
    Pass --update-binary to reinstall or --build-from-source to recompile
    gulp-concat@2.6.1 node_modules/gulp-concat
    ├── vinyl@2.0.1 (replace-ext@1.0.0, clone-buffer@1.0.0, is-stream@1.1.0, remove-trailing-separator@1.0.1, clone-stats@1.0.0, clone@1.0.2, cloneable-readable@1.0.0)
    ├── concat-with-sourcemaps@1.0.4 (source-map@0.5.6)
    └── through2@2.0.3 (xtend@4.0.1, readable-stream@2.2.9)
    
    gulp-uglify@1.5.4 node_modules/gulp-uglify
    ├── uglify-save-license@0.4.1
    ├── deap@1.0.0
    ├── isobject@2.1.0 (isarray@1.0.0)
    ├── vinyl-sourcemaps-apply@0.2.1 (source-map@0.5.6)
    ├── fancy-log@1.3.0 (time-stamp@1.0.1, chalk@1.1.3)
    ├── through2@2.0.3 (xtend@4.0.1, readable-stream@2.2.9)
    ├── gulp-util@3.0.8 (array-differ@1.0.0, lodash._reescape@3.0.0, array-uniq@1.0.3, lodash._reevaluate@3.0.0, object-assign@3.0.0, lodash._reinterpolate@3.0.0, beeper@1.1.1, dateformat@2.0.0, replace-ext@0.0.1, has-gulplog@0.1.0, minimist@1.2.0, vinyl@0.5.3, chalk@1.1.3, gulplog@1.0.0, lodash.template@3.6.2, multipipe@0.1.2)
    └── uglify-js@2.6.4 (async@0.2.10, uglify-to-browserify@1.0.2, source-map@0.5.6, yargs@3.10.0)
    
    gulp-jshint@1.12.0 node_modules/gulp-jshint
    ├── minimatch@2.0.10 (brace-expansion@1.1.7)
    ├── through2@0.6.5 (xtend@4.0.1, readable-stream@1.0.34)
    ├── rcloader@0.1.2 (lodash@2.4.2, rcfinder@0.1.9)
    ├── gulp-util@3.0.8 (array-differ@1.0.0, array-uniq@1.0.3, beeper@1.1.1, lodash._reinterpolate@3.0.0, lodash._reescape@3.0.0, lodash._reevaluate@3.0.0, object-assign@3.0.0, dateformat@2.0.0, replace-ext@0.0.1, has-gulplog@0.1.0, fancy-log@1.3.0, minimist@1.2.0, vinyl@0.5.3, chalk@1.1.3, lodash.template@3.6.2, gulplog@1.0.0, through2@2.0.3, multipipe@0.1.2)
    ├── lodash@3.10.1
    └── jshint@2.9.4 (strip-json-comments@1.0.4, exit@0.1.2, console-browserify@1.1.0, minimatch@3.0.3, shelljs@0.3.0, cli@1.0.1, htmlparser2@3.8.3, lodash@3.7.0)
    
    gulp-myth@1.1.0 node_modules/gulp-myth
    ├── object-assign@4.1.1
    ├── through2@2.0.3 (xtend@4.0.1, readable-stream@2.2.9)
    ├── gulp-util@3.0.8 (array-differ@1.0.0, object-assign@3.0.0, lodash._reescape@3.0.0, array-uniq@1.0.3, beeper@1.1.1, lodash._reinterpolate@3.0.0, lodash._reevaluate@3.0.0, dateformat@2.0.0, replace-ext@0.0.1, fancy-log@1.3.0, has-gulplog@0.1.0, minimist@1.2.0, vinyl@0.5.3, chalk@1.1.3, gulplog@1.0.0, lodash.template@3.6.2, multipipe@0.1.2)
    └── myth@1.5.0 (rework-custom-media@0.1.1, node-watch@0.3.5, is-browser@2.0.1, pad-component@0.0.1, write-file-stdout@0.0.2, rework-rebeccapurple@1.0.1, colors@0.6.2, rework-font-variant@1.0.1, read-file-stdin@0.2.1, commander@2.9.0, rework-hex-alpha@1.0.0, rework-vars@3.1.1, rework-calc@1.1.0, clone-component@0.2.2, to-space-case@0.1.3, to-slug-case@0.1.2, postcss@4.1.16, rework-color-function@1.2.1, rework-import@1.2.1, rework@1.0.1, autoprefixer-core@5.2.1)
    
    gulp-imagemin@1.2.1 node_modules/gulp-imagemin
    ├── object-assign@1.0.0
    ├── chalk@0.5.1 (ansi-styles@1.1.0, escape-string-regexp@1.0.5, supports-color@0.2.0, strip-ansi@0.3.0, has-ansi@0.1.0)
    ├── through2-concurrent@0.3.1 (through2@0.6.5)
    ├── gulp-util@3.0.8 (array-differ@1.0.0, array-uniq@1.0.3, object-assign@3.0.0, lodash._reescape@3.0.0, beeper@1.1.1, lodash._reinterpolate@3.0.0, lodash._reevaluate@3.0.0, dateformat@2.0.0, replace-ext@0.0.1, fancy-log@1.3.0, has-gulplog@0.1.0, minimist@1.2.0, vinyl@0.5.3, chalk@1.1.3, gulplog@1.0.0, lodash.template@3.6.2, through2@2.0.3, multipipe@0.1.2)
    ├── pretty-bytes@1.0.4 (get-stdin@4.0.1, meow@3.7.0)
    └── imagemin@2.2.1 (get-stdin@3.0.2, optional@0.1.3, vinyl@0.4.6, stream-combiner@0.2.2, through2@0.6.5, concat-stream@1.6.0, meow@2.1.0, vinyl-fs@0.3.14, imagemin-svgo@3.0.3, imagemin-pngquant@4.2.2, imagemin-optipng@4.3.0, imagemin-gifsicle@4.2.0, imagemin-jpegtran@4.3.2)
    
    gulp@4.0.0-alpha.2 node_modules/gulp
    ├── vinyl-fs@2.4.4 (vali-date@1.0.0, is-valid-glob@0.3.0, merge-stream@1.0.1, object-assign@4.1.1, lodash.isequal@4.5.0, graceful-fs@4.1.11, lazystream@1.0.0, strip-bom-stream@1.0.0, strip-bom@2.0.0, through2-filter@2.0.0, through2@2.0.3, gulp-sourcemaps@1.6.0, vinyl@1.2.0, readable-stream@2.2.9, mkdirp@0.5.1, duplexify@3.5.0, glob-stream@5.3.5)
    ├── gulp-cli@1.2.2 (lodash.isplainobject@4.0.6, lodash.isfunction@3.0.8, lodash.isstring@4.0.1, mute-stdout@1.0.0, lodash.sortby@4.7.0, interpret@1.0.2, pretty-hrtime@1.0.3, archy@1.0.0, tildify@1.2.0, fancy-log@1.3.0, v8flags@2.0.12, chalk@1.1.3, gulplog@1.0.0, wreck@6.3.0, semver-greatest-satisfied-range@1.0.0, yargs@3.32.0, matchdep@1.0.1, liftoff@2.3.0)
    ├── undertaker@1.1.0 (arr-flatten@1.0.3, undertaker-registry@1.0.0, last-run@1.1.1, object.defaults@0.3.0, object.reduce@0.1.7, arr-map@2.0.2, collection-map@0.1.0, bach@1.1.0, es6-weak-map@2.0.2)
    └── glob-watcher@3.1.0 (lodash.debounce@4.0.8, lodash.assignwith@4.2.0, async-done@1.2.2, chokidar@1.6.1)

    [18:22:17] Using gulpfile ~/github/house/fiddles/node/fiddle-0022-Gulp/gulpfile.js
    [18:22:17] Starting 'default'...
    [18:22:17] Starting 'styles'...
    [18:22:17] Starting 'scripts'...
    [18:22:17] Starting 'images'...
    [18:22:17] Finished 'styles' after 19 ms
    [18:22:17] Finished 'scripts' after 29 ms
    [18:22:17] Finished 'images' after 32 ms
    [18:22:17] Finished 'default' after 35 ms
    [18:22:18] gulp-imagemin: Minified 1 image (saved 68.87 kB - 12.3%)

This will result in  [dist](dist) directory:

    dist
    ├── all.css
    ├── all.js
    └── img
        └── surface.jpg


To test drive the resulting html page, from the fiddle root directory run `live-server`.  NOTE - If you not have installed live-server
you can do so using the command `fiddle.sh install mac live-server`.


### Tags

node.js, hamony, gulp, gulp-concat, gulp-imagemin, gulp-jshint, gulp-myth, gulp-uglify, gulp-cli#4.0
