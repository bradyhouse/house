export class PuzzleConfig {
  static title: string = '16 Puzzle';
  static isDev: boolean = false;
  static dbFile: string = 'puzzle.db';
  static transition: Object = {
    transition: {
      name: 'flip',
      curve: 'linear'
    }
  };
}
