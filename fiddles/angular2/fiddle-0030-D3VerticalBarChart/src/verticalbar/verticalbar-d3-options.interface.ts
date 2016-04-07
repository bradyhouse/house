import {Injectable} from 'angular2/core';

@Injectable()
export interface VerticalbarD3OptionsInterface {
    width?:Number;
    height?:Number;
    /*
     getScale: function(record) {
     var value = record.get('value'),
     tolerance = record.get('tolerance'),
     scale = (tolerance === 0) ? 0 : value / tolerance,
     ret = (scale >= 0) ? Ext.Number.constrain(scale, 0.05, 50) : Ext.Number.constrain(scale, -50, -0.05);
     return ret;
     }
     */
}
