console.log('Linked list');
//https://github.com/humanwhocodes/computer-science-in-javascript
//https://humanwhocodes.com/blog/2019/01/computer-science-in-javascript-linked-list/
const head = Symbol('head');

let node = function (data) {
    this.data = data;
    this.next = null; 
};

let linkedList = function () {
    this.head = null;

    //https://www.carloscaballero.io/understanding-iterator-pattern-in-javascript-typescript-using-symbol-iterator/
    //https://stackoverflow.com/questions/36976832/what-is-the-meaning-of-symbol-iterator-in-this-context
};

/**
 * Appends some data to the end of the list. This method
 * traverses the existing list and places the data at the end in a new node
 * @param {any} data the data to add to the list
 * @returns {void}
 */
linkedList.prototype.add = function (data) {
    const newNode = new node(data);
    if (this.head === null) {
        this.head = newNode;
    }
    else {
        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }

        current.next = newNode;
    }
};


/**
 * Inserts some data into the middle of the list. This method traverses
 * the existing list and places the data in a new node at a specific index.
 * @param {*} data the data to add to the list.
 * @param {int} index the zero-based index at which to insert data.
 * @returns {void}
 * @throws {RangeError} If the index does not exist in the list.
 */
linkedList.prototype.insertBefore = function (data, index) {
    const newNode = new node(data);

    //special case: no nodes in the list yet
    if (this.head === null) {
        throw new RangeError(`Index ${index} does not yet exist.`);
    }

    /**
     * Special case: if `index` is 0, then no transversal is needed
     * and we need to update this.head to point to node. First set node.next 
     * to current this.head so the previous head of the list is now the second node in the list.
     * Then it's safe to update this.head to point to next.
     * */
    if (index === 0) {
        newNode.next = this.head;
        this.head = newNode;
    }
    else {
        /**
         * The current variable is used to track the node that is being
         * used inside of the loop below. It starts out pointing to this.head and is overwitten
         * inside the loop.
         * The previous variable tracks one step behind current, which 
         * is necessary because we need to adjust the node at index -1's 
         * next pointer to point to the new node.
         */
        let current = this.head,
            previous = null;

        /**
         * The i variable is used to track how deep into the list we've gone.
         * This is important because it's the only way to know when we've hit the index to insert into
         */
        let i = 0;

        /*
         * Traverse the list nodes similar to the add() method, but make sure to keep track 
         * of how many nodes have been visited and update the previous pointer in the addition to current.
         * When i is the same as index, it means we've found the location to insert the new data.
         * */
        while ((current.next !== null) && (i < index)) {
            previous = current;
            current = current.next;
            i++;
        }
        /*
         * At this point, cuurent is either the node to insert the new data before, 
         * or the last node in the list. The only way to tell is if i 
         * is still less than index, that means the index is out of range and an error should be thrown
         */
        if (i < index) {
            throw new RangeError(`Index ${index} doers not exist in the list.`);
        }

        /*
         * If code continues to execute here, it means current is the node to insert new data 
         * before the previous is the node to insert new data after.  So previous.nest must point to node
         * and node.next must point to current.
         */
        previous.next = newNode;
        newNode.next = current;
    }
};

/**
 * Inserts some data into the middle of the list. This method traverses the 
 * existing list and places the data in a new node after specific index.
 * @param {*} data the data to add to the list
 * @param {int} index The zero-based index after which to insert the data.
 * @returns {void} 
 * @throws {RangeError} If the index doesn't exist in the list.
 * */
linkedList.prototype.insertAfter = function (data, index) {
    /**
     * Create a new list node object and store the data in it.
     * This node will be inserted into the existing list.
     */
    const newNode = new node(data);

    //special case: no nodes in the list yet
    if (this.head === null) {
        throw new RangeError(`Index ${index} does not yet exist in the list.`);
    }

    /*
     * The current variable is used to track the node that is being
     * used insiode of the loop below. It starts out pointing to 
     * this.head and is overwritten inside the loop.
     */
    let current = this.head;

    /*
     * The i variable is used to track how deep into the list we've
     * gone. This is important because it's the only way to know when
     * we've hit the index to insert into.
     */
    let i = 0;

    /*
     * Traverses the list nodes similar to the add method, but make sure
     * to keep track of how many nodes have been visited and ipdate the 
     * previous pointer in addition to current. When i is the same
     * as index, it means we've found the location to insert the new data.
     */
    while ((current !== null) && (i < index)) {
        current = current.next;
        i++;
    }

    /*
     * At this point, current is eiter the node to insert the new data
     * before, or the last node in the list. The only way to tell is if i is still less than 
     * index, that means the index is out of range and an error should be thrown.
     */
    if (i < index) {
        throw new RangeError(`Index ${index} does not exist in the list.`);
    }

    /*
     * If code continues to execute here, it means current is the node to insert new data after. 
     * So current.next must point to node for the data to be in the correct spot, but before that, 
     * node.next must point to current.next to ensure the list remains intact.
     */
    newNode.next = current.next;
    current.next = newNode;
};

