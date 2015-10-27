This command produced minified files using various back-end compressors.

    sencha fs minify -yui -from=in.js -to=out.js

    sencha fs minify -closure -from=in.js -to=out.js

The legacy syntax is also supported:

    sencha fs minify -compressor=yuicompressor -from=in.js -to=out.js

    sencha fs minify -compressor=closurecompiler -from=in.js -to=out.js
