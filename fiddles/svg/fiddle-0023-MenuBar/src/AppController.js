/**
 * Collection of static event
 * handler methods.
 */
class AppController {

    /**
     * Static method used to configure default
     * event handlers. If a
     * class is defined with a specific
     * set of event handlers, this method
     * can be used to wire-up (and then test) the default
     * configuration. Impetus for this method
     * came from the addition of the Text class.
     */
    static onEmptyFn() {
        return true;
    }

    /**
     * Static method used to handle (listen for)
     * the Surface (svg) load event.
     *
     * @param evt {object}
     * @param id {string}
     */
    static onSurfaceLoad(evt) {
        console.log('onSurfaceLoad');
        console.log(evt);
    }

    /**
     * Static method used to handle (listen for)
     * the Path Mouse down event.
     *
     * @param evt {object}
     * @param id {string}
     */
    static onPathMouseDown(evt, id) {
        console.log('onPathMouseDown');
        if(!app.controller.selectedShape) {
            app.controller.selectShape(evt, id);
        }
    }

    /**
     * Static method used to handle (listen for)
     * the Path Mouse over event.
     *
     * @param evt {object}
     * @param id {string}
     */
    static onPathMouseOver(evt, id) {
        console.log('onPathMouseOver');

        var opacity = '';

        if (id === 'over') {
            opacity = app.controller.selectedShape.getAttribute('opacity');
            app.controller.selectedShape.setAttribute('stroke', 'red');
            app.controller.selectedShape.setAttribute('stroke-width', 3);
            app.controller.selectedShape.setAttribute('opacity', 3*opacity/4);
        }

        /**
         if (!first) return

         if (o=='over'){
                opac=document.getElementById("P"+c).getAttribute("opacity")
                document.getElementById("P"+c).setAttribute("stroke","red")
                document.getElementById("P"+c).setAttribute("stroke-width",3)
                document.getElementById("P"+c).setAttribute("opacity",3*opac/4)

                //Chosen=svgDocument.getElementById("P"+c)
            }
         else{
                document.getElementById("P"+c).setAttribute("stroke","black")
                document.getElementById("P"+c).setAttribute("opacity",opac)
                document.getElementById("P"+c).setAttribute("stroke-width",1)
            }
         */

    }

    /**
     * Static method used to handle (listen for)
     * the Path Mouse out event.
     *
     * @param evt {object}
     * @param id {string}
     */
    static onPathMouseOut(evt, id) {
        console.log('onPathMouseOut');
        console.log(id);
    }

    /**
     * Static method used to handle (listen for)
     * the group mouse down event.
     *
     * @param evt {object}
     */
    static onShapeGroupMouseDown(evt) {
        console.log('onGroupMouseDown');
        console.log(evt);
    }

    static onTextMouseDown(evt) {

    }

    static onTextMouseOver(evt) {

    }

    static onTextMouseOut(evt) {

    }

    static onTextClick(evt) {

    }

    static selectShape(evt, id) {
        var shapesGroup = document.getElementById('shapesGroup'),
            groupTransform = Util.splitAttribute('shapesGroup','transform', 'translate(0,0)'),
            oldX=evt.clientX - parseInt(groupTransform[1]),
            oldY=evt.clientY - parseInt(groupTransform[2]);

        app.controller.selectedShape = document.getElementById(id);
        app.controller.selectedShape.setAttribute('onmouseup', "app.controller.onSelectedShapeMouseUp()");
        app.controller.selectedShape.setAttribute('stroke-width', 2);
        app.controller.selectedShape.setAttribute('stroke', 'yellow');

        shapesGroup.setAttribute('onmousemove', 'app.controller.onSelectedShapeDrag(evt,'+ oldX +', ' + oldY + ')');

        /*if (!first) return;
        Chosen=document.getElementById(U);
        GT=getTransform(Chosen);
        oldX=evt.clientX - parseInt(GT[1]);
        oldY=evt.clientY - parseInt(GT[2]);
        place.setAttribute("onmousemove", "drag(evt)");
        Chosen.setAttribute("onmouseup", "selectIt()");
        thingclicked=true
        Chosen.setAttribute("stroke-width", 3);
        Chosen.setAttribute("stroke", "green");
        ShowPts();*/
    }

    static onSelectedShapeDrag(evt, x, y) {
        console.log('onSelectedShapeDrag');

        var shapesGroup = document.getElementById('shapesGroup'),
            deltaX = evt.clientX - x,
            deltaY = evt.clientY - y,
            shapeTransform = "translate("+(deltaX)+","+(deltaY)+")";

        app.controller.selectedShape.setAttribute("transform", shapeTransform);
        shapesGroup.setAttribute('onmouseup', 'app.controller.onSelectedShapeDrop()');

        app.controller.selectedShape.setAttribute("onmouseup", null);
        /*
         ShowPts()
         place.setAttribute("onmouseup", "stopdrag()");
         nX=evt.clientX-oldX;
         nY=evt.clientY-oldY;
         if (grid){
         nX=Math.floor(nX/gridsize)*gridsize+gridsize/2
         nY=Math.floor(nY/gridsize)*gridsize+gridsize/2
         }
         sT="translate("+(nX)+","+(nY)+")"
         Chosen.setAttribute("transform", sT);
         if (PGon) PG.setAttribute("transform", sT);
         Chosen.setAttribute("onmouseup", null);
         */
    }

    static onSelectedShapeDrop() {
        console.log('onSelectedShapeDrop');
        var shapesGroup = document.getElementById('shapesGroup');

        shapesGroup.setAttribute('onmousemove', null);
        shapesGroup.setAttribute('onmouseup', null);
        //shapesGroup.setAttribute('transform', 'translate(0,0)');
        app.controller.selectedShape.setAttribute('mouseover', null);
        app.controller.selectedShape.setAttribute('mousemove', null);
        app.controller.selectedShape.setAttribute('stroke-width', '1');
        app.controller.selectedShape.setAttribute('stroke', 'black');
        app.controller.selectedShape = null;
       /*
         place.setAttribute("onmousemove", null);
         place.setAttribute("onmouseup", null);
         Chosen.setAttribute("stroke", "black");
         Chosen.setAttribute("stroke-width", "1");
         finished=false
         first=true
         unselect()
         //place.setAttribute("onkeyup", null);
         selectM.setAttribute("visibility","hidden")
         */
    }

    static onSelectedShapeMouseUp() {
        console.log('onSelectedShapeMouseUp');

        var shapesGroup = document.getElementById('shapesGroup');

        app.controller.selectedShape.setAttribute('stroke-width', 2);
        app.controller.selectedShape.setAttribute('stroke', 'red');

        shapesGroup.setAttribute('onkeyup', 'app.controller.onShapeGroupKeyUp(evt);');
        shapesGroup.setAttribute('onmousemove', null);
        shapesGroup.setAttribute('onmouseup', null);


        /**
         * unselect()
         Chosen.setAttribute("stroke-width", 2);
         Chosen.setAttribute("stroke", "red");
         place.setAttribute("onkeyup", "keyHandle(evt)");
         place.setAttribute("onmousemove", null);
         place.setAttribute("onmousedown", null);
         selectM.setAttribute("visibility","visible")
         ShowPts()
         */
    }

    static onShapeGroupKeyUp(evt) {
        console.log('onShapeGroupKeyUp');

    }












 }
