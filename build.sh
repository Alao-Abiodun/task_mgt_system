echo 'Building source file'
npx tsc

echo 'Copying folders...'
mkdir -p dist/logs
mkdir -p dist/migrations
mkdir -p dist/uploads
cp -r src/tmr-logo.png dist/tmr-logo.png

