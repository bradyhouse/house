Electron (sample create)
======

Executing the command `./fiddle.sh "create" "electron" "fiddle-0000-Template"` produces the following output.

    H o u s e
    oooooooooooo  o8o        .o8        .o8  oooo
     888       8  `"'        888        888   888
     888         oooo   .oooo888   .oooo888   888   .ooooo.
     888oooo8     888  d88   888  d88   888   888  d88   88b
     888          888  888   888  888   888   888  888ooo888
     888          888  888   888  888   888   888  888    .o
    o888o        o888o  Y8bod88P   Y8bod88P  o888o  Y8bod8P
    
    FIDDLE.SH
    FIDDLE-CREATE.SH
    FIDDLE-ELECTRON.SH
    Bash version 3.2.57(1)-release...
    05-28-16
    ├────ELECTRONINSTALL
    /Users/e13542/.nvm/versions/node/v5.0.0/lib
    └── electron@0.4.1
    
    ├────ELECTRONCREATE
    Cloning into 'fiddle-0000-Template'...
    remote: Counting objects: 9, done.
    remote: Compressing objects: 100% (8/8), done.
    remote: Total 9 (delta 0), reused 4 (delta 0), pack-reused 0
    Unpacking objects: 100% (9/9), done.
    Checking connectivity... done.
    
    > electron-prebuilt@1.2.0 postinstall /Users/e13542/github/house/fiddles/electron/fiddle-0000-Template/node_modules/electron-prebuilt
    > node install.js
    
    fiddle-0000-Template@1.0.0 /Users/e13542/github/house/fiddles/electron/fiddle-0000-Template
    └─┬ electron-prebuilt@1.2.0
      ├─┬ electron-download@2.1.2
      │ ├─┬ debug@2.2.0
      │ │ └── ms@0.7.1
      │ ├── home-path@1.0.3
      │ ├── minimist@1.2.0
      │ ├─┬ mkdirp@0.5.1
      │ │ └── minimist@0.0.8
      │ ├─┬ mv@2.1.1
      │ │ ├── ncp@2.0.0
      │ │ └─┬ rimraf@2.4.5
      │ │   └─┬ glob@6.0.4
      │ │     ├─┬ inflight@1.0.5
      │ │     │ └── wrappy@1.0.2
      │ │     ├─┬ minimatch@3.0.0
      │ │     │ └─┬ brace-expansion@1.1.4
      │ │     │   ├── balanced-match@0.4.1
      │ │     │   └── concat-map@0.0.1
      │ │     ├── once@1.3.3
      │ │     └── path-is-absolute@1.0.0
      │ ├─┬ nugget@1.6.2
      │ │ ├─┬ pretty-bytes@1.0.4
      │ │ │ ├── get-stdin@4.0.1
      │ │ │ └─┬ meow@3.7.0
      │ │ │   ├─┬ camelcase-keys@2.1.0
      │ │ │   │ └── camelcase@2.1.1
      │ │ │   ├── decamelize@1.2.0
      │ │ │   ├─┬ loud-rejection@1.3.0
      │ │ │   │ ├── array-find-index@1.0.1
      │ │ │   │ └── signal-exit@2.1.2
      │ │ │   ├── map-obj@1.0.1
      │ │ │   ├─┬ normalize-package-data@2.3.5
      │ │ │   │ ├── hosted-git-info@2.1.5
      │ │ │   │ ├─┬ is-builtin-module@1.0.0
      │ │ │   │ │ └── builtin-modules@1.1.1
      │ │ │   │ ├── semver@5.1.0
      │ │ │   │ └─┬ validate-npm-package-license@3.0.1
      │ │ │   │   ├─┬ spdx-correct@1.0.2
      │ │ │   │   │ └── spdx-license-ids@1.2.1
      │ │ │   │   └─┬ spdx-expression-parse@1.0.2
      │ │ │   │     └── spdx-exceptions@1.0.4
      │ │ │   ├── object-assign@4.1.0
      │ │ │   ├─┬ read-pkg-up@1.0.1
      │ │ │   │ ├─┬ find-up@1.1.2
      │ │ │   │ │ └── path-exists@2.1.0
      │ │ │   │ └─┬ read-pkg@1.1.0
      │ │ │   │   ├─┬ load-json-file@1.1.0
      │ │ │   │   │ ├── graceful-fs@4.1.4
      │ │ │   │   │ ├─┬ parse-json@2.2.0
      │ │ │   │   │ │ └─┬ error-ex@1.3.0
      │ │ │   │   │ │   └── is-arrayish@0.2.1
      │ │ │   │   │ ├── pify@2.3.0
      │ │ │   │   │ └─┬ strip-bom@2.0.0
      │ │ │   │   │   └── is-utf8@0.2.1
      │ │ │   │   └── path-type@1.1.0
      │ │ │   ├─┬ redent@1.0.0
      │ │ │   │ ├─┬ indent-string@2.1.0
      │ │ │   │ │ └─┬ repeating@2.0.1
      │ │ │   │ │   └─┬ is-finite@1.0.1
      │ │ │   │ │     └── number-is-nan@1.0.0
      │ │ │   │ └── strip-indent@1.0.1
      │ │ │   └── trim-newlines@1.0.0
      │ │ ├─┬ progress-stream@1.2.0
      │ │ │ ├── speedometer@0.1.4
      │ │ │ └─┬ through2@0.2.3
      │ │ │   ├─┬ readable-stream@1.1.14
      │ │ │   │ └── isarray@0.0.1
      │ │ │   └─┬ xtend@2.1.2
      │ │ │     └── object-keys@0.4.0
      │ │ ├─┬ request@2.72.0
      │ │ │ ├── aws-sign2@0.6.0
      │ │ │ ├── aws4@1.4.1
      │ │ │ ├─┬ bl@1.1.2
      │ │ │ │ └─┬ readable-stream@2.0.6
      │ │ │ │   └── isarray@1.0.0
      │ │ │ ├── caseless@0.11.0
      │ │ │ ├─┬ combined-stream@1.0.5
      │ │ │ │ └── delayed-stream@1.0.0
      │ │ │ ├── extend@3.0.0
      │ │ │ ├── forever-agent@0.6.1
      │ │ │ ├─┬ form-data@1.0.0-rc4
      │ │ │ │ └── async@1.5.2
      │ │ │ ├─┬ har-validator@2.0.6
      │ │ │ │ ├─┬ chalk@1.1.3
      │ │ │ │ │ ├── ansi-styles@2.2.1
      │ │ │ │ │ ├── escape-string-regexp@1.0.5
      │ │ │ │ │ ├─┬ has-ansi@2.0.0
      │ │ │ │ │ │ └── ansi-regex@2.0.0
      │ │ │ │ │ ├── strip-ansi@3.0.1
      │ │ │ │ │ └── supports-color@2.0.0
      │ │ │ │ ├─┬ commander@2.9.0
      │ │ │ │ │ └── graceful-readlink@1.0.1
      │ │ │ │ ├─┬ is-my-json-valid@2.13.1
      │ │ │ │ │ ├── generate-function@2.0.0
      │ │ │ │ │ ├─┬ generate-object-property@1.2.0
      │ │ │ │ │ │ └── is-property@1.0.2
      │ │ │ │ │ ├── jsonpointer@2.0.0
      │ │ │ │ │ └── xtend@4.0.1
      │ │ │ │ └─┬ pinkie-promise@2.0.1
      │ │ │ │   └── pinkie@2.0.4
      │ │ │ ├─┬ hawk@3.1.3
      │ │ │ │ ├── boom@2.10.1
      │ │ │ │ ├── cryptiles@2.0.5
      │ │ │ │ ├── hoek@2.16.3
      │ │ │ │ └── sntp@1.0.9
      │ │ │ ├─┬ http-signature@1.1.1
      │ │ │ │ ├── assert-plus@0.2.0
      │ │ │ │ ├─┬ jsprim@1.2.2
      │ │ │ │ │ ├── extsprintf@1.0.2
      │ │ │ │ │ ├── json-schema@0.2.2
      │ │ │ │ │ └── verror@1.3.6
      │ │ │ │ └─┬ sshpk@1.8.3
      │ │ │ │   ├── asn1@0.2.3
      │ │ │ │   ├── assert-plus@1.0.0
      │ │ │ │   ├─┬ dashdash@1.13.1
      │ │ │ │   │ └── assert-plus@1.0.0
      │ │ │ │   ├── ecc-jsbn@0.1.1
      │ │ │ │   ├─┬ getpass@0.1.6
      │ │ │ │   │ └── assert-plus@1.0.0
      │ │ │ │   ├── jodid25519@1.0.2
      │ │ │ │   ├── jsbn@0.1.0
      │ │ │ │   └── tweetnacl@0.13.3
      │ │ │ ├── is-typedarray@1.0.0
      │ │ │ ├── isstream@0.1.2
      │ │ │ ├── json-stringify-safe@5.0.1
      │ │ │ ├─┬ mime-types@2.1.11
      │ │ │ │ └── mime-db@1.23.0
      │ │ │ ├── node-uuid@1.4.7
      │ │ │ ├── oauth-sign@0.8.2
      │ │ │ ├── qs@6.1.0
      │ │ │ ├── stringstream@0.0.5
      │ │ │ ├── tough-cookie@2.2.2
      │ │ │ └── tunnel-agent@0.4.3
      │ │ ├── single-line-log@0.4.1
      │ │ └── throttleit@0.0.2
      │ ├── path-exists@1.0.0
      │ └─┬ rc@1.1.6
      │   ├── deep-extend@0.4.1
      │   ├── ini@1.3.4
      │   └── strip-json-comments@1.0.4
      └─┬ extract-zip@1.5.0
        ├─┬ concat-stream@1.5.0
        │ ├── inherits@2.0.1
        │ ├─┬ readable-stream@2.0.6
        │ │ ├── core-util-is@1.0.2
        │ │ ├── isarray@1.0.0
        │ │ ├── process-nextick-args@1.0.7
        │ │ ├── string_decoder@0.10.31
        │ │ └── util-deprecate@1.0.2
        │ └── typedarray@0.0.6
        ├── debug@0.7.4
        ├─┬ mkdirp@0.5.0
        │ └── minimist@0.0.8
        └─┬ yauzl@2.4.1
          └─┬ fd-slicer@1.0.1
            └── pend@1.2.0
    
    
    0
    └──".FIDDLES/ELECTRON/FIDDLE-0000-TEMPLATE" CREATED.
 
 
#### Additional Info
    
[electron](../electron) fiddles are created based on the[electron-quick-start app](https://github.com/electron/electron-quick-start),
which available on github.  The create logic baked into the [fiddle.sh](../../scripts/fiddle.sh) script is based on 
[bash fiddle #86](../bash/fiddle-0086-Electron).  