/**
 * Retrieves the data in the given position in the list.
 * @param {int} index The zero-base index of the node whose data should be retrieved
 * @return {*} The data in the data portion of the given node or undefined if the node doesn't exist.
 */
linkedList.prototype.getNode = function (index) {
    //make sure index is a positve value
    if (index > -1) {
        /*
         * The current variable is used to track the node that is being
         * used inside the loop below. It starts out pointing to this.head
         * and is overwritten inside of the loop.
         */
        let current = this.head;

        /*
         * The i variable is used to track how deep into the list we've gone. 
         * This is important becuase it's the only way to know when we've hot the 
         * index to insert into.
         */
        let i = 0;

        /*
         * Traverse the list nodes similar to the add() method, but make sure
         * to keep track of how many nodes have been visited and update the previous pointer in the addition to current.
         * When i is the same as index, it means we've found the location to insert new data.
         */
        while ((current !== null) && (i < index)) {
            current = current.next;
            i++;
        }

        /*
         * At this point, current might be null if we've gone past the end of the list
         * In that case, we return undefined to indicate that the node at index
         *  was not found. If current is not null,
         *  then it's safe to return current.data.
         */
        return current !== null ? current.data : undefined;
    }
    else {
        return undefined;
    }
};

/**
 * Retrieves the index of the data in the list.
 * @param {any} data The data to search for.
 * @returns {int} The index of the first instance of the data in the list
 * or -1 if not found.
 */

linkedList.prototype.indexOfNode = function (data) {
    /*
     * The current variable is used to iterate over the list nodes.
     * It starts out pointing to the hesad and is overwritten inside of the loop below.
     */
    let current = this.head;

    /*
     * The index variable is used to track how deep we've gone into the list.
     * This is important because this is the value tat is returned from this method.
     */
    let index = 0;

    /*
     * This loop checks each node in the list to see if it matched data.
     * If a match is found, it returns index immediately, existing the loop 
     * because there's no reason th keep searching, The search continues until there are no 
     * more nodes to search (current is null)
     */
    while (current !== null) {
        if (current.data === data) {
            return index;
        }

        current = current.next;
        index++;
    }
    /*
     * If execution gets to thispoint, it means we reached the end of the list
     * and didn't find data. Return -1 as the result not found value.
     */
    return -1;
};

/**
 * Removes the node from the given location in the list.
 * @param {int} index The zero-base index of the node to remove.
 * @returns {*} The data in the given position in the list.
 * @throws {RangeError} If index is out of range.
 */

linkedList.prototype.removeNode = function (index) {
    //special cases: empty or invalid index
    if ((this.head === null) || (index < 0)) {
        throw new RangeError(`Index ${index} does not exist in the list.`);
    }

    //special case: removing the first node.
    if (index === 0) {
        //temporarily store the data from the node
        const data = this.head.data;
        //just replace the head with the next node in the list.
        this.head = this.head.next;
        //return the data at the the previous head of the list.
        return data;
    }

    /*
     * The current variable is used to iterate over the list of nodes.
     * It starts out pointing to the head and is overwritten inside
     * of the loop below.
     */
    let current = this.head;

    /*
     * The previous variable keeps track of the node just before current
     * in the loop below. This is necessary because removing a 
     * node means updating the previous node's next pointer.
     */
    let i = 0;

    /*
     * Traverse the list nodes similar to the add() method, but make
     * sure to keep track of how many nodes have been visited and update the 
     * previous pointer in addition to current. When i is the same as index, 
     * it means we've found the location to remove.
     */
    while ((current !== null) && (i < index)) {
        //save the value of current
        this.previous = current;
        //traverse to the next node
        current = current.next;
        i++;
    }

    /*
     * If current isn't null, then that means we've found the node to remove.
     */
    if (current !== null) {
        //skip over the node to remove
        this.previous.next = current.next;
        return current.data;
    }

    /*
     * If we've made it this far, it means index is a value that 
     * doesn't exist in the list, throw an error.
     */
    throw new RangeError(`Index ${index} does not exist in the list.`);
};

/**
 * Removes all nodes from the list.
 * @returns {void}
 * */
