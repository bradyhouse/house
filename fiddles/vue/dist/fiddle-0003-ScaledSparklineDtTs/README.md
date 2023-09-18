## AgGrid Scaled Sparkline (Ts)

Vue Fiddle 2, https://github.com/bradyhouse/house/tree/master/fiddles/vue/fiddle-0002-AgGridSparklineTs, demonstrates how to apply a fixed scaling to an AgGrid sparkline column that depicts a range of numeric values.  Now I need something similar for a sparkline depicting values over a date/time range.   As a starting point, Fiddle 2 can be forked.

#### Creation Date

09-18-23

#### Location

Asheville, NC

#### Issue

[Issue 1144](https://github.com/bradyhouse/house/issues/1144)

#### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

#### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

#### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Compile and Minify for Production

```sh
npm run build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

#### Run End-to-End Tests with [Playwright](https://playwright.dev)

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

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

##### Published Version Link

[StackBlitz](https://stackblitz.com/edit/fiddle-0003-scaledsparklinedtts?file=README.md)



##### Tags

typescript, vue, vue-router, pinia, playwright, rushstack, eslint, prettier, vite, vitest
