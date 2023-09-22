Shepherd.js Hello World
======

I need a fiddle exploring how to use https://shepherdjs.dev/ with Vue 3.  Assuming this works, the library should (or could ...) be integrated into the Vue JS / TS template projects.  Specifically, another button should be added to the Nav Bar that can be used to kickoff an overlay guided tour.  When the user loads the app for
the first time, the tour should startup.  On any subsequent visits, unless the user clears their
local storage, the tour should not startup.



## Creation Date

09-20-23


## Location

Asheville, NC

## Issue

[Issue 1155](https://github.com/bradyhouse/house/issues/1155)

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

[StackBlitz](https://stackblitz.com/edit/fiddle-0004-shepherdhw?file=README.md)


## Tags

typescript, vue, vue-router, pinia, playwright, rushstack, eslint, prettier, vite, vitest, @fortawesome, vue3-directive-shepherd
