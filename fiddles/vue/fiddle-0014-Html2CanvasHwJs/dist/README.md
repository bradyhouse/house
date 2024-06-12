fiddle-0014-Html2CanvasHwJs
======

 I need a Vue 3 Landing page that represents all routes in the app using Generated previews. A preview
 of a web page can be generated using HTML2Canvas,[https://html2canvas.hertzen.com/](https://html2canvas.hertzen.com/). So can previews be generated using an iframe that cycles through the routes comprising the app and then invokes HTML2Canvas on page load?  At the same time, can a mixin be created that would allow any component to update its own preview, which is maintained in the browser's local storage?

 As a starting point, see [https://www.phind.com/search\?cache\=ijkjmia6ov2m29i8bctp4tv7](https://www.phind.com/search\?cache\=ijkjmia6ov2m29i8bctp4tv7).


## Creation Date

06-06-24


## Location

Asheville, NC


## Issue

[Issue 1766](https://github.com/bradyhouse/house/issues/1766)



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

N/A


## Tags

vue, vue-router, pinia, playwright, rushstack, eslint, prettier, vite, vitest, html2canvas
