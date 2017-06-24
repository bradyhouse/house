(function (app, $, undefined) {
    "use strict";

  /**
   * For beginWord = "hit", endWord = "cog", and wordList = ["hot", "dot", "dog", "lot", "log", "cog"],
   * the output should be wordLadder(beginWord, endWord, wordList) = 5.
   * The shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog" with a length of 5.
   */
  app.wordLadder = (prefix, beginWord, endWord, wordList) => {


    if (beginWord.toLowerCase() === endWord.toLowerCase()) {
      return 0;
    }

    if (wordList.indexOf(endWord) === -1) {
      return 0;
    }

    if (beginWord.length === endWord.length && beginWord.length === 1) {
      return wordList.length;
    }

    if (wordList.length === 2 && wordList.indexOf(beginWord) !== -1) {
      return 0;
    }


    var lChars = beginWord.split(''),
        lRange = 1,
        uChars = endWord.split(''),
        uRange = endWord.split('').filter(letter => lChars.includes(letter)).length,
        nextWords = [],
        nextWord = beginWord,
        rc = 0;


    if (wordList.indexOf(beginWord) !== -1) {
      wordList.splice(wordList.indexOf(beginWord), 1);
    }

    console.log(prefix + ': uRange = ' + uRange + ', endWord = ' + endWord + ', beginWord = ' + beginWord);
    console.log(prefix + ': wordList = ' + JSON.stringify(wordList));

    while (nextWord !== null && wordList.length >= 1) {
      nextWords = wordList.filter((word) => {
        var lMatches = word.split('').filter(letter => lChars.includes(letter)).length;
        if (uRange > 1) {
          return word !== endWord && lMatches >= lRange && word.split('').filter(letter => uChars.includes(letter)).length >= uRange ? true : false;
        } else {
          return word !== endWord && lMatches === lRange ? true : false;
        }
      });

      nextWord = nextWords && nextWords.length ? nextWords[0] : null;

      if (nextWord !== null) {
        lChars = nextWord.split('');
      }

      if (nextWords && nextWords.length) {
        nextWords.forEach((next) => {
          if (wordList.indexOf(next) !== -1) {
            wordList.splice(wordList.indexOf(next), 1);
          }
        });
      }
      rc++;


      console.log(prefix + ': ' + nextWord + ', ' + JSON.stringify(nextWords) + ', ' + JSON.stringify(wordList) + ', ' + rc);

    }

    return rc;

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
      '<pre>' + JSON.stringify(app.wordLadder('test8', 'lost', 'cost', ['most','fist','lost','cost','fish'])) +'</pre>';






  });
})(window.app = window.app || {}, jQuery)
