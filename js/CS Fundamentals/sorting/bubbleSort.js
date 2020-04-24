/**
 * Swaps 2 values in an array - helper function for sort algorithms
 * @param {any} items array of items to be sorted
 * @param {any} firstIndex first index of item to be swapped
 * @param {any} secondIndex second index of item to be swapped
 * @return {void}
 */
function swap(items, firstIndex, secondIndex) {
    let temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}


/**
 * Bubble sort algorithm is comparison-based algorithm in which each pair of adjacent elements is compared
 * the elements are swapped if they are not in order.
 * This algorithm is not suitable for large data sets
 * @param {Array} items array of items to be sorted
 * @return {Array} returns the sorted array
 */
export const bubbleSort = (items) => {
    for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < items.length; j++) {
            if (items[j] > items[j + 1]) {
                swap(items, j, j + 1);
            }
        }
    }
    return items;
};

const strArray = ['Sam', 'Georgia', 'Frank', 'Karen', 'Betty', 'Susan', 'Carol', 'Jasper', 'Violet', 'Samantha', 'Troy', 'Sandy', 'Bob', 'Lisa', 'Joe', 'Greg', 'Alice', 'Carl', 'Victor', 'Jamie', 'Scott', 'Sandra', 'Shannon', 'Ben', 'Angela', 'Toby', 'Denis', 'David', 'Zoe'];

console.log('Bubble Sort');
const b = bubbleSort(strArray);
for (const a in b) {
    console.log(b[a]);
}
console.log('');