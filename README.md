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

## `fiddle.sh` — a CLI for framework sandboxes

[`scripts/fiddle.sh`](scripts/fiddle.sh) is a git-style command-line tool that scaffolds, runs,
and manages self-contained sandboxes — _"fiddles"_ — for any stack. It takes you from "I want to
try X" to a running, hot-reloading project in one command.

```bash
fiddle create react hello        # scaffold a new React fiddle
fiddle start  react hello        # serve it locally
fiddle fork   react hello world  # branch an existing fiddle
fiddle build  react hello        # bundle + minify
fiddle list   react              # catalog fiddles by type
```

<details>
<summary><b>Full command set</b> — 17 subcommands</summary>

| command | what it does |
|---|---|
| `create` | scaffold a new fiddle |
| `start` / `stop` | run / halt the dev server |
| `fork` | branch an existing fiddle into a new one |
| `build` / `combine` | bundle + minify sources |
| `test` | run the fiddle's test suite |
| `index` / `list` | catalog fiddles by type |
| `refactor` | rename a fiddle |
| `update` | run `npm-check-updates` on a fiddle |
| `publish` | sync the public showcase repo |
| `delete` · `edit` · `setup` · `emulate` | remove · open · bootstrap the machine · android emulator |

</details>

## The sandboxes

25+ stacks, each isolated under [`fiddles/`](fiddles/):

`Angular` · `Vue` · `React` · `RxJS` · `D3` · `three.js` · `tween.js` · `SVG` · `Electron` ·
`NativeScript` · `Node` · `Python` · `Java` · `C` · `PHP` · `Bash` · `Chrome extensions` ·
`AWS` · `Docker` · `Ember` · `Meteor` · `ExtJS` · `jQuery` · `Compass` · `Ant` · `Chef` · `Android`

## Why it's still here

First commit **April 2014**, and still maintained. ~4,500 commits live in this repo — it's where
the *build-to-learn* habit lives. The breadth is the point: a single, consistent workflow for
spinning up and tearing down experiments across the entire front-end and back-end landscape.

> 🚧 **In progress:** packaging `fiddle.sh` as a standalone, cross-platform npm CLI so anyone can
> `npm i -g` it and scaffold sandboxes outside this repo.

## License

[MIT](LICENSE) © Brady House
