function overlay(updates, obj) {
  for(var prop in updates){
    if (obj.hasOwnProperty(prop)) {
      obj[prop]=updates[prop];
    }
  }
  return obj;
}

function mapLevelDimensions(level) {
  switch(level) {
    case 8:
      return {
        cols: 10,
        rows: 10
      }
    case 7:
      return {
        cols: 9,
        rows: 9
      }
    case 6:
      return {
        cols: 8,
        rows: 8
      }
    case 5:
      return {
        cols: 7,
        rows: 7
      }
    case 4:
      return {
        cols: 6,
        rows: 6
      }
    case 3:
      return {
        cols: 5,
        rows: 5
      }
    case 2:
      return {
        cols: 4,
        rows: 4
      }
    default:
      return {
        cols: 3,
        rows: 3
      }
  }
}

function isEven (x) {
  return (x % 2) == 0;
}

function isValid (sequence) {

  var inversionCounts = [],
    inversionSum = 0;


  sequence.map(function (a, x, arr) {
    var inversions = arr.filter(function (b, y) {
      return y > x && b < a;
    });

    if (inversions.length) {
      inversionCounts.push(inversions.length);
    } else {
      inversionCounts.push(0);
    }
  });

  inversionCounts.map(function (cnt) {
    inversionSum += cnt;
  });

  return isEven(inversionSum);
}

function generateSequence (min, max, count) {

  var range = [],
    number = 0,
    matches = [],
    i = 0;

  while (i < count) {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
    matches = range.filter(function (elem) {
      return elem == number;
    });
    if (matches.length == 0) {
      range.push(number);
      i++;
    }
  }

  return range;
}

function onGenerateGameSequence(min, max, count) {
  var sequence = generateSequence(min, max, count);
  while (!isValid(sequence)) {
    sequence = generateSequence(min, max, count);
  }
  return sequence;
}

function onCallback(args, fn, scope) {
  if (typeof fn === 'function') {
    if (scope) {
      fn.apply(scope, args);
    } else {
      fn(args);
    }
  }
}


exports.generateGameSequence = onGenerateGameSequence;
exports.callBack = onCallback;

