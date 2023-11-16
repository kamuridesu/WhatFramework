rm -rf dist;
npm run build || { echo 'Failed to build package!' ; exit 1; }
sed "s/dist\/cli.js/cli.js/;s/files/a/;s/dist//;s/--outDir/--outDir dist/;s/cd  /cd dist/;s/tsc/echo/" package.json > dist/package.json;
cp README.md dist;
cp -r "@types" dist;
cd dist;
npm pkg fix || { echo 'Failed to build package!' ; exit 1; }
npm publish || { echo 'Failed to publish package!' ; exit 1; }
cd -;
