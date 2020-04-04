'use strict'
import { validator } from './validator.js';
window._validator = validator;

//Property Descriptor objects to make read-only or writable
const allowWrite = { writable: true, configurable: true };
const lockKey = { writable: false, configurable: true };

export const accessor = {

    construct(target, args) {
       
        const t = new target();
        const p = new Proxy(t, this);

        //Overkill? Probably.
        for (let key in t) {
            //If key in t is a function, skip it. Only make value keys Read-only
            if (typeof target[key] !== 'function') {
                //Make Object Key/Property Read-Only
                Reflect.defineProperty(t, key, lockKey);
                //Make (inner) Properties of Object Key Read-Only. SEE: name._first comment
                Reflect.defineProperty(t[key], 'value', lockKey);
            }
        }

        if (args[0] !== undefined) {
            const allKeys = Object.entries(t);
            for (let j = 0; j < args.length; j++) {
                //Get each of the key objects that are a property of the target
                //Validate each arg using handler .set and passing the target, property-object and arg
                //FIND A BETTER WAY this only works if the object properties are in same order as args.
                this.set(t, allKeys[j][0], args[j]);
            }
        }
        return p;
    },

    get: function (target, key) {
        let output = 'undefined';
        if (key in target) {
            const getKey = '_' + key;
            //A way to implement computed properties/key and have the same syntax as non computed. Seems like overkill
            //EG: Same syntax - target.property and target.computed, don't need to make it a function call target.computed()
            (typeof target[key] === 'function')
                ? output = target[key]() : output = target[getKey].value;
        }
        return output;
    },

    set: function (target, key, value) {
        const propMap = new Map(Object.entries(target));
        const prop = propMap.get(key);
        const setKey = '_' + key;
        try {
            _validator = new validator();
            if (_validator.validate(prop, value)) {
                //Overkill? Probably.
                Reflect.defineProperty(target[key], 'value', allowWrite, true);
                target[key].value = 'Valid';//set property value used as validate rules to 'valid'               
                Reflect.defineProperty(target[setKey], 'value', allowWrite, true);
                target[setKey].value = value;//set the value to the _property 
                return true;
            }   
        } catch(e) {
            console.error(e + ' Could not set value on property.');
            return false;
        } finally {
            Reflect.defineProperty(target[setKey], 'value', lockKey, true);
            Reflect.defineProperty(target[key], 'value', lockKey, true);
            return true;
        }  
    },

    //toggle = false. No property creation on this object allowed. 
    //Passing true, will allow creation of properties, but used here to access a key's descriptor. Toggles 'writable' data descriptor.
    defineProperty: function (target, key, descriptor, toggle = false) {
        if (toggle) {
            Reflect.defineProperty(target, key, descriptor);
            return toggle;
        }
        return toggle;
    },

    //Prevent showing of _Property when Proxy is enumerated over looking for info - for in loop
    //a way of hiding properties. https://ponyfoo.com/articles/es6-proxy-traps-in-depth
    has: function (target, key) {
        if (key[0] === '_') 
            return false;
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
    //    return false;
    //},
    //Note that the trap always returns the opposite of Object.isExtensible(target),
    //because it should report whether the object has been made non- extensible.
    preventExtentions: function (target) {
        Object.preventExtensions(target);
        return false;
    },

    getOwnPropertyDescriptor: function (target, key) {
        return Object.getOwnPropertyDescriptor(target, key);
    }
};

