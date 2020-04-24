/**
 * Insertion sort, sort in-place algorithm
 * Insertion sort is not suitable for large data sets
 * If it is the first element return 1. This becomes the sorted sub list.
 * Get next element and compare it with all elements in the sorted sub list.
 * Shift all the elements in the sub list that are greatter then the value to be sorted.
 * Insert the value to the index where it is less than next index but greater than previous index.
 * Repeat until all indices have been sorted.
 * Outter for loop makes sure all indices in the array have been looked at
 * The inner for loop compares the current index value with the sub list (previously sorted indices),
 * and determinds where in the sub list the value fits.
 * The conditional in the inner for loop is where the magic is in this algorithm
 * for (j = i - 1; j > -1 &&  the magic ---> items[j] > value <--- the magic ; j--)
 * @param {Array} items array of items to be sorted
 * @return {Array} the sorted array
 */
export const insertionSort = (items) => {
    const len = items.length;
    let value, i, j;
    for (i = 0; i < len; i++) {
        value = items[i];
        //if index value (items[j] > value) is less than the previous index's value, 
        //insert it in the previous index, else decrement the counter and compare it to the previous' previous index value in the sub list
        for (j = i - 1; j > -1 && items[j] > value; j--) {
            //if the value is less than, move the greater value 1 index higher
            items[j + 1] = items[j];
        }
        //insert value to index i (j is equal to i-1)
        items[j + 1] = value;
    }
    return items;
};

const strArray = ['Sam', 'Georgia', 'Frank', 'Karen', 'Betty', 'Susan', 'Carol', 'Jasper', 'Violet', 'Samantha', 'Troy', 'Sandy', 'Bob', 'Lisa', 'Joe', 'Greg', 'Alice', 'Carl', 'Victor', 'Jamie', 'Scott', 'Sandra', 'Shannon', 'Ben', 'Angela', 'Toby', 'Denis', 'David', 'Zoe'];


console.log('Insertion Sort');
const i = insertionSort(strArray);
for (const a in i) {
    console.log(i[a]);
}
console.log('');
