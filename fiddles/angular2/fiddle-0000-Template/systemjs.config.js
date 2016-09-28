(function (global) {

  var ngVer = '@2.0.0-rc.1',
    map = {
      'app': 'app',

      '@angular': 'https://unpkg.com/@angular', // sufficient if we didn't pin the version
      'angular2-in-memory-web-api': 'https://unpkg.com/angular2-in-memory-web-api', // get latest
      'rxjs': 'https://unpkg.com/rxjs@5.0.0-beta.6',
      'ts': 'https://unpkg.com/plugin-typescript@4.0.10/lib/plugin.js',
      'typescript': 'https://unpkg.com/typescript@1.8.10/lib/typescript.js',
      'moment': 'https://unpkg.com/moment@2.13.0/moment.js',
      'ng2-bootstrap': 'https://unpkg.com/ng2-bootstrap@1.0.17/ng2-bootstrap.js'
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
    map['@angular/' + pkgName] = 'https://unpkg.com/@angular/' + pkgName + ngVer;
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
