import Ember from 'ember';

export default function () {
    var base = Ember.Object.extend({
            baseProperty: 'base property'
        }),
        derived = base.extend({}),
        derivedObject = derived.create({
            derivedProperty: 'derived property'
        }),
        anotherDerivedObject = derived.create();

    console.log(derivedObject.get('baseProperty'));//base property
    console.log(derivedObject.get('derivedProperty'));//derived property
    console.log(anotherDerivedObject.get('derivedProperty'));//undefined
    console.log(anotherDerivedObject.get('baseProperty'));//base property
}