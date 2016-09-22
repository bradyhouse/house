var observable = require('data/observable');
var ObservableArray = require('data/observable-array').ObservableArray;
var fetchModule = require('fetch');
var config = require('../config');

function handleErrors(response) {
  if (!response.ok) {
    console.log(JSON.stringify(response));
    throw Error(response.statusText);
  }
  return response;
}

exports.empty = function () {
  while (feedItems.length) {
    feedItems.pop();
  }
};

exports.load = function name(params) {
  console.log('CALLING LOAD');
  if (feedItems.length > 0) {
    return;
  }
  return fetch('https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink%2Cdescription%20from%20rss%20where%20url%3D%22' + encodeURIComponent(config.rssURL) + '%22&format=json&diagnostics=true', {})
    .then(handleErrors)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      data.query.results.item.forEach(function (feedItem) {
        feedItems.push({
            title: feedItem.title,
            link: feedItem.link,
            description: feedItem.description
          }
        );

      });
    });

}

var feedItems = new ObservableArray();
exports.feedItems = feedItems;
var viewModel = new observable.Observable();
exports.viewModel = viewModel;
