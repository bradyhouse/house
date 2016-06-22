import Ember from 'ember';
import ValidNumberMixin from 'fiddle-0004-mixins/mixins/valid-number';
import { module, test } from 'qunit';

module('Unit | Mixin | valid number');

// Replace this with your real tests.
test('it works', function(assert) {
  let ValidNumberObject = Ember.Object.extend(ValidNumberMixin);
  let subject = ValidNumberObject.create();
  assert.ok(subject);
});
