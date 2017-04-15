(function (global) {

  var ngVer = '@2.0.0-rc.3'; // lock in the angular package version; do not let it float to current!
  var routerVer = '@3.0.0-alpha.7'; // lock router version
  var formsVer = '@0.1.1'; // lock forms version


  var map = {
    'app': 'app',
    '@angular': 'https://unpkg.com/@angular/core', // sufficient if we didn't pin the version
    '@angular/router': 'https://unpkg.com/@angular/router' + routerVer,
    '@angular/forms': 'https://unpkg.com/@angular/forms' + formsVer,
    'angular2-in-memory-web-api': 'https://unpkg.com/angular2-in-memory-web-api', // get latest
    'rxjs': 'https://unpkg.com/rxjs@5.0.0-beta.6',
    'ts': 'https://unpkg.com/plugin-typescript@4.0.10/lib/plugin.js',
    'typescript': 'https://unpkg.com/typescript@1.9.0-dev.20160409/lib/typescript.js',
    'ag-grid-ng2': 'https://unpkg.com/ag-grid-ng2@4.2.0',
    'ag-grid-enterprise': 'https://unpkg.com/ag-grid-enterprise@4.2.0',
    'ag-grid': 'https://unpkg.com/ag-grid@4.2.6',
    'jquery': 'https://unpkg.com/jquery@3.0.0',
    'jquery-csv': 'https://unpkg.com/jquery-csv@0.8.1',
    'immutable': 'https://unpkg.com/immutable@3.8.1'

  };

  var packages = {
    'app': {main: 'main.ts', defaultExtension: 'ts'},
    'rxjs': {defaultExtension: 'js'},
    'angular2-in-memory-web-api': {main: 'index.js', defaultExtension: 'js'},
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router-deprecated',
    'upgrade',
  ];

  ngPackageNames.forEach(function (pkgName) {
    map['@angular/' + pkgName] = 'https://unpkg.com/@angular/' + pkgName + ngVer;
  });

  ngPackageNames.forEach(function (pkgName) {

    packages['@angular/' + pkgName] = {main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js'};

  });

  packages['@angular/router'] = {main: 'index.js', defaultExtension: 'js'};

  packages['@angular/forms'] = {main: 'index.js', defaultExtension: 'js'};

  var config = {
    transpiler: 'typescript',
    typescriptOptions: {
      emitDecoratorMetadata: true
    },

    map: map,
    packages: packages
  }

  System.config(config);

})(this);

