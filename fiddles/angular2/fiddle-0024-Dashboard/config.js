
System.config({
    transpiler: 'typescript',
    typescriptOptions: {
        emitDecoratorMetadata: true
    },
    map: {
        app: "./src"
    },
    packages: {
        app: {
            main: './boot.ts',
            defaultExtension: 'ts'
        }
    }
});
