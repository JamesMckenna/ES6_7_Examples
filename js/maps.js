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
        console.log('');
        //x is an array of JSON objects. lets put users into a Map collection and use User.Id as the maps key and the User as a value
        console.log('In the second .then callback, take the value of x and put into a Map collection');
        let usersMap = new Map();
        console.log('Lets put each user into a Map collection and use the User.Id as the key to retrieve the users info in a for/of loop');
        for (let userIsJSObject of x) {
            usersMap.set(userIsJSObject.id, userIsJSObject);
        }
        console.log('Accessing userMap by key where the key is the user id we used when creating and filling the map. EG: usersMap.get(2)');
        console.log(usersMap.get(2));
        console.log('');

        console.log('Taking it one step further, let\'s look at how a string can be used as a key.');
        let newUsersMap = new Map();
        for (let user of x) {
            newUsersMap.set(user.email, user); 
        }

        console.log('Log the keys and values');
        for (let [key, value] of newUsersMap.entries()) {
            console.log('key: ' + key + '\nvalue: ' + value);
        }
        console.log('');
  
        console.log('Get a single value by key');
        console.log(newUsersMap.get('Sherwood@rosamond.me'));
        console.log('');

        console.log('Time to demo the Array.from(map). We took x array from the first .then and turned it into a map object. Let\'s convert it back to a 2D array where the [mapkey, mapValue] rather then the 1D array that x is.');
        let arr = Array.from(usersMap);
        console.log(arr);
        console.log('');
        console.log('Getting a user');
        console.log(arr[3][1]);
        console.log('');

        console.log('Using a forEach to log some data to the console.');
        usersMap.forEach((value) => {
            console.log(`${value.name} has an Id of ${value.id} and a username of: ${value.username}`);
        });
        console.log('');

        console.log('Getting all keys from a map using: usersMap.keys()');
        for (let key of usersMap.keys()) {
            console.log(key);
        }
        console.log('');

        console.log('Getting all values from a map using: usersMap.values()');
        for (let value of usersMap.values()) {
            console.log(value);
        }
        console.log('');

        console.log('Using a for/of loop to log all entries in the usersMap.entries()');
        for (let [key, value] of usersMap.entries()) {
            console.log('key: ' + key + ', value: ' + value);
        }
        console.log('');
    }).catch((error) => {
        return new Error('Error: ' + error);
    });
console.log('');
