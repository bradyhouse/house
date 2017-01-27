export class Config {
  static title: string = '15 Puzzle';
  static isDev: boolean = false;
  static dbFile: string = 'highscore.db';
  static defaultLevel: number = 1;
  static transition: Object = {
    transition: {
      name: "flip",
      curve: "linear"
    }
  };
}
