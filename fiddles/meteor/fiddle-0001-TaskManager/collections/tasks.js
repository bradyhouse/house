Tasks = new Mongo.Collection("tasks");

Meteor.startup(function () {
    console.log('startup');
    let tasks = Tasks.find().fetch();

    if(Meteor.isServer) {
        if(!tasks.length) {
            console.log('adding 3 records');
            Tasks.insert({
                name: 'HC JSON Task 1'
            });
            Tasks.insert({
                name: 'HC JSON Task 2'
            });
            Tasks.insert({
                name: 'HC JSON Task 3'
            });
        } else {
            console.log(tasks);
            console.log('there are ' + tasks.length + ' tasks.');
        }
    }
});

Meteor.methods({
    addTask: function (text) {
        Tasks.insert({
            name: text
        });
    },
    deleteTask: function (id) {
        Tasks.remove(id);
    },
    updateTask: function (id, value) {
        Tasks.update(id, {$set: {name: value}});
    }
});