# personal

Xavier Ruiz's personal site: a 3D room built with three.js. `index.html` is the whole site and loads its art from `covers/`, `posters/` and `media/`, so the repo root can be hosted as-is (Cloudflare Pages, GitHub Pages, etc.).

## Editing

The page is generated from `src/`:

- `src/editme.js` holds the content: Home panel text, records, notes, Spotify links, posters, TV channels.
- `src/parts/` holds the individual objects (turntable, TV, plant, lava lamp, house…).
- `src/splice.py` patches `src/main.v15.js` with those parts.

After changing anything in `src/`, rebuild `index.html` with:

```sh
sh src/site.sh
```
