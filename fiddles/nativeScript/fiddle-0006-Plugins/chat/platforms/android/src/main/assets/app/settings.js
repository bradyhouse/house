var appSettings = require('application-settings');
var Observable = require('data/observable').Observable;
var dialog = require('ui/dialogs');
var page;
var settings = new Observable();

function checkFieldValue(field) {
  var fieldValue = settings.get(field);
  if (!fieldValue) {
    dialogs.alert('The ' + field + ' can\'t be left blank.  Please enter a value.');
    var fieldId = page.getViewById(field);
    if (fieldId) {
      fieldId.focus();
    }
    return false;
  }
  return true;
}


settings.set('name', 'Guest');
settings.set('server', 'nativescript.rocks:3000');

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = settings;
};

exports.shownModally = function() {
  if (appSettings.getBoolean('setup')) {
    settings.set('name', appSettings.getString('name'));
    settings.set('server', appSettings.getString('server'));
  }
};

exports.save = function() {
  if (!checkFieldValue('name')) return;
  if (!checkFieldValue('server')) return;
  appSettings.setBoolean('setup', true);
  appSettings.setString('name', settings.get('name'));
  appSettings.setString('server', settings.get('server'));
  page.closeModal();
};

exports.cancel = function() {
  page.closeModal();
}
