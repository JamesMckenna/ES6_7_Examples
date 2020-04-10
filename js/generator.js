//Can use a loop to get next value instead of using .next generator method
//Can use an iterator to call the next value without using the .next() method
//yield* delegates control to another function/process and any return values get added to the context of the generator that yield* 'ed control to a delegate
//yield inside a generator pauses function execution, .next() outside the generator (in global space or another function scope) starts the generator functoin running again.
//yield not only pauses procedure execution, but also returns an object that may contain a value and always contains the running state of the generator function (done or continuable).
//The generator function is a declaration and definition of the generator. The acutal generator needs to be an object. to do that we assign the function to a variable; thus making it an (iterable) object. The declaration is just the blue print of what we want. it needs to be instantiated to become and object and usable.
/*
 
 There are four kinds of generators:

1) Generator function declarations:
 function* genFunc() { ··· }
 const genObj = genFunc();
 */
 /******************************************************/
 /*
2) Generator function expressions:
 const genFunc = function* () { ··· };
 const genObj = genFunc();
 */
/**************************************************/
 /* 
3) Generator method definitions in object literals:
 const obj = {
     * generatorMethod() {
         ···
     }
 };
 const genObj = obj.generatorMethod();
 */
 /******************************************************************/
 /* 
4) Generator method definitions in class definitions (class declarations or class expressions):
 class MyClass {
     * generatorMethod() {
         ···
     }
 }
 const myInst = new MyClass();
 const genObj = myInst.generatorMethod();
 */

//https://javascript.info/async-iterators-generators
async function* fetchCommits(repo) {
    let url = `https://api.github.com/repos/${repo}/commits`;

    while (url) {
        const response = await fetch(url, { // (1)
            headers: { 'User-Agent': 'Our script' }, // github requires user-agent header
        });

        const body = await response.json(); // (2) response is JSON (array of commits)

        // (3) the URL of the next page is in the headers, extract it
        let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
        nextPage = nextPage && nextPage[1];

        url = nextPage;

        for (let commit of body) { // (4) yield commits one by one, until the page ends
            yield commit;
        }
    }
}

(async () => {

    let count = 0;

    for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

        console.log(commit.author.login);

        if (++count === 100) { // let's stop at 100 commits
            break;
        }
    }

})();

