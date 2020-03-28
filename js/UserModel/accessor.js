import { validator } from './validator.js';
window._validator = validator;

export const accessor = {
    _validator: new validator(),
    get: function (target, property) {
        let output;
        (property in target) ? output = target[property]._value : output = 'not assigned';
        return output;
    },

    set: function (target, property, value) {
        let prop;
        this._validator = new validator();
        //We can get this.property, but property name doesn't always make a good error message.
        //I want this Proxy to have the responisbility of deciding what goes to the validator. 
        (property === 'first') ? prop = 'first name' : prop = 'last name';
        if (this._validator.validate(value, prop, target[property])) {
            target[property]._value = value;
            return true;
        }
    },
    //a way of hiding/protecting properties. https://ponyfoo.com/articles/es6-proxy-traps-in-depth
    has(target, key) {
        if (key[0] === '_') {
            return false;
        }
        return key in target;
    }
}