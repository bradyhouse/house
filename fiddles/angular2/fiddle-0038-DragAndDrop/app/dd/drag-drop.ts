import {ElementRef} from '@angular/core';
import {RegionInterface, Region} from './../util/region';


export interface DragDropInterface {

    id:string;
    config:Object;
    dragElId:string;
    handleElId:string;
    invalidHandleTypes:Object;
    invalidHandleIds:Object;
    invalidHandleClasses:Array<string>;
    startPageX:number;
    startPageY:number;
    groups:Object;
    locked:boolean;
    lock():void;
    moveOnly:boolean;
    unlock():void;
    isTarget:boolean;
    padding:number;
    _domRef:Object;
    __ygDragDrop:boolean;
    constrainX:boolean;
    constrainY:boolean;
    minX:number;
    maxX:number;
    minY:number;
    maxY:number;
    maintainOffset:boolean;
    xTicks:Array<number>;
    yTicks:Array<number>;
    primaryButtonOnly:boolean;
    available:boolean;
    hasOuterHandles:boolean;
    triggerEvent:string;
    b4StartDrag(x:number, y:number):void;
    startDrag(x:number, y:number):void;
    b4Drag(e:Event):void;
    onDrag(e:Event):void;
    onDragEnter(e:Event, id:string):void;
    b4DragOver(e:Event):void;
    onDragOver(e:Event, id:string):void;
    b4DragOut(e:Event):void;
    onDragOut(e:Event, id:string):void;
    b4DragDrop(e:Event):void;
    onDragDrop(e:Event, id:string):void;
    onInvalidDrop(e:Event):void;
    b4EndDrag(e:Event):void;
    endDrag(e:Event):void;
    b4MouseDown(e:Event):void;
    onMouseDown(e:Event):void;
    onMouseUp(e:Event):void;
    onAvailable():void;
    defaultPadding:RegionInterface;
    constrainTo(target:ElementRef, pad:number, inContent:boolean):void;
    getEl():ElementRef;
    getDragEl():ElementRef;
    init(id:string, sGroup:string, config:Object):void;
    initTarget(id:string, sGroup:string, config:Object):void;
    applyConfig():void;
    handleOnAvailable():void;
    setPadding(iTop:number, iRight:number, iBot:number, iLeft:number):void;
    setInitPosition(diffX:number, diffY:number):void;
    setStartPosition(pos:Object):void;
    addToGroup(sGroup:string):void;
    removeFromGroup(sGroup:string):void;
    setDragElId(id:string):void;
    setHandleElId(id:string):void;
    setOuterHandleElId(id:string):void;
    unreg():void;
    destroy():void;
    isLocked():boolean;
    handleMouseDown(e:Event, oDD:DragDrop):void;
    clickValidator(e:Event):void;
    addInvalidHandleType(tagName:string):void;
    addInvalidHandleId(id:string):void;
    addInvalidHandleClass(cssClass:string):void;
    removeInvalidHandleType(id:string):void;
    removeInvalidHandleId(id:string):void;
    removeInvalidHandleClass(cssClass:string):void;
    isValidHandleChild(node:ElementRef):boolean;
    setXTicks(iStartX:number, iTickSize:number):void;
    setYTicks(iStartY:number, iTickSize:number):void;
    setXConstraint(iLeft:number, iRight:number, iTickSize:number):void;
    clearConstraints():void;
    clearTicks():void;
    setYConstraint(iUp:number, iDown:number, iTickSize:number):void;
    resetConstraints():void;
    getTick(val:number, tickArray:Array<number>):number;
    toString():string;
}

export class DragDrop implements DragDropInterface {

