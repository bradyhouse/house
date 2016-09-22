var RssListViewModel = require('../shared/view-models/rss-list-view-model');
var Observable = require('data/observable').Observable;
var pageData = new Observable({
	title:"",
	text:""
});

exports.loaded = function(args) {
	page = args.object;
	page.bindingContext = pageData;
	pageData.title = RssListViewModel.viewModel.get('selectedItem').title;
	pageData.text = RssListViewModel.viewModel.get('selectedItem').description;
}
