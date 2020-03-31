import { accessor } from './accessor.js';
window._accessor = accessor;

function Name() {
    let name = {
        extraKey: {
            value: 'testing Reflect and Object',
            writeable: true,
            enumerable: true,
            configurable: true
        },
        first: {
            value: null,
            writeable: true,
            enumerable: true,
            configurable: true,
            validator: ['isNotEmpty', 'isString', 'strLength'],
            regex: '^[a-zA-Z]+$',
            strLength: [2, 25],
            errMsg: 'First Name'
        },
        last: {
            value: null,
            writeable: true,
            enumerable: true,
            configurable: true,
            validator: ['isNotEmpty', 'isString', 'strLength'],
            regex: '^[a-zA-Z ]+$',
            strLength: [2, 25],
            errMsg: 'Last Name'
        },
        _first: {
            value: null,
            writeable: false,
            enumerable: false,
            configurable: true
        },
        _last: {
            value: null,
            writeable: false,
            enumerable: false,
            configurable: true
        },
        getFirstName() {
            return this._first.value;
        },
        getLastName() {
            return this._last.value;
        },
        //See accessor get method. 
        //This is a way to implement computed properties and keep the same get syntax(dot.notation) as standard properties.
        //The accessor get method does a typeof check. If porperty is a function, call it; otherwise get the property value.
        getFullName() {
            let fn = this._first.value;
            let ln = this._last.value;
            return fn + ' ' + ln;
        }

    };

    return new Proxy(name, _accessor);
}

Name.prototype.toString = function () {
    return 'TESTING TESTING';//this.ownKeys(target);
};


////assign value to a property on name when name is wrapped in a proxy
//let n = new name(); //TypeError: name is not a constructor - it's now wrapped/encapsulated 
//let n = name();//name is not a function
//let n = name;
//n._first = 'Sam'; //Uncaught TypeError: Cannot create property '_first' on string ''. 
////So wrapping name in a proxy seems to prevent access to a property

//Once wrapped in the proxy Name, the name object is no longer accessable.
//Access to name and it's properties is through the proxy, Name
let testingname = new Name();

console.log(testingname);
testingname.first = 'Holly';
testingname.last = 'Von Hunter';

console.log(testingname.getFirstName);
console.log(testingname.getLastName);
console.log(testingname.getFullName);
console.log('');

//Using Relfect to take a look at the name object
let hasProp = Reflect.has(testingname, '_first');
console.log('Using JS Reflect.has to see if testingname hasProp _first = ' + hasProp);
console.log(hasProp);
console.log('');


//????????????????????????????
let gettingProp = Reflect.get(testingname, 'first');
console.log('Using JS Reflect.get to get the value of a property on testingname.');
console.log(gettingProp);
console.log('');

let istestingnameExtensible = Reflect.isExtensible(testingname);
console.log('testingname is extensible = ' + istestingnameExtensible);
console.log('');

//testingname is extensible, let's take a look at how it can be extended - SHUT OFF IN ACCESSOR
let newPropValueDescriptor =  { value: 'newPropValue', configurable: true, enumerable: true, writable: true };
let extendtestingname = Reflect.defineProperty(testingname, 'newProp', newPropValueDescriptor);
console.log('extendtestingname has a new property = ' + extendtestingname);
console.log(testingname);

console.log('Getting property descriptor of extraKey');
let getDescriptor = Reflect.getOwnPropertyDescriptor(testingname, 'extraKey');
console.log(getDescriptor);
console.log('');

console.log('Getting own prop names');
let getOwnPropNames = Object.getOwnPropertyNames(testingname);
for (let key of getOwnPropNames) {
    console.log(key);
}
console.log('');

console.log('Can we see what properties testingname has?');
let testingnameHasKeys = Reflect.ownKeys(testingname);
for (let key of testingnameHasKeys) {
    console.log(key);
}
console.log('');

console.log(testingname.getFirstName);
console.log(testingname.getFullName);
//let testingname2 = new Name();
//console.log(testingname2);
//testingname2.first = 'Toby';
//testingname2.last = 'Black';
//console.log(testingname2.first);
//console.log(testingname2.last);
//console.log(testingname.first);
//console.log(testingname.last);

/****************** END Object wrapped in proxy  **************************/