    id:string = null;
    config:Object = null;
    dragElId:string = null;
    handleElId:string = null;
    invalidHandleTypes:Object = null;
    invalidHandleIds:Object =null;
    invalidHandleClasses:Array<string> = null;
    startPageX:number = 0;
    startPageY:number = 0;
    groups:Object = null;
    locked:boolean = false;
    moveOnly:boolean = false;
    isTarget:boolean = true;
    padding:number = null;
    _domRef:Object = null;
    __ygDragDrop:boolean = true;
    constrainX:boolean = false;
    constrainY:boolean = false;
    minX:number = 0;
    maxX:number = 0;
    minY:number = 0;
    maxY:number = 0;
    maintainOffset:boolean = false;
    xTicks:Array<number> = null;
    yTicks:Array<number> = null;
    primaryButtonOnly:boolean = true;
    available:boolean = false;
    hasOuterHandles:boolean = false;
    triggerEvent:string = 'mousedown';
    defaultPadding:RegionInterface = <RegionInterface>{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    lock():void {
        this.locked = true;
    }

    unlock():void {
        this.locked = false;
    }

    b4StartDrag(x:number, y:number):void {
    }

    startDrag(x:number, y:number):void {
    }

    b4Drag(e:Event):void {
    }

    onDrag(e:Event):void {
    }

    onDragEnter(e:Event, id:string):void {
    }

    b4DragOver(e:Event):void {
    }

    onDragOver(e:Event, id:string):void {
    }

    b4DragOut(e:Event):void {
    }

    onDragOut(e:Event, id:string):void {
    }

    b4DragDrop(e:Event):void {
    }

    onDragDrop(e:Event, id:string):void {
    }

    onInvalidDrop(e:Event):void {
    }

    b4EndDrag(e:Event):void {
    }

    endDrag(e:Event):void {
    }

    b4MouseDown(e:Event):void {
    }

    onMouseDown(e:Event):void {
    }

    onMouseUp(e:Event):void {
    }

    onAvailable():void {
    }

    constrainTo(target:ElementRef, pad:number, inContent:boolean):void {

        /*let padding = new Region(pad, pad, pad, pad),
            ddBox = this.getEl().getBox(),
            constrainEl = target,
            s = constrainEl.getScroll(),
            c,
            constrainDom = constrainEl.dom,
            xy,
            topSpace,
            leftSpace;

        if (constrainDom === document.body) {
            c = {
                x: s.left,
                y: s.top,
                width: Ext.Element.getViewportWidth(),
                height: Ext.Element.getViewportHeight()
            };
        } else {
            xy = constrainEl.getXY();
            c = {
                x : xy[0],
                y: xy[1],
                width: constrainDom.clientWidth,
                height: constrainDom.clientHeight
            };
        }

        topSpace = ddBox.y - c.y;
        leftSpace = ddBox.x - c.x;

        this.resetConstraints();
        this.setXConstraint(leftSpace - (pad.left||0), // left
            c.width - leftSpace - ddBox.width - (pad.right||0), //right
            this.xTickSize
        );
        this.setYConstraint(topSpace - (pad.top||0), //top
            c.height - topSpace - ddBox.height - (pad.bottom||0), //bottom
            this.yTickSize
        ); */


    }

    getEl():ElementRef{
        return null;
    }

    getDragEl():ElementRef{
        return null;
    }

    init(id:string, sGroup:string, config:Object):void {
    }

    initTarget(id:string, sGroup:string, config:Object):void {
    }

    applyConfig():void {
    }

    handleOnAvailable():void {
    }

    setPadding(iTop:number, iRight:number, iBot:number, iLeft:number):void {
    }

    setInitPosition(diffX:number, diffY:number):void {
    }

    setStartPosition(pos:Object):void {
    }

    addToGroup(sGroup:string):void {
    }

    removeFromGroup(sGroup:string):void {
    }

    setDragElId(id:string):void {
    }

    setHandleElId(id:string):void {
    }

    setOuterHandleElId(id:string):void {
    }

    unreg():void {
    }

    destroy():void {
    }

    isLocked():boolean {
        return null;
    }

    handleMouseDown(e:Event, oDD:DragDrop):void {
    }

    clickValidator(e:Event):void {
    }

    addInvalidHandleType(tagName:string):void {
    }

    addInvalidHandleId(id:string):void {
    }

    addInvalidHandleClass(cssClass:string):void {
    }

    removeInvalidHandleType(id:string):void {
    }

    removeInvalidHandleId(id:string):void {
    }

    removeInvalidHandleClass(cssClass:string):void {
    }

    isValidHandleChild(node):boolean {
        return null;
    }

    setXTicks(iStartX:number, iTickSize:number):void {
    }

    setYTicks(iStartY:number, iTickSize:number):void {
    }

    setXConstraint(iLeft:number, iRight:number, iTickSize:number):void {
    }

    clearConstraints():void {
    }

    clearTicks():void {
    }

    setYConstraint(iUp:number, iDown:number, iTickSize:number):void {
    }

    resetConstraints():void {
    }

    getTick(val:number, tickArray:Array<number>):number {
        return null;
    }

    constructor(id:string, sGroup:string, config:Object) {
        if (id) {
            this.init(id, sGroup, config);
        }
    }

}