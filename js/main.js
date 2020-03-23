'use strict'

//A Promise is a way to chain functions and have then execute one after another
//The function chain, can use the previoulsy value returned from a prior function in the chain or not.
//The function chain should end with a .catch to handle errors, 
//though there are other function in the Promise prototype that the chain can end with

/* Basic Promise */
let myPromise = new Promise((resolve, reject) => {
    //Comment out resolve to catch reject 
    resolve('resolve called myPromise');
    reject('rejected myPromise');
});

//Execute the function chain
myPromise.then((res) => {
    console.log(res);
    console.log('');
}).catch((err) => {
    console.error(err);
    console.log('');
});




/****************** START Example of using/making Promise object from a normal function  *******************/

//If function has good result this is the response callback
function res(successResult) {
    //This is not a Promise object, just a regular function
    console.log('The callback function after a succeful promise is run');
    console.log(successResult);
    console.log('');
}
//If function has a bad result this is the reject callback
function rej(failResult) {
    //This is not a Promise object, just a regular function
    console.log('The callback to handle errors');
    console.error(failResult);
    console.log('');
}

/*
  A function BECOMES a Promise if it resolves and/or rejects some processing
  and has callback methods to handle good execution and errors
 */
function practiceFunction(conditional) {
    console.log('The practiceFunction, function does something cool, then returns a promise object');

    if (conditional > 0) {
        return Promise.resolve('I did something really cool!');//I am "then-able and now a Promise object
    }
    else {
        return Promise.reject('Oh no, an error occured.');//I am "then-able and now a Promise object
    }
}

function callPracticeFunction(param) {
    practiceFunction(param).then(x => res(x), x => rej(x));
}

document.getElementById('practiceFunctionGood').addEventListener('click', callPracticeFunction.bind(null, 1), false);
document.getElementById('practiceFunctionBad').addEventListener('click', callPracticeFunction.bind(null, -1), false);

/****************** END Example of using/making Promise object from a normal function  *******************/





/***************** START Another example using buttons and click event handler ***********************/

function aCallbackFunction(x) {
    console.log('FROM aCallbackFunction: ' + x + '\nSome futher processing can be done with myFunction return value.');
    console.log('FROM aCallbackFunction: ' + 'aCallbackFunction function is not a promise because it doesn\'t take a callback and resolve or reject');
    console.log('');
}

let myFunction = function (param) {
    console.log('A typical function (myFunction) that can do some processing.');

    let x;

    if (param > 0) {
        console.log('Simple MyFunction Response button clicked');
        console.log('If processing doesn\'t create an error, the return value can be passed and further processed by a callback function');
        //By returning Promise.resolve, the myFunction, function becomes a Promise and can chain .then
        x = Promise.resolve('myFunction function did not throw an error and return value can be passed and used in callback');
    }
    else {
        console.log('Simple MyFunction Reject button clicked');
        console.log('If processing does create an error, the error is passed as return value \nand can be be handled in the .catch at the end of the function chain');
        //By returning Promise.reject, the myFunction, function becomes a Promise and can chain .then.catch
        x = Promise.reject('Rejected from myFunction and error caught in .catch handler, bypassing callback function');
    }

    return x;
};

//Put the calling of myFunction into another function to call on demand.
const callMyFunction = (param) => {
    //if not wrapped in this function, the below code would execute the myFunction function.
    //by wrapping the below code in a function, the code is executed with click event listener
    myFunction(param).then(x => aCallbackFunction(x)).catch(x => console.error(x));
};
document.getElementById('callMyFunctionGood').addEventListener('click', callMyFunction.bind(null, 1), false);
document.getElementById('callMyFunctionBad').addEventListener('click', callMyFunction.bind(null, -1), false);

/***************** END Another example using buttons and click event handler ***********************/




/****************** START Promises' and timing   ******************************/

function runInSequence() {
    let START = new Date().getTime();

    function log(txt) {
        var lapsed = new Date().getTime() - START;
        console.log(lapsed, txt);
    }

    const promise = new Promise(function (resolve, reject) {
        log('In Promise 1 and excuting/processing');
        setTimeout(function onSetTimeout() {
            log('In Promise 1 Timeout');
            resolve('Resolved value from promise, passing value to callback');
        }, 2000);
    });

    const callback = function (val) {
        log('Received from the first promise: ' + val);
        return new Promise(function (resolve, reject) {
            log('In Promise 2 and executing/processing');
            setTimeout(function onSetTimeout() {
                log('In callback (Promise 2)Timeout');
                resolve('Resolved something from callback, passing value to next .then');
            }, 1000);
        });
    };

    promise
        .then(callback)
        .then(function (val) {
            log('Received from the second promise: ' + val);
            log('ALL Promise Done!');
            log('The last Then is not a promise, does not return a promise object, just a regular function that terminates the function chain.');
            log('NOTE: A .catch should be last in the chain to catch any errors......');
        });
}

document.getElementById('runInSequence').addEventListener('click', runInSequence.bind(null, 1), false);

/****************** END Promises' and timing   ******************************/




/***** START Promise.All, Promises' running in parallel *****/ 

function runParallel() {
    
    let promiseAll = new Promise((resolve, reject) => {
        //NOTICE:If Resolve, acts like a return statement. Reject gets ignored.
        resolve('Resolve Promise.all called: ');
        reject('Rejected because of promiseAll');
    });

    let promiseAll2 = new Promise((resolve, reject) => {
        resolve(66);//comment out to see error
        reject('Rejected because of promiseAll2');
    });

    let promiseAll3 = new Promise((resolve, reject) => {
        resolve(45);
        reject('Rejected because of promiseAll3');
    });

    Promise.all([promiseAll, promiseAll2, promiseAll3])
        .then(values => {
            console.log('');
            console.log(values);
            console.log(values[0]);
            console.log(values[1]);
            console.log(values[2]);
            console.log('Once all promises have resolved, the values can be used to do something in .then');
            console.log(values[0] + (values[1] + values[2]));
            console.log('');
        })
        .catch((err) => {
            console.log('');
            console.error('Example Promise.All');
            console.error('catching first error that happens in a promise chain');
            console.error('notice how if there is an error in the promise chain, none of the previous resolves return');
            console.error('uncomment resolve in promiseAll2, and comment out a reject to demonstrate');
            console.error(err);
            console.log('');
        });
}
document.getElementById('runParallel').addEventListener('click', runParallel, false);

/***** END Promise.All, Promise running in parallel *****/



/* The fetch API in the browser is a practical example */
/* notice how .json() also returns a promise */
/*
fetch('http://api.icndb.com/jokes/random/5')
    .then((res) => {
        res.json().then((data) => {
            console.log(data);
            const body = document.getElementsByTagName('body')[0];
            const h3 = document.createElement('h3');
            h3.innerHTML = 'The Internet Chuck Norris Database Jokes:';
            body.append(h3);
            let jokes = data.value;
            jokes.forEach((joke) => {
                const pTag = document.createElement('p');
                pTag.innerHTML = `<p><span>Joke ID: ${joke.id},</span>   Joke: ${joke.joke}</p>`;
                body.append(pTag);
            });
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
        console.log('Show fetch API catching error from badURL');
        console.log(err);
    });

*/