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
echo '<meta name="description" content="Xavier Ruiz, Product Marketing Specialist in Boston. Click around the room to learn more about me.">'
sed 's#<title>The Room (3D)</title>#<title>Xavier Ruiz</title>#' the-room.html
} > ../index.html
rm -f main.js the-room.html
