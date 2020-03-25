
export const attsValues = [
    { attr: "style", attrValue: "font-size:2rem;color:red;font-weight:bolder;" },
    { attr: "data-dash", attrValue: "test" },
    { attr: "class", attrValue: "main-container float-left box-shadow" }
];

/**
 * @createHtmlElement
 * @param {any} element - html5 element 'p' 'div' 'section' passed as tring to param
 * @param {any} text - the innerHTML
 * @param {any} addAttribute - boolean true to add html5 tag attribute
 * @param {any} attributesValues - an array of ojects. [{ "attr": "style", "attrValue": "font-size:2rem;color:red;font-weight:bolder;" }, { "attr": "class", "attrValue": "main-container float-left box-shadow" }]
 * @return - a new html element
 */

export const createHtmlElement = (element, text = null, addAttribute = false, attributesValues) => {

    const newElement = document.createElement(element);
    newElement.innerHTML = text;

    if (addAttribute) {
        for (let i = 0; i < attributesValues.length; i++) {
            const att = attributesValues[i];
            const attribute = document.createAttribute(att.attr);
            attribute.value = att.attrValue;
            newElement.setAttributeNode(attribute);
        }
    }
    return newElement;
};

//const newPtag = createHtmlElement('p', `A text string literal`, true, attsValues);
//document.body.appendChild(newPtag);




const posts = [
    { title: 'Post One', body: 'Body of post 1' },
    { title: 'Post Two', body: 'Body of post 2' },
    { title: 'Post Three', body: 'Body of post 3' }
];

function getPosts() {
    const body = document.getElementsByTagName('body')[0];
    const h3 = createHtmlElement('h3', 'Posts Example:');
    body.append(h3);

    posts.forEach((post, index) => {
        
        const innerHTML = `<p><span>Array Index: ${index}, </span>Post Title: ${post.title},  <span>   Post Body: ${post.body}</span></p>`;
        const pTag = createHtmlElement('p', innerHTML);
        body.append(pTag);
    });
}

getPosts();
const el = createHtmlElement('div', 'the inner text', true, attsValues);
document.body.appendChild(el);
/**
 * The Fetch API can be a complicated way to use Promises, or a simple way to use Promises.
 * A fetch request object (Interface) can be passed as a param to fetch(requestObject)
 * We use the request object to supply "Credential" such as a usename and password, or api key
 * request objects can also contain the URL, cors mode, the method (GET, POST, PUT, DELETE), a request body when using a non-GET method
 * OPTIONS for request object: ArrayBuffer, ArrayBufferView, Blob/File, string, URLSearchParams, FormData
 * SEE: https://developer.mozilla.org/en-US/docs/Web/API/Request
 * 
 * For this code demonstration, I look at the Fetch API response body (Interface).
 * https://developer.mozilla.org/en-US/docs/Web/API/Response/Response
 */

function logToConsole(x) {
    if (x instanceof Error) {
        return Promise.reject(x);
    }
    return Promise.resolve(console.log(x));
}

const getSomeData = (url) => {
    //The promise isn't a value, but the value could be wrapped in the promise's response object body.
    return fetch(url)

        .then((response) => {
            console.log('In the response.ok boolean');
            console.log('response.type: ' + response.type);
            console.log('response.url: ' + response.url);
            console.log('response.useFinalURL: ' + response.useFinalURL);
            console.log('response.ok: ' + response.ok);
            console.log('response.status: ' + response.status);
            console.log('response.statusText: ' + response.statusText);
            console.log('response.headers see below, maybe an empty object if not explicitly set.');
            console.log(response.headers);

            //checking response body - if there was no error.
            if (!response.ok) {
                return new Error('Something went wrong, response not ok');
            } else {
                //can convert response body to arrayBuffer(), blob(), formData(), text();
                //access (resolve the promise) the value in the response body and (in this example) convert it to json
                return response.json();
            }
        })

        .then((data) => {
            //data should now be in a format that we can use
            return data;
        });
};
//Bad URL
getSomeData().then(x => logToConsole(x)).catch((error) => { console.error(error); });

//Good URL
//getSomeData('https://jsonplaceholder.typicode.com/users/1/posts').then(x => console.log(x)).catch((error) => { console.log(error);});





const getSomeDataAsyn = async (url) => {
    //The promise isn't a value, but the value could be wrapped in the promise's response object body.
    return await fetch(url)
    
        .then((response) => {
            //checking response body - if there was no error.
            if (!response.ok) {
                //When catch block is inside function, this statement is not thrown, not needed....ignored
                throw new Error('Something went wrong, response not ok');

            } else {
                //can convert response body to arrayBuffer(), blob(), formData(), text();
                //access (resolve the promise) the value in the response body and (in this example) convert it to json
                return response.json();
            }
        })

        .then((data) => {
            //data should now be in a format that we can use
            return data;
        })

        .catch((error) => {
            //Here is where we catch the error and pass mesaage when catch block in inside containing method
            return new Error('From catch block ' + error + '\n' + 'Notice that the error thrown from if/else in response.ok message is not caught here.');
        });
};

//getSomeDataAsyn('https://jsonplaceholder.typicode.com/users/1/posts').then(x => logToConsole(x)).catch((error) => { console.log(error);});
//getSomeDataAsyn().then(x => logToConsole(x)).catch((error) => { console.error(error); });




//'https://jsonplaceholder.typicode.com/users/1/posts'

async function logBad() {
    logToConsole('Call the promise providing a bad request (object) URL');
    await getSomeDataAsyn('htt://badURL.com').then(x => logToConsole(x));
    console.log('');
}
//logBad();

async function logGood() {
    logToConsole('Call the promise providing a good request (object) URL');
    let d = await getSomeDataAsyn('https://jsonplaceholder.typicode.com/users/1/posts');
    console.log('');
    logToConsole(d);
    console.log('breakpoint');
}    
//logGood();

//logBad().then(logGood);




