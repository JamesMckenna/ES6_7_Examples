/*
Quick Sort is a divide and conquer algorithm 
Quick Sort is also an in place sorting algorithm. meaning it does not create another array to move the values into. The values are "swapped" in the original array.There is some discusion on this as there is a need for refernces pointing to the left index and the right index which do take up some memory space.
quicksort is an unstable algorithm, meaning that it won’t be guaranteed to preserve the order of elements as it reorders; two elements that are exactly the same in the unsorted array could show up in a reversed order in the sorted one!
Four ways to pick a pivot
1) Always pick first element as pivot.
2) Always pick last element as pivot
3) Pick a random element as pivot.
4) Pick median as pivot. ideal pivot because it partitions the original array into 2 havles. 

Pick a pivot and use it as/to partition
Pivot has a big impact on the preformance of the algorithm

*/

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
 * Partition segments an array in two and determinds a pivot to compare values and place the value in one of the two segments
 * @param {Array} items an un-sorted array
 * @param {Int} left first index of the left partition and used to calulate the pivot
 * @param {Int} right last index of the right partition and used to calculate the pivot
 * @returns {Int} index of the left partition and used to determind the pivot for recursive call to sort small partitons 
 */
function partition(items, left, right) {

    const pivot = items[Math.floor((left + right) / 2)];
    
    //not needed for the algorithm, just used for console.log statement
    const pivotIndex = Math.floor((left + right) / 2);
    console.log('Pivot value is ' + pivot + ' pivotIndex: ' + pivotIndex + ' Sorting partition: ' + items.slice(left, right +1));
   
    let i = left, j = right;

    while (i <= j) {
        while (items[i] < pivot) {
            console.log('Value ' + items[i] + ', at index: ' + i + ', is less than the pivot value ' + pivot + ', and resides on the correct side of the partition. Left Index moves 1 towards the Right');
            i++;
        }

        //If conditional is not needed for algorithm, just used for console.log statement to help illustrate how the algorithm works.
        if (items[i] !== pivot) {
            console.log('Value ' + items[i] + ', at index ' + i + ', is greater than the pivot ' + pivot + ' pivotIndex:' + pivotIndex + ', and is waiting to be swapped to the Right side of the partition.');
        }

        while (items[j] > pivot) {
            console.log('Value ' + items[j] + ', at index: ' + j + ', is greater than the pivot value ' + pivot + ' pivotIndex:' + pivotIndex + ', and resides on the correct side of the partition. Right Index moves 1 towards the Left');
            j--;
        }

        //If conditional is not needed for algorithm, just used for console.log statement to help illustrate how the algorithm works.
        if (items[j] !== pivot) {
            console.log('Value ' + items[j] + ' at index ' + j + ' is less than the pivot ' + pivot + ' pivotIndex:' + pivotIndex + ', and is waiting to be swapped to the Left side of the partition.');
        }


        if (i <= j) { 
            //This If/Else conditional is not needed for the algorithm, and is used for console.log statement to help illustrate how the algorithm works.
            if (i === j) {
                console.log('The Left pointer reference: ' + i + ' and the Right pointer reference: ' + j + ' values are equal, and don\'t need to be swapped.');
            } else {
                console.log('Swapping value ' + items[i] + ' at Left Index ' + i + ' with the value ' + items[j] + ' at the Right Index ' + j);
                swap(items, i, j);
            }

            //This If conditional helps optimize the algorithm but is commented out because the above If/Else is used in it's place.
            //if i === j, no need to swap the values, they are the same index and value
            //if (i !== j)
                //swap(items, i, j);

            console.log('Increment the Left Index, decrement the Right Index, continue to compare values of the partition.');
            i++;
            j--;
        }
    }
    console.log('The two sides of a larger partition have been sorted. Values lesser than the pivot are on the left side, with the values greater than the pivot are on the right side.\nReturning the Left Index for recursive call to quickSort a smaller partition.');
    return i;
}

/**
 * Quick Sort 
 * @param {Array} items array of un-sorted elements
 * @param {Int} left index for start of sort range
 * @param {Int} right index for end of sort range
 * @returns {Array} returns an array of sorted items
 */
function quickSort(items, left, right) {
    let pivotIndex;
    if (items.length > 1) {
        //IF left and right arguments are not provided, set them.
        left = typeof left !== 'number' ? 0 : left;
        right = typeof right !== 'number' ? items.length - 1 : right;

        //find and return the pivot pivotIndex
        pivotIndex = partition(items, left, right);

        if (left < pivotIndex - 1) {
            quickSort(items, left, pivotIndex - 1);
        }

        if (pivotIndex < right) {
            quickSort(items, pivotIndex, right);
        }
    }
    return items;
}


/*
const strArray = ['Sam', 'Georgia', 'Frank', 'Karen', 'Betty', 'Susan', 'Carol', 'Jasper', 'Violet', 'Samantha', 'Troy', 'Sandy', 'Bob', 'Lisa', 'Joe', 'Greg', 'Alice', 'Carl', 'Victor', 'Jamie', 'Scott', 'Sandra', 'Shannon', 'Ben', 'Angela', 'Toby', 'Denis', 'David', 'Zoe'];
*/

const strArray = ['Frank', 'Karen', 'Betty', 'Carol', 'Jasper', 'Joe', 'Greg', 'Carl', 'Victor', 'Jamie', 'Sandra', 'Ben', 'Toby', 'Zoe'];

console.info('Quick Sort');
console.info('Array to Sort: ' + [...strArray]);
const m = quickSort(strArray);
console.log('The sorted array: ' + [...m]);
console.log(' ');