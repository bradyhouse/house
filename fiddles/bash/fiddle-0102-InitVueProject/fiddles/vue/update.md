Vue (update)
======

Executing the command `fiddle "update" "vue" "fiddle-0000-TemplateJs"` is used to update the dependencies for the specified fiddle. This means,
that fiddle.sh will--

      1. Remove the node_modules directory
      2. Remove the package-lock.json
      3. Run npm-check-updates (See [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)
    
Running the command will produce the following output.

        {{ ʕ・ɭ・ʔ }} 

        ├────UPDATEFIDDLES
        ├────UPDATING FIDDLE-0000-TEMPLATEJS ...
        ├────UPDATEFIDDLE
        ├────UPDATE
        ├────NVMINSTALL
        v16.11.1 is already installed.
        Now using node v16.11.1 (npm v8.0.0)
        ├────NCUINSTALL
        ├────RMNODEMODULES
        ├────RMPACKAGELOCK
        ├────NPMCHECKUPDATES
        Upgrading /Users/bradyhouseknecht/git/house/fiddles/bash/fiddle-0102-InitVueProject/fiddles/vue/fiddle-0000-TemplateJs/package.json
        [====================] 6/6 100%

        @vitejs/plugin-vue  ^4.0.0  →  ^4.1.0
        vite                ^4.1.4  →  ^4.2.1

        Run npm install to install new versions.
        └──UPDATE COMPLETE.

