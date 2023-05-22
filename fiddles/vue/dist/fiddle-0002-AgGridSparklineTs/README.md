## AgGrid Scaled Sparkline (Ts)

AgGrid's Enterprise edition includes a Sparkline Cell Render => https://www.ag-grid.com/vue-data-grid/sparklines-overview/. When displaying data points with a small range of change, Abs (Max - Min), the depiction can be misleading because the render will automatically scale the y-axis to fit the cell. I need a fiddle that explores this feature to see if there is a way to offset this distortion. 

#### Creation Date

05-08-23

#### Location

Asheville, NC

#### Issue

[Issue 865](https://github.com/bradyhouse/house/issues/865)

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

N/A

##### Tags

typescript, vue, vue-router, pinia, playwright, rushstack, eslint, prettier, vite, vitest
