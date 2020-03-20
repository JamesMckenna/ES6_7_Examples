'use strict'


/* Basic Promise */
let myPromise = new Promise((resolve, reject) => {
    //Comment out resolve to catch reject 
    resolve('resolve called myPromise');
    reject('rejected myPromise');
});

/* One way to handle it */
myPromise.then((res) => {
    console.log(res);
    console.log('');
}, (err) => {
        console.log(err);
        console.log('');
});

/* Second way to handle it */
//myPromise.then((res) => {
//    console.log(res);
//}).catch((err) => {
//    console.log(err);
//});






/***** Example 2 Promise chaining *****/ 

let promiseChaining = new Promise((resolve, reject) => {
    resolve('resolve promiseChaining called');
    reject('rejected promiseChaining');

});

let promiseChaining2 = new Promise((resolve, reject) => {
    //resolve('resolve promiseChaining2 called');
    reject('rejected promiseChaining2');

});

let promiseChaining3 = new Promise((resolve, reject) => {
    resolve('resolve promiseChaining3 called');
    reject('rejected promiseChaining3 all promises following this one are not executed');

});


/* A Promisse chain NEEDS to be declared Promise.all([]) */
//Promise.all([promiseChaining, promiseChaining2, promiseChaining2])
//    .then((data) => {
//        console.log(data);
//    }).catch((err) => {
//        console.log('Example 2 Promising Chaining');
//        console.log('catching first error that happens in a promise chain');
//        console.log('notice how if there is an error in the promise chain, none of the previous resolves return');
//        console.log('uncomment resolve in a prmoise, and comment out a resolve in a later promise to demonstrate');
//        console.log(err);
//    });


/* Looks like a promise chain can be assigned to a variable. ATM I can't think of why I would use a varible in to declare a promise chain
 * something to think on
 */
let alias = Promise.all([promiseChaining, promiseChaining2, promiseChaining3])
    .then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log('');
        console.log('Example 2 Promising Chaining');
        console.log('catching first error that happens in a promise chain');
        console.log('notice how if there is an error in the promise chain, none of the previous resolves return');
        console.log('uncomment resolve in a prmoise, and comment out a resolve in a later promise to demonstrate');
        console.log(err);
    });







/***** Example 3 Promise chaining *****/

let promiseChaining4 = new Promise((resolve, reject) => {
    resolve('resolve promiseChaining4');
    reject('rejected promiseChaining4');

});

/* This can be handled by the promise chain */
promiseChaining4.then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});


let promiseChaining5 = new Promise((resolve, reject) => {
    //resolve('resolve promiseChaining5');
    reject('rejected promiseChaining5');

});

/* This can be handled by the promise chain */
promiseChaining5.then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});


let promiseChaining6 = new Promise((resolve, reject) => {
    resolve('resolve promiseChaining6');
    reject('rejected promiseChaining6');
});

/* This is handled by the promise chain */
promiseChaining6.then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});

/* So each Promise in the cahin can return a value if written the above way
 * can be used to debug your promise chain for example
 * BUT notice the order of console.log statements in relation to the whole script execution,
 * this is something to think on
 */
Promise.all([promiseChaining4, promiseChaining5, promiseChaining6])
    .then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log('');
        console.log('Example 3, return a previously resolved promise in a promise chain even though a later promise is rejected');
        console.log('notice the order of console.log statements in relation to the whole script execution');
        console.log('this is something to think on');
        console.log('can be used to debug promise chain');
        console.log('or even possibly return the promises that do resolve if for some reason that functionality is useful');
        console.log('one would have to set it up as written above - see code - ');
        console.log('and not confuse the regular type of resolved/reject promise with the returning of a completed promise chain');
        console.log(err);
        console.log('');
    });


/* The fetch API in the browser is a practical example */
/* notice how .json() also returns a promise */
fetch('http://api.icndb.com/jokes/random/5')
    .then((res) => {
        res.json().then((data) => {
            console.log(data);
        });
    }).catch((err) => {
        console.log(err);
    });


fetch('http://badURLtocatchError')
    .then((res) => {
        res.json().then((data) => {
            console.log(data);
        });
    }).catch((err) => {
        console.log(err);
    });