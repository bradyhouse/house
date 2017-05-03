Angular2 Seeder (build)
======

Executing the command `./fiddle.sh "build" "angular2-seeder" "fiddle-0001-EniPuzzle"` produces the following output 
(see below).  This command, is used to package (aka `build`) an Angular2-Seeder fiddle for publication. This done
by executing the command `npm run build.prod` from the fiddle's root directory. Once the npm process completes, 
2 additional automated steps occur. First, a directory containing the minified version of the fiddle is 
added to the root [dist](dist) directory.  The sub-directory uses the name of the fiddle. In this case, 
[dist/fiddle-0001-EniPuzzle](dist/fiddle-0001-EniPuzzle).  In addition, the build process, also updates
[dist/index.html](dist/index.html) file to include a navigational link to the compiled version of the fiddle.


    {{ ʕ・ɭ・ʔ }}
    FIDDLE.SH
    FIDDLE-BUILD.SH
    ├────BUILD
    FIDDLE-BUILD.SH
    Bash version 3.2.57(1)-release...
    ├────SEEDERBUILD
    ├────NPMBUILDPROD
    /Users/bradyhouse/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle
    
    > angular-seed-advanced@0.0.0 build.prod /Users/bradyhouse/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle
    > gulp build.prod --color --env-config prod --build-type prod
    
    [09:13:12] Requiring external module ts-node/register
    [09:13:15] Loading tasks folder /Users/bradyhouse/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.assets.dev
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.assets.prod
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.assets.tns
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.bundle.rxjs
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.bundles.app.aot
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.bundles.app.rollup.aot
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.bundles.app
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.bundles
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.docs
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.html_css
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.index.dev
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.index.prod
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.js.dev
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.js.e2e
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.js.prod.aot
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.js.prod.rollup.aot
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.js.prod
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.js.test
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.js.tns
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.tns_html_css
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/build.tools
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/check.tools
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/check.versions
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/clean.all.src.js
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/clean.all
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/clean.coverage
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/clean.dev
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/clean.e2e
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/clean.prod
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/clean.tns
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/clean.tools
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/clear.files
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/compile.ahead.prod
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/copy.prod.rollup.aot
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/copy.prod
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/e2e
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/generate.manifest
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/karma.run
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/karma.run.with_coverage
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/karma.watch
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/minify.bundles
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/noop
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/print.banner
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/serve.coverage
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/serve.coverage.watch
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/serve.docs
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/server.prod
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/server.start
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/start.deving
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/transpile.bundles.rollup.aot
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/tslint.tns
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/tslint
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/watch.dev
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/watch.e2e
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/watch.test
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/watch.tns
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/seed/webdriver
    [09:13:15] Loading tasks folder /Users/bradyhouse/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/project
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/project/desktop.build
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/project/desktop.libs
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/project/desktop.package.linux
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/project/desktop.package.mac
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/project/desktop.package.windows
    [09:13:15] Registering task ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/tools/tasks/project/desktop.watch
    [09:13:15] Using gulpfile ~/github/house/fiddles/angular2-seeder/fiddle-0001-EniPuzzle/gulpfile.ts
    [09:13:15] Starting 'build.prod'...
    [09:13:15] Starting 'initialize'...
    [09:13:15] Starting 'noop'...
    [09:13:15] Finished 'noop' after 66 ms
    [09:13:15] Finished 'initialize' after 68 ms
    [09:13:15] Starting 'check.tools'...
    [09:13:16] Tools not compiled, skipping rebuild
    [09:13:16] Finished 'check.tools' after 225 ms
    [09:13:16] Starting 'clean.prod'...
    [09:13:16] Deleted dist/tmp
    [09:13:16] Deleted dist/prod
    [09:13:16] Finished 'clean.prod' after 163 ms
    [09:13:16] Starting 'tslint'...
    [09:13:21] Finished 'tslint' after 5.34 s
    [09:13:21] Starting 'build.assets.prod'...
    [09:13:21] Finished 'build.assets.prod' after 376 ms
    [09:13:21] Starting 'build.html_css'...
    [09:18:43] Finished 'build.html_css' after 5.35 min
    [09:18:43] Starting 'copy.prod'...
    [09:18:43] Finished 'copy.prod' after 621 ms
    [09:18:43] Starting 'build.js.prod'...
    [09:18:51] Finished 'build.js.prod' after 7.7 s
    [09:18:51] Starting 'build.bundles'...
    [09:18:51] Finished 'build.bundles' after 196 ms
    [09:18:51] Starting 'build.bundles.app'...
    [09:19:35] Finished 'build.bundles.app' after 44 s
    [09:19:35] Starting 'minify.bundles'...
    [09:19:53] Finished 'minify.bundles' after 18 s
    [09:19:53] Starting 'build.index.prod'...
    [09:19:54] gulp-inject 2 files into index.html.
    [09:19:54] gulp-inject 1 files into index.html.
    [09:19:54] Finished 'build.index.prod' after 298 ms
    [09:19:54] Finished 'build.prod' after 6.63 min
    
    └──BUILD COMPLETE.
    
    
