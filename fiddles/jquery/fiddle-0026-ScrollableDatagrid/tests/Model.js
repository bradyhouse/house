TestCase("Model Class", {
    setUp: function() {
        this.emptyModel = app.test.model({});
        this.model = app.test.model({
            "_id": "5519c4bac66c1b41b108c655",
            "index": 0,
            "guid": "4c919f2c-8efa-4400-99ea-73f1ba4d92cf",
            "isActive": true,
            "checkingBalance": "-$39,084.92",
            "savingsBalance": "$826,240.37",
            "picture": "http://placehold.it/32x32",
            "age": 21,
            "eyeColor": "brown",
            "name": "Claudia Fisher",
            "gender": "female",
            "company": "EVIDENDS",
            "email": "claudiafisher@evidends.com",
            "phone": "+1 (984) 413-3997",
            "address": "532 Emerson Place, Sunwest, Connecticut, 4287",
            "about": "Excepteur pariatur dolore deserunt consectetur aute. Cillum eu irure magna labore irure incididunt adipisicing dolor ea excepteur incididunt pariatur sit. Qui reprehenderit exercitation laborum sint ullamco.\r\n",
            "registered": "2014-07-07",
            "latitude": 53.210329,
            "longitude": 156.735099,
            "tags": [
                "quis",
                "ipsum",
                "culpa",
                "incididunt",
                "elit",
                "ex",
                "aliquip"
            ],
            "friends": [
                {
                    "id": 0,
                    "name": "Hogan Floyd"
                },
                {
                    "id": 1,
                    "name": "Bessie Burgess"
                },
                {
                    "id": 2,
                    "name": "Russo Farrell"
                }
            ],
            "greeting": "Hello, Claudia Fisher! You have 3 unread messages.",
            "favoriteFruit": "apple"
        });
    },
    tearDown: function() {
        delete this.emptyModel;
        delete this.model;
    },
    "test - verify empty model fields length is 11": function() {
        assertEquals('fields length is not 11', this.emptyModel.fields.length, 11);
    },
    "test - verify model fields length is 11": function() {
        assertEquals('fields length is not 11', this.model.fields.length, 11);
    }
});
