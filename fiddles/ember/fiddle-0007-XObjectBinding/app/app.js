import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import family from './family';
import familyMember from './family-member';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

var smithFamily = family.create({
  name:'Smith'
}),
  danSmith = familyMember.create({
  name: 'Dan',
  family: smithFamily
});

console.log(danSmith.get('lastName'));

smithFamily.set('name', 'Doe');

console.log(danSmith.get('lastName'));

export default App;
