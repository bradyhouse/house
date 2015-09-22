#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function downloadAndroidSDK() {
    curl "https://dl.google.com/dl/android/studio/install/1.3.2.0/android-studio-ide-141.2178183-mac.dmg" -o android-studio-ide-141.2178183-mac.dmg
}

downloadAndroidSDK;
