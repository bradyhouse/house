(function (global) {

  var ngVer = '@4.0.0',
    map = {
      'app': 'app',

      '@angular': 'https://npmcdn.com/@angular',
      'angular2-in-memory-web-api': 'https://npmcdn.com/angular2-in-memory-web-api',
      'rxjs': 'https://npmcdn.com/rxjs@5.0.0-beta.6',
      'ts': 'https://npmcdn.com/plugin-typescript@4.0.10/lib/plugin.js',
      'typescript': 'https://npmcdn.com/typescript@1.8.10/lib/typescript.js'
    },
    packages = {
      'app': {main: 'main.ts', defaultExtension: 'ts'},
      'rxjs': {defaultExtension: 'js'},
      'angular2-in-memory-web-api': {defaultExtension: 'js'},
    },
    ngPackageNames = [
      'common',
      'compiler',
      'core',
      'http',
      'platform-browser',
      'platform-browser-dynamic',
      'router',
      'router-deprecated',
      'upgrade',
    ];

  ngPackageNames.forEach(function (pkgName) {
    map['@angular/' + pkgName] = 'https://npmcdn.com/@angular/' + pkgName + ngVer + '/bundles/' + pkgName + '.umd.js';
  });

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
