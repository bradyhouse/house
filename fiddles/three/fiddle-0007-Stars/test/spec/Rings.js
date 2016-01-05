describe('Rings', function() {


    describe("Default Config", function () {

        var rings;

        beforeEach(function () {
            rings = app.test.rings({});
        });

        it("should be an instance of THREE.Geometry", function () {
            expect(rings instanceof THREE.Geometry).toBeTruthy();
        });

        it("should have an innerRadius of .5", function() {
            expect(rings.innerRadius).toEqual(.5);
        });

        it("should have an outerRadius of 1", function() {
            expect(rings.outerRadius).toEqual(1);
        });

        it("should have a gridY of 10", function() {
           expect(rings.gridY).toEqual(10);
        });

        /*
         * Name for this geometry. Default is an empty string.
         */

        /*it("should have a name that is an empty string", function() {
            expect(/^\s*$/.test(rings.name)).toBeTruthy();
        });*/

        /*
         * Unique number for this geometry instance.
         */

        it("should hava a numeric id", function() {
            expect(rings.id).toBeTruthy();
        });

        /*
         * Array of vertices.
         * The array of vertices holds every position of points in the model.
         * To signal an update in this array, Geometry.verticesNeedUpdate needs to be set to true.
         */

        it("should have an empty vertices array", function() {
            expect(rings.vertices).toBeTruthy();
            expect(rings.vertices.length).toEqual(0);
        });

        /*
         * Array of vertex colors, matching number and order of vertices.
         * Used in Points and Line.
         * Meshes use per-face-use-of-vertex colors embedded directly in faces.
         * To signal an update in this array, Geometry.colorsNeedUpdate needs to be set to true.
         */

        it("should have an empty colors array", function() {
            expect(rings.colors).toBeTruthy();
            expect(rings.colors.length).toEqual(0);
        });

        /*
         * Array of triangles.
         * The array of faces describe how each vertex in the model is connected with each other.
         * To signal an update in this array, Geometry.elementsNeedUpdate needs to be set to true.
         */

        it("should have an empty faces array", function() {
            expect(rings.faces).toBeTruthy();
            expect(rings.faces.length).toEqual(0);
        });

        /*
         * Array of face UV layers.
         * Each UV layer is an array of UVs matching the order and number of vertices in faces.
         * To signal an update in this array, Geometry.uvsNeedUpdate needs to be set to true.
         */

        it("should have an empty faceVertexUvs array", function() {
            expect(rings.faceVertexUvs).toBeTruthy();
            expect(rings.faceVertexUvs.length).toEqual(0);
        });

        /*
         * Array of morph targets. Each morph target is a Javascript object:
         *
         * { name: "targetName", vertices: [ new THREE.Vector3(), ... ] }
         *
         * Morph vertices match number and order of primary vertices.
         */

        it("should have an empty morphTargets array", function() {
            expect(rings.morphTargets).toBeTruthy();
            expect(rings.morphTargets.length).toEqual(0);
        });

        /*
         * Array of morph normals.
         * Morph normals have similar structure as morph targets,
         * each normal set is a Javascript object:
         *
         * morphNormal = { name: "NormalName", normals: [ new THREE.Vector3(), ... ] }
         *
         */
        it("should have an empty morphNormals array", function() {
            expect(rings.morphNormals).toBeTruthy();
            expect(rings.morphNormals.length).toEqual(0);
        });

    });

    describe("Post Init", function() {
        var rings;

        beforeEach(function () {
            rings = app.test.rings({
                autoInit: true
            });
        });

        it("should have 1608 vertices", function() {
            expect(rings.vertices.length).toEqual(1608);
        });

        it("should have 804 faces", function() {
            expect(rings.faces.length).toEqual(804);
        });

    });

});
