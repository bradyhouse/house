(function (global) {

  var ngVer = '@2.0.0-rc.1',
    map = {
      'app': 'app',

      '@angular': 'https://npmcdn.com/@angular', // sufficient if we didn't pin the version
      'angular2-in-memory-web-api': 'https://npmcdn.com/angular2-in-memory-web-api', // get latest
      'rxjs': 'https://npmcdn.com/rxjs@5.0.0-beta.6',
      'ts': 'https://npmcdn.com/plugin-typescript@4.0.10/lib/plugin.js',
      'typescript': 'https://npmcdn.com/typescript@1.8.10/lib/typescript.js',
      'moment': 'https://npmcdn.com/moment@2.13.0/moment.js',
      'ng2-bootstrap': 'https://npmcdn.com/ng2-bootstrap@1.0.17/ng2-bootstrap.js'
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
    map['@angular/' + pkgName] = 'https://npmcdn.com/@angular/' + pkgName + ngVer;
  });

  ngPackageNames.forEach(function (pkgName) {
    packages['@angular/' + pkgName] = {main: pkgName + '.umd.js', defaultExtension: 'js'};
  });

  var config = {
    transpiler: 'typescript',
    typescriptOptions: {
      emitDecoratorMetadata: true
    },
    map: map,
    packages: packages
  };

  System.config(config);

})(this);