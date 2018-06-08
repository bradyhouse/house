angular2-cli (create)
======

Executing the command `./fiddle.sh "create" "angular2-cli" "fiddle-0000-Template"` produces the following output.

    {{ ʕ・ɭ・ʔ }}
    
    FIDDLE-DELETE.SH
    
    fiddle type:	angular2-cli
    fiddle name:	fiddle-0000-Template
    
    Are you sure you want to delete this fiddle? [Y/n] Y
    The "fiddle-0000-Template" angular2-cli fiddle has been deleted successfully.
    FIDDLE-CREATE.SH
    FIDDLE-CREATE.SH
    Bash version 3.2.57(1)-release...
    06-07-18
    ├────NVMINSTALL
    v8.9.4 is already installed.
    Now using node v8.9.4 (npm v5.6.0)
    ├────NGINSTALL
    ├────SHRINKWRAPINSTALL
    
    {{ ʕ・ɭ・ʔ }}
    
    ├────SETUP
    ├────INSTALL
    ├────IINSTALLSHRINKWRAP
    + shrinkwrap@0.4.0
    updated 1 package in 4.586s
    Done. shrinkwrap installed successfully.
    
    
    ├────NGCREATE
    CREATE fiddle-0000-Template/README.md (1023 bytes)
    CREATE fiddle-0000-Template/angular.json (3404 bytes)
    CREATE fiddle-0000-Template/package.json (1310 bytes)
    CREATE fiddle-0000-Template/tsconfig.json (384 bytes)
    CREATE fiddle-0000-Template/tslint.json (2805 bytes)
    CREATE fiddle-0000-Template/.editorconfig (245 bytes)
    CREATE fiddle-0000-Template/.gitignore (503 bytes)
    CREATE fiddle-0000-Template/src/environments/environment.prod.ts (51 bytes)
    CREATE fiddle-0000-Template/src/environments/environment.ts (631 bytes)
    CREATE fiddle-0000-Template/src/favicon.ico (5430 bytes)
    CREATE fiddle-0000-Template/src/index.html (293 bytes)
    CREATE fiddle-0000-Template/src/main.ts (370 bytes)
    CREATE fiddle-0000-Template/src/polyfills.ts (3194 bytes)
    CREATE fiddle-0000-Template/src/test.ts (642 bytes)
    CREATE fiddle-0000-Template/src/assets/.gitkeep (0 bytes)
    CREATE fiddle-0000-Template/src/styles.css (80 bytes)
    CREATE fiddle-0000-Template/src/browserslist (375 bytes)
    CREATE fiddle-0000-Template/src/karma.conf.js (964 bytes)
    CREATE fiddle-0000-Template/src/tsconfig.app.json (194 bytes)
    CREATE fiddle-0000-Template/src/tsconfig.spec.json (282 bytes)
    CREATE fiddle-0000-Template/src/tslint.json (314 bytes)
    CREATE fiddle-0000-Template/src/app/app.module.ts (314 bytes)
    CREATE fiddle-0000-Template/src/app/app.component.css (0 bytes)
    CREATE fiddle-0000-Template/src/app/app.component.html (1141 bytes)
    CREATE fiddle-0000-Template/src/app/app.component.spec.ts (989 bytes)
    CREATE fiddle-0000-Template/src/app/app.component.ts (207 bytes)
    CREATE fiddle-0000-Template/e2e/protractor.conf.js (752 bytes)
    CREATE fiddle-0000-Template/e2e/src/app.e2e-spec.ts (299 bytes)
    CREATE fiddle-0000-Template/e2e/src/app.po.ts (208 bytes)
    CREATE fiddle-0000-Template/e2e/tsconfig.e2e.json (213 bytes)
        Directory is already under version control. Skipping initialization of git.
    Password:
    ├────CREATETYPINGSRCFILE
    ├────NPMSHRINKWRAP
    npm notice created a lockfile as npm-shrinkwrap.json. You should commit this file.
    └──
    
    └──".FIDDLES/ANGULAR2-CLI/FIDDLE-0000-TEMPLATE" CREATED.
    
    
    FIDDLE-INDEX.SH
    06-07-18
    Done. All "angular2-cli" fiddles have been re-indexed.
    
    ➜  scripts git:(230_update_and_shrinkwrap) ✗ >....
    CREATE fiddle-0000-Template/src/environments/environment.ts (631 bytes)
    CREATE fiddle-0000-Template/src/favicon.ico (5430 bytes)
    CREATE fiddle-0000-Template/src/index.html (293 bytes)
    CREATE fiddle-0000-Template/src/main.ts (370 bytes)
    CREATE fiddle-0000-Template/src/polyfills.ts (3194 bytes)
    CREATE fiddle-0000-Template/src/test.ts (642 bytes)
    CREATE fiddle-0000-Template/src/assets/.gitkeep (0 bytes)
    CREATE fiddle-0000-Template/src/styles.css (80 bytes)
    CREATE fiddle-0000-Template/src/browserslist (375 bytes)
    CREATE fiddle-0000-Template/src/karma.conf.js (964 bytes)
    CREATE fiddle-0000-Template/src/tsconfig.app.json (194 bytes)
    CREATE fiddle-0000-Template/src/tsconfig.spec.json (282 bytes)
    CREATE fiddle-0000-Template/src/tslint.json (314 bytes)
    CREATE fiddle-0000-Template/src/app/app.module.ts (314 bytes)
    CREATE fiddle-0000-Template/src/app/app.component.css (0 bytes)
    CREATE fiddle-0000-Template/src/app/app.component.html (1141 bytes)
    CREATE fiddle-0000-Template/src/app/app.component.spec.ts (989 bytes)
    CREATE fiddle-0000-Template/src/app/app.component.ts (207 bytes)
    CREATE fiddle-0000-Template/e2e/protractor.conf.js (752 bytes)
    CREATE fiddle-0000-Template/e2e/src/app.e2e-spec.ts (299 bytes)
    CREATE fiddle-0000-Template/e2e/src/app.po.ts (208 bytes)
    CREATE fiddle-0000-Template/e2e/tsconfig.e2e.json (213 bytes)
        Directory is already under version control. Skipping initialization of git.
    Password:
    ├────CREATETYPINGSRCFILE
    ├────NPMSHRINKWRAP
    npm notice created a lockfile as npm-shrinkwrap.json. You should commit this file.
    └──
    
    └──".FIDDLES/ANGULAR2-CLI/FIDDLE-0000-TEMPLATE" CREATED.
    
    
    FIDDLE-INDEX.SH
    06-07-18
    Done. All "angular2-cli" fiddles have been re-indexed.
 

### Additional Info

[Angular2-cli](../angular2-cli) fiddles are created using the [angular 2 CLI](https://cli.angular.io/) -- aka _ng create_. The create logic baked 
into the [fiddle.sh](../../scripts/fiddle.sh) script is based on [bash fiddle #76](../bash/fiddle-0076-Angular2CLI).  This means the [fiddle.sh](../../scripts/fiddle.sh) 
script provides some wrapper logic that integrates this CLI.
    
