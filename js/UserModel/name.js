import { accessor } from './accessor.js'; 
window._accessor = accessor;

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
        }
    };

    const nameAccessor = _accessor;

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