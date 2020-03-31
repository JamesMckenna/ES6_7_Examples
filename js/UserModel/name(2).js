import { accessor } from './accessor.js'; 
window._accessor = accessor;
//Taking a deeper look into proxies. Proxies in JS remind me of Hooks and Middleware in back-end development.
//With the Object Literal 'name' wrapped in a proxy, we encapsulate the object literal and can restrict access to the properties.
//Using JS Reflect to help illustrate

/****************** START Object without proxy  **************************/
/*

    function name()  {
        this._first = {
            _value: null,
            validator: ['isNotEmpty', 'isString', 'strLength'],
            regex: '^[a-zA-Z]+$',
            strLength: [2, 25]
        };
        this._last = {
            _value: null,
            validator: ['isNotEmpty', 'isString', 'strLength'],
            regex: '^[a-zA-Z]+$',
            strLength: [2, 25]
        };
    };



    console.log('name object');
    console.log(name);
    let testingname = new name();
    console.log('testingname');
    console.log(testingname);
    testingname._first = 'Holly';
    testingname._last = 'Hunter';
    console.log(testingname);
    console.log(testingname._first);
    console.log(testingname._last);

    //Using Relfect to take a look at the name object
    let hasProp = Reflect.has(testingname, '_first');
    console.log('Using JS Reflect.has to see if testingname hasProp _first = ' + hasProp);
    console.log(hasProp);

    let gettingProp = Reflect.get(testingname, '_first');
    console.log('Using JS Reflect.get to get the value of a property on testingname.');
    console.log(gettingProp);

    let istestingnameExtensible = Reflect.isExtensible(testingname);
    console.log('testingname is extensible = ' + istestingnameExtensible);

    //testingname is extensible, let's take a look at how it can be extended
    let extendtestingname = Reflect.defineProperty(testingname, 'newProp', { value: 'newPropValue', validator: ['isNotEmpty', 'isString', 'strLength'], regex: '^[a-zA-Z]+$', strLength: [2, 25]});
    console.log('extendtestingname has a new property = ' + extendtestingname);
    console.log(testingname);

    let getDescriptor = Reflect.getOwnPropertyDescriptor(testingname, 'newProp');
    console.log(getDescriptor);

    console.log('Can we see what properties testingname has?');
    let testingnameHasKeys = Reflect.ownKeys(testingname);
    console.log(testingnameHasKeys);

    //let testingname2 = new name();
    //testingname2._first = 'Toby';
    //testingname2._last = 'Black';
    //console.log(testingname2);
    //console.log(testingname2._first);
    //console.log(testingname2._last);
    //console.log(testingname._first);
    //console.log(testingname._last);

*/
/****************** END Object without proxy  **************************/

