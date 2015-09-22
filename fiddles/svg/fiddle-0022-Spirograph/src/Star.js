class Star extends BasePath {

    /**
     * Class constructor.
     *
     * @param config
     */
    constructor(config) {

        if (config && !config.hasOwnProperty('id')) {
            config.id = 'star1';
        }
        super(config);

        this._permutations = 0;
        this._vertices = 0;
        this._angle = 0.0;
        this._randomizeShape = config && config.hasOwnProperty('randomizeShape') ? config.randomizeShape : false;
        this._randomizeColor = config && config.hasOwnProperty('randomizeColor') ? config.randomizeColor : false;
        this._clientX = config && config.hasOwnProperty('clientX') ? config.clientX : 156;
        this._clientY = config && config.hasOwnProperty('clientY') ? config.clientY : 116;
        this._fill = config && config.hasOwnProperty('fill') ? config.fill : '#56e9d4';
        this._radius = config && config.hasOwnProperty('radius') ? config.radius : 100;
        this._data = "";
        this.postInit();
    }

    get randomizeShape() {
        return this._randomizeShape;
    }

    get randomizeColor() {
        return this._randomizeColor;
    }

    get clientX() {
        return this._clientX;
    }

    get clientY() {
        return this._clientY;
    }

    get permutations() {
        return this._permutations;
    }

    get radius() {
        return this._radius;
    }

    get vertices() {
        return this._vertices;
    }

    get angle() {
        return this._angle;
    }

    get data() {
        return this._data;
    }

    get fill() {
        return this._fill;
    }


    initPath() {
        var x = this.clientX,
            y = this.clientY,
            data = "M ",
            xCoordinates,
            yCoordinates,
            i = 0;

        if (this._permutations !== 1) {

            if (this.randomizeShape) {
                this._vertices = Math.floor(Math.random() * 12) + 5;
                this._permutations = Math.floor(Math.random() * (this.vertices - 4)) + 3;
            } else {
                this._vertices = Math.floor(2 * 12) + 5;
                this._permutations = Math.floor(2 * (this.vertices - 4)) + 3;
            }
            if (Math.floor(this.vertices / this.permutations) * this.permutations == this.vertices) {
                this._vertices++;
            }
        } else {
            if (this.randomizeShape) {
                this._vertices = Math.floor(Math.random() * 8) + 3;
            } else {
                this._vertices = 12;
            }
        }

        this._angle = 2 * Math.PI / this.vertices;

        xCoordinates = new Array(this.vertices);
        yCoordinates = new Array(this.vertices);

        for (; i < this.vertices; i++) {
            xCoordinates[i] = x + Math.ceil(this.radius * Math.cos(i * this.angle));
            yCoordinates[i] = y + Math.ceil(this.radius * Math.sin(i * this.angle));
        }

        for (i = 0; i < this.vertices; i++) {
            data += xCoordinates[(i * this.permutations) % this.vertices] + " " + yCoordinates[(i * this.permutations) % this.vertices] + " ";
        }

        this._data += data + "z";
    }

    /**
     * Method called by the constructor to complete the initialization of the
     * docElement after the base class constructor is called.
     */
    postInit() {
        this.initPath();
        this.docElementNS.setAttribute("d", this.data);

        if (this.randomizeColor) {
            this.docElementNS.setAttribute("fill", Util.color());
        } else {
            this.docElementNS.setAttribute("fill", this.fill);
        }
    }
}
