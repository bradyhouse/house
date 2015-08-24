TestCase("Store Class", {
    setUp: function() {
        this.store = app.test.store({
            autoBind: false
        });
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
        this.rawJson = {
            "data": [{
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
            }]
        };
    },
    tearDown: function() {
        delete this.store;
        delete this.model;
        delete this.rawJson;
        if (this.promise) {
            delete this.promise;
        }
    },
    "test - verify autoBind flag is false": function() {
        assertFalse('store autoBind flag is not false', this.store.autoBind);
    },
    "test - verify url is set to data.json": function() {
        assertEquals('store url is not set to data.json', this.store.url, 'data.json');
    },
    "test - verify store model collection is empty": function() {
        assertArray('models is not an array', this.store.models);
        assertEquals('models is not empty', this.store.models.length, 0);
        assertEquals('store count is not zero', this.store.count, 0);
    },
    "test - verify model can be pushed into store": function() {
        this.store.push(this.model);
        assertEquals('models length is not 1', this.store.models.length, 1);
        assertSame('models does not contain the model', this.store.models[0], this.model);
    },

    "test - verify store can be zeroed": function() {
        this.store.push(this.model);
        assertEquals('models length is not 1', this.store.models.length, 1);
        assertSame('models does not contain the model', this.store.models[0], this.model);
        assertEquals('store count is incorrect', this.store.count, 1);

        this.store.zero();

        assertEquals('models length is not 0', this.store.models.length, 0);
        assertEquals('store is not empty', this.store.count, 0);
    },

    "test - verify store can be bound to raw json": function() {
        this.store.localBind(this.rawJson);
        assertEquals('models length is not 1', this.store.models.length, 1);
        assertEquals('count is not 1', this.store.count, 1);
        //assertSame('data does not contain the json', this.store.data, this.rawJson);
        //assertSame('models does not contain the model', this.store.models[0], this.model);
    },
    "test - verify store can be bound to remote json": function() {
        this.promise = new Promise(function(resolve, reject) {
            this.store.remoteBind();
            resolve(this.store);
        }).then(function(store) {
                console.log(store);
                assertEquals('count is not 782', store.count, 782);
            });
    }

});
