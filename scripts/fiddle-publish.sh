i#!/usr/bin/env bash
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
# Baseline Veri
# 04/10/2016 - See CHANGELOG @ 201703100420
# 01/24/2018 - See CHANGELOG @ aurelia-dependencies-update
# ---------------------------------------------------------------------------------------------------|
source bin/_utils.sh;
source bin/_env.sh;
source bin/_types.sh;

_publishPath="${GITHUB_ROOT}/${GITHUB_PUBLISH_REPO}";
_sourcePath="${GITHUB_ROOT}/house/fiddles";
_commitMessage="${BUILD_NUM}";

function isPublishPath() {
  if [[ ! -d ${_publishPath} ]]
  then
    cd ${GITHUB_ROOT};
    git clone https://github.com/bradyhouse/bradyhouse.github.io;

  fi
}

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

function publish() {

  if [[ ! -d $1 ]]; then exit 1000; fi;

  rmrf $1;
  rmrf .gitignore;

  cd ${_sourcePath};

  cprf $1;
  cprf resources;
  cprf index.html;

  cd ..

  cprf .gitignore;

  cd ${_publishPath};

  push;
}

function publishDist() {
  rmrf $1;
  rmrf .gitignore;

  cd ${_sourcePath};

  cprfdist $1;
  cprf resources;
  cprf index.html;

  cd ..

  cprf .gitignore;

  cd ${_publishPath};

  push;

}

function publishAll() {

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

}

#try
(
  if [ "$#" -ne 1 ]; then  exit 86; fi

  isPublishPath || exit 1001;

  cd ${_publishPath};

  case $1 in
    'angular2-seeder')
      publishDist $1;
      ;;
    'angular2-cli')
      publishDist $1;
      ;;
    'aurelia')
      publishDist $1;
      ;;
    'all')
      publishAll;
      ;;
    *) publish $1;
      ;;
  esac
)
#catch
rc=$?
case ${rc} in
    0)  echo "Done. All \"$1\" fiddles have been re-indexed."
        ;;
    86) clear
        voidShowTitle ${thisFile};
        echo "";
        echo "Nope ~ Incorrect number of arguments";
        echo "";
        echo "Usage:";
        echo "";
        echo "$0 \"[t]\"";
        echo ""
        echo "[t] - type. Valid types include: "
        echo ""
        voidEchoFiddleTypes "publish";
        echo ""
        echo ""
        ;;
    87) echo "";
        rc=0;
        ;;
    *)  echo "Error: Something went wrong."
        ;;
esac
#finally
exit ${rc}



