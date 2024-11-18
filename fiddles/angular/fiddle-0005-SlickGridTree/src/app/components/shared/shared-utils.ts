
export class SharedUtils {

  static guid(): string {
    return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, this.randomGuidDigit);
  }

  private static randomGuidDigit(): string {
    let crypto = window.crypto;
    if (crypto && crypto.getRandomValues) {
      var rands = new Uint8Array(1);
      crypto.getRandomValues(rands);
      return (rands[0] % 16).toString(16);
    } else {
      return ((Math.random() * 16) | 0).toString(16);
    }
  }
}
