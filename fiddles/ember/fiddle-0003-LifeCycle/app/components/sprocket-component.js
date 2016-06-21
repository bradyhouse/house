import Ember from 'ember';

export default Ember.Component.extend({

    didReceiveAttrs() {
        this._super(...arguments);
        const profile = this.get('data');
        if (typeof profile === 'string') {
            this.set('profile', JSON.parse(profile));
        } else {
            this.set('profile', profile);
        }
    }

});
