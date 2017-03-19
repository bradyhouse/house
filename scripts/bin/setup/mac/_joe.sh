#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : http://www.linuxfromscratch.org/blfs/view/svn/postlfs/joe.html__________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 02/11/2017______________________________________________________________|
#  Description             : MASTER JOE EDITOR INSTALL SCRIPT FOR MAC OS_____________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201702110420
# ---------------------------------------------------------------------------------------------------|

function installJoe() {
  groupLog "installJoe";
  cd $1;
  make install &&
  install -vm 755 joe/util/{stringify,termidx,uniproc} /usr/bin &&
  install -vdm755 /usr/share/joe/util &&
  install -vm 644 joe/util/{*.txt,README} /usr/share/joe/util
}

function configureJoe() {
  groupLog "configureJoe";
  cd $1;
  sudo ./configure --prefix=/usr     \
            --sysconfdir=/etc \
      --docdir=/usr/share/doc/joe-4.0 &&
  make;
}

function downloadJoe() {
  groupLog "downloadJoe";
  _home=$(cd ~; pwd);
  groupLog ${_home};
  _downloadsRoot="${_home}/Downloads";
  _archiveFile="${_downloadsRoot}/joe-4.0.tar.gz";
  _joeEditorRoot="${_downloadsRoot}/joe-4.0";
  if [[ -d "${_joeEditorRoot}" ]]
  then
    rm -rf "${_joeEditorRoot}";
  fi
  $(curl http://dickens.rice.iit.edu/456/Files/joe-4.0.tar.gz -o "${_archiveFile}") || return -1
  if [[ -e "${_archiveFile}" ]]
  then
    cd ${_downloadsRoot};
    tar -xvf joe-4.0.tar.gz || exit $?;
    configureJoe "${_joeEditorRoot}" || exit $?;
    installJoe "${_joeEditorRoot}" || exit $?;
    rm -rf "${_archiveFile}";
  else
    return -1;
  fi
}

function install() {
  groupLog "install";
  #try
  (
    downloadJoe || exit 1;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  endLog "Done ~ joe editor installed successfully."
          ;;
      *)  endLog "foo bar! Something went wrong."
          ;;
  esac
  #finally
  exit ${_rc}
}
