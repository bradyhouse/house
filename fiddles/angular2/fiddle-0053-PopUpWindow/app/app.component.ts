import { Component } from '@angular/core';
import { PopUpService } from './pop-up.service';
import { Base } from './base';

@Component({
  selector: 'app',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css']
})
export class AppComponent extends Base {

  private _popUpConfig:number[];

  constructor(private _popUpService: PopUpService) {
    super();

    this.subscriptions.push(_popUpService.popUpConfigChange$
        .subscribe(
            (config:number[]) => this.onPopUpConfigChange(config)
        ));

  }

  onClick(network: string) {
    switch(network) {
      case 'cnn':
        this._openPopUp('http://go.cnn.com/?stream=cnn%3Fsr');
        break;
      case 'msnbc':
        this._openPopUp('http://player.theplatform.com/p/7wvmTC/MSNBCEmbeddedOffSite');
        break;
      case 'fox':
        var ts = Math.round((new Date()).getTime());

        this._openPopUp('http://video.foxnews.com/v/ts/?#sp=watch-live');

        break;
    }

  }

  onPopUpConfigChange(config: number[]) {
    if (config && config.length === 4) {
      this._popUpConfig = config;
    }
  }

  private _openPopUp(url: string) {
    this._initPopUpConfig();
    if (this._popUpService.popUp !== null) {
      this._popUpService.popUp.close();
    }

    this._popUpService.popUp = window.open(
        url,
        'targetWindow',
        'toolbar=no,location=no,titlebar=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=' +
        this._popUpConfig[0] + ',' +
        'height=' + this._popUpConfig[1] + ',' +
        'left=' + this._popUpConfig[2] + ',' +
        'top=' + this._popUpConfig[3]
    );

  }

  private _initPopUpConfig() {
    if (this._popUpService.popUpConfig.length === 4) {
      this._popUpConfig = this._popUpService.popUpConfig;
    } else {
      this._popUpConfig = [
        Math.floor(window.innerWidth / 2),
        Math.floor(window.innerHeight / 2),
        200,
        200
      ];
    }
  }


}
