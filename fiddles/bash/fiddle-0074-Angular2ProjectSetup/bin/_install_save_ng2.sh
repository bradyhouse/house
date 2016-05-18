#!/usr/bin/env bash


function npmInstallSaveAngular2() {
    groupLog "npmInstallSaveAngular2";
    npm install angular2 --save;
}

function npmInstallSaveSystemJs() {
    groupLog "npmInstallSaveSystemJs";
    npm install systemjs --save;
}

function npmInstallSaveEs6shim() {
    groupLog "npmInstallSaveEs6shim";
    npm install es6-shim --save;
}

function npmInstallSaveReflectMetadata() {
    groupLog "npmInstallSaveReflectMetadata";
    npm install reflect-metadata@0.1.2 --save;
}

function npmInstallSaveRxjs() {
    groupLog "npmInstallSaveRxjs";
    npm install rxjs@5.0.0-beta.6 --save;
}

function npmInstallSaveZoneJs() {
    groupLog "npmInstallSaveZoneJs";
    npm install zone.js --save;
}

function npmInstallSaveDevConcurrently() {
    groupLog "npmInstallSaveDevConcurrently";
    npm install concurrently --save-dev;
}

function npmInstallSaveDevLiteServer() {
    groupLog "npmInstallSaveDevLiteServer";
    npm install lite-server --save-dev;
}

function npmInstallSaveDevTypescript() {
    groupLog "npmInstallSaveDevTypescript";
    npm install typescript --save-dev;
}

function npmInstallSaveDevTypings() {
    groupLog "npmInstallSaveDevTypings";
    npm install typings --save-dev;
}

function npmInstallNg2() {
    log "$0" "npmInstallNg2";

    #try
    (
        npmInstallSaveAngular2 || exit 1;
        npmInstallSaveSystemJs || exit 2;
        npmInstallSaveEs6shim || exit 3;
        npmInstallSaveReflectMetadata || exit 4;
        npmInstallSaveRxjs || exit 5;
        npmInstallSaveZoneJs || exit 6;
        npmInstallSaveDevConcurrently || exit 7;
        npmInstallSaveDevLiteServer || exit 8;
        npmInstallSaveDevTypescript || exit 9;
        npmInstallSaveDevTypings || exit 10;
    )
    #catch
    rc=$?; case ${rc} in
        0)  endLog "ng2 npm dependencies installed";
            ;;
        1)  endLog "Angular2 dependency install failed";
            ;;
        2)  endLog "systemjs dependency install failed";
            ;;
        3)  endLog "es6-shim dependency install failed";
            ;;
        4)  endLog "reflect-metadata dependency install failed";
            ;;
        5)  endLog "rxjs dependency install failed";
            ;;
        6)  endLog "zone.js dependency install failed";
            ;;
        7)  endLog "concurrently dev dependency install failed";
            ;;
        8)  endLog "lite-server dev dependency install failed";
            ;;
        9)  endLog "typescript dev dependency install failed";
            ;;
        10) endLog "typings dev dependency install failed";
            ;;
    esac;
    #finally
    exit ${rc};
}