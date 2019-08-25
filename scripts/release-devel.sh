#!/usr/bin/env bash

rm -Rf libs;
npm run build:devel;
standard-version --prerelease devel --skip.changelog=true --skip.tag=true --skip.commit=true "$@";
cp package.json libs
cd libs;
npm publish --tag devel;
