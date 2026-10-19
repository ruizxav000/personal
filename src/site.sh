#!/bin/sh
# builds the site: splice.py patches main.v15.js into main.js, build.sh assembles the-room.html,
# then this wraps it as the standalone ../index.html
cd "$(dirname "$0")"
python3 splice.py && sh build.sh || exit 1
{
echo '<!doctype html>'
echo '<html lang="en"><head>'
echo '<meta charset="utf-8">'
echo '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
echo '<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes">'
echo '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="apple-mobile-web-app-title" content="Xavier Ruiz">'
echo '<link rel="icon" href="favicon.svg" type="image/svg+xml"><link rel="icon" href="favicon-32.png" type="image/png" sizes="32x32"><link rel="icon" href="favicon.ico" sizes="any">'
echo '<link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="manifest" href="site.webmanifest">'
echo '<meta name="description" content="Xavier Ruiz, Product Marketing Specialist in Boston. Click around the room to learn more about me.">'
sed 's#<title>The Room (3D)</title>#<title>Xavier Ruiz</title>#' the-room.html
} > ../index.html
rm -f main.js the-room.html
