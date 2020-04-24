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
 * Selection sort algorithm. Similar to the insert sort, the selection sort is also in place sorting
 * and not suited for sorting large data sets.
 * What differs is that the algorithm finds the lowest value in the array and places it in the first index,
 * and the value from the first index is stored at the index where the lowest was. 
 * The first index has the lowest value in the array and becomes the first value in the sorted sub list;
 * while the remaining array's indices are the unsorted sub list. 
 * The sorting then continues with the unsorted sub list's first index (to last) looking for the lowest value in the unsorted sub list.
 * If the lowest isn't the first index of the unsorted sub list, the lowest value and the value at first index are swapped and the index
 * becomes the next index of the sorted sub list.
 * @param {Array} items array of items to be sorted
 * @return {Array} sorted items
 */
export const selectionSort = (items) => {
    const len = items.length;
    let min, i, j;

    //i is the index (value) being compared in the unsorted list
    for (i = 0; i < len; i++) {
        //min is the first index of the unsorted list and the last index of the sorted list.
        min = i;
        //j is the index of the unsorted sub list that i is being compared too.
        for (j = i + 1; j < len; j++) {
            if (items[j] < items[min]) {
                min = j;
            }
        }

        if (i !== min) {
            swap(items, i, min);
        }
    }
    return items;
};

const strArray = ['Sam', 'Georgia', 'Frank', 'Karen', 'Betty', 'Susan', 'Carol', 'Jasper', 'Violet', 'Samantha', 'Troy', 'Sandy', 'Bob', 'Lisa', 'Joe', 'Greg', 'Alice', 'Carl', 'Victor', 'Jamie', 'Scott', 'Sandra', 'Shannon', 'Ben', 'Angela', 'Toby', 'Denis', 'David', 'Zoe'];

console.log('Selection Sort');
const s = selectionSort(strArray);
for (const a in s) {
    console.log(s[a]);
}
console.log('');
