#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER ANGULAR2-SEEDER CREATE FUNCTION__________________________________|
#  Entry Point             : seederCreate____________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-angular2-seeder.sh____________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605180420
# ---------------------------------------------------------------------------------------------------|


clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function createTypingsRcFile() {
    log "$0" "createTypingsRcFile";
    touch .typingsrc
    echo "{" >> .typingsrc
    echo -e "   \"rejectUnauthorized\": false" >> .typingsrc
    echo "}" >> .typingsrc
}

function seederCreate() {
    groupLog "seederCreate";
    fiddle=$1;
    bornOnDate=$2;
    seeder=$3;
    # try
    (
        if [[ -d "${fiddle}" ]]
        then
            rm -rf ${fiddle} || exit 1;
        fi
        $(git clone --depth 1 ${seeder} ${fiddle};) || exit 2;
        cd ${fiddle};
        rm -rf .github || exit 3;
        rm -rf .git || exit 3;
        rm -rf README.md || exit 4;
        cp -rf ../template/README.markdown README.md || exit 5;
        rm -rf src/client/assets/favicon/favicon-PROD.ico || exit 7;
        cp -rf ../template/favicon.ico src/client/assets/favicon/favicon-PROD.ico || exit 7;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 5;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 5;
        rm -rf src/client/index.html || exit 8;
        cp -rf ../template/index.html src/client/index.html || exit 8;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "src/client/index.html";) || exit 8;
        rm -rf tools/config/seed.config.ts || exit 9;
        cp -rf ../template/seed.config.ts tools/config/seed.config.ts || exit 9;
        createTypingsRcFile || exit 6;
        npm install;
    )
    # catch
    rc=$?; case ${rc} in
        0)  echo ""
            ;;
        1)  endLog "seederCreate: Failed while attempting to remove the existing \"${fiddle}\" directory.";
            ;;
        2)  endLog "seederCreate: Failed while attempting to clone angular2-seeder repo";
            ;;
        3)  endLog "seederCreate: Failed while attempting to remove the \".github\" and \".git\" directories.";
            ;;
        4)  endLog "seederCreate: Failed while attempting to remove extraneous files file.";
            ;;
        5)  endLog "seederCreate: Failed while attempting to update the README.MD file.";
            ;;
        6)  endLog "seederCreate: Failed while attempting to create the .typingsrc file.";
            ;;
        7)  endLog "seederCreate: Failed while attempting to update favicon files";
            ;;
        8)  endLog "seederCreate: Failed while attempting to update index.html file";
            ;;
        9)  endLog "seederCreate: Failed while attempting to update seed.config.ts file";
            ;;
        *)  endLog "seederCreate: F U B A R ~ Something went wrong."
            ;;
    esac
    exit ${rc};
}

function catch() {
    case $1 in
        0)  endLog "\"${fiddleSubDir}\" created.";
            ;;
        1)  endLog "_create.sh: seederCreate() failed for ${SEEDER}";
            ;;
        *)  endLog "fubar! Something went wrong.";
            ;;
    esac
    exit $1
}


function create() {
  if [ "$#" -ne 1 ]
  then
        echo "Incorrect number of arguments"
        echo "Please specify the name of the new fiddle"
        exit 59
  fi

  clear;
  echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
  echo "Bash version ${BASH_VERSION}..."

  fiddleSubDir="../fiddles/angular2/$1";
  fiddleTemplateDir="../fiddles/angular2/template";
  bornOnDate=$(date +"%m-%d-%y";)
  echo ${bornOnDate};

  # try
  (
      if [[ -d "${fiddleSubDir}" ]]; then rm -R "${fiddleSubDir}"; fi
      cd ../fiddles/angular2-seeder;

       case ${SEEDER} in
          'default')
            seederCreate $1 ${bornOnDate} "https://github.com/bradyhouse/angular-seed"  || exit 1;
          ;;
          'advanced')
            seederCreate $1 ${bornOnDate} "https://github.com/bradyhouse/angular-seed-advanced" || exit 1;
          ;;
       esac
  )

  # catch
  rc=$?; catch ${rc};

  #finally
  exit ${rc};

}
