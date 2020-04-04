import {accessor} from './accessor.js'
window._accessor = accessor;


export const Name = function (first, last) {
    function name(first, last) {
 
        //Currently, the order of the properties has to be in the same order as the incoming args/param list.
        //The constructor in the accessor(handler object) passes to the set function. Set function passes to validator object.
        //If this object's properties are not in same order as args - starting with index base 0 - then validator will throw an error.
        //Validation rules for the _property. 
        this.first = {
            value: null, //value: null, || value: Valid || value: undefined
            validator: ['isNotEmpty', 'isString', 'strLength'],
            regex: '^[a-zA-Z]+$',
            strLength: [2, 25],
            errMsg: 'First Name'
        };
        //Validation rules for the _property.
        this.last = {
            value: null,
            validator: ['isNotEmpty', 'isString', 'strLength'],
            regex: '^[a-zA-Z -]+$',
            strLength: [2, 25],
            errMsg: 'Last Name'
        };
        //An Object Key/Property that has an Inner Property(ies)
        this._first = {//The actual Object Property, Key
            //An Inner Property of an Object's Property
            value: null //The actual Object Property, Key's Value
        };
        this._last = {
            value: null
        };
        //See accessor get method. 
        //This is a way to implement computed properties and keep the same get syntax(dot.notation) as standard properties.
        //The accessor get method does a typeof check. If property is a function, call it.
        this.fullName = () => {
            let fn = this._first.value;
            let ln = this._last.value;
            return fn + ' ' + ln;
        };

        this._first.value = first;
        this._last.value = last;
    }
    name.prototype.toString = function toString() {
        return `First Name: ${this._first.value}, Last Name: ${this._last.value}, Full Name: ${this.fullName()}`;
    };

    let obj = new Proxy(name, _accessor);
    return new obj(first, last);
};