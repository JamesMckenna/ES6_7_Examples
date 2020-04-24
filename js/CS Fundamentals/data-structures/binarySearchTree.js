const root = Symbol('root');

const bstNode = function (value) {
    this.value = value;
    this.left = null;
    this.right = null;
};

const bsTree = function () {
    this.root = null;
};

bsTree.prototype.add = function (value) {
    const newNode = new bstNode(value);
    if (this.root === null) {
        this.root = newNode;
    } else {
        let current = this.root;
        while (current !== null) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    break;
                } else {
                    current = current.left;
                }
            } else if (value > current.value) {
                if (current.right === null) {
                    current.right = newNode;
                    break;
                } else {
                    current = current.right;
                }
            } else {
                break;
            }
        }
    }
};

bsTree.prototype.has = function (value) {
    let found = false;
    let current = this.root;
    while (!found && current !== null) {
        if (value < current.value) {
            current = current.left;
        } else if (value > current.value) {
            current = current.right;
        } else {
            found = true;
        }
    }
    return found;
};

bsTree.prototype.delete = function (value, balance = false) {
    if (this.root === null) {
        return;
    }
    let found = false;
    let current = this.root;
    let parent = null;
    while (!found && current !== null) {
        if (value < current.value) {
            parent = current;
            current = current.left;
        } else if (value > current.value) {
            parent = current;
            current = current.right;
        } else {
            found = true;
        }
    }
    if (!found) {
        return value + ' was not found in tree';
    }
    const nodeToRemove = current;
    let replacement = null;
    //if found has a left child node and a right child node
    if (nodeToRemove.left !== null && nodeToRemove.right !== null) {

        //make current.left the replacement node
        replacement = nodeToRemove.left;

        //make current replacementParent
        let replacementParent = nodeToRemove;

        //if current has a right child node
        while (replacement.right !== null) {
            replacementParent = replacement;
            replacement = replacement.right;
        }

        replacement.right = nodeToRemove.right;
        if (replacementParent !== nodeToRemove) {
            replacementParent.right = replacement.left;
            replacement.left = nodeToRemove.left;
        }

    } else if (nodeToRemove.left !== null) {
        replacement = nodeToRemove.left;
    } else if (nodeToRemove.right !== null) {
        replacement = nodeToRemove.right;
    }

    if (nodeToRemove === this.root) {
        this.root = replacement;
    } else {
        if (nodeToRemove.value < parent.value) {
            parent.left = replacement;
        } else {
            parent.right = replacement;
        }
    }

    if (balance) {
        this.balance();
    }

    return value + ' was deleted form the tree.';
};

bsTree.prototype.clear = function () {
    this.root = null;
};

bsTree.prototype.count = function () {
    if (this.root === null) {
        return 0;
    }
    let count = 0;
    const traverse = (node) => {
        if (node) {
            if (node.left !== null) {
                traverse(node.left);
            }
            count++;
            if (node.right !== null) {
                traverse(node.right);
            }
        }
    };
    traverse(this.root);
    return count;
};

//bsTree.prototype[Symbol.iterator] = function () {
//        return this.values;
//};

bsTree.prototype.values = function* () {
    /*
    * Traversal is easiest when using a recursive function, so define
    * a helper function here. This function does an in-order traversal
    * of the tree, meaning it yields values in sorted order from
    * lowest value to highest. It does this by traversing to the leftmost
    * node first, then working its way back up the tree, visiting right nodes
    * along the way.
    *
    * This function cannot be an arrow function because arrow functions
    * cannot be generators.
    */
    function* traverse(node) {
        if (node) {
            if (node.left !== null) {
                yield* traverse(node.left);
            }
            yield node.value;
            if (node.right !== null) {
                yield* traverse(node.right);
            }
        }
    }
    yield* traverse(this.root);
};

//a little playing around on my part. 
bsTree.prototype.balance = function () {
    //Values from this binary search tree will be logged in order from least to greatest - a.k.a InOrder Traversal.
    //After a value is deleted, get the remaining values.
    let values = [...this.values()];
    //Assuming the values are not sorted. Sort from greatest to least. Could use array.sort() but that would be simple.
    const sort = function () {
        let current;
        let temp;
        let iteration = 0;
        while (iteration < values.length) {
            for (let i = 0; i < values.length; i++) {
                if (values[i] < values[i + 1]) {
                    temp = values[i + 1];
                    current = values[i];
                    values[i + 1] = current;
                    values[i] = temp;
                }
            }
            //How can I make this sort algorithm be better???
            iteration++;
        }
    };
    if (values) {
        sort();
        const rootIndex = Math.round(values.length / 2);
        this.clear();
        this.add(values[rootIndex]);
        for (let v = 0; v < values.length; v++) {
            if (values[v] !== values[rootIndex]) {
                this.add(values[v]);
            }
        }
        return true;
    }
    return false;
};

bsTree.prototype.poTraversal = function* () {
    function* traversal(node) {
        if (node !== null) {
            if (node.left !== null) {
                yield* traversal(node.left);
            }
            if (node.right !== null) {
                yield* traversal(node.right);
            }

            yield node.value;
        }
    }
    yield* traversal(this.root);
};

