Template.registerHelper('taskListItems', function() {
    return Tasks.find().fetch();
});

