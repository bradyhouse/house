fiddle-0015-Vue3ContextJs
======

I need a Vue 3 version of VueContext, https://www.npmjs.com/package/vue-context. Given the simplicity of the package, would it be possible to just migrate it  myself.


## Creation Date

07-26-24


## Location

Asheville, NC


## Issue

[Issue 1977](https://github.com/bradyhouse/house/issues/1977)


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

> fiddle-0015-Vue3ContextJs@0.0.0 test:unit
> export VITE_CJS_IGNORE_WARNING=true; vitest


 DEV  v1.6.0 /Users/bradyhouseknecht/git/house_1977/fiddles/vue/fiddle-0015-Vue3ContextJs

stdout | src/views/__tests__/AboutView.spec.js > AboutView > renders without errors
# Test Markdown Content

stderr | src/components/__tests__/DocListItem.spec.js > DocListItem > renders slots correctly
[Vue warn]: Do not use built-in or reserved HTML elements as component id: slot
[Vue warn]: Do not use built-in or reserved HTML elements as component id: slot

stderr | src/views/__tests__/DocsView.spec.js > DocsView > renders without errors
[Vue warn]: Failed to resolve component: RouterLink
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement. 
  at <DocList> 
  at <DocsView ref="VTU_COMPONENT" > 
  at <VTUROOT>

stderr | src/components/__tests__/DocList.spec.js > DocList > renders DocList with correct content
[Vue warn]: Failed to resolve component: RouterLink
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement. 
  at <DocList ref="VTU_COMPONENT" > 
  at <VTUROOT>

stderr | src/components/__tests__/TopNav.spec.js > TopNav > renders properly
[Vue warn]: Failed to resolve component: RouterLink
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement. 
  at <TopNav href="https://github.com/bradyhouse/house/tree/master/fiddles/vue/fiddle-0002-AgGridSparklineTs" ref="VTU_COMPONENT" > 
  at <VTUROOT>

 ✓ src/router/__tests__/index.spec.js (3)
 ✓ src/views/__tests__/AboutView.spec.js (1)
 ✓ src/components/__tests__/BreadCrumbs.spec.js (1)
 ✓ src/components/__tests__/ContextMenu.spec.js (3)
 ✓ src/views/__tests__/404View.spec.js (1)
 ✓ src/components/__tests__/DocListItem.spec.js (1)
 ✓ src/components/__tests__/DocList.spec.js (1)
 ✓ src/views/__tests__/DocsView.spec.js (1)
 ✓ src/components/__tests__/TopNav.spec.js (1)
 ✓ src/components/icons/__tests__/IconDocumentation.spec.js (1)
 ✓ src/components/icons/__tests__/IconCommunity.spec.js (1)

 Test Files  11 passed (11)
      Tests  15 passed (15)
   Start at  14:51:03
   Duration  2.29s (transform 608ms, setup 0ms, collect 1.67s, tests 628ms, environment 3.39s, prepare 780ms)


 PASS  Waiting for file changes...

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

vue, vue-router, pinia, playwright, rushstack, eslint, prettier, vite, vitest
