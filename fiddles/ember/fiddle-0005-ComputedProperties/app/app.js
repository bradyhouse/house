import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import user from './user';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

var u = user.create({
  firstName: "bb",
  lastName: "eight"
});

console.log(u.get('fullName'));

u.set("firstName","Tony");
u.set("lastName","Stark");
console.log(u.get('fullName'));



export default App;
