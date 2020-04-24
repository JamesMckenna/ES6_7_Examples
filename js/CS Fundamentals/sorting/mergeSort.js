/**
 * Merge take 2 arrays and merges them into 1 ordered array
 * @param {Array} left array 1 to be merged
 * @param {Array} right array 2 to be merged
 * @return {Array} returns an ordered array
 */
function merge(left, right) {
    console.log('Merging subArray: ' + [...left] + ' with subArray: ' + [...right]);
    let result = [];
    while (left.length > 0 && right.length > 0) {
        //result.push(a[0] < b[0] ? a.shift() : b.shift());
        if (left[0] < right[0]) {
            console.log('subArray-Left value ' + left[0] + ' is lesser than the value of subArray-Right value ' + right[0]);
            result.push(left.shift());           
        } else {
            console.log('subArray-Right value ' + right[0] + ' is lesser than the value of subArray-Left value ' + left[0]);
            result.push(right.shift());
        }
        console.log('A value has been added to the ordered subArray: ' + [...result]);
    }
    console.log('This instantiation of merge has been fulfilled and popped off the stack.\nsubArray-Left and subArray-Right have been merged and are returned to start building the larger sorted array.');
    console.log([...result.concat(left.length ? left : right)]);
    return result.concat(left.length ? left : right);
}

/**
 * Merge Sort 
 * @param {Array} items an array of items to be sorted
 * @param {Int} low index to start sorting range
 * @param {Int} high index to end sorting range
 * @return {Array} returns a sorted array
 */
export const mergeSort = (items, low = 0, high = items.length) => {
    if (items.length < 2) {
        //at base case, return
        console.log('basecase has been reached, a subArray has been divided to a single entry.');
        return items;
    }
    const lo = low;
    const hi = high;
    const mid = Math.floor(items.length / 2);

    console.log('mergeSort has been called recursively and added to the stack. This is the dividing of the orginal array or it\'s subArrays.\nEach subArray will be divided and will have subArrays of it\'s own until each of the subArrays contain a single value.');
    const subLeft = mergeSort(items.slice(lo, mid));
    console.log('subArray-Left: ' + [...subLeft]);
    const subRight = mergeSort(items.slice(mid, hi));
    console.log('subArray-Right: ' + [...subRight]);
    return merge(subLeft, subRight);
};


/*
const strArray = ['Sam', 'Georgia', 'Frank', 'Karen', 'Betty', 'Susan', 'Carol', 'Jasper', 'Violet', 'Samantha', 'Troy', 'Sandy', 'Bob', 'Lisa', 'Joe', 'Greg', 'Alice', 'Carl', 'Victor', 'Jamie', 'Scott', 'Sandra', 'Shannon', 'Ben', 'Angela', 'Toby', 'Denis', 'David', 'Zoe'];
*/

const strArray = ['Frank', 'Karen', 'Betty', 'Carol', 'Jasper', 'Joe', 'Greg', 'Carl', 'Victor', 'Jamie', 'Sandra', 'Ben','Toby', 'Zoe'];

console.info('Merge Sort - To best see how this recursive algorithm works, look to the Browser\'s Dev Tools.\nPay specific attention to the Call Stack and Scope Dev sub tools.\nFor those not aware, one can see the each of the entires and current values on the Call Stack.\nI suggest putting a a break point on the line of the mergeSort, function signature and step through the algorithm.\nOne can view the Call Stack values by selecting the entry on the Call Stack.');
const m = mergeSort(strArray);
for (const n in m) {
    console.log(m[n]);
}
console.log(' ');
