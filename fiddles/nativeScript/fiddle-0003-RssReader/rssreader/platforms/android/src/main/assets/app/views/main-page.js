var RssListViewModel = require('../shared/view-models/rss-list-view-model');
var frameModule = require('ui/frame');
var config = require('../shared/config');
var Observable = require('data/observable').Observable;
var viewModule = require('ui/core/view');
var page;
var pageData = new Observable({
	rssList:RssListViewModel,
	title:config.title
});
exports.loaded = function(args) {
	page = args.object;
	page.bindingContext = pageData;
	RssListViewModel.load();
};

exports.loadItem = function(args) {
	console.log('tap item',args.index);
	console.log('tap item 2', args.view.bindingContext.title);
	RssListViewModel.viewModel.set('selectedItem', args.view.bindingContext);
	frameModule.topmost().navigate('views/item-page');
}
