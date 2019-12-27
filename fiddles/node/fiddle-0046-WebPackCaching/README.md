fiddle-0046-WebPackCaching
======

### Title <a name="title"></a>

WebPack Caching


### Author <a name="author"></a>

bradyhouse@gmail.com


### Creation Date <a name="creation-date"></a>

12-26-19


### Location <a name="location"></a>

Chicago, IL


### Issue <a name="issue"></a>

[Issue 335](https://github.com/bradyhouse/house/issues/335)


### Description <a name="description"></a>

`Get Webpack?` A little. But ... `riddle me a another fiddle` based on the [webpack guide pages](https://webpack.js.org/guides). For this fourth fiddle, which builds on [node fiddle #45 - WebPack Code Splitting](../fiddle-0045-WebPackCodeSplitting), go through the fifth guide -- 

*   [Caching](https://webpack.js.org/guides/caching/)


### Use Case<a name="use-case"></a>

1.  Open a console and navigate to the fiddle's root directory
2.  Enter the command `npm install`
3.  Run `npm run server`

        > node server.js

        Example app listening on port 3000!

        ℹ ｢wdm｣: Hash: 5a356b0758b14914779e
        Version: webpack 4.41.4
        Time: 547ms
        Built at: 12/26/2019 11:20:16 AM
                                Asset       Size   Chunks                         Chunk Names
                            index.html  356 bytes           [emitted]
        main.c9cfeaaa46a5296b824a.js   2.48 KiB     main  [emitted] [immutable]  main
        runtime.96904d46437823eeb5b5.js   14.4 KiB  runtime  [emitted] [immutable]  runtime
        vendors.54feee9ede4ab0308fa6.js   1.37 MiB  vendors  [emitted] [immutable]  vendors
        Entrypoint main = runtime.96904d46437823eeb5b5.js vendors.54feee9ede4ab0308fa6.js main.c9cfeaaa46a5296b824a.js
        [LvDl] ./node_modules/lodash/lodash.js 528 KiB {vendors} [built]
        [YuTi] (webpack)/buildin/module.js 497 bytes {vendors} [built]
        [dSPy] ./src/print.js 62 bytes {main} [built]
        [tjUo] ./src/index.js 312 bytes {main} [built]
        [yLpj] (webpack)/buildin/global.js 472 bytes {vendors} [built]
        Child html-webpack-plugin for "index.html":
                Asset     Size  Chunks  Chunk Names
            index.html  534 KiB       0
            Entrypoint undefined = index.html
            [LvDl] ./node_modules/lodash/lodash.js 528 KiB {0} [built]
            [XZMT] ./node_modules/html-webpack-plugin/lib/loader.js!./node_modules/html-webpack-plugin/default_index.ejs 376 bytes {0} [built]
            [YuTi] (webpack)/buildin/module.js 497 bytes {0} [built]
            [yLpj] (webpack)/buildin/global.js 472 bytes {0} [built]
        ℹ ｢wdm｣: Compiled successfully.

4.  Use a web browser to navigate to http://localhost:3000


### Tags <a name="tags"></a>

node.js, fs, webpack, webpack-cli, html-webpack-plugin, clean-webpack-plugin, webpack-dev-server


### Forked From

[fiddle-0045-WebPackCodeSplitting](../fiddle-0045-WebPackCodeSplitting)
