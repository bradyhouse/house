import {Injectable} from 'angular2/core';
import Injectable = ng.Injectable;


@Injectable()
export interface TooltipInterface {
    top?:number;                                    // absolute top position of the tooltip
    left?:number;                                   // absolute left position of the tooltip
    width?:number;                                  // tooltip width; defaults to 150px
    lines?:Array<{ field:string, value:string}>;    // field/value collection
    visible?:boolean;                               // visibility (hide/show) flag
}