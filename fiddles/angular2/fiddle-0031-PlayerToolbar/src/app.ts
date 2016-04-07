import {Component, OnInit} from 'angular2/core';
import * as core from 'angular2/core';
import {NgStyle} from 'angular2/common';
import {PlayerToolbar, IPlayerToolbar, PlayerToolbarState} from './component/player-toolbar';
import * as meta from './meta';
import {IPlayerRange} from "./component/player-range/player-range";


@Component({
    selector: 'app',
    template: `
        <div class="scrollbox">
            <div class="panel panel-default" style="width: 100%;">
                <div class="panel-body">
                    <video [ngStyle]="{'margin-left': videoMarginLeft + 'px', 'width': videoWidth + 'px'}"
                           id="playerStream"
                           (ended)="onVideoEnded($event)"
                           src="http://buffalogrove.sat.iit.edu/Kitty.mp4"
                           poster="http://buffalogrove.sat.iit.edu/thumb/dogs_friends-t2.jpg">
                        Sorry, your browser doesn't support embedded videos,
                        but don't worry, you can <a href="videofile.ogg">download it</a>
                        and watch it with your favorite video player!
                    </video>
                </div>
                <player-toolbar [options]="playerToolbarOptions"
                                (statechange)="onPlayerToolbarStateChanged($event)"></player-toolbar>
            </div>
        </div>
    `,
    properties: ['width', 'margin', 'videoWidth'],
    directives: [PlayerToolbar, NgStyle]
})
export class App implements OnInit {

    private _width:Number = window.innerWidth / 2;
    private _height:Number = window.innerHeight / 2;
    private _toolbarOptions:IPlayerToolbar = <IPlayerToolbar>{
        width: this.width,
        items: 1,
        item: 0,
        state: PlayerToolbarState.play,
        rangeOptions: <IPlayerRange>{
            units: 'fps',
            min: 0,
            max: 100,
            step: 1,
            value: 1,
            units: 'fps',
            title: 'frames / sec'
        }
    }

    get width():number {
        return this._width;
    }

    get height():number {
        return this._height;
    }

    get videoWidth():number {
        return this.width - 40;
    }


    get playerToolbarOptions():IPlayerToolbar {
        return this._toolbarOptions;
    }


    onPlayerToolbarStateChanged(options:IPlayerToolbar) {

        let videoPlayer:any = document.getElementById('playerStream');

        this._toolbarOptions = options;

        if (videoPlayer) {

            videoPlayer.playbackRate = this.playerToolbarOptions.rangeOptions.value;

            switch(this.playerToolbarOptions.state) {
                case PlayerToolbarState.play:
                    videoPlayer.play();
                    break;
                case PlayerToolbarState.paused:
                    videoPlayer.pause();
                    break;
            }
            switch(this.playerToolbarOptions.item) {
                case 0:
                    videoPlayer.currentTime = 0;
                    break;
                case this.playerToolbarOptions.items:
                    videoPlayer.currentTime = videoPlayer.duration;
                    break;
            }
        }

    }

    onVideoEnded():any {
        this.playerToolbarOptions.state = PlayerToolbarState.paused;
        if(this.playerToolbarOptions.item < this.playerToolbarOptions.items) {
            this.playerToolbarOptions.item+=1;
        }
    }

}
