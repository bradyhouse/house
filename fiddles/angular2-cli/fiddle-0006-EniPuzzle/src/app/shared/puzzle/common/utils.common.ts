export class Utils {

  static isEven(x) {
    return (x % 2) === 0;
  }

  static generateSequence(min, max, count) {

    let range = [],
      number = 0,
      i = 0;

    while (i < count) {
      number = Math.floor(Math.random() * (max - min + 1)) + min;
      if (range.indexOf(number) === -1) {
        range.push(number);
        i++;
      }
    }

    return range;
  }

  static generateSequentialSequence(min, max) {
    let sequence = [],
      i = 0,
      number = min,
      count = (max - min);
    if (count > 0) {
      while (i < (count + 1)) {
        sequence.push(number);
        number++;
        i++;
      }
    }
    return sequence;
  }

  static generateGameSequence(min, max, count) {
    let sequence = this.generateSequence(min, max, count);
    while (!this.isValid(sequence)) {
      sequence = this.generateSequence(min, max, count);
    }
    return sequence;
  }

  static isValid(sequence) {

    let inversionCounts = [],
      inversionSum = 0;

    sequence.forEach(function (a, x, arr) {
      let inversions = arr.filter(function (b, y) {
        return y > x && b < a;
      });

      if (inversions.length) {
        inversionCounts.push(inversions.length);
      } else {
        inversionCounts.push(0);
      }
    });

    inversionCounts.forEach(function (cnt) {
      inversionSum += cnt;
    });

    return this.isEven(inversionSum);
  }

  static mapLevelDimensions(level) {
    switch (level) {
      case 8:
        return {
          cols: 10,
          rows: 10
        };
      case 7:
        return {
          cols: 9,
          rows: 9
        };
      case 6:
        return {
          cols: 8,
          rows: 8
        };
      case 5:
        return {
          cols: 7,
          rows: 7
        };
      case 4:
        return {
          cols: 6,
          rows: 6
        };
      case 3:
        return {
          cols: 5,
          rows: 5
        };
      case 2:
        return {
          cols: 4,
          rows: 4
        };
      default:
        return {
          cols: 3,
          rows: 3
        };
    }
  }

  static overlay(updates, obj) {
    for (var prop in updates) {
      if (obj.hasOwnProperty(prop)) {
        obj[prop] = updates[prop];
      }
    }
    return obj;
  }

  static mapColClass(value) {
    switch (value) {
      case 1:
      case 9:
      case 17:
      case 25:
      case 33:
      case 41:
      case 49:
      case 57:
        return 'col-a';
      case 2:
      case 10:
      case 18:
      case 26:
      case 34:
      case 42:
      case 50:
      case 58:
        return 'col-b';
      case 3:
      case 11:
      case 19:
      case 27:
      case 35:
      case 43:
      case 51:
      case 59:
        return 'col-c';
      case 4:
      case 12:
      case 20:
      case 28:
      case 36:
      case 44:
      case 52:
      case 60:
        return 'col-d';
      case 5:
      case 13:
      case 21:
      case 29:
      case 37:
      case 45:
      case 53:
      case 61:
        return 'col-e';
      case 6:
      case 14:
      case 22:
      case 30:
      case 38:
      case 46:
      case 54:
      case 62:
        return 'col-f';
      case 7:
      case 15:
      case 23:
      case 31:
      case 39:
      case 47:
      case 55:
      case 63:
        return 'col-g';
      default:
        return 'col-h';
    }
  }

  static parseSubSequence(sequence, pos, range) {
    let subSequence = [],
      i = pos,
      lim = pos + range;

    sequence.map(function (element) {
      while (i < lim) {
        subSequence.push(sequence[i]);
        i++;
      }
    });

    return subSequence;

  }

  static isValidMove(a: any, b: any): boolean {
    let rowDelta = Math.abs(a.row - b.row),
      colDelta = Math.abs(a.col - b.col);
    if (a.col === b.col) {
      return (rowDelta === 1) && (colDelta === 0);
    }
    return false;
  }

  static swap(a: any, b: any): void {
    let valueA: number = a.value,
      isEmptyA: boolean = a.isEmpty,
      cssClassA: string = a.cssClass,
      valueB: number = b.value,
      isEmptyB: boolean = b.isEmpty,
      cssClassB: string = b.cssClass;

    a.value = valueB;
    a.isEmpty = isEmptyB;
    a.cssClass = cssClassB;

    b.value = valueA;
    b.isEmpty = isEmptyA;
    b.cssClass = cssClassA;
  }


}
