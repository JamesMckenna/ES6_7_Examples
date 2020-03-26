'use strict'

//Example of using Fetch API Request Object
const url = './JSONData/users.json';
const reqHeaders = new Headers();
reqHeaders.append('Content-Type', 'application/json');
const initRequest = {
    method: 'GET',
    headers: reqHeaders,
    mode: 'cors',
    cache: 'default'
};
const request = new Request(url, initRequest);

console.log('The JSON Users data come from https://jsonplaceholder.typicode.com/users');
console.log('Though in this example, I am pulling the data from a file in the ES6_7_Examples directory');

const getJSONDataAsyn = async (requestOject) => {
    return await fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } 
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return new Error('Error: ' + error );
        });
};

getJSONDataAsyn(request)
    .then((x) => {
        //x is an array of JSON objects.
        console.log('We made the fetch request and passed the return data to the first .then callback');
        console.log('The param/arg x passed from fetch repsonse (return data in the above function - see code file) is an array of JS Objects');
        console.log(x);
        console.log('Accessing x array index = 1');
        console.log(x[1]);
        console.log('See code file to see how to access parts of the user\'s data');
        console.log('Name: ' + x[1].name);
        console.log('Address: ' + x[1].address.suite + ' ' + x[1].address.street);
        console.log('');
        console.log('SOME HANDY ARRAY FUNCTIONS AND PROPERTIES');
        console.log('Let\'s take a look at the Length property. x.length. there are ' + x.length + ' items in the x array.');
        console.log('First let\'s take another look at the array');
        console.log(x);
        console.log('');

        console.log('First, copy x so we don\'t lose data and x can be used again later in code. Recall JS arrays are reference values.');
        console.log('A simple way to clone an array is to use ES6 destructuring and the spread operator "..." EG: let xCopy = [...x];');
        let xCopy = [...x];
        let xPopped = xCopy.pop();
        let xPopped2 = xCopy.pop(); // used in unshift example
        console.log('And pop 2 items out of the array. xCopy.pop(). there are ' + xCopy.length + ' items in the xCopy array. See code, 2 were popped out and used to demonstrate in unshift() example.');
        console.log(xCopy);
        console.log('See how .pop() pulls out the last value of the array. Kinda like a stack data structure - last in first out.');
        console.log('');

        console.log('Let\'s clone the array again (because refernce values) \n to show how the pop and push methods work and then xCopy2.push(xPopped) back onto the array, then log it');
        let xCopy2 = [...x];
        xCopy2.push(xPopped);
        console.log(xCopy2);
        console.log('So .push() adds a new value to the end of an array');
        console.log('');

        console.log('Let\'s check out .reverse() and notice the order');
        let reversed = [...x];
        console.log(reversed.reverse());
        console.log('');

        console.log('Let\'s check out .shift(), removes first element and returns the element');
        let xShifted = [...x];
        let shifted = xShifted.shift();
        console.log(xShifted);
        console.log(shifted);
        console.log('');

        console.log('Let\'s check out .unshift(), add new values to the first and second index. It also returns the array\'s new length.\nLet\'s use a couple values popped out in the pop() example');
        let unShifted = [...x];
        let ushifted = unShifted.unshift(xPopped, xPopped2);
        console.log(unShifted);
        console.log(ushifted);
        console.log('');

        console.log('What does array.join do?');
        let joined = unShifted.join();
        console.log(joined);
        console.log('In the case of an array of JS Objects, the join doesn\'t return what we need....let\'s try using it a different way and stringify the objects first, then join them.');
        for (let i = 0; i < unShifted.length; i++) {
            unShifted[i] = JSON.stringify(unShifted[i]);
        }
        console.log(unShifted.join('------------------NO LONGER AN ARRAY [SOMETHING, SOMETHING , SOMETHING]-------BUT ONE LONG STRING----SEPERATED BY DELIMITER PASSED AS AN ARG---------'));
        console.log('Now there\'s an almost useless wall of text, though it does show what array.join(delimeter) can do. ');
        console.log('');

        console.log('With array.sort(function), we can do some cool stuff. HINT: Take a look at username.');
        let sortting = [...x];
        sortting.sort((a, b) => {
            let userNameA = a.username.toUpperCase();
            let userNameB = b.username.toUpperCase();
            if (userNameA < userNameB) {
                return -1;
            }
            if (userNameA > userNameB) {
                return 1;
            }
            return 0;
        });
        console.log(sortting);
        console.log('');

        console.log('For a list of all the properties and methods of a JS array, \nSee: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array');

        console.log('');
        //console.log('Return x to the next .then in the callback chain where I look at the JS Map collection.');
        //return x; //return to allow next .then callback to use, passing vlaue down the line
    })
    .catch((error) => {
        return new Error('Error: ' + error);
    });
console.log('');
