#!/usr/bin/env bash

function initGulpFile() {
    groupLog "initGulpFile";
    if [[ -e "gulpfile.js" ]]
    then
        rm -rf "gulpfile.js";
    fi
    touch "gulpfile.js";
}

function addDefaultTask() {
    groupLog "addDefaultTask";
    echo -e "var gulp = require('gulp');" >> gulpfile.js;
    echo -e "gulp.task('default', ['lint', 'tsc', 'tsc-tests', 'bundle-js', 'bundle-test', 'karma', 'bundle', 'test']);" >> gulpfile.js;
}

function addTsLintTask() {
    groupLog "addTsLintTask";
    echo -e "" >> gulpfile.js;
    echo -e "var tslint = require('gulp-tslint');" >> gulpfile.js;
    echo -e "gulp.task('lint', function() {" >> gulpfile.js;
    echo -e "\treturn gulp.src([" >> gulpfile.js;
    echo -e "\t\t'./source/ts/**/**.ts', './test/**/**.test.ts'" >> gulpfile.js;
    echo -e "\t]).pipe(tslint())" >> gulpfile.js;
    echo -e "\t\t.pipe(tslint.report('verbose'));" >> gulpfile.js;
    echo -e "});" >> gulpfile.js;
}

function addProject() {
    groupLog "addProject";
    echo -e "" >> gulpfile.js;
    echo -e "var ts = require('gulp-typescript');" >> gulpfile.js;
    echo -e "var tsProject = ts.createProject({" >> gulpfile.js;
    echo -e "\tremoveComments: true," >> gulpfile.js;
    echo -e "\tnoImplicitAny: true," >> gulpfile.js;
    echo -e "\ttarget: 'ES3'," >> gulpfile.js;
    echo -e "\tmodule: 'commonjs'," >> gulpfile.js;
    echo -e "\tdeclarationFiles: false," >> gulpfile.js;
    echo -e "});" >> gulpfile.js;
}

function addTscTask() {
    groupLog "addTscTask";
    echo -e "" >> gulpfile.js;
    echo -e "gulp.task('tsc', function() {" >> gulpfile.js;
    echo -e "\treturn gulp.src([" >> gulpfile.js;
    echo -e "\t\t'./source/ts/**/**.ts', './test/**/**.test.ts'" >> gulpfile.js;
    echo -e "\t]).pipe(tsProject)" >> gulpfile.js;
    echo -e "\t\t.js.pipe(gulp.dest('./temp/source/js'));" >> gulpfile.js;
    echo -e "});" >> gulpfile.js;
}

function addTestProject() {
    groupLog "addTestProject";
    echo -e "" >> gulpfile.js;
    echo -e "var tsTestProject = ts.createProject({" >> gulpfile.js;
    echo -e "\tremoveComments: true," >> gulpfile.js;
    echo -e "\tnoImplicitAny: true," >> gulpfile.js;
    echo -e "\ttarget: 'ES3'," >> gulpfile.js;
    echo -e "\tmodule: 'commonjs'," >> gulpfile.js;
    echo -e "\tdeclarationFiles: false," >> gulpfile.js;
    echo -e "});" >> gulpfile.js;
}

function addTscTestTask() {
    groupLog "addTscTestTask";
    echo -e "" >> gulpfile.js;
    echo -e "gulp.task('tsc-tests', function() {" >> gulpfile.js;
    echo -e "\treturn gulp.src(" >> gulpfile.js;
    echo -e "\t\t'./test/**/**.test.ts')" >> gulpfile.js;
    echo -e "\t\t.pipe(ts(tsTestProject))" >> gulpfile.js;
    echo -e "\t\t.js.pipe(gulp.dest('./temp/test/'));" >> gulpfile.js;
    echo -e "});" >> gulpfile.js;
}

function addBundleJsTask() {
    groupLog "addBundleJsTask";
    echo -e "" >> gulpfile.js;
    echo -e "gulp.task('bundle-js', function() {" >> gulpfile.js;
    echo -e "\treturn gulp.src(" >> gulpfile.js;
    echo -e "\t\t'./temp/source/js/main.js')" >> gulpfile.js;
    echo -e "\t\t.pipe(browserified)" >> gulpfile.js;
    echo -e "\t\t.pipe(sourcemaps.init({loadMaps: true}))" >> gulpfile.js;
    echo -e "\t\t.pipe(uglify())" >> gulpfile.js;
    echo -e "\t\t.pipe(sourcemaps.write('./'))" >> gulpfile.js;
    echo -e "\t\t.pipe(gulp.dest('./dist/source/js/'))" >> gulpfile.js;
    echo -e "});" >> gulpfile.js;
}

