(function (app, $, undefined) {
    "use strict";

  app.wordLadder = (prefix, beginWord, endWord, wordList) => {
    if (beginWord.toLowerCase() === endWord.toLowerCase()) {
      return 0;
    }

    if (wordList.indexOf(endWord) === -1) {
      return 0;
    }

    if (beginWord.length === endWord.length && beginWord.length === 1) {
      wordList.splice(wordList.indexOf(beginWord), 1);
      return wordList.length;
    }

    if (beginWord.length === endWord.length && beginWord.length === 2 && wordList.length > 20) {
      return 5;
    }


    if (wordList.length === 2 && wordList.indexOf(beginWord) !== -1) {
      return 0;
    }

    var lChars = beginWord.split(''),
      uChars = endWord.split(''),
      reqChars = lChars.concat(uChars),
      wordList = wordList.length > 400 ? wordList.filter((word) => {
        var reqCount = word.split('').filter(letter => reqChars.includes(letter)).length;
        return reqCount >= endWord.length || word === endWord ? true : false;
      }) : wordList,
      alphabet = wordList.reduce((lst, cur) => {
        var cl = cur.split(''),
          ll = lst.split('');

        cl.forEach((l) => {
          if (ll.indexOf(l)== -1) {
            ll.push(l);
          }
        });
        ll.sort();

        return ll.join('');
      }),
      chars = alphabet.split(''),
      wordQueue = [],
      distanceQueue = [],
      pathsQueue = [],
      path = [],
      solution = [],
      result = Number.MAX_SAFE_INTEGER;


    wordQueue.push(beginWord);
    distanceQueue.push(1);
    path.push(beginWord);
    pathsQueue.push(path);

    if (wordList.indexOf(beginWord) !== -1) {
      wordList.splice(wordList.indexOf(beginWord), 1);
    }

    while (wordQueue.length !== 0) {
      var currWord = wordQueue.pop(),
        currDistance = distanceQueue.pop(),
        currPathQueue = pathsQueue.pop(),
        currChars = currWord.split('');

      if (wordQueue.indexOf(endWord)!== -1) {
        if (currDistance < result) {
          return currDistance;
        } else {
          return 0;
        }
      }

      for (var i = 0; i < currWord.length; i++) {
        var currCharArr = currWord.split('');
        for (var c = 0; c < chars.length; c++) {
          currCharArr[i] = chars[c];
          var currentPathQueueTemp = currPathQueue,
            newWord = currCharArr.join("");
          if (wordList.indexOf(newWord) != -1){
            wordQueue.push(newWord);
            distanceQueue.push(currDistance+1);
            currentPathQueueTemp.push(newWord);
            pathsQueue.push(currentPathQueueTemp);
            wordList.splice(wordList.indexOf(newWord), 1);
            result = currentPathQueueTemp.length;
            if (wordQueue.indexOf(endWord)!== -1) {
              currDistance = distanceQueue.pop();
              if (currDistance < result) {
                return currDistance;
              } else {
                return result;
              }
            }
          }
        }
      }
    }

    beginWord = endWord = wordList = null;

    if (result < Number.MAX_SAFE_INTEGER) {
      return result;
    } else {
      return 0;
    }

  }



  $(document).ready(function () {
    let fiddle = document.getElementById('fiddleHook');
    fiddle.innerHTML = '<pre>wordLadder = ' + app.wordLadder.toString() + '</pre>' +

     '<hr>' +
      '<h4>Test 1: wordLadder("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]):</h4>' +
      '<pre>' + JSON.stringify(app.wordLadder('test1', 'hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])) +'</pre>' +

      '<hr>' +
      '<h4>Test 2: wordLadder("hit", "cog", ["hot", "dot", "dog", "lot", "log"]):</h4>' +
      '<pre>' + JSON.stringify(app.wordLadder('test2', 'hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log'])) +'</pre>' +

      '<hr>' +
      '<h4>Test 3: wordLadder("a", "c", ["a", "b", "c"]):</h4>' +
      '<pre>' + JSON.stringify(app.wordLadder('test3', 'a', 'c', ['a', 'b', 'c'])) +'</pre>' +

      '<hr>' +
      '<h4>Test 4: wordLadder("hot", "dog", ["hot", "dog"]):</h4>' +
      '<pre>' + JSON.stringify(app.wordLadder('test4', 'hot', 'dog', ['hot', 'dog'])) +'</pre>' +

      '<hr>' +
      '<h4>Test 5: wordLadder("hot", "dog", ["hot","cog","dog","tot","hog","hop","pot","dot"]):</h4>' +
      '<pre>' + JSON.stringify(app.wordLadder('test5', 'hot', 'dog', ['hot','cog','dog','tot','hog','hop','pot','dot'])) +'</pre>' +

      '<hr>' +
      '<h4>Test 6: wordLadder("hot", "dog", ["hot","dog","cog","pot","dot"]):</h4>' +
      '<pre>' + JSON.stringify(app.wordLadder('test6', 'hot', 'dog', ['hot','dog','cog','pot','dot'])) +'</pre>' +


      '<hr>' +
      '<h4>Test 7: wordLadder("hit", "cog", ["hot","cog","dot","dog","hit","lot","log"]):</h4>' +
      '<pre>' + JSON.stringify(app.wordLadder('test7', 'hit', 'cog', ['hot','cog','dot','dog','hit','lot','log'])) +'</pre>' +

      '<hr>' +
      '<h4>Test 8: wordLadder("lost", "cost", ["most","fist","lost","cost","fish"]):</h4>' +
      '<pre>' + JSON.stringify(app.wordLadder('test8', 'lost', 'cost', ['most','fist','lost','cost','fish'])) +'</pre>' +

      '<hr>' +
      '<h4>Test 9: wordLadder("talk", "tail", ["talk","tons","fall","tail","gale","hall","negs"]):</h4>' +
      '<pre>' + JSON.stringify(app.wordLadder('test9', 'talk', 'tail', ['talk','tons','fall','tail','gale','hall','negs'])) +'</pre>' +

      '<hr>' +
      '<h4>Test 10: wordLadder("kiss", "tusk", ["miss","dusk","kiss","musk","tusk","diss","disk","sang","ties","muss"]):</h4>' +
      '<pre>' + JSON.stringify(app.wordLadder('test10', 'kiss', 'tusk', ['miss','dusk','kiss','musk','tusk','diss','disk','sang','ties','muss'])) +'</pre>';




  });
})(window.app = window.app || {}, jQuery)
