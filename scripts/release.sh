#!/usr/bin/env bash
set -e

standardVersionOptions=
while [[ "$1" != "" ]]; do
  case $1 in
  --dry-run | -d )
    dryRun=1
    standardVersionOptions="$standardVersionOptions --dry-run"
    ;;
  --prerelease | -p )
    shift
    preRelease=1
    tagPublish="$1"
    standardVersionOptions="$standardVersionOptions -p $1"
    ;;
  *)
    standardVersionOptions="$standardVersionOptions $1"
  esac
  shift
done


export BABEL_ENV=$([[ -z ${preRelease}  ]] && echo "production" || echo "development" );
rm -Rf libs;
npm run build;
standard-version ${standardVersionOptions};
cp package.json libs
cp -R types libs
cd libs;


if [[ -z ${dryRun} ]]; then
  if [[ -z ${tagPublish} ]]; then
      npm publish
    else
      npm publish --tag ${tagPublish}
  fi
fi
