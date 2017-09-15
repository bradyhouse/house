import {Component} from '@angular/core';
import {PanelOptions, HeaderOptions} from './components';
import {SelectListOptions, SelectListData} from './components/select-list/select-list';
import {PanelEvent, PanelEventTypes} from './components/panel/panel-event';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  panels: PanelOptions[];
  dragStartSeq: number;
  dragOverSeq: number;
  headerOptions: HeaderOptions;

  noPanels(): boolean {
    return this.panels.length === 0 ? true : false;
  }

  constructor() {
    this.headerOptions = {
      selectListOptions: {
        data: [
          {id: 1, text: 'Panel 1', order: 1},
          {id: 2, text: 'Panel 2', order: 2},
          {id: 3, text: 'Panel 3', order: 3}
        ],
        value: null,
        placeholder: 'open a panel'
      }
    };


    this.panels = [];
  }

  onPanelEvent(event: any) {
    switch (event.type) {
      case PanelEventTypes.DRAG_START:
        if (event.data.panel.seq !== this.dragStartSeq) {
          this.dragStartSeq = event.data.panel.seq;
        }
        break;
      case PanelEventTypes.DRAG_END:
        if (this.dragStartSeq !== this.dragOverSeq) {
          this._rebuildPanels(this.dragStartSeq, this.dragOverSeq);
          this.dragStartSeq = this.dragOverSeq = null;
        }
        break;
      case PanelEventTypes.DRAG_OVER:
        if (event.data.panel.seq !== this.dragOverSeq) {
          this.dragOverSeq = event.data.panel.seq;
        }
        break;
      case PanelEventTypes.CLOSE:
        this.panels = this.panels.filter((panel: PanelOptions) => {
          return panel.seq !== event.data.panel.seq;
        });

        this.headerOptions.selectListOptions.data.push(
          {
            id: event.data.panel.seq,
            text: event.data.panel.title,
            order: event.data.panel.id
          }
        );

        if (this.headerOptions.selectListOptions.data.length > 1) {
          this.headerOptions.selectListOptions.data.sort((itemA: any, itemB: any) => {
            return itemA.order - itemB.order;
          });
        }

        break;
    }
  }

  onItemSelected(value: any) {
    let data: SelectListData[] = this.headerOptions.selectListOptions.data,
      modifiedData: SelectListData[] = [],
      selectedSite: SelectListData,
      id: number = !isNaN(Number(value)) ? Number(value) : null;

    if (id) {
      data.forEach(
        (selectListItem: SelectListData) => {
          if (selectListItem.id === Number(value)) {
            selectedSite = selectListItem;
          } else {
            modifiedData.push(selectListItem);
          }
        });

      this.headerOptions = {
        selectListOptions: {
          data: modifiedData,
          value: null,
          placeholder: 'select a site'
        }
      };

      if (selectedSite) {

        let panelOptions: PanelOptions = {
          seq: selectedSite.id,
          id: selectedSite.order,
          url: String(selectedSite.id),
          height: Math.floor(window.innerHeight * .3),
          top: 0,
          left: 0,
          title: selectedSite.text,
          active: true,
          fullScreen: false,
          canClose: true,
          cssClass: this._seqCssClasses(selectedSite.order)
        };

        if (this.panels.length >= 1) {
          let updatedPanels: PanelOptions[] = [];
          updatedPanels.push(panelOptions);
          this.panels.forEach((panel:PanelOptions) => {
            let deepCopy = Object.assign({}, panel);
            updatedPanels.push(deepCopy);
          });
          this.panels = updatedPanels;
        } else {
          this.panels.push(panelOptions);
        }
      }
    }
  }

  private _seqCssClasses(seq: number): string [] {
    switch (seq) {
      case 1:
        return ['panel', 'panel-primary'];
      case 2:
        return ['panel', 'panel-success'];
      case 3:
        return ['panel', 'panel-warning'];
    }
  }

  private _rebuildPanels(seqA: number, seqB: number): void {
    if (this.panels.length > 1) {
      let panelsCopy: PanelOptions[] = Object.assign([], this.panels),
        panelA: PanelOptions = panelsCopy.filter((options: PanelOptions) => {
          return options.seq === seqA ? true : false;
        }).pop(),
        panelB: PanelOptions = panelsCopy.filter((options: PanelOptions) => {
          return options.seq === seqB ? true : false;
        }).pop(),
        newPanels: PanelOptions[] = panelsCopy.filter((options: PanelOptions) => {
          return options.seq !== seqB && options.seq !== seqA ? true : false;
        });

      if (panelA && panelB) {
        panelA.seq = seqB;
        panelB.seq = seqA;
        newPanels.push(panelA);
        newPanels.push(panelB);
        newPanels.sort((optionsA: PanelOptions, optionsB: PanelOptions) => {
          return optionsA.seq - optionsB.seq;
        });

        this.panels = newPanels;


      }
    }
  }


}
