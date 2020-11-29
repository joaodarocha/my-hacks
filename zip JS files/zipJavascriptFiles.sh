#!/bin/sh
##########################################
# Description:
# This script creates a zip for every
# Javascript file in the designated path
#
# Created: 20/02/2019
# Updated: 29/11/2020
# Author: João Rocha
#
# Source: https://stackoverflow.com/questions/242538/unix-shell-script-find-out-which-directory-the-script-file-resides
#
#########################################

# Absolute path to this script, e.g. /home/user/workspace/foo.sh
SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, thus /home/user/workspace
SCRIPTPATH=$(dirname "$SCRIPT")
echo $SCRIPTPATH

# The path to the Cognito Lambda Javascript files
PATH_TO_JAVASCRIPT_FILES="$SCRIPTPATH/../templates/cognito/lib"

echo 'Zipping Javascript files'
find "$PATH_TO_JAVASCRIPT_FILES" -name "*.js" -print -exec sh -c 'for f; do zip "${f%.js}.zip" "$f" ; done' sh {} +
echo 'Done zipping files.'
