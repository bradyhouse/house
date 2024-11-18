export interface PanelOptions {
  seq: number;
  url: string;
  id?: number;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  title?: string;
  active?: boolean;
  fullScreen?: boolean;
  canClose?: boolean;
  cssClass?: string[];
}
