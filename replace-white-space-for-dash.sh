#!/bin/zsh

str=$1

if [ -z "$1" ]; then
  echo "Please insert a string inside. Ex: \"Testing string here\""
else
  echo ${str// /-}
fi
