export class Config {
  static title: string = '15 Puzzle';
  static isDev: boolean = true;
  static dbFile: string = 'highscore.db';
  static defaultLevel: number = 1;
  static transitionWithoutHistory: Object = {
    transition: {
      name: "flip",
      curve: "linear"
    },
    clearHistory: true
  };
  static transitionWithHistory: Object = {
    transition: {
      name: "flip",
      curve: "linear"
    },
    clearHistory: false
  };

}
