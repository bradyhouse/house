# fiddle-0008-PlotlyHwJs

Need to determine the best way to integrate Plotly.js, https://plotly.com/javascript/, with Vue3. Specifically, can it be be imported directly or is a 3rd party wrapper library like vue3-plotlly, https://github.com/clalarco/vue3-plotly,required?

## Creation Date

12-25-23

## Location

Scottsdale, AZ

## Issue

[Issue 1233](https://github.com/bradyhouse/house/issues/1233)

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

[StackBlitz](https://stackblitz.com/edit/vitejs-vite-bedwq4?file=README.md)

## Tags

vue, vue-router, pinia, playwright, rushstack, eslint, prettier, vite, vitest, plotly.js, d3
