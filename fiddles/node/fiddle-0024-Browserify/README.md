fiddle-0024-Browserify
======

### Title

Browserify


### Creation Date

04-18-17


### Location

Chicago, IL


### Issue

[Issue 156](https://github.com/bradyhouse/house/issues/156)


### Description

Fiddle exploring how to use [gulp (v4.0)](http://gulpjs.com/), [browser-sync](https://www.browsersync.io/), and 
[browserify](http://browserify.org/) in-concert to create a dynamic build environment. Note, this POC is adapted from 
the example discussed in Chapter 5 of Travis Maynard's book [Getting Started with Gulp](#).


### Use Case

To install and run the fiddle, from the root [scripts](../../scripts), directory enter the command: `./fiddle.sh "start"
 "node" "0024"`.  This should produce the following output in the console.

    {{ ʕ・ɭ・ʔ }}
    FIDDLE.SH
    FIDDLE-START.SH
    ├────STARTSERVER
    npm WARN package.json fiddle-0023-GulpStaticServer@0.0.0 No repository field.
    npm WARN deprecated minimatch@2.0.10: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
    npm WARN deprecated find-file@0.1.4: Use the globby package instead
    npm WARN deprecated minimatch@0.2.14: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
    npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
    npm WARN deprecated graceful-fs@1.2.3: graceful-fs v3.0.0 and before will fail on node releases >= v7.0. Please update to graceful-fs@^4.0.0 as soon as possible. Use 'npm ls graceful-fs' to find it in the tree.
    |
    > pngquant-bin@3.1.1 postinstall /Users/bradyhouse/github/house/fiddles/node/fiddle-0024-Browserify/node_modules/gulp-imagemin/node_modules/imagemin/node_modules/imagemin-pngquant/node_modules/pngquant-bin
    > node lib/install.js
    
      ✔ pngquant pre-build test passed successfully
    
    > jpegtran-bin@3.2.0 postinstall /Users/bradyhouse/github/house/fiddles/node/fiddle-0024-Browserify/node_modules/gulp-imagemin/node_modules/imagemin/node_modules/imagemin-jpegtran/node_modules/jpegtran-bin
    > node lib/install.js
    
      ✔ jpegtran pre-build test passed successfully
    
    > optipng-bin@3.1.4 postinstall /Users/bradyhouse/github/house/fiddles/node/fiddle-0024-Browserify/node_modules/gulp-imagemin/node_modules/imagemin/node_modules/imagemin-optipng/node_modules/optipng-bin
    > node lib/install.js
    
      ✔ optipng pre-build test passed successfully
    
    > gifsicle@3.0.4 postinstall /Users/bradyhouse/github/house/fiddles/node/fiddle-0024-Browserify/node_modules/gulp-imagemin/node_modules/imagemin/node_modules/imagemin-gifsicle/node_modules/gifsicle
    > node lib/install.js
    
      ✔ gifsicle pre-build test passed successfully
    
    > fsevents@1.1.1 install /Users/bradyhouse/github/house/fiddles/node/fiddle-0024-Browserify/node_modules/gulp/node_modules/glob-watcher/node_modules/chokidar/node_modules/fsevents
    > node install
    
    [fsevents] Success: "/Users/bradyhouse/github/house/fiddles/node/fiddle-0024-Browserify/node_modules/gulp/node_modules/glob-watcher/node_modules/chokidar/node_modules/fsevents/lib/binding/Release/node-v46-darwin-x64/fse.node" already installed
    Pass --update-binary to reinstall or --build-from-source to recompile
    
    > fsevents@1.1.1 install /Users/bradyhouse/github/house/fiddles/node/fiddle-0024-Browserify/node_modules/browser-sync/node_modules/chokidar/node_modules/fsevents
    > node install
    
    [fsevents] Success: "/Users/bradyhouse/github/house/fiddles/node/fiddle-0024-Browserify/node_modules/browser-sync/node_modules/chokidar/node_modules/fsevents/lib/binding/Release/node-v46-darwin-x64/fse.node" already installed
    Pass --update-binary to reinstall or --build-from-source to recompile
    connect@3.6.1 node_modules/connect
    ├── utils-merge@1.0.0
    ├── parseurl@1.3.1
    ├── debug@2.6.3 (ms@0.7.2)
    └── finalhandler@1.0.1 (escape-html@1.0.3, encodeurl@1.0.1, unpipe@1.0.0, statuses@1.3.1, on-finished@2.3.0)
    
    serve-static@1.12.1 node_modules/serve-static
    ├── escape-html@1.0.3
    ├── parseurl@1.3.1
    ├── encodeurl@1.0.1
    └── send@0.15.1 (ms@0.7.2, destroy@1.0.4, etag@1.8.0, range-parser@1.2.0, fresh@0.5.0, statuses@1.3.1, mime@1.3.4, depd@1.1.0, debug@2.6.1, on-finished@2.3.0, http-errors@1.6.1)
    
    vinyl-source-stream@1.1.0 node_modules/vinyl-source-stream
    ├── vinyl@0.4.6 (clone-stats@0.0.1, clone@0.2.0)
    └── through2@0.6.5 (xtend@4.0.1, readable-stream@1.0.34)
    
    gulp-concat@2.6.1 node_modules/gulp-concat
    ├── vinyl@2.0.2 (replace-ext@1.0.0, clone-buffer@1.0.0, is-stream@1.1.0, remove-trailing-separator@1.0.1, clone-stats@1.0.0, clone@1.0.2, cloneable-readable@1.0.0)
    ├── concat-with-sourcemaps@1.0.4 (source-map@0.5.6)
    └── through2@2.0.3 (xtend@4.0.1, readable-stream@2.2.9)
    
    gulp-uglify@1.5.4 node_modules/gulp-uglify
    ├── uglify-save-license@0.4.1
    ├── deap@1.0.0
    ├── isobject@2.1.0 (isarray@1.0.0)
    ├── vinyl-sourcemaps-apply@0.2.1 (source-map@0.5.6)
    ├── fancy-log@1.3.0 (time-stamp@1.0.1, chalk@1.1.3)
    ├── through2@2.0.3 (xtend@4.0.1, readable-stream@2.2.9)
    ├── gulp-util@3.0.8 (array-differ@1.0.0, lodash._reescape@3.0.0, array-uniq@1.0.3, lodash._reinterpolate@3.0.0, lodash._reevaluate@3.0.0, object-assign@3.0.0, beeper@1.1.1, dateformat@2.0.0, replace-ext@0.0.1, has-gulplog@0.1.0, minimist@1.2.0, vinyl@0.5.3, chalk@1.1.3, gulplog@1.0.0, lodash.template@3.6.2, multipipe@0.1.2)
    └── uglify-js@2.6.4 (async@0.2.10, uglify-to-browserify@1.0.2, source-map@0.5.6, yargs@3.10.0)
    
    gulp-jshint@1.12.0 node_modules/gulp-jshint
    ├── minimatch@2.0.10 (brace-expansion@1.1.7)
    ├── through2@0.6.5 (xtend@4.0.1, readable-stream@1.0.34)
    ├── rcloader@0.1.2 (lodash@2.4.2, rcfinder@0.1.9)
    ├── gulp-util@3.0.8 (array-differ@1.0.0, array-uniq@1.0.3, lodash._reescape@3.0.0, beeper@1.1.1, lodash._reevaluate@3.0.0, object-assign@3.0.0, lodash._reinterpolate@3.0.0, dateformat@2.0.0, replace-ext@0.0.1, has-gulplog@0.1.0, fancy-log@1.3.0, minimist@1.2.0, vinyl@0.5.3, lodash.template@3.6.2, gulplog@1.0.0, chalk@1.1.3, through2@2.0.3, multipipe@0.1.2)
    ├── lodash@3.10.1
    └── jshint@2.9.4 (strip-json-comments@1.0.4, exit@0.1.2, console-browserify@1.1.0, minimatch@3.0.3, shelljs@0.3.0, cli@1.0.1, htmlparser2@3.8.3, lodash@3.7.0)
    
    browserify@14.3.0 node_modules/browserify
    ├── tty-browserify@0.0.0
    ├── https-browserify@1.0.0
    ├── duplexer2@0.1.4
    ├── path-browserify@0.0.0
    ├── punycode@1.4.1
    ├── string_decoder@0.10.31
    ├── constants-browserify@1.0.0
    ├── inherits@2.0.3
    ├── os-browserify@0.1.2
    ├── htmlescape@1.1.1
    ├── through2@2.0.3
    ├── process@0.11.9
    ├── stream-browserify@2.0.1
    ├── cached-path-relative@1.0.1
    ├── assert@1.4.1
    ├── defined@1.0.0
    ├── domain-browser@1.1.7
    ├── xtend@4.0.1
    ├── read-only-stream@2.0.0
    ├── querystring-es3@0.2.1
    ├── timers-browserify@1.4.2
    ├── deps-sort@2.0.0
    ├── parents@1.0.1 (path-platform@0.11.15)
    ├── events@1.1.1
    ├── vm-browserify@0.0.4 (indexof@0.0.1)
    ├── has@1.0.1 (function-bind@1.1.0)
    ├── console-browserify@1.1.0 (date-now@0.1.4)
    ├── util@0.10.3 (inherits@2.0.1)
    ├── shell-quote@1.6.1 (array-filter@0.0.1, array-map@0.0.0, jsonify@0.0.0, array-reduce@0.0.0)
    ├── subarg@1.0.0 (minimist@1.2.0)
    ├── url@0.11.0 (punycode@1.3.2, querystring@0.2.0)
    ├── readable-stream@2.2.9 (buffer-shims@1.0.0, string_decoder@1.0.0, process-nextick-args@1.0.7, util-deprecate@1.0.2, core-util-is@1.0.2, isarray@1.0.0)
    ├── labeled-stream-splicer@2.0.0 (isarray@0.0.1, stream-splicer@2.0.0)
    ├── shasum@1.0.2 (sha.js@2.4.8, json-stable-stringify@0.0.1)
    ├── concat-stream@1.5.2 (typedarray@0.0.6, readable-stream@2.0.6)
    ├── stream-http@2.7.0 (builtin-status-codes@3.0.0, to-arraybuffer@1.0.1)
    ├── glob@7.1.1 (path-is-absolute@1.0.1, fs.realpath@1.0.0, inflight@1.0.6, once@1.4.0, minimatch@3.0.3)
    ├── buffer@5.0.6 (ieee754@1.1.8, base64-js@1.2.0)
    ├── JSONStream@1.3.1 (through@2.3.8, jsonparse@1.3.0)
    ├── browserify-zlib@0.1.4 (pako@0.2.9)
    ├── syntax-error@1.3.0 (acorn@4.0.11)
    ├── resolve@1.3.3 (path-parse@1.0.5)
    ├── browser-pack@6.0.2 (umd@3.0.1, combine-source-map@0.7.2)
    ├── browser-resolve@1.11.2 (resolve@1.1.7)
    ├── insert-module-globals@7.0.1 (is-buffer@1.1.5, combine-source-map@0.7.2, lexical-scope@1.2.0)
    ├── crypto-browserify@3.11.0 (create-hmac@1.1.4, pbkdf2@3.0.9, randombytes@2.0.3, create-hash@1.1.2, diffie-hellman@5.0.2, create-ecdh@4.0.0, browserify-cipher@1.0.0, browserify-sign@4.0.4, public-encrypt@4.0.0)
    └── module-deps@4.1.1 (stream-combiner2@1.1.1, detective@4.5.0)
    
    gulp-imagemin@1.2.1 node_modules/gulp-imagemin
    ├── object-assign@1.0.0
    ├── chalk@0.5.1 (ansi-styles@1.1.0, escape-string-regexp@1.0.5, supports-color@0.2.0, strip-ansi@0.3.0, has-ansi@0.1.0)
    ├── through2-concurrent@0.3.1 (through2@0.6.5)
    ├── gulp-util@3.0.8 (array-differ@1.0.0, object-assign@3.0.0, lodash._reescape@3.0.0, beeper@1.1.1, lodash._reevaluate@3.0.0, lodash._reinterpolate@3.0.0, array-uniq@1.0.3, dateformat@2.0.0, replace-ext@0.0.1, fancy-log@1.3.0, has-gulplog@0.1.0, minimist@1.2.0, vinyl@0.5.3, chalk@1.1.3, gulplog@1.0.0, lodash.template@3.6.2, through2@2.0.3, multipipe@0.1.2)
    ├── pretty-bytes@1.0.4 (get-stdin@4.0.1, meow@3.7.0)
    └── imagemin@2.2.1 (get-stdin@3.0.2, optional@0.1.3, vinyl@0.4.6, stream-combiner@0.2.2, through2@0.6.5, concat-stream@1.6.0, meow@2.1.0, vinyl-fs@0.3.14, imagemin-svgo@3.0.3, imagemin-pngquant@4.2.2, imagemin-jpegtran@4.3.2, imagemin-optipng@4.3.0, imagemin-gifsicle@4.2.0)
    
    gulp-myth@1.1.0 node_modules/gulp-myth
    ├── object-assign@4.1.1
    ├── through2@2.0.3 (xtend@4.0.1, readable-stream@2.2.9)
    ├── gulp-util@3.0.8 (array-differ@1.0.0, object-assign@3.0.0, lodash._reinterpolate@3.0.0, array-uniq@1.0.3, beeper@1.1.1, lodash._reescape@3.0.0, lodash._reevaluate@3.0.0, dateformat@2.0.0, replace-ext@0.0.1, fancy-log@1.3.0, has-gulplog@0.1.0, minimist@1.2.0, vinyl@0.5.3, chalk@1.1.3, gulplog@1.0.0, lodash.template@3.6.2, multipipe@0.1.2)
    └── myth@1.5.0 (rework-custom-media@0.1.1, node-watch@0.3.5, is-browser@2.0.1, pad-component@0.0.1, write-file-stdout@0.0.2, rework-rebeccapurple@1.0.1, colors@0.6.2, rework-font-variant@1.0.1, read-file-stdin@0.2.1, commander@2.9.0, rework-hex-alpha@1.0.0, rework-vars@3.1.1, rework-calc@1.1.0, clone-component@0.2.2, to-space-case@0.1.3, to-slug-case@0.1.2, postcss@4.1.16, rework-color-function@1.2.1, rework@1.0.1, rework-import@1.2.1, autoprefixer-core@5.2.1)
    
    gulp@4.0.0-alpha.2 node_modules/gulp
    ├── vinyl-fs@2.4.4 (vali-date@1.0.0, is-valid-glob@0.3.0, merge-stream@1.0.1, object-assign@4.1.1, lodash.isequal@4.5.0, graceful-fs@4.1.11, lazystream@1.0.0, strip-bom-stream@1.0.0, strip-bom@2.0.0, through2-filter@2.0.0, through2@2.0.3, gulp-sourcemaps@1.6.0, vinyl@1.2.0, readable-stream@2.2.9, mkdirp@0.5.1, duplexify@3.5.0, glob-stream@5.3.5)
    ├── gulp-cli@1.2.2 (lodash.isstring@4.0.1, lodash.isplainobject@4.0.6, lodash.isfunction@3.0.8, mute-stdout@1.0.0, lodash.sortby@4.7.0, interpret@1.0.3, pretty-hrtime@1.0.3, archy@1.0.0, tildify@1.2.0, fancy-log@1.3.0, v8flags@2.1.1, chalk@1.1.3, gulplog@1.0.0, wreck@6.3.0, semver-greatest-satisfied-range@1.0.0, yargs@3.32.0, matchdep@1.0.1, liftoff@2.3.0)
    ├── undertaker@1.1.0 (arr-flatten@1.0.3, undertaker-registry@1.0.0, last-run@1.1.1, object.reduce@0.1.7, object.defaults@0.3.0, arr-map@2.0.2, collection-map@0.1.0, bach@1.1.0, es6-weak-map@2.0.2)
    └── glob-watcher@3.2.0 (lodash.debounce@4.0.8, object.defaults@1.0.0, async-done@1.2.2, chokidar@1.6.1)
    
    browser-sync@2.18.8 node_modules/browser-sync
    ├── server-destroy@1.0.1
    ├── emitter-steward@1.0.0
    ├── dev-ip@1.0.1
    ├── qs@6.2.1
    ├── immutable@3.8.1
    ├── ua-parser-js@0.7.12
    ├── browser-sync-client@2.4.5 (fresh@0.3.0, etag@1.8.0)
    ├── http-proxy@1.15.2 (eventemitter3@1.2.0, requires-port@1.0.0)
    ├── opn@4.0.2 (object-assign@4.1.1, pinkie-promise@2.0.1)
    ├── resp-modifier@6.0.2 (debug@2.6.4, minimatch@3.0.3)
    ├── connect@3.5.0 (utils-merge@1.0.0, parseurl@1.3.1, debug@2.2.0, finalhandler@0.5.0)
    ├── serve-static@1.11.1 (escape-html@1.0.3, encodeurl@1.0.1, parseurl@1.3.1, send@0.14.1)
    ├── fs-extra@1.0.0 (graceful-fs@4.1.11, klaw@1.3.1, jsonfile@2.4.0)
    ├── eazy-logger@3.0.2 (tfunk@3.1.0)
    ├── micromatch@2.3.11 (filename-regex@2.0.0, is-glob@2.0.1, array-unique@0.2.1, is-extglob@1.0.0, extglob@0.3.2, expand-brackets@0.1.5, arr-diff@2.0.0, regex-cache@0.4.3, normalize-path@2.1.1, kind-of@3.1.0, object.omit@2.0.1, parse-glob@3.0.4, braces@1.8.5)
    ├── socket.io@1.6.0 (object-assign@4.1.0, socket.io-adapter@0.5.0, has-binary@0.1.7, debug@2.3.3, socket.io-parser@2.3.1, engine.io@1.8.0)
    ├── socket.io-client@1.6.0 (to-array@0.1.4, component-emitter@1.2.1, indexof@0.0.1, component-bind@1.0.0, backo2@1.0.2, object-component@0.0.3, has-binary@0.1.7, debug@2.3.3, parseuri@0.0.5, socket.io-parser@2.3.1, engine.io-client@1.8.0)
    ├── serve-index@1.8.0 (escape-html@1.0.3, parseurl@1.3.1, batch@0.5.3, http-errors@1.5.1, mime-types@2.1.15, accepts@1.3.3, debug@2.2.0)
    ├── yargs@6.4.0 (get-caller-file@1.0.2, decamelize@1.2.0, camelcase@3.0.0, y18n@3.2.1, which-module@1.0.0, set-blocking@2.0.0, window-size@0.2.0, yargs-parser@4.2.1, require-main-filename@1.0.1, require-directory@2.1.1, os-locale@1.4.0, cliui@3.2.0, string-width@1.0.2, read-pkg-up@1.0.1)
    ├── localtunnel@1.8.2 (openurl@1.1.0, debug@2.2.0, yargs@3.29.0, request@2.78.0)
    ├── bs-recipes@1.3.4
    ├── portscanner@2.1.1 (async@1.5.2, is-number-like@1.0.7)
    ├── rx@4.1.0
    ├── easy-extender@2.3.2 (lodash@3.10.1)
    ├── browser-sync-ui@0.6.3 (async-each-series@0.1.1, connect-history-api-fallback@1.3.0, stream-throttle@0.1.3, weinre@2.0.0-pre-I0Z7U9OV)
    └── chokidar@1.6.1 (path-is-absolute@1.0.1, inherits@2.0.3, async-each@1.0.1, glob-parent@2.0.0, is-glob@2.0.1, anymatch@1.3.0, is-binary-path@1.0.1, readdirp@2.1.0, fsevents@1.1.1)
    
    > fiddle-0023-GulpStaticServer@0.0.0 start /Users/bradyhouse/github/house/fiddles/node/fiddle-0024-Browserify
    > gulp
    
    [18:04:30] Using gulpfile ~/github/house/fiddles/node/fiddle-0024-Browserify/gulpfile.js
    [18:04:30] Starting 'default'...
    [18:04:30] Starting 'styles'...
    [18:04:30] Starting 'scripts'...
    [18:04:30] Starting 'images'...
    [18:04:30] Starting 'browserify'...
    [18:04:30] Starting 'browsersync'...
    [18:04:30] Starting 'watch'...
    [BS] Access URLs:
     -------------------------------------
           Local: http://localhost:3000
        External: http://192.168.1.14:3000
     -------------------------------------
              UI: http://localhost:3001
     UI External: http://192.168.1.14:3001
     -------------------------------------
    [BS] Serving files from: ./
    [18:04:31] Finished 'browsersync' after 406 ms
    [18:04:31] Finished 'styles' after 564 ms
    [18:04:31] Finished 'scripts' after 567 ms
    [18:04:31] Finished 'browserify' after 604 ms
    [18:04:31] gulp-imagemin: Minified 1 image (saved 68.87 kB - 12.3%)
    [18:04:31] Finished 'images' after 662 ms

This will result in  [dist](dist) directory:

    dist
    ├── all.css
    ├── all.js
    ├── bundle.js
    └── img
        └── surface.jpg

In addition, the [index.html](index.html) file should (open) or be accessible @ http://localhost:3000.


### Tags

node.js, hamony, gulp, gulp-concat, gulp-imagemin, gulp-jshint, gulp-myth, gulp-uglify, gulp-cli#4.0, 
connect, serve-static, browser-sync, browserify, vinyl-source-stream


### Forked From

[fiddle-0023-BrowserSync](../fiddle-0023-BrowserSync)
