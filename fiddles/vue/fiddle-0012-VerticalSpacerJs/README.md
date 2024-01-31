fiddle-0012-VerticalSpacerJs
======

I need a Vue 3 component that will dynamically adjust the height and width of a div in order to fill its parent container. So given a div containing 2 child divs and an instance of the component placed between them, it should:  

1. Determine the height of the parent container
2. Subtract the height of the sibling divs
3. Set the height of the component to the space remaining  

In addition, the component should respond to window resize events by repeating this calculation and dynamically changing the dimensions of the component.  The component's width should always be 100% of the parent container.  In the event that there is no extra space (3), the component should disappear completely.


## Creation Date

01-31-24


## Location

Asheville, NC


## Issue

[Issue 1407](https://github.com/bradyhouse/house/issues/1407)


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

[StackBlitz](https://stackblitz.com/edit/vitejs-vite-lzarae?file=README.md)


## Tags

vue, vue-router, pinia, playwright, rushstack, eslint, prettier, vite, vitest
