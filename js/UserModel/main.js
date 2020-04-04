import { Name } from './name.js';
window.Name = Name;

let name = new Name();
console.log(name);
console.log('Getting property descriptor of first before change');
let getDescriptor7 = Object.getOwnPropertyDescriptor(name, 'first');
console.log(getDescriptor7);
console.log('');
name.first = 'Sam';
name.last = 'Spade';
console.log(name.first);
console.log(name.last);
console.log(name.fullName);
console.log(name.toString);
console.log('');

const constructor = new Name('Holly', 'Von Hunter');
console.log(constructor);
console.log(constructor.first);
console.log(constructor.last);
console.log(constructor.fullName);
console.log('');


//Using Relfect to take a look at the name object
let hasProp = Reflect.has(name, '_first');
console.log('Using JS Reflect.has to see if name hasProp _first = ' + hasProp);
console.log(hasProp);
console.log('');

let gettingProp = Reflect.get(name, 'first');
console.log('Using JS Reflect.get to get the value of a property on name.');
console.log(gettingProp);
console.log('');

let isnameExtensible = Reflect.isExtensible(name);
console.log('name is extensible = ' + isnameExtensible);
console.log('');

//testingname is extensible, let's take a look at how it can be extended - SHUT OFF IN ACCESSOR
let newPropValueDescriptor = { value: 'newPropValue', configurable: false, enumerable: false, writable: false };
let extendname = Reflect.defineProperty(name, 'newProp', newPropValueDescriptor);
console.log('extendname has a new property = ' + extendname);
console.log(name);
console.log('');

console.log('Getting property descriptor of newProp');
let getDescriptor3 = Object.getOwnPropertyDescriptor(name, 'newProp');
console.log(getDescriptor3);
console.log('');


console.log('Getting property descriptor of first before change');
let getDescriptor2 = Object.getOwnPropertyDescriptor(name, 'first');
console.log(getDescriptor2);
console.log('');

console.log('defineProperty of first to change descriptors');
let firstDescriptor = {  configurable: false, enumerable: true, writable: false };
let firstDescriptorChange = Reflect.defineProperty(name, 'first', firstDescriptor);
console.log('firstDescriptorChange = ' + firstDescriptorChange);
console.log(name);
console.log('');

console.log('Getting property descriptor of first after');
let getDescriptor4 = Object.getOwnPropertyDescriptor(name, 'first');
console.log(getDescriptor4);
console.log('');


console.log('Getting own prop names');
let getOwnPropNames = Object.getOwnPropertyNames(name);
for (let key of getOwnPropNames) {
    console.log(key);
}
console.log('');

console.log('Can we see what properties name has?');
let nameHasKeys = Object.keys(name);
for (let key of nameHasKeys) {
    console.log(key);
}

console.log('Getting property descriptor of first before editting value');
let getDescriptor5 = Object.getOwnPropertyDescriptor(name, 'first');
console.log(getDescriptor5);
console.log('');
name.first = 'Sammy';
console.log(name.first);
console.log('Getting property descriptor of first after editting value');
let getDescriptor6 = Object.getOwnPropertyDescriptor(name, 'first');
console.log(getDescriptor6);
console.log('');
