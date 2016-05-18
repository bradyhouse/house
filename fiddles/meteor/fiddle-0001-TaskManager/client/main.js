import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.body.events({
    "submit .new-task": function (event) {
        Meteor.call('addTask', event.target.text.value)
        event.target.text.value = "";
        return false;
    },
    "click .delete-button": function () {
        Meteor.call('deleteTask', this._id);
    },

    "change .text": function(event) {
        Meteor.call('updateTask', this._id, event.target.value);
    }
});

