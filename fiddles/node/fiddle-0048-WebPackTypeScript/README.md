fiddle-0048-WebPackTypeScript
======

### Title <a name="title"></a>

WebPackTypeScript


### Author <a name="author"></a>

bradyhouse@gmail.com


### Creation Date <a name="creation-date"></a>

12-26-19


### Location <a name="location"></a>

Chicago, IL


### Issue <a name="issue"></a>

[Issue 335](https://github.com/bradyhouse/house/issues/335)


### Description <a name="description"></a>

Get Webpack? maybe ... but `riddle me a another fiddle` based on the [webpack guide pages](https://webpack.js.org/guides). For this sixth webpack focused fiddle, go through the webpack [TypeScript Guide](https://webpack.js.org/guides/typescript/). And then based on this doc and the last 5 fiddles, see if you can package --

*   [jquery](https://www.npmjs.com/package/jquery)
*   [moment](https://www.npmjs.com/package/moment)
*   [bootstrap-daterangepicker](https://www.npmjs.com/package/bootstrap-daterangepicker)

In order to verify that the library works, use [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) and [webpack-dev-server](https://webpack.js.org/configuration/dev-server) to verify that an instant of bootstrap date range picker can
be injected into the DOM using only the library bundle.


### Use Case<a name="use-case"></a>

1.  Open a console and navigate to the fiddle's root directory
2.  Enter the command `npm install`
3.  Enter the command `npm start`

        > webpack-dev-server --open

        ℹ ｢wds｣: Project is running at http://localhost:8080/
        ℹ ｢wds｣: webpack output is served from /
        ℹ ｢wds｣: Content not from webpack is served from ./dist
        ℹ ｢wdm｣: wait until bundle finished: /
        ℹ ｢wdm｣: Hash: 966fdfcc49fc5cb7054b
        Version: webpack 4.41.4
        Time: 1654ms
        Built at: 12/26/2019 5:04:24 PM
            Asset       Size  Chunks             Chunk Names
        fiddle.js   3.53 MiB    main  [emitted]  main
        index.html  183 bytes          [emitted]
        Entrypoint main = fiddle.js
        [0] multi (webpack)-dev-server/client?http://localhost:8080 ./src/index.ts 40 bytes {main} [built]
        [./node_modules/bootstrap-daterangepicker/daterangepicker.css] 556 bytes {main} [built]
        [./node_modules/bootstrap-daterangepicker/daterangepicker.js] 65.7 KiB {main} [built]
        [./node_modules/jquery/dist/jquery.min.js] 86.1 KiB {main} [built]
        [./node_modules/moment/moment.js] 147 KiB {main} [built]
        [./node_modules/strip-ansi/index.js] 161 bytes {main} [built]
        [./node_modules/webpack-dev-server/client/index.js?http://localhost:8080] (webpack)-dev-server/client?http://localhost:8080 4.29 KiB {main} [built]
        [./node_modules/webpack-dev-server/client/overlay.js] (webpack)-dev-server/client/overlay.js 3.51 KiB {main} [built]
        [./node_modules/webpack-dev-server/client/socket.js] (webpack)-dev-server/client/socket.js 1.53 KiB {main} [built]
        [./node_modules/webpack-dev-server/client/utils/createSocketUrl.js] (webpack)-dev-server/client/utils/createSocketUrl.js 2.91 KiB {main} [built]
        [./node_modules/webpack-dev-server/client/utils/log.js] (webpack)-dev-server/client/utils/log.js 964 bytes {main} [built]
        [./node_modules/webpack-dev-server/client/utils/reloadApp.js] (webpack)-dev-server/client/utils/reloadApp.js 1.59 KiB {main} [built]
        [./node_modules/webpack-dev-server/client/utils/sendMessage.js] (webpack)-dev-server/client/utils/sendMessage.js 402 bytes {main} [built]
        [./node_modules/webpack/hot sync ^\.\/log$] (webpack)/hot sync nonrecursive ^\.\/log$ 170 bytes {main} [built]
        [./src/index.ts] 264 bytes {main} [built]
            + 155 hidden modules
        Child html-webpack-plugin for "index.html":
            1 asset
            Entrypoint undefined = index.html
            [./node_modules/html-webpack-plugin/lib/loader.js!./node_modules/html-webpack-plugin/default_index.ejs] 376 bytes {0} [built]
            [./node_modules/lodash/lodash.js] 528 KiB {0} [built]
            [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {0} [built]
            [./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {0} [built]
        ℹ ｢wdm｣: Compiled successfully.
      
4.  Your default browser should open to `http://localhost:8080` displaying the initial bootstrap-daterangepicker example.


### Tags <a name="tags"></a>

node.js, webpack, webpack-cli, lodash, typescript, bootstrap-daterangepicker, moment, jquery
