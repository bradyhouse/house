# fiddle-0009-SkeletonLoaderJs

I need to develop a component that will render an out-of-focus (or blurred) Skeleton version of a Plotly chart prior to loading it. The pre-load (or Skeleton) version should be created from a cached screenshot of the rendered chart. In other words, once a component is mounted for the first time, the component should use Plotly to generate JPEG version of the chart and persist it via Local Storage as a base64 string. The next time the component loads, it first displays the cached image. CSS is then used to make the image appear out of focus and pulsate to indicate that the chart is being loaded.

As a starting point, checkout https://www.freecodecamp.org/news/how-to-build-skeleton-screens-using-css-for-better-user-experience/. Finally, [Vue Fiddle #8](https://github.com/bradyhouse/house/tree/master/fiddles/vue/fiddle-0008-PlotlyHwJs), which includes a working Plotly Chart component, is a good starting point.

## Creation Date

12-31-23

## Location

Chicago, IL

## Issue

[Issue 1343](https://github.com/bradyhouse/house/issues/1343)

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

[Stackblitz](https://stackblitz.com/edit/vitejs-vite-ra212v?file=README.md)


## Tags

vue, vue-router, pinia, playwright, rushstack, eslint, prettier, vite, vitest, plotly.js, d3
