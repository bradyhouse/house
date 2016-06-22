import Ember from 'ember';
import FocusableMixin from 'fiddle-0004-mixins/mixins/focusable';
import { module, test } from 'qunit';

module('Unit | Mixin | focusable');

// Replace this with your real tests.
test('it works', function(assert) {
  let FocusableObject = Ember.Object.extend(FocusableMixin);
  let subject = FocusableObject.create();
  assert.ok(subject);
});
