# fiddle-0019-FullScreenExpanderJs

I need a component that exposes a clickable link which when clicked will expand a specified component full-screen. When the component is expanded, clicking a secondary close button returns everything to orginal state. The component should expose a configureable icon, title and optional text.

## Creation Date

08-23-24

## Location

Asheville, NC

## Issue

[Issue 2608](https://github.com/bradyhouse/house/issues/2608)

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

[stackblitz.com](https://stackblitz.com/edit/vitejs-vite-vjqyvbvd?file=README.md)


## Tags

vue, vue-router, playwright, rushstack, eslint, prettier, vite, vitest, ag-grid, vueuse,
font-awesome


### Forked From

[fiddle-0016-AgGridContextMenuIconJs](../fiddle-0016-AgGridContextMenuIconJs)
