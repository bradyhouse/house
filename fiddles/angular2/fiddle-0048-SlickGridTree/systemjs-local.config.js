(function (global) {

  var map = {
    'app': 'app',
    '@angular': 'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular-in-memory-web-api/bundles/angular-in-memory-web-api.umd.js',
    'rxjs': 'node_modules/rxjs',
    'ts': 'node_modules/plugin-typescript/lib/plugin.js',
    'typescript': 'node_modules/typescript/lib/typescript.js'
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
    map['@angular/' + pkgName] = 'node_modules/@angular/' + pkgName + '/bundles/' + pkgName + '.umd.js';
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
