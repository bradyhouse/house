fiddle-0007-PrintPreviewJs
======

Checkout https://github.com/delight-im/HTML-Sheets-of-Paper/tree/gh-pages. This repo attempts to demonstrate how to create a simplistic word processsor interface using `div`'s with the `contenteditable` attribute set to `true`.  I want 
to create a Vue based component that utilizes the same style sheets to simulate a standard Print Preview display given a block of HTML.  In other words, the `PrintPreview` component should --
  * Accepts a default slot broken up into pages using `<div class="page"> ... </div>` blocks 
  * Each Page block should then be rendered using a secondary `Page` component having the following template:

        <div class="page">
            <header>
                <slot name="header"></slot>
            </header>
            <main>
                <slot name="main"></slot>
            </main>
            <footer>
                <slot name="footer"></slot>
            </footer>
        </div>

    where -- 
    * each page block should be rendered to seperate instance of the Page component using the the `main`slot for it's child elements
        *   If the page contains a child `<div class="page-break"></div>` then a new page should be created for the adjacent children 
    * the header and footer slots of each Page instance are static HTML -- aka `Header` / `Footer`
    * the header and footer should be at the top and bottom of each page on screen and in print
    * Tailwind CSS should be supported but scoped to the `Page` component only

## Creation Date

11-22-23


## Location

Asheville, NC


## Issue

[Issue 1265](https://github.com/bradyhouse/house/issues/1265)


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Published Version Link

- [bradyhouse.github.io](https://bradyhouse.github.io/vue/fiddle-0007-PrintPreviewJs/)
- [stackblitz.com](https://stackblitz.com/edit/vitejs-vite-u56mtg?file=README.md)



## Tags

vue, vue-router, pinia, playwright, rushstack, eslint, prettier, vite, vitest, tailwindcss
