
export enum PanelEventTypes {
  DRAG_START,
  DRAG_OVER,
  DRAG_END,
  CLOSE
}

export interface PanelEvent {
  type: PanelEventTypes,
  data: any;
}
