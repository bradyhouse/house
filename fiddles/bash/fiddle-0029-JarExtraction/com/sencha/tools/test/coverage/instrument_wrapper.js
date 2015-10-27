function instrumentCode(code, filename) {
    var inst = new Instrumenter({}),
        result;
    result = inst.instrumentSync(code, filename);
    return result;
}