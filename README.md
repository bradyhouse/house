<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="MIT license">
  <img src="https://img.shields.io/github/last-commit/bradyhouse/house" alt="Last commit">
  <img src="https://img.shields.io/github/languages/top/bradyhouse/house" alt="Top language">
  <img src="https://img.shields.io/badge/since-2014-blue" alt="Since 2014">
</p>

```
{{ ʕ・ɭ・ʔ }}
H o u s e
oooooooooooo  o8o        .o8        .o8  oooo
 888       8  `"'        888        888   888
 888         oooo   .oooo888   .oooo888   888   .ooooo.
 888oooo8     888  d88   888  d88   888   888  d88   88b
 888          888  888   888  888   888   888  888ooo888
 888          888  888   888  888   888   888  888    .o
o888o        o888o  Y8bod88P   Y8bod88P  o888o  Y8bod8P
```

> _If everything begins in the house, then — perhaps — the house always wins._

**`house`** is my personal R&D sandbox — a decade of *learning by building*. I don't really
know a framework until I've shipped something with it, so back in 2015 I wrote a CLI to make
starting that "something" instant, and have leaned on it ever since across 25+ languages and
libraries.

## The collection, live

**[bradyhouse.github.io/fiddles](https://bradyhouse.github.io/fiddles/)** — all **540 fiddles**
in one browsable gallery: live demos run in-page with auto-captured thumbnails, and anything
that can't run in a browser (CLI tools, build experiments, retired stacks) opens as a readable
source card instead. Deep-linkable by framework (`#vue`, `#three`, …) or fiddle.

## Managed with `@hetalhouse/fiddle`

This collection is scaffolded, run, and published by
**[@hetalhouse/fiddle](https://www.npmjs.com/package/@hetalhouse/fiddle)** — the npm CLI that
grew out of this repo (see [origins](#origins-fiddlesh) below).

```bash
npm install            # pulls the tool (this repo's package.json pins it)
npm run list           # catalog the collection, grouped by framework
npm run preview        # build + serve the portfolio locally
npm run publish-gallery  # regenerate + push the live gallery
```

Or use it on your own collection:

```bash
npm i -g @hetalhouse/fiddle
fiddle setup                    # one-time: config + prerequisites
fiddle create three spinner     # scaffold a sandbox
fiddle start three spinner      # run it
fiddle publish                  # every fiddle → one portfolio site
```

## The sandboxes

25+ stacks, each isolated under [`fiddles/`](fiddles/):

`Angular` · `Vue` · `React` · `RxJS` · `D3` · `three.js` · `tween.js` · `SVG` · `Electron` ·
`NativeScript` · `Node` · `Python` · `Java` · `C` · `PHP` · `Bash` · `Chrome extensions` ·
`AWS` · `Docker` · `Ember` · `Meteor` · `ExtJS` · `jQuery` · `Compass` · `Ant` · `Chef` · `Android`

## Origins: `fiddle.sh`

The workflow started life in 2015 as a 17-subcommand Bash CLI —
[`scripts/legacy/fiddle.sh`](scripts/legacy/fiddle.sh) — that scaffolded, ran, forked, and
published fiddles for a decade (`create` · `start` · `fork` · `build` · `test` · `publish` · …).
In 2026 it was reborn as **`@hetalhouse/fiddle`**: a typed, cross-platform npm package that
anyone can `npm i -g` and point at their own collection. The shell original is archived in
[`scripts/legacy/`](scripts/legacy/) — retired, not deleted; it earned the keep.

## Why it's still here

First commit **April 2014**, and still maintained. ~4,500 commits live in this repo — it's where
the *build-to-learn* habit lives. The breadth is the point: a single, consistent workflow for
spinning up and tearing down experiments across the entire front-end and back-end landscape.

## License

[MIT](LICENSE) © Brady House
