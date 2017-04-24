#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/31/2015______________________________________________________________|
#  Description             : UTILITY USED SUPPORT FIDDLE.SH PUBLISH FUNCTION.                        |
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver
# 04/10/2016 - See CHANGELOG @ 201703100420
# ---------------------------------------------------------------------------------------------------|

source bin/_env.sh

_publishPath="${GITHUB_ROOT}/${GITHUB_PUBLISH_REPO}";
_sourcePath="${GITHUB_ROOT}/house/fiddles";
_commitMessage="${BUILD_NUM}";


function push() {
  git add -A;
  git commit -am ${_commitMessage};
  git push;
}

function cprfdist() {

    fiddleType=$1;

    if [[ -d "${fiddleType}/dist" ]]
    then
      dir=$(pwd;);
      cd ${fiddleType};
      cp -rf dist "${_publishPath}/${fiddleType}";
      cd ${dir};
    fi
}

function cprf() {
    cp -rf $1 ${_publishPath};

    if [[ -d "${_publishPath}/$1" ]]
    then
        dir=$(pwd;);

        cd "${_publishPath}/$1";

        if [[ -d "template" ]]
        then
          rm -rf "template";
        fi

        if [[ -d "libs" ]]
        then
            rm -rf "libs";
        fi

        rm -rf *.md;
        rm -rf *.adoc;
        rm -rf *.markdown;

        cd ${dir};
    fi
}

function rmrf() {
  if [[ -d "$1" ]]
  then
    rm -rf "$1";
  fi
}


cd ${_publishPath};

rmrf angular2-seeder;
rmrf angular2-cli;
rmrf angular2;
rmrf three;
rmrf extjs5;
rmrf extjs6;
rmrf d3;
rmrf dojo;
rmrf jquery;
rmrf aurelia;
rmrf tween;
rmrf svg;
rmrf resources;
rmrf rxjs;
rmrf index.html;
rmrf .gitignore;

cd ${_sourcePath};

cprfdist angular2-seeder;
cprfdist angular2-cli;
cprf angular2;
cprf three;
cprf extjs5;
cprf extjs6;
cprf d3;
cprf dojo;
cprf jquery;
cprf aurelia;
cprf tween;
cprf svg;
cprf rxjs;
cprf resources;
cprf index.html;

cd ..

cprf .gitignore;

cd ${_publishPath};

push;
