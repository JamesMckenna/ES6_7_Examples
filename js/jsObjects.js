//JS Object Literal
/*
    const personObjectLiteral = {
        name: {
            first: 'Bob',
            last: 'Smith'
        },
        age: 32,
        gender: 'Male',
        interests: ['music', 'skiing'],
        bio: function () {
        alert(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
    },
        greeting: function () { alert('Hi! I\'m ' + this.name.first + '.'); }
    };
    console.log('JS Object Literal');
    console.log(personObjectLiteral.name.first);
    console.log(personObjectLiteral.name.last);
    console.log(personObjectLiteral.age);
    console.log(personObjectLiteral.gender);
    console.log(personObjectLiteral.interests);
    console.log(personObjectLiteral.bio());
    console.log(personObjectLiteral.greeting());
    console.log('');
*/

//Same as above, though an abstraction of a Person. Once instanitated, it becomes an implementaion of the abstraction a.k.a Object Instance
/*
    let personBracketNotation = {
        name: {
            first: null,
            last: null
        },
        age: null,
        gender: null,
        interests: null
    };
    //Different syntax for getting/setting
    personBracketNotation['name']['first'] = 'Bob';
    personBracketNotation['name']['last'] = 'Smith';
    personBracketNotation['age'] = 32;
    personBracketNotation['gender'] = 'Male';
    personBracketNotation['interests'] = ['music', 'skiing'];
    //Can add new member/method using bracket notation
    personBracketNotation['bio'] = function () {
        alert(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
    };
    personBracketNotation['greeting'] = function () { alert('Hi! I\'m ' + this.name.first + '.'); };
    console.log('Bracket Notation');
    console.log(personBracketNotation['name']['first']);
    console.log(personBracketNotation['name']['last'] );
    console.log(personBracketNotation['age']);
    console.log(personBracketNotation['gender']);
    console.log(personBracketNotation['interests'] );
    console.log(personBracketNotation['bio'] );
    console.log(personBracketNotation['greeting']);
    console.log('Calling an Object Method use:  personBracketNotation.bio()');
    console.log(personBracketNotation.bio());
    console.log('');
*/




/*
    //The Object Constructor
    let personObject = new Object();
    //make a new object
    let name = {
        first: null,
        last: null
    };
    //add new object as member to personObject
    personObject['name'] = name;
    personObject.age = null;
    personObject.gender = null;
    personObject.interests = [];

    //Initializing
    personObject.name.first = 'Sam';
    personObject.name.last = 'Spade';
    personObject.age = 32;
    personObject.gender = 'Male';
    personObject.interests = ['sky diving', 'swimming', 'music'];

    console.log('This is a personObject');
    console.log(personObject);
    console.log('');

    //Can use Object.create - logging the above and the below has funny results.
    //Name gets overwitten in the above, but age and gender do not. Sam Spade doesn't get saved even though a new variable is declared
    let person1 = Object.create(personObject);
    person1.name.first = 'Carol',
    person1.name.last = 'Smith';
    person1.age = 30;
    person1.gender = 'Female';
    person1.interests = ['sky diving', 'swimming', 'music'];
    //Here all personObjects are overwitten
    console.log('');
    console.log('Using Object.create');
    console.log(person1.name.first);
    console.log(person1.name.last);
    console.log(person1.age);
    console.log(person1.gender);
    console.log('');

    //Investigaing basic __proto__
    console.log('Investigaing basic __proto__');
    console.log(person1.__proto__);
    //So valueOf works with basic properties. Only returns age and gender..
    console.log(person1.valueOf());
    //To get member Name, see below.  
    //Object properties need dot notation to use the Object method valueOf method
    console.log(person1.name.valueOf());
    console.log(person1.propertyIsEnumerable('interests') + ' person1.interests is enumerable - an array');
    console.log(person1.propertyIsEnumerable('name') + ' person1.name is not enumerable - an object {}');
    console.log(person1.hasOwnProperty('age'));
    console.log(person1.toString());
    console.log(person1.prototype.toString());
    console.log('');
    console.log('');
*/



//JS  Object Constructor Function
/**
 * @PersonConstructorFunc
 * @param {any} first - string, property of the Person member name: {first: "first", last: "last"}
 * @param {any} last - string, , property of the Person member name: {first: "first", last: "last"}
 * @param {any} age - number
 * @param {any} gender - string 
 * @param {any} interests - string, array, object
 * @method {any} bio - alert name, age, interests
 * @method {any} greeting - alert name.first
 */

/**/
    function PersonConstructorFunc(first, last, age, gender, interests) {
      this.name = {
         first : first,
         last : last
      };
      this.age = age;
      this.gender = gender;
      this.interests = interests;
      this.bio = function() {
        alert(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
      };
      this.greeting = function() {
        alert('Hi! I\'m ' + this.name.first + '.');
      };
    }

    console.log('Constructor Function');
    let person2 = new PersonConstructorFunc('Bob', 'Smith', 32, 'male', ['music', 'skiing']);
    console.log(person2.name.first);
    console.log(person2.name.last);
    console.log(person2.age);
    console.log(person2.gender);
    console.log(person2.interests);
    console.log(person2.bio);
    console.log(person2.greeting);
    console.log('');

    let person3 = new PersonConstructorFunc('Suzy', 'Q', 25, 'Female', ['music', 'skiing', 'dancing']);
    console.log(person3.name.first);
    console.log(person3.name.last);
    console.log(person3.age);
    console.log(person3.gender);
    console.log(person3.interests);
    console.log(person3.bio);
    console.log(person3.greeting);
    console.log('');
/**/


//let myJSON = { "name": "Chris", "age": "38" }; <---this is Json data double quotes around both key and value, if value is a number, don't use double qoutes.. JOSN can not have functions/methods. (serialized)


//myJSON logs => { name: "Chris", age: "38" } <---this is a javascript object  double quotes around just the value, but can be around key as well. JS Objects can have functions/methods(deserialized)


//We can json.stringify to turn JS object into valid json. As JSON, we can't do object.key to get the value it returns undefined. We need to parse back to a JS Object by doing Json.parse(object)

console.log('person3 as js object');
console.log(person3);
console.log('person3 to access an embedded js object we use object.embedded.key');
console.log(person3.name.first);
console.log('person3 to access an array we use object.key[index]');
console.log(person3.interests[1]);
console.log('To see a method of a JS Object, use object.functionName notation. EG: person3.bio. console logs the method but doesn\'t execute');
console.log(person3.bio);
console.log('To call a method of a JS Object, use function call notation. EG: person3.bio(). When calling a method and printing to console, console return undefined but method still executes.');
console.log(person3.bio());
console.log('');

console.log('What a Js object looks like when turned into json using JSON.stringify(JSObject) a.k.a serialized');
const asJson = JSON.stringify(person3);
console.log(asJson);
console.log('Notice: the methods bio and greeting that were part of the JS Object person3 are not in the log statement after JSON.stringify!!!!');
console.log('Notice: so as JSON object, we can nolonger call the method or print the method....it\'s nolonger there');
console.log(asJson.bio);//undefined
//console.log(asJson.bio());//TypeError: asJson.bio is not a function. unhandled error so script execution halts.
console.log('');

console.log('We can trun a JSON object back to a JS Object by using JSON.parse(object) a.k.a de-serialized');
const backToJSObject = JSON.parse(asJson);
console.log(backToJSObject);
console.log('Notice: methods that were part of person3 JS object, are gone once the object is stringified (serialized) into a json object and then parsed back to a JS object (de-serialized).');
console.log('');

//let myString = JSON.stringify(myJSON);
//myString logs => "{"name":"Chris","age":"38"}"

