import {Component} from 'angular2/core';
import * as core from 'angular2/core';
import {NgStyle} from 'angular2/common';
import {PlayerToolbar, IPlayerToolbar, PlayerToolbarState} from './component/player-toolbar';
import * as meta from './meta';


@Component({
    selector: 'app',
    template: `
        <div class="container-fluid">
            <div class="panel panel-default" [ngStyle]="{'width': width + 'px'}" >
              <div class="panel-body">
                <video [ngStyle]="{'margin-left': videoMarginLeft + 'px', 'width': videoWidth + 'px'}"
                    id="playerStream"
                    src="http://buffalogrove.sat.iit.edu/Kitty.mp4"
                    poster="http://buffalogrove.sat.iit.edu/thumb/dogs_friends-t2.jpg">
                    </video>
              </div>
              <player-toolbar [options]="playerToolbarOptions"></player-toolbar>
            </div>
        </div>
    `,
    properties: ['width', 'margin', 'videoWidth'],
    directives: [PlayerToolbar, NgStyle]
})
export class App {

    private _width:Number = window.innerWidth / 2;

    get width() {
        return this._width;
    }
    get videoWidth() {
        return this._width - 40;
    }

    get videoMarginLeft() {
        return 0;
    }

    get playerToolbarOptions:IPlayerToolbar {
        return {
            width: this.width,
            items: 10,
            item: 0,
            state: PlayerToolbarState.paused
        }
    }


}
