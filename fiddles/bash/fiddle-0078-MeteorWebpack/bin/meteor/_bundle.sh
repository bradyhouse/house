#!/usr/bin/env bash

function meteorBundle() {
    groupLog "meteorWebpackBundle";
    meteor-webpack build || exit $?;
}
