const head = Symbol('head');
const tail = Symbol('tail');

const dLLNode = function (data) {
	this.data = data;
	this.next = null;
	this.previous = null;
};

const dLList = function () {
	this.head = null;
	this.tail = null;
};

dLList.prototype.add = function (data) {
	const newNode = new dLLNode(data);
	if (this.head === null) {
		this.head = newNode;
	} else {
		this.tail.next = newNode;
		newNode.previous = this.tail;
	}

	this.tail = newNode;
};

dLList.prototype.insertBefore = function (data, index) {
	const newNode = new dLLNode(data);
	if (this.head === null) {
		throw new RangeError(`Index ${index} does not exist in the list.`);
	}

	if (index === 0) {
		newNode.next = this.head;
		this.head.previous = newNode;
		this.head = newNode;
	} else {
		let current = this.head;
		let i = 0;
		while ((current.next !== null) && (i < index)) {
			current = current.next;
			i++;
		}
		if (i < index) {
			throw new RangeError(`Index ${index} does not exist in the list.`);
		}
		current.previous.next = newNode;
		newNode.previous = current.previous;
		newNode.next = current;
		current.previous = newNode;
	}
};

dLList.prototype.insertAfter = function (data, index) {
	const newNode = new dLLNode(data);
	if (this.head === null) {
		throw new RangeError(`Index ${index} does not exist in the list.`);
	}

	let current = this.head;
	let i = 0;
	while ((current !== null) && (i < index)) {
		current = current.next;
		i++;
	}

	if (i < index) {
		throw new RangeError(`Index ${index} does not exist in the list.`);
	}

	if (this.tail === current) {
		this.tail = newNode;
	} else {
		current.next.previous = newNode;
		newNode.next = current.next;
	}
	newNode.previous = current;
	current.next = newNode;
};

dLList.prototype.get = function (index) {
	if (index > -1) {
		let current = this.head;
		let i = 0;
		while ((current !== null) && (i < index)) {
			current = current.next;
			i++;
		}
		return current !== null ? current.data : undefined;
	}
	else {
		return undefined;
	}
};

dLList.prototype.indexOf = function (data) {
	let current = this.head;
	let index = 0;
	while (current !== null) {
		if (current.data === data) {
			return index;
		}
		current = current.next;
		index++;
	}
	return - 1;
};

dLList.prototype.find = function (value) {
	let current = this.head;
	while (current !== null) {
		if (value === current.data) {
			return current.data;
		}
		current = current.next;
	}
	return undefined;
};

dLList.prototype.findIndex = function (value) {
	let current = this.head;
	let index = 0;
	while (current !== null) {
		if (value === current.data) {
			return index;
		}

		current = current.next;
		index++;
	}
	return -1;
};

dLList.prototype.remove = function (index) {
	if (this.head === null || index < 0) {
		throw new RangeError(`Index ${index} does not exist in the list.`);
	}
	if (index === 0) {
		const data = this.head.data;
		this.head = this.head.next;
		if (this.head === null) {
			this.tail = null;
		} else {
			this.head.previous = null;
		}
		return data;
	}
	let current = this.head;
	let i = 0;
	while (current !== null && i < index) {
		current = current.next;
		i++;
	}
	if (current !== null) {
		current.previous.next = current.next;
		if (this.tail === current) {
			this.tail = current.previous;
		} else {
			current.next.previous = current.previous;
		}
		return current.data;
	}
	throw new RangeError(`Index ${index} does not exist in the list.`);
};


dLList.prototype.clear = function () {
	this.head = null;
	this.tail = null;
};

dLList.prototype.count = function () {
	if (this.head === null) {
		return 0;
	}
	let current = this.head;
	let count = 0;
	while (current !== null) {
		count++;
		current = current.next;
	}
	return count;
};

dLList.prototype.values = function* () {
	let current = this.head;
	while (current !== null) {
		yield current.data;
		current = current.next;
	}
};

dLList.prototype.reverse = function* () {
	let current = this.tail;
	while (current !== null) {
		yield current.data;
		current = current.previous;
	}
};

dLList.prototype[Symbol.iterator] = function () {
	return this.values();
};

const list = new dLList();
console.log('');
console.log('Double Linked List');
console.log('Adding Sam to the list');
list.add('Sam');
console.log('Adding Sally to the list');
list.add('Sally');
console.log('Adding Thomas to the list');
list.add('Thomas');
console.log('Adding Lisa to the list');
list.add('Lisa');
console.log('List all values');
console.log(...list.values());
console.log('List all values in reverse');
console.log(...list.reverse());
console.log('Get value at index 2');
console.log(list.get(2));
console.log('Count all nodes in list');
console.log(list.count());
console.log('Find Mr.Magoo in list');
console.log('Mr.Magoo is: ' + list.find('Mr.Magoo') + ', so not in the list.');
console.log('Find Thomas in list');
console.log(list.find('Thomas'));
console.log('Find indexOf Thomas');
console.log(list.indexOf('Thomas'));//are both IndexOf and FindIndex needed????
console.log('Find Thomas\' index');
console.log(list.findIndex('Thomas'));
console.log('Remove node at index 2 and List all values');
list.remove(2);
console.log(...list.values());
console.log('List all values after inserting Thomas to index 2');
list.insertAfter('Thomas', 1);
console.log(...list.values());
console.log('List all values after inserting Thomas before index 2');
list.insertBefore('Thomas', 2);
console.log(...list.values());
console.log('Clear the list');
list.clear();
console.log('Get all values after clearing the list');
console.log('Anything left in the list? ' + [...list.values()] + ' Appears to be empty and refernces have been GC\'ed.');
console.log('');

