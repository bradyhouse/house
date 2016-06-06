import {Offset} from './../util/offset';
import {Region} from './../util/region';
import {Point} from './../util/point';
import {Tools} from './../util/tools';


export interface DragDropManagerInterface {

    ids:Object;
    handleIds:Object;
    dragCurrent:Object;
    dragOvers:Object;
    deltaX:number;
    deltaY:number;
    preventDefaults:boolean;
    stopPropagation:boolean;
    intialized:boolean;
    locked:boolean;
    POINT:number;
    INTERSECT:number;
    mode:number;
    dragCls:string;
    _execOnAll():void;
    addListeners():void;
    preventDrag(e:Event):void;
    _onResize(e:Event):void;
    lock():void;
    unlock():void;
    isLocked():boolean;
    locationCache:Object;
    useCache:boolean;
    clickPixelThresh:number;
    dragThreshMet:boolean;
    clickTimeout:Object;
    startX:number;
    startY:number;


}


export class DragDropManager {





}