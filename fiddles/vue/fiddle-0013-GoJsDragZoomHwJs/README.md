fiddle-0013-GoJsDragZoomHwJs
======

I need a Vue 3 component that demonstrates how to integrate gojs, https://gojs.net. The component should also integrate the Drag Zooming Tool extension, https://gojs.net/latest/api/symbols/DragZoomingTool.html. Finally, I need a vitest based unit test to verify the components functionality.


## Creation Date

03-24-24


## Location

Asheville, NC


## Issue

[Issue 1538](https://github.com/bradyhouse/house/issues/1538)


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

[bradyhouse.io](https://bradyhouse.github.io/vue/fiddle-0013-GoJsDragZoomHwJs/)



## Tags

vue, vue-router, pinia, playwright, rushstack, eslint, prettier, vite, vitest, gojs
