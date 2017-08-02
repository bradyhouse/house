(function (global) {

  var ngVer = '@4.0.2',
    map = {
      'app': 'app',
      '@angular': 'https://npmcdn.com/@angular',
      'angular-in-memory-web-api': 'https://npmcdn.com/angular-in-memory-web-api@0.3.1/bundles/in-memory-web-api.umd.js',
      'rxjs': 'https://npmcdn.com/rxjs@5.3.0',
      'ts': 'https://npmcdn.com/plugin-typescript@7.0.6/lib/plugin.js',
      'typescript': 'https://npmcdn.com/typescript@2.2.2/lib/typescript.js',
      'immutable': 'https://npmcdn.com/immutable@3.8.1/dist/immutable.js'
    },
    packages = {
      'app': {main: 'main.ts', defaultExtension: 'ts'},
      'rxjs': {defaultExtension: 'js'},
      'angular-in-memory-web-api': {defaultExtension: 'js'}
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
