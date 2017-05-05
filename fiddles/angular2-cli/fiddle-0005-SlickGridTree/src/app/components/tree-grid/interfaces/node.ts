export interface Node {
  id: string;
  index: number;
  parent?: number;
  children?: Node[];
  expanded?: boolean;
  selected?: boolean;
}
