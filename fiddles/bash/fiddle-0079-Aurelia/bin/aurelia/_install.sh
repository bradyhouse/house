#!/usr/bin/env bash

function isJspmPackageInstalled() {
    package=$1;
    installed=$(isInstalled "jspm";);
    if [[ ${installed}=="true" ]]
    then
        count=$(jspm inspect registry:${package} | grep "not found" | wc -l | sed -e 's/^[[:space:]]*//';);
        if [[ ${count} -eq 0 ]]
        then
            echo "false";
        else
            echo "true";
        fi
    else
        echo "false";
    fi
}

function isNodePackageInstalled() {
    package=$1;
    if [[ -d "node_modules" ]]
    then
        cd node_modules;
        count=$(ls -1 | grep "${package}" | wc -l | sed -e 's/^[[:space:]]*//';);

        if [[ ${count} -eq 0 ]]
        then
            echo "false";
        else
            echo "true";
        fi
    else
        echo "false";
    fi
}

function webComponentsJsInstall() {
    groupLog "webComponentsJsInstall";
    nodePackageInstalled=$(isNodePackageInstalled "webcomponentsjs";);
    jspmPackageInstalled=$(isJspmPackageInstalled "npm:webcomponentsjs";);
    if [[ ${nodePackageInstalled} == "false" ]]
    then
        npm install webcomponentsjs --save-dev || exit $?;
    else
        groupLog "node_module/webcomponentsjs found";
    fi

    if [[ ${jspmPackageInstalled} == "false" ]]
    then
        jspm install npm:webcomponentsjs || exit $?;
    else
        groupLog "jspm npm:webcomponentsjs found";
    fi
}

function aureliaBundlerInstall() {
    groupLog "aureliaBundlerInstall";
    installed=$(isInstalled "aurelia-bundler";);
    nodePackageInstalled=$(isNodePackageInstalled "aurelia-bundler";);
    jspmPackageInstalled=$(isJspmPackageInstalled "npm:aurelia-bundler";);

    if [[ ${nodePackageInstalled} == "false" ]]
    then
        npm install aurelia-bundler --save-dev || exit $?;
    else
        groupLog "node_module/aurelia-bundler found";
    fi
    if [[ ${jspmPackageInstalled} == "false" ]]
    then
        jspm install npm:aurelia-bundler || exit $?;
    else
        groupLog "jspm npm:aurelia-bundler found";
    fi
}

function gulpInstall() {
    groupLog "gulpInstall";
    installed=$(isNodePackageInstalled "gulp");
    if [[ ${installed} == "false" ]]
    then
        npm install gulp --save-dev;
    fi
}

function jspmInstall() {
    groupLog "jspmInstall";
    installed=$(isNodePackageInstalled "jspm";);
    if [[ ${installed} == "false" ]]
    then
        npm install jspm --save-dev;
    fi
}


function aureliaPathInstall() {
    groupLog "aureliaPathInstall";
    nodePackageInstalled=$(isNodePackageInstalled "aurelia-path";);
    jspmPackageInstalled=$(isJspmPackageInstalled "npm:aurelia-path";);
    if [[ ${nodePackageInstalled} == "false" ]]
    then
        npm install aurelia-path --save-dev || exit $?;
    else
        groupLog "node_module/aurelia-path found";
    fi

    if [[ ${jspmPackageInstalled} == "false" ]]
    then
        jspm install npm:aurelia-path || exit $?;
    else
        groupLog "jspm npm:aurelia-path found";
    fi
}

function aureliaHITLInstall() {
    groupLog "aureliaHITLInstall";
    jspmPackageInstalled=$(isJspmPackageInstalled "aurelia-html-import-template-loader";);
    if [[ ${jspmPackageInstalled} == "false" ]]
    then
        $(jspm install aurelia-html-import-template-loader;) || exit $?;
    fi
}





