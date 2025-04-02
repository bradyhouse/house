fiddle-0018-InfiniteSelect
======

I need a drop-down that supports infinite scroll that is built atop vue-select. The drop-down list should never display more then a fixed page-size. As the user moves down the list the page changes. The control should include hot-key easter egg that will allow the user to expose a footer with page based navigation. In otherwords, if you want to go to the last page because you are developer or QA analyst, you can get there without scrolling forever.


## Creation Date

04-01-25


## Location

Asheville, NC


## Issue

[Issue 2556](https://github.com/bradyhouse/house/issues/2556)


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

* [bradyhouse.github.io](https://bradyhouse.github.io/vue/fiddle-0018-InfiniteSelect/)
* [stackblitz.com](https://stackblitz.com/edit/vitejs-vite-6gvyr5zq?file=README.md)


## Tags

vue, vue-router, pinia, playwright, vee-validate, vue-select, eslint, prettier, vite, vitest, swagger-ui, lodash


### Forked From

[fiddle-0017-VeeValidateVueSelectJs](../fiddle-0017-VeeValidateVueSelectJs)
