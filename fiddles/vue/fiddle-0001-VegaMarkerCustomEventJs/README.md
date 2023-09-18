Vega Marker CustomEvent (Js)
======

Fiddle exploring how to create custom events in Vue.js. Specifically, the fiddle should include a component that embeds a chart created 
using Vega -- see https://vega.github.io/. The custom event should be triggered by clicking a point on the chart.


## Creation Date

05-24-23


## Location

Asheville, NC


## Issue

[Issue 786](https://github.com/bradyhouse/house/issues/786)


## Description

Fiddle exploring how to add a custom event handler to a [vega-embedded](https://www.npmjs.com/package/vega-embed) bar chart. Specifically, the custom event should be triggered by clicking a bar visible in the chart.  


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

* [StackBlitz](https://stackblitz.com/edit/fiddle-0001-vegamarkercustomeventjs?file=README.md)


## Tags

vue, vue-router, pinia, playwright, rushstack, eslint, prettier, vite, vitest, vega-embed
