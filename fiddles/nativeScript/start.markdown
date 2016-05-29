NativeScript (sample start)
======

Executing the command `./fiddle.sh "start" "nativescript" "fiddle-0000-Template` produces the following output.


    H o u s e
    oooooooooooo  o8o        .o8        .o8  oooo
     888       8  `"'        888        888   888
     888         oooo   .oooo888   .oooo888   888   .ooooo.
     888oooo8     888  d88   888  d88   888   888  d88   88b
     888          888  888   888  888   888   888  888ooo888
     888          888  888   888  888   888   888  888    .o
    o888o        o888o  Y8bod88P   Y8bod88P  o888o  Y8bod8P
    
    FIDDLE.SH
    FIDDLE-START.SH
    ├────STARTSERVER
    ├────NVMINSTALL
    ├────ADBINSTALL
    ├────NVMUSENODEVER426
    Now using node v4.2.6 (npm v2.14.12)
    ├────NATIVESCRIPTANDROIDSTART
    
    > angular2-seed-advanced@0.0.0 start.android /Users/e13542/github/house/fiddles/nativeScript/fiddle-0000-Template
    > cd nativescript && tns emulate android
    
    Copying template files...
    Project successfully created.
    npm WARN package.json angular2-seed-advanced@0.0.0 No description
    npm WARN package.json angular2-seed-advanced@0.0.0 No repository field.
    npm WARN package.json angular2-seed-advanced@0.0.0 No README data
    npm WARN package.json angular2-seed-advanced@0.0.0 No license field.
    
    > nativescript-dev-typescript@0.3.2 postinstall /Users/e13542/github/house/fiddles/nativeScript/fiddle-0000-Template/nativescript/node_modules/nativescript-dev-typescript
    > node postinstall.js
    
    Project already targets TypeScript 1.8.10
    
    > nativescript-angular@0.1.6 postinstall /Users/e13542/github/house/fiddles/nativeScript/fiddle-0000-Template/nativescript/node_modules/nativescript-angular
    > node postinstall.js
    
    punycode@1.3.2 node_modules/punycode
    
    url@0.10.3 node_modules/url
    
    @ngrx/store@2.0.0 node_modules/@ngrx/store
    
    querystring@0.2.0 node_modules/querystring
    
    nativescript-ng2-translate@1.1.0 node_modules/nativescript-ng2-translate
    
    ng2-translate@2.1.0 node_modules/ng2-translate
    
    es6-promise@3.2.1 node_modules/es6-promise
    
    angulartics2@1.0.11 node_modules/angulartics2
    
    lazy@1.0.11 node_modules/lazy
    
    parse5@1.4.2 node_modules/parse5
    
    filewalker@0.1.2 node_modules/filewalker
    └── fqueue@0.0.0
    
    zone.js@0.6.12 node_modules/zone.js
    
    shelljs@0.5.3 node_modules/shelljs
    
    @ngrx/core@1.0.0 node_modules/@ngrx/core
    
    es6-shim@0.35.1 node_modules/es6-shim
    
    reflect-metadata@0.1.3 node_modules/reflect-metadata
    
    @angular/platform-server@2.0.0-rc.1 node_modules/@angular/platform-server
    
    @angular/platform-browser-dynamic@2.0.0-rc.1 node_modules/@angular/platform-browser-dynamic
    
    nativescript-dev-typescript@0.3.2 node_modules/nativescript-dev-typescript
    └── nativescript-hook@0.2.1 (mkdirp@0.5.1, glob@6.0.4)
    
    nativescript-angular@0.1.6 node_modules/nativescript-angular
    └── nativescript-intl@0.0.2
    
    @angular/http@2.0.0-rc.1 node_modules/@angular/http
    
    typescript@1.8.10 node_modules/typescript
    
    @angular/router-deprecated@2.0.0-rc.1 node_modules/@angular/router-deprecated
    
    @angular/platform-browser@2.0.0-rc.1 node_modules/@angular/platform-browser
    
    tns-core-modules@2.0.1 node_modules/tns-core-modules
    └── tns-core-modules-widgets@2.0.0
    
    @angular/common@2.0.0-rc.1 node_modules/@angular/common
    
    @angular/compiler@2.0.0-rc.1 node_modules/@angular/compiler
    
    @angular/core@2.0.0-rc.1 node_modules/@angular/core
    
    lodash@4.13.1 node_modules/lodash
    
    rxjs@5.0.0-beta.6 node_modules/rxjs
    
    babel-types@6.9.0 node_modules/babel-types
    ├── to-fast-properties@1.0.2
    ├── esutils@2.0.2
    └── babel-runtime@6.9.0 (core-js@2.4.0)
    
    babylon@6.8.0 node_modules/babylon
    └── babel-runtime@6.9.0 (core-js@2.4.0)
    
    babel-traverse@6.9.0 node_modules/babel-traverse
    ├── babel-messages@6.8.0
    ├── globals@8.18.0
    ├── debug@2.2.0 (ms@0.7.1)
    ├── invariant@2.2.1 (loose-envify@1.2.0)
    ├── babel-code-frame@6.8.0 (js-tokens@1.0.3, esutils@2.0.2, chalk@1.1.3)
    └── babel-runtime@6.9.0 (core-js@2.4.0)
    Executing before-prepare hook from /Users/e13542/github/house/fiddles/nativeScript/fiddle-0000-Template/nativescript/hooks/before-prepare/nativescript-dev-typescript.js
    Found peer TypeScript 1.8.10
    app/app/components/home/home.component.spec.ts(26,55): error TS2304: Cannot find name 'jasmine'.
    
    app/app/frameworks/analytics.framework/services/analytics.service.ts(5,20): error TS2307: Cannot find module 'lodash'.
    
    app/app/frameworks/app.framework/services/name-list.service.spec.ts(34,26): error TS2304: Cannot find name 'jasmine'.
    
    app/app/frameworks/core.framework/directives/platform.directive.spec.ts(34,7): error TS2304: Cannot find name 'expect'.
    app/app/frameworks/core.framework/services/core-config.service.spec.ts(3,20): error TS2307: Cannot find module 'lodash'.
    
    app/app/frameworks/i18n.framework/services/multilingual.service.ts(5,20): error TS2307: Cannot find module 'lodash'.
    
    app/app/frameworks/test.framework/shorthand/ng2-jasmine.ts(32,19): error TS2503: Cannot find namespace 'jasmine'.
    
    app/app/frameworks/test.framework/shorthand/ng2-jasmine.ts(33,24): error TS2503: Cannot find namespace 'jasmine'.
    app/app/frameworks/test.framework/shorthand/ng2-jasmine.ts(41,39): error TS2503: Cannot find namespace 'jasmine'.
    
    app/app/frameworks/test.framework/shorthand/ng2-jasmine.ts(58,6): error TS2304: Cannot find name 'expect'.
    
    app/app/frameworks/test.framework/shorthand/ng2-jasmine.ts(59,11): error TS2304: Cannot find name 'expect'.
    app/app/frameworks/test.framework/shorthand/ng2-jasmine.ts(66,12): error TS2304: Cannot find name 'pending'.
    
    app/app/frameworks/test.framework/shorthand/ng2-jasmine.ts(67,10): error TS2304: Cannot find name 'spyOn'.
    
    Successfully prepared plugin nativescript-angular for android.
    nativescript-intl 1.7.0 for android is not compatible with the currently installed framework version 1.6.3.
    tns-core-modules 2.0.0 for android is not compatible with the currently installed framework version 1.6.3.
    tns-core-modules-widgets 2.0.0 for android is not compatible with the currently installed framework version 1.6.3.
    Project successfully prepared
    
    :config phase:  createDefaultIncludeFiles
    
    :config phase:  createPluginsConfigFile
    
    :config phase:  pluginExtend
        +applying configuration from: /Users/e13542/github/house/fiddles/nativeScript/fiddle-0000-Template/nativescript/platforms/android/configurations/include.gradle
    
    :config phase:  copyAarDependencies
    
    :config phase:  addAarDependencies
        +adding dependency: /Users/e13542/github/house/fiddles/nativeScript/fiddle-0000-Template/nativescript/platforms/android/libs/aar/widgets-release.aar
    :preBuild UP-TO-DATE
    :preDebugBuild UP-TO-DATE
    :checkDebugManifest
    :preReleaseBuild UP-TO-DATE
    :prepareComAndroidSupportAppcompatV72311Library
    :prepareComAndroidSupportSupportV42311Library
    :prepareWidgetsReleaseLibrary
    :prepareDebugDependencies
    :compileDebugAidl
    :compileDebugRenderscript
    :generateDebugBuildConfig
    :cleanLocalAarFiles
    :deleteJavaDir UP-TO-DATE
    :ensureMetadataOutDir UP-TO-DATE
    :collectAllJars
    :isMetadataGenerationNecessary
    :buildMetadata
    :copyMetadata
    :generateDebugAssets UP-TO-DATE
    :mergeDebugAssets
    :generateDebugResValues
    :generateDebugResources
    :mergeDebugResources
    :processDebugManifest
    :processDebugResources
    :generateDebugSources
    :compileDebugJavaWithJavac
    :compileDebugNdk UP-TO-DATE
    :compileDebugSources
    :transformClassesWithDexForDebug
    :mergeDebugJniLibFolders
    :transformNative_libsWithMergeJniLibsForDebug
    :processDebugJavaRes UP-TO-DATE
    :transformResourcesWithMergeJavaResForDebug
    :validateDebugSigning
    :packageDebug
    :zipalignDebug
    :assembleDebug
    :deleteExplodedAarFolder
    :buildapk
    
    BUILD SUCCESSFUL
    
    Total time: 46.23 secs
    
    This build could be faster, please consider using the Gradle Daemon: https://docs.gradle.org/2.8/userguide/gradle_daemon.html
    Project successfully built.
    Using  /Users/e13542/github/house/fiddles/nativeScript/fiddle-0000-Template/nativescript/platforms/android/build/outputs/apk/appname-debug.apk
    Starting Android emulator with image 320480QVGA
    Waiting for emulator device initialization....
    installing /Users/e13542/github/house/fiddles/nativeScript/fiddle-0000-Template/nativescript/platforms/android/build/outputs/apk/appname-debug.apk through adb
    running /Users/e13542/github/house/fiddles/nativeScript/fiddle-0000-Template/nativescript/platforms/android/build/outputs/apk/appname-debug.apk through adb
    JS: onStarted
    

