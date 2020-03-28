//EXAMPLES: ES6 Import Module statement, Proxies, Prototype

import { validator } from './validator.js'; 
window._validator = validator;

function Name() {
    const name = {
        first: {
            _value: null,
            validator: ['isNotEmpty', 'isString', 'strLength'],
            regex: '^[a-zA-Z]+$',
            strLength: [2, 25]
        },
        last: {
            _value: null,
            validator: ['isNotEmpty', 'isString', 'strLength'],
            regex: '^[a-zA-Z]+$',
            strLength: [2, 25]
        },

        _validator: new validator()
    };

    const nameAccessor = {

        get: function (target, property) {
            let output;
            (property in target) ? output = target[property]._value : output = 'not assigned';
            return output;
        },

        set: function (target, property, value) {
            let prop;
            this._validator = new validator();
            (property === 'first') ? prop = 'first name' : prop = 'last name';
            if (this._validator.validate(value, prop, target[property])){
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
    return new Proxy(name, nameAccessor);
}

let name = Name();
//name.first = 'S4m';
//name.first = 'S';
//name.first = '';
//Can't assign to an _ property because of proxy trap
//name.first._value = 'Sam';

//assign value to a property
name.first = 'Sam';
name.last = 'Spade';
console.log(name);

//Get value from a property. No access to _property
console.log(name.first._value);
console.log(name.last._value);


console.log(name);
//Get value from a property.
console.log(name.first);
console.log(name.last);




/********************* START name validation using JS Proxy Example 2 ***************************/
/*
    const name = {
        first: {
            _value: null,
            validator: ['isNotEmpty', 'isString', 'strLength'],
            regex: '^[a-zA-Z]+$',
            strLength: [2, 25]
        },
        last: {
            _value: null,
            validator: ['isNotEmpty', 'isString', 'strLength'],
            regex: '^[a-zA-Z]+$',
            strLength: [2, 25]
        },

        _validator: new validator()
    };

    const nameAccessor = {

        get: function (target, property) {
            let output;
            (property in target) ? output = target[property]._value : output = 'not assigned';
            return output;
        },

        set: function (target, property, value) {
            this._validator = new validator();
            if (this._validator.validate(value, property, target[property])) {
                target[property]._value = value;
                return true;
            }
        },
        has(target, key) {
            if (key[0] === '_') {
                return false;
            }
            return key in target;
        }
    }

    const nameAccess = new Proxy(name, nameAccessor);

    //nameAccess.first = 'SamSamSamSamSamSamSamSamSamSam';
    //nameAccess.first = 12321312312312312312312312321312312312312312;
    //nameAccess.first = 123;
    //nameAccess.first = 23;
    //nameAccess.first = 'S!@';
    //nameAccess.first = 'S';
    nameAccess.first = 'Sam';


    //nameAccess.first ='Sam';
    nameAccess.last = 'Spade';


    //console.log(name.first);
    //console.log(name.last);

    console.log(nameAccess.first);
    console.log(nameAccess.last);

*/
/********************* END name validation using JS Proxy Example 2 ***************************/




/************  START name using prototype inheritance to validate the model input **********************/
/*
 
    const name = function () {
        this.first = {
            value: null,
            validator: ['isNotEmpty', 'isString', 'strLength'],
            regex: '^[a-zA-Z]+$',
            strLength: [2,25]
        };
        this.last = {
            value: null,
            validator: ['isNotEmpty', 'isString', 'strLength'],
            regex: '^[a-zA-Z]+$',
            strLength: [2, 25]
        };
        this._validator = new validator();
    };
  
    name.prototype.set = function (value, key, properties) {
        if (this._validator.validate(value, key, properties)) {
            properties['value'] = value;
            return true;
        }
        return false;
    };

    name.prototype.setFirst = function (value) {
        this.set(value, 'first name', this.first);
    };

    name.prototype.setLast = function (last) {
        this.set(last, 'last name', this.last);
    };

    let newName = new name();
    //// Validation Test 1
    //newName.first.value = 'S4m';
    //newName.last.value = 'Spade';

    ////Validation Test 2
    //newName.setFirst('S');
    //newName.setLast('Spade');

    ////Validation Test 3
    //newName.setFirst('');
    //newName.setLast('Spade');


    ////Good values
    newName.setFirst('Sam');
    newName.setLast('Spade');
    console.log(newName);
    console.log(newName.first.value);
    console.log(newName.last.value);

*/
/************  END name using prototype inheritance to validate the model input **********************/












