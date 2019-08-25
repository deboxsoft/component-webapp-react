#!/usr/bin/env bash
set -e
export BABEL_ENV=development
rm -Rf libs;
npm run build:devel;
standard-version --prerelease devel --skip.changelog=true --skip.tag=true --skip.commit=true "$@";
cp package.json libs
cp -R types libs
cd libs;
npm publish --tag devel;