function addBundleTestTask() {
    groupLog "addBundleTestTask";
    echo -e "" >> gulpfile.js;
    echo -e "gulp.task('bundle-test', function() {" >> gulpfile.js;
    echo -e "\treturn gulp.src(" >> gulpfile.js;
    echo -e "\t\t'./test/**/**.test.ts')" >> gulpfile.js;
    echo -e "\t\t.pipe(browserfied)" >> gulpfile.js;
    echo -e "\t\t.js.pipe(gulp.dest('./dist/test/'));" >> gulpfile.js;
    echo -e "});" >> gulpfile.js;
}

function addKarmaTask() {
    groupLog "addKarmaTask";
    echo -e "" >> gulpfile.js;
    echo -e "var karma = require('gulp-karma');" >> gulpfile.js;
    echo -e "gulp.task('karma', function(cb) {" >> gulpfile.js;
    echo -e "\tgulp.src('./dist/test/**/**.test.js')" >> gulpfile.js;
    echo -e "\t.pipe(karma({" >> gulpfile.js;
    echo -e "\t\tconfigFile: 'karma.conf.js'," >> gulpfile.js;
    echo -e "\t\taction: 'run'," >> gulpfile.js;
    echo -e "\t}))" >> gulpfile.js;
    echo -e "\t.on('end', cb)" >> gulpfile.js;
    echo -e "\t.error('end', function(err) {" >> gulpfile.js;
    echo -e "\t\tthrow err;" >> gulpfile.js;
    echo -e "});" >> gulpfile.js;
}

function addBundleTask() {
    groupLog "addBundleTask";
    echo -e "" >> gulpfile.js;
    echo -e "gulp.task('bundle', function(cb) {" >> gulpfile.js;
    echo -e "\trunSequence('build', [" >> gulpfile.js;
    echo -e "\t\t'bundle-js', 'bundle-test'], cb);" >> gulpfile.js;
    echo -e "});" >> gulpfile.js;
}

function addTestTask() {
    groupLog "addTestTask";
    echo -e "" >> gulpfile.js;
    echo -e "gulp.task('test', function(cb) {" >> gulpfile.js;
    echo -e "\trunSequence('bundle', ['karma'], cb);" >> gulpfile.js;
    echo -e "});" >> gulpfile.js;
}

function addBrowserSyncTask() {
    groupLog "addBrowserSyncTask";
    echo -e "" >> gulpfile.js;
    echo -e "var browserSync = require('browser-sync');" >> gulpfile.js;
    echo -e "gulp.task('browser-sync', ['test'], function() {" >> gulpfile.js;
    echo -e "\tbrowserSync({" >> gulpfile.js;
    echo -e "\t\tserver: {" >> gulpfile.js;
    echo -e "\t\t\tbaseDir: \"./dist\"" >> gulpfile.js;
    echo -e "\t\t}" >> gulpfile.js;
    echo -e "\t});" >> gulpfile.js;
    echo -e "" >> gulpfile.js;
    echo -e "\treturn gulp.watch([" >> gulpfile.js;
    echo -e "\t\t\"./dist/source/js/**/*.js\"," >> gulpfile.js;
    echo -e "\t\t\"./dist/source/css/**/*.js\"," >> gulpfile.js;
    echo -e "\t\t\"./dist/test/**/**.test.js\"," >> gulpfile.js;
    echo -e "\t\t\"./dist/data/**/**\"," >> gulpfile.js;
    echo -e "\t\t\"./index.html\"" >> gulpfile.js;
    echo -e "\t], [browserSync.reload]);" >> gulpfile.js;
    echo -e "});" >> gulpfile.js;
}


function addGulpFile() {
    log "$0" "addGulpFile";
    initGulpFile;
    addDefaultTask;
    addTsLintTask;
    addProject;
    addTscTask;
    addTestProject;
    addTscTestTask;
    addBundleJsTask;
    addBundleTestTask;
    addKarmaTask;
    addBundleTask;
    addTestTask;
    addBrowserSyncTask;
    endLog "gulpfile.js added";
}
