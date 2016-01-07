describe('Sun', function() {

    describe("Pre Init", function () {
        var sun,
            toolkit,
            fragmentShader = 'uniform float time;\n' +
                'uniform sampler2D texture1;\n' +
                'uniform sampler2D texture2;\n' +
                'varying vec2 texCoord;\n' +
                'void main( void ) {\n' +
                '   vec4 noise = texture2D( texture1, texCoord );\n' +
                '   vec2 T1 = texCoord + vec2( 1.5, -1.5 ) * time  * 0.01;\n' +
                '   vec2 T2 = texCoord + vec2( -0.5, 2.0 ) * time *  0.01;\n' +
                '   T1.x -= noise.r * 2.0;\n' +
                '   T1.y += noise.g * 4.0;\n' +
                '   T2.x += noise.g * 0.2;\n' +
                '   T2.y += noise.b * 0.2;\n' +
                '   float p = texture2D( texture1, T1 * 2.0 ).a + 0.25;\n' +
                '   vec4 color = texture2D( texture2, T2 );\n' +
                '   vec4 temp = color * 2.0 * ( vec4( p, p, p, p ) ) + ( color * color );\n' +
                '   gl_FragColor = temp;\n' +
                '}',
            vertexShader = 'varying vec2 texCoord;\n' +
                'void main() {\n' +
                '	texCoord = uv;\n' +
                '	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n' +
                '	gl_Position = projectionMatrix * mvPosition;\n' +
                '}'


        beforeEach(function () {
            sun = app.test.sun({});
            toolkit = app.test.toolkit();

        });

        it("should be an instance of an toolkit.three.Object", function () {
            expect(sun instanceof toolkit.three.Object).toBeTruthy();
        });

        it("should have a size equal to 50", function() {
            expect(sun.size).toEqual(50);
        });

        it("should have a fragmentShader", function() {
            expect(sun.fragmentShader).toEqual(fragmentShader);
        });

        it("should have a vertexShader", function() {
            expect(sun.vertexShader).toEqual(vertexShader);
        });

        it("should have a clock that is an instance of THREE.Clock", function() {
            expect(sun.clock instanceof THREE.Clock).toBeTruthy();
        });


    });


});
