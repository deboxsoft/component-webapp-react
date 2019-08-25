#!/usr/bin/env bash
set -e

export BABEL_ENV=production
rm -Rf libs;
npm run build;
standard-version "$@";
cp package.json libs
cp -R types libs
cd libs;
npm publish;
