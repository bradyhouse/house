Tetris Calc
======

<a name="creation-date"></a>
### Born On Date

08-14-22

<a name="location"></a>
### Location

Chicago, IL

<a name="requirements"></a>
### Requirements

Begin by reading the requirements described in the [Tetris Programming Exercise PDF](TetrisProgrammingExercise.pdf). And then --

    we are changing the requirements to focus on your front-end web development skills. We want this application to run in a web browser and to be driven by user interaction:

    Instead of reading from STDIN, the application reads each line from a <input> element. The user enters a string like "T1,Z3,I4", clicks a button or presses enter to submit, and the application computes the result.
    Instead of printing the result to STDOUT, the application renders a <svg> or <canvas> element that resembles the diagrams in pages 2 and 3 of the problem statement. No animation is required.
    Please provide tests (you can use a 3rd party framework for this)


<a name="setup"></a>
### Setup Use Case

This app was developed on windows 11 using an Ubuntu Sub System configured with node 16.11.1 / yarn 1.22.19.  It was tested using Chrome version 104.0.5112.101. To test drive, (using a similar configuration), from the root directory run `yarn`.  This should produce the following output.

      ➜ yarn
      yarn install v1.22.19
      info No lockfile found.
      [1/4] Resolving packages...
      warning popper.js@1.16.1: You can find the new Popper v2 at @popperjs/core, this package is dedicated to the legacy v1
      warning react-scripts > @svgr/webpack > @svgr/plugin-svgo > svgo@1.3.2: This SVGO version is no longer supported. Upgrade to v2.x.x.
      warning react-scripts > @svgr/webpack > @svgr/plugin-svgo > svgo > stable@0.1.8: Modern JS already guarantees Array#sort() is a stable sort, so this library is deprecated. See the compatibility table on MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#browser_compatibility
      warning react-scripts > css-minimizer-webpack-plugin > cssnano > cssnano-preset-default > postcss-svgo > svgo > stable@0.1.8: Modern JS already guarantees Array#sort() is a stable sort, so this library is deprecated. See the compatibility table on MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#browser_compatibility
      [2/4] Fetching packages...
      [3/4] Linking dependencies...
      warning " > @testing-library/user-event@13.5.0" has unmet peer dependency "@testing-library/dom@>=7.21.4".
      warning " > bootstrap@5.2.0" has unmet peer dependency "@popperjs/core@^2.11.5".
      warning "react-scripts > eslint-config-react-app > eslint-plugin-flowtype@8.0.3" has unmet peer dependency "@babel/plugin-syntax-flow@^7.14.5".
      warning "react-scripts > eslint-config-react-app > eslint-plugin-flowtype@8.0.3" has unmet peer dependency "@babel/plugin-transform-react-jsx@^7.14.9".
      warning " > enzyme-adapter-react-16@1.15.6" has incorrect peer dependency "react@^16.0.0-0".
      warning " > enzyme-adapter-react-16@1.15.6" has incorrect peer dependency "react-dom@^16.0.0-0".
      warning "enzyme-adapter-react-16 > enzyme-adapter-utils@1.14.0" has incorrect peer dependency "react@0.13.x || 0.14.x || ^15.0.0-0 || ^16.0.0-0".
      warning "enzyme-adapter-react-16 > react-test-renderer@16.14.0" has incorrect peer dependency "react@^16.14.0".
      warning "enzyme-adapter-react-16 > enzyme-adapter-utils > airbnb-prop-types@2.16.0" has incorrect peer dependency "react@^0.14 || ^15.0.0 || ^16.0.0-alpha".
      [4/4] Building fresh packages...
      success Saved lockfile.
      Done in 61.72s.


<a name="startup"></a>
### Startup Use Case

This app was created using `react-scripts`.  To start it up in development mode, from the root directory simply enter the command `npm start`.  This should produce the following output.

      Compiled successfully!

      You can now view tetrisengts in the browser.

        Local:            http://localhost:3000
        On Your Network:  http://172.28.43.71:3000

      Note that the development build is not optimized.
      To create a production build, use yarn build.

      webpack compiled successfully
      No issues found.

This should open your default browser to `http://localhost:3000`.  If it does not, then using Chrome navigate there manually.


<a name="test"></a>
### Test Use Case

This app includes a very basic set of unit tests created using [jest](https://www.npmjs.com/package/jest) and [enzyme](https://www.npmjs.com/package/enzyme). Essentially, TSX files (or functions that include a JSX response) are tested to insure that they can render a valid response.  The core [Calc.ts](/src/components/tetris/calc/Calt.ts) class, which exposes a set of static methods for updating the state of the [Tetris.tsx](/src/component/tetris/Tetris.tsx), is tested with more granularity. To run these tests, from the root directory, simply enter the command `npm test`.  This should produce the following output.  Note, to breakout (or exit) from this mode, you will need to prese "Ctrl-C".


      PASS  src/components/tetris/calc/Calc.test.ts
      PASS  src/components/tetris/Tetris.test.jsx
      › 1 snapshot written.
      PASS  src/components/tetris/plot/Plot.test.jsx
      › 1 snapshot written.
      PASS  src/App.test.jsx
      › 1 snapshot written.
      PASS  src/components/tetris/ctrl/Ctrl.test.jsx
      › 1 snapshot written.

      Snapshot Summary
      › 4 snapshots written from 4 test suites.

      Test Suites: 5 passed, 5 total
      Tests:       12 passed, 12 total
      Snapshots:   4 written, 4 total
      Time:        3.28 s
      Ran all test suites related to changed files.

      Watch Usage
      › Press a to run all tests.
      › Press f to run only failed tests.
      › Press q to quit watch mode.
      › Press p to filter by a filename regex pattern.
      › Press t to filter by a test name regex pattern.
      › Press Enter to trigger a test run.




### Forked From

[fiddle-0018-TetrisEngTs](../fiddle-0018-TetrisEngTs)
