import { validator } from './validator.js';
window._validator = validator;

export let accessor = {

    _validator: new validator(),

    //This trap stops the Reflect.defineProperty or the Object.defineProperty from adding new properties to the target object.
    defineProperty: function (target, key, descriptor) {
        return false;
    },
    //Prevent showing of _Property when Proxy is enumerated over looking for info - for in loop
    //a way of hiding properties. https://ponyfoo.com/articles/es6-proxy-traps-in-depth
    has: function (target, key) {
        if (key[0] === '_') {
            console.log('in has ' + key);
            return false;
        }
        return key in target;
    },

    ownKeys: function (target) {
        //Bottom of page: https://ponyfoo.com/articles/es6-proxy-traps-in-depth
        //Says this should return all properties that DON'T have an _ prefix.
        //NOTES:
        //If an object is non - extensible, then it is not allowed to hide its properties via the proxy
        //A non-configurable property may not be hidden.
        //You cannot defineProperty a property it does not already have.
        //getOwnPropertyDescriptor must return an object or undefined.
        //deleteProperty cannot delete a non - configurable property.
        //Set cannot change a non-writable, non-configurable property.
        //Any or all of these could cause your code to fail(by throwing at run - time) in various scenarios.
        return Reflect.ownKeys(target).filter(key => key[0] !== '_');
    },

    //isExtensible: function (target) {
    //    Object.preventExtensions(target);
    //    Reflect.preventExtensions(target);
    //    return false;
    //},

    //preventExtentions: function (target) {
    //    Object.preventExtensions(target);
    //    Reflect.preventExtensions(target);
    //    return true;
    //},

    getOwnPropertyDescriptor: function (target, key) {
        return Object.getOwnPropertyDescriptor(target, key);
    },

    get: function (target, property) {
        let output = 'not assigned';
        if (property in target) {
            output = target[property]._value;
        }
        //A way to implement computed properties and have the same syntax as non computed. 
        //EG: target.property and target.computed, don't need to make it a function call target.computed() 
        if (typeof target[property] === 'function') {
            output = target[property]();
        }
        return output;
    },

    set: function (target, property, value) {
        this._validator = new validator();
        if (this._validator.validate(value, target[property])) {
            target[property].value = value;
            let setProp = '_' + property;
            target[setProp].value = value;
            return true;
        }
    }
};