linkedList.prototype.clearLinkedList = function () {
    this.head = null;
};

/**
 * Returns the number of nodes in the list.
 * @returns {int} The number of nodes in the list.
 * */
linkedList.prototype.getNodeCount = function () {
    //special case: the list is empty
    if (this.head === null) {
        return 0;
    }

    /*
     * The current variable is used to iterate over the list nodes.
     * It starts out pointing to the head and is overwritten inside the loop below.
     */
    let current = this.head;

    /*
     * The count variable is used to keep track of how many nodes have been
     * visited inside the loop below. This is important becausethis is the value to return from this method.
     */
    let count = 0;

    /*
     * As long as current is not null, that means we're not yet at the end of the list
     * so adding 1 to count and traverse to the next node.
     */
    while (current !== null) {
        count++;
        current = current.next;
    };

    /*
     * When current is null, the loop is existed at the value of count
     * is the number of nodes that were counted in the loop.
     */
    return count;
};

/**
 * Create an iterator that returns each node in the list.
 * @returns {Iterator} AN iterator on the list.
 * */

linkedList.prototype.getValues = function* () {
    /*
     * The current variable is used to iterate over the list nodes.
     * It starts out pointing to the head and is overwritten inside of the loop.
     */
    let current = this.head;

    /*
     * As long as current is not null, there is a piece of data to yield.
     */
    while (current !== null) {
        yield current.data;
        current = current.next;
    }
};

///**
// * The default iterator for the object.
// * @returns {Iterater} An iterator for the object.
// *    [Symbol.iterator]() {
//          return this.values();
//      }
// * */
linkedList.prototype[Symbol.iterator] = function () {
    return this.getValues();
};

let list = new linkedList();
console.log('Adding Sam to the list');
list.add('Sam');
console.log('Adding Sally to the list');
list.add('Sally');
console.log('Adding Tom to the list');
list.add('Tom');
console.log('Adding Lisa to the list');
list.add('Lisa');
console.log('get data from list index 1');
console.log(list.getNode(1));
console.log('get node count.');
console.log(list.getNodeCount());
console.log('get all data from the list');
console.log(...list);
console.log('Insert Tammy before index 3 then list all values');
list.insertBefore('Tammy', 3);
console.log(...list);
console.log('Insert Frank after index 3 then list all values');
list.insertBefore('Frank', 3);
console.log(...list);
console.log('getValues');
console.log(...list.getValues());//getValues list all values as does [...list]. if list is made iterable, all values can be called either way.
console.log('Find the index of Tammy');
console.log(list.indexOfNode('Tammy'));
console.log('Using the index, remove Tammy form the list, then print the list');
list.removeNode(4);
console.log(...list);
console.log('Clear the list, then print the list');
list.clearLinkedList();
console.log('Anything in the list? ' + [...list] + ' Appears empty.');
/************************ Class Syntax  ***************************/

/*
 * These symbols are used to represent properties that should not be part of
 * the public interface. You could also use ES2019 private fields, but those
 * are not yet widely available as of the time of my writing.
 */
//const head = Symbol("head");

///**
// * Represents a single node in a LinkedList.
// * @class LinkedListNode
// */
//class LinkedListNode {

//    /**
//     * Creates a new instance of LinkedListNode.
//     * @param {*} data The data to store in the node. 
//     */
//    constructor(data) {

//        /**
//         * The data that this node stores.
//         * @property data
//         * @type *
//         */
//        this.data = data;

//        /**
//         * A pointer to the next node in the LinkedList.
//         * @property next
//         * @type ?LinkedListNode
//         */
//        this.next = null;

//    }
//}

///**
// * A linked list implementation in JavaScript.
// * @class LinkedList
// */
//class LinkedList {
//    constructor() {

//        /**
//         * Pointer to first node in the list.
//         * @property head
//         * @type ?LinkedListNode
//         * @private
//         */
//        this[head] = null;
//    }

//    /**
//     * Appends some data to the end of the list. This method traverses
//     * the existing list and places the data at the end in a new node.
//     * @param {*} data The data to add to the list.
//     * @returns {void}
//     */
//    add(data) {

//        const newNode = new LinkedListNode(data);

//        if (this[head] === null) {

//            this[head] = newNode;
//        } else {

//            let current = this[head];

//            while (current.next !== null) {
//                current = current.next;
//            }

//            current.next = newNode;
//        }
//    }

//    /**
//     * Inserts some data into the middle of the list. This method traverses
//     * the existing list and places the data in a new node at a specific index.
//     * @param {*} data The data to add to the list.
//     * @param {int} index The zero-based index at which to insert the data.
//     * @returns {void}
//     * @throws {RangeError} If the index doesn't exist in the list.
//     */
//    insertBefore(data, index) {

