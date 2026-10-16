#!/bin/sh
cd "$(dirname "$0")"
J=https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js
{
cat head.html
echo '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>'
for f in postprocessing/EffectComposer.js shaders/CopyShader.js shaders/LuminosityHighPassShader.js postprocessing/UnrealBloomPass.js shaders/FXAAShader.js lights/RectAreaLightUniformsLib.js; do echo "<script src=\"$J/$f\"></script>"; done
echo '<script>'
echo '// ---------- EDIT ME ----------'
cat editme.js
echo '// -----------------------------'
cat helpers.js main.js
echo '</script>'
} > the-room.html
