if (Meteor.isClient) {

  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
        try {
            if (Ext.getVersion().parts[0] < 5) {
                Ext.Error.raise("This fiddle requires ExtJS 5.*.");
            }
            Ext.Msg.alert('Alert', 'Hi there!');
        } catch (err) {
            Ext.Msg.alert('Error', err.message);
        }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
