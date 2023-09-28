Golden Layout / Components
======

Given that Vue works with Golden Layout (See[Issue 1177](https://github.com/bradyhouse/house/issues/1177)), the next question is Components. Specifically, can AgGrid or a Plotly chart be easily integrated? I need a fiddle that exploring this integration.


## Creation Date

09-28-23


## Location

Asheville, NC


## Issue

[Issue 1196](https://github.com/bradyhouse/house/issues/1196)


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

[Stackblitz](https://stackblitz.com/edit/vitejs-vite-yrsgbu?file=README.md)


## Tags

typescript, vue, vue-router, pinia, playwright, rushstack, eslint, prettier, vite, vitest, golden-layout, ag-grid-community, ag-grid-enterprise, ag-grid-vue3, plotly.js, @ag-grid-community/client-side-row-model, @ag-grid-enterprise/clipboard, @ag-grid-enterprise/excel-export, @ag-grid-enterprise/menu, 
vue-draggable-resizable, dom-to-image-more, resize-observer-polyfill, uuid
