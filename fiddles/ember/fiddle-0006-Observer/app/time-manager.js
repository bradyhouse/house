import Ember from 'ember';

export default Ember.Object.extend({
  time:0,
  timeChanged: function(){
    console.log('time changed');
  }.observes('time')

});