//        const newNode = new LinkedListNode(data);

//        if (this[head] === null) {
//            throw new RangeError(`Index ${index} does not exist in the list.`);
//        }

//        if (index === 0) {
//            newNode.next = this[head];
//            this[head] = newNode;
//        } else {

//            let current = this[head],
//                previous = null;

//            let i = 0;

//            while ((current.next !== null) && (i < index)) {
//                previous = current;
//                current = current.next;
//                i++;
//            }

//            if (i < index) {
//                throw new RangeError(`Index ${index} does not exist in the list.`);
//            }

//            previous.next = newNode;
//            newNode.next = current;
//        }
//    }

//    /**
//     * Inserts some data into the middle of the list. This method traverses
//     * the existing list and places the data in a new node after a specific index.
//     * @param {*} data The data to add to the list.
//     * @param {int} index The zero-based index after which to insert the data.
//     * @returns {void}
//     * @throws {RangeError} If the index doesn't exist in the list.
//     */
//    insertAfter(data, index) {

//        const newNode = new LinkedListNode(data);

//        if (this[head] === null) {
//            throw new RangeError(`Index ${index} does not exist in the list.`);
//        }

//        let current = this[head];

//        let i = 0;
//        while ((current !== null) && (i < index)) {
//            current = current.next;
//            i++;
//        }
//        if (i < index) {
//            throw new RangeError(`Index ${index} does not exist in the list.`);
//        }
//        newNode.next = current.next;
//        current.next = newNode;
//    }

//    /**
//     * Retrieves the data in the given position in the list.
//     * @param {int} index The zero-based index of the node whose data 
//     *      should be returned.
//     * @returns {*} The data in the "data" portion of the given node
//     *      or undefined if the node doesn't exist.
//     */
//    get(index) {
//        if (index > -1) {
//            let current = this[head];
//            let i = 0;
//            while ((current !== null) && (i < index)) {
//                current = current.next;
//                i++;
//            }
//            return current !== null ? current.data : undefined;
//        } else {
//            return undefined;
//        }
//    }

//    /**
//     * Retrieves the index of the data in the list.
//     * @param {*} data The data to search for.
//     * @returns {int} The index of the first instance of the data in the list
//     *      or -1 if not found.
//     */
//    indexOf(data) {
//        let current = this[head];
//        let index = 0;
//        while (current !== null) {
//            if (current.data === data) {
//                return index;
//            }
//            current = current.next;
//            index++;
//        }
//        return -1;
//    }

//    /**
//     * Removes the node from the given location in the list.
//     * @param {int} index The zero-based index of the node to remove.
//     * @returns {*} The data in the given position in the list.
//     * @throws {RangeError} If index is out of range.
//     */
//    remove(index) {

//        if ((this[head] === null) || (index < 0)) {
//            throw new RangeError(`Index ${index} does not exist in the list.`);
//        }

//        if (index === 0) {

//            const data = this[head].data;

//            this[head] = this[head].next;

//            return data;
//        }

//        let current = this[head];
//        let previous = null;
//        let i = 0;

//        while ((current !== null) && (i < index)) {

//            previous = current;

//            current = current.next;

//            i++;
//        }

//        if (current !== null) {

//            previous.next = current.next;

//            return current.data;
//        }

//        throw new RangeError(`Index ${index} does not exist in the list.`);
//    }

//    /**
//     * Removes all nodes from the list.
//     * @returns {void}
//     */
//    clear() {
//        this[head] = null;
//    }

//    /**
//     * Returns the number of nodes in the list.
//     * @returns {int} The number of nodes in the list.
//     */
//    get size() {

//        if (this[head] === null) {
//            return 0;
//        }

//        let current = this[head];

//        let count = 0;

//        while (current !== null) {
//            count++;
//            current = current.next;
//        }
//        return count;
//    }

//    /**
//     * The default iterator for the class.
//     * @returns {Iterator} An iterator for the class.
//     */
//    [Symbol.iterator]() {
//        return this.values();
//    }

//    /**
//     * Create an iterator that returns each node in the list.
//     * returns {Iterator} An iterator on the list. 
//     */
//    *values() {
//        let current = this[head];

//        while (current !== null) {
//            yield current.data;
//            current = current.next;
//        }
//    }

//    /**
//     * Converts the list into a string representation.
//     * @returns {String} A string representation of the list.
//     */
//    toString() {
//        return [...this].toString();
//    }
//}

/************************ END Class Syntax  ***************************/
