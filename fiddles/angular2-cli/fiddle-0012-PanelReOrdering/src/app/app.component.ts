import { Component } from '@angular/core';
import { PanelOptions, HeaderOptions} from './components';
import {SelectListOptions, SelectListData} from './components/select-list/select-list';
import {PanelEvent, PanelEventTypes } from './components/panel/panel-event';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  panels: PanelOptions[];
  dragEndPanel: PanelOptions;
  dragOverPanel: PanelOptions;

  headerOptions: HeaderOptions;
  order: number[];
  constructor() {
    this.headerOptions = {
      selectListOptions: {
        data: [
          {id: 'http://go.cnn.com/?stream=cnn%3Fsr', text: 'cnn'},
          {id: 'http://player.theplatform.com/p/7wvmTC/MSNBCEmbeddedOffSite', text: 'msnbc'},
          {id: 'http://video.foxnews.com/v/ts/?#sp=watch-live', text: 'fox'}
        ],
        value: null,
        placeholder: 'select a site'
      }
    };


    this.panels = [];
  }
  onPanelEvent(event:any) {
    switch (event.type) {
      case PanelEventTypes.DRAG_START:

        break;
      case PanelEventTypes.DRAG_END:
        break;
      case PanelEventTypes.DRAG_OVER:
        break;
    }
  }
  onItemSelected(value: string) {
    let data: SelectListData[] = this.headerOptions.selectListOptions.data,
        modifiedData: SelectListData[] = [],
        selectedSite: SelectListData;

    data.forEach(
      (selectListItem:SelectListData) => {
        if (selectListItem.id === value) {
          selectedSite = selectListItem;
        } else {
          modifiedData.push(selectListItem);
        }
      });

    this.headerOptions = { selectListOptions: {
      data: modifiedData,
        value: null,
        placeholder: 'select a site'
    }};

    if (selectedSite) {
      let seq: number = 1;

      if (this.panels.length > 0) {
        seq = this.panels.length;
      }

      this.panels.push({
        seq: seq,
        url: String(selectedSite.id),
        width: window.innerWidth - 10,
        height: Math.floor(window.innerHeight * .3),
        top: 0,
        left: 0,
        title: selectedSite.text,
        isActive: true
      });
    }
  }
}