bsTree.prototype.prTraversal = function* (node) {
    //A typical recursive algorithm if NOT used in a JS generator
    //if (node !== null) {
    //    console.log(node.value);
    //    if (node.left !== null) {
    //        this.prTraversal(node.left);
    //    }
    //    if (node.right !== null) {
    //        this.prTraversal(node.right);
    //    }
    //}

    //A recursive algorithm using a JS generator
    function* traversal(node) {
        if (node !== null) {
            yield node.value;
            if (node.left !== null) {
                yield* traversal(node.left);
            }
            if (node.right !== null) {
                yield* traversal(node.right);
            }           
        }
    }
    yield * traversal(this.root);
};







let tree1 = new bsTree();
const practiceValues = [3, 15, 4, 99, 34, 65, 1, 12, 66, 14, 45, 32, 89, 77, 20, 25, 30, 5, 10, 63, 0, 56, 22, 38, 94, 48, 57, 69];
console.log('practice values: ' + [...practiceValues]);
console.log('Sort values to find median. Use median value for tree1 root');
const sortedPvals = practiceValues.sort((a, b) => { return a - b; });
console.log(...sortedPvals);
console.log('To find median: findRoot = Math.round(sortedPvals.length / 2)');
const findRoot = Math.round(sortedPvals.length / 2);
console.log('Root = ' + sortedPvals[findRoot]);
tree1.add(sortedPvals[findRoot]);
for (let v in sortedPvals) {
    if (v !== findRoot) {
        tree1.add(sortedPvals[v]);
    }
}
console.log('The tree1\'s count is ' + tree1.count());
console.log(...tree1.values());
console.log('deleting 32 from the tree1.');
tree1.delete(32);
console.log('The tree1\'s count is ' + tree1.count());
console.log('New root and rebalancing tree1. New root is: ' + tree1.root.value);
console.log(...tree1.values());
console.log('Does the tree1 contain a node with the value of 3? ' + tree1.has(3));
console.log('Does the tree1 contain a node with the value of 32? ' + tree1.has(32));
console.log('Attempting to delete a value the tree1 does not contain 1001. ' + tree1.delete(1001));
console.log('');


const strArray = ['Sam', 'Georgia', 'Frank', 'Karen', 'Betty', 'Susan', 'Carol', 'Jasper', 'Violet', 'Samantha', 'Troy', 'Sandy', 'Bob', 'Lisa', 'Joe', 'Greg', 'Alice', 'Carl', 'Victor', 'Jamie', 'Scott', 'Sandra', 'Shannon', 'Ben', 'Angela', 'Toby', 'Denis', 'David', 'Zoe'];
console.log('Will this example work with an array of strings?\n[' + [...strArray] + ']');
const tRoot = Math.round(strArray.length / 2);
const strTree = new bsTree();
strTree.add(strArray[tRoot]);
for (let str in strArray) {
    if (strArray[str] !== strArray[tRoot]) {
        strTree.add(strArray[str]);
    }
}
console.log('The root is ' + strTree.root.value);
console.log('Post Order Trasversal values are: ' + [...strTree.poTraversal()]);
console.log(' ');
console.log('Pre Order Trasversal values are: ' + [...strTree.prTraversal()]);
console.log(' ');
console.log('The In Order Trasversal values are: ' + [...strTree.values()]);
console.log('The tree node count is: ' + strTree.count());
//console.log('Taking a look at the root and what index it has in the printed list, it can be seen that the tree limbs aren\'t balanced.\nLet\'s balance the tree.');
//strTree.balance();
//console.log('The new root is ' + strTree.root.value);
//console.log('The tree values are');
//console.log('The tree node values are: ' + [...strTree.values()]);
//console.log('The tree node count is: ' + strTree.count());
//console.log('');


console.log('But if I sort the array first, I get a different value for the root');
strArray.sort();
console.log(...strArray);
const newStrTree = new bsTree();
const newRoot = Math.round(strArray.length / 2);
console.log('Root index is ' + newRoot);
newStrTree.add(strArray[newRoot]);
console.log('Root after string array has been sorted is ' + newStrTree.root.value);
console.log('Now add the string array to the tree');
for (let b in strArray) {
    if (strArray[b] !== strArray[newRoot]) {
        newStrTree.add(strArray[b]);
    }
}
console.log('After sorting the array the values are the same, but the root node has a different value and the tree is better balanced.\n' + [...newStrTree.values()]);
console.log('Node count is: ' + newStrTree.count());
console.log('Let\'s remove Joe, the tree root, and see what happens.');
newStrTree.delete('Joe');
console.log('After removing Joe from the tree.\n' + [...newStrTree.values()]);
console.log('And the new tree root is ' + newStrTree.root.value);
console.log('Node count is: ' + newStrTree.count());
console.log(' ');
console.log(' ');
newStrTree.poTraversal(newStrTree.root);
console.log(' ');
console.log(' ');
newStrTree.prTraversal(newStrTree.root);