import Ember from 'ember';

export default Ember.Object.extend({
  school:'',
  name: '',
  lastName: Ember.computed.alias('family.name')
});
