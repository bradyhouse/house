describe('Fiddle.ReportRecord', function() {

    describe("default config", function () {
        var model;

        beforeEach(function () {
            model = new Fiddle.ReportRecord({});
        });

        it("should have no fields", function () {
            expect(model.getFields().length).toEqual(0);
        });

    });

    describe("json config", function() {
        var model,
            json;

        beforeEach(function () {
            json = {};
            model = new Fiddle.ReportRecord({
                template: json
            });
        });

        it("model field count should match json key count", function() {

            var modelFields = model.getFields(),
                modelFieldCount = modelFields || modelFields.length,
                jsonKeyCount = Object.keys(json).length;

            expect(modelFieldCount).toEqual(jsonKeyCount);

        });

        it("fields should match the json keys", function() {

            var keys = Object.keys(json),
                fields = model.getFields();

            expect(Ext.Array.equals(fields, keys)).toBeTruthy();

        });




    });

});
