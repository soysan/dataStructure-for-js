import { Node } from "./node.js";

class BinaryTree {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    printPreOrder = () => {
        this.preOrderWalk(this);
    }

    printInOrder = () => {
        this.inOrderWalk(this);
    }

    printPostOrder = () => {
        this.postOrderWalk(this);
    }

    printReverseOrder = () => {
        this.reverseOrderWalk(this);
    }

    preOrderWalk = (root) => {
        if (root !== null) {
            console.log(root.data);
            this.preOrderWalk(root.left);
            this.preOrderWalk(root.right);
        }
    }

    inOrderWalk = (root) => {
        if (root !== null) {
            this.inOrderWalk(root.left);
            console.log(root.data);
            this.inOrderWalk(root.right);
        }
    }

    postOrderWalk = (root) => {
        if (root !== null) {
            this.postOrderWalk(root.left);
            this.postOrderWalk(root.right);
            console.log(root.data);
        }
    }

    reverseOrderWalk = (root) => {
        if (root !== null) {
            this.inOrderWalk(root.right);
            console.log(root.data);
            this.inOrderWalk(root.left);
        }
    }
}

class BinarySearchTree {
    constructor(arrList) {
        let sortedList = arrList.sort((a, b) => a - b);
        this.root = BinarySearchTree.sortedArrayToBST(sortedList);
    }

    static sortedArrayToBST = (array) => {
        if (array.length === 0) return null;
        return BinarySearchTree.sortedArrayToBSTHelper(array, 0, array.length - 1);
    }

    static sortedArrayToBSTHelper = (arr, start, end) => {
        if (start === end) return new BinaryTree(arr[start], null, null);

        let mid = Math.floor((start + end) / 2);

        let left = null;
        if (mid - 1 >= start) left = BinarySearchTree.sortedArrayToBSTHelper(arr, start, mid - 1);
        let right = null;
        if (mid + 1 <= end) right = BinarySearchTree.sortedArrayToBSTHelper(arr, mid + 1, end);

        let root = new BinaryTree(arr[mid], left, right);
        return root;
    }

    keyExist = (key) => {
        let iterator = this.root;
        while (iterator !== null) {
            if (iterator.data === key) return true;
            iterator = iterator.data > key ? iterator.left : iterator.right;
        }
        return false;
    }

    search = (key) => {
        let iterator = this.root;
        while (iterator !== null) {
            if (iterator.data === key) return iterator;
            iterator = iterator.data > key ? iterator.left : iterator.right;
        }
        return null;
    }

    insert = (value) => {
        if (this.root === null) return null;

        let iterator = this.root;
        let node = new BinaryTree(value, null, null);
        while (iterator !== null) {
            if (iterator.data > value && iterator.left === null) iterator.left = node;
            else if (iterator.data < value && iterator.right === null) iterator.right = node;
            iterator = iterator.data > value ? iterator.left : iterator.right;
        }
        return this.root;
    }

    transplant = (parent, node, target) => {
        if (parent === null) this.root = target;
        else if (parent.left === node) parent.left = target;
        else parent.right = target;
    }

    deleteNode = (key) => {
        if (this.root === null) return null;
        let node = this.search(key);
        if (!this.keyExist(key)) return this.root;

        let parent = this.findParent(node);
        if (node.left === null) this.transplant(parent, node, node.right);
        else if (node.right === null) this.transplant(parent, node, node.left);
        else {
            let successor = this.findSuccessor(node);
            let successorParent = this.findParent(successor);

            if (successor !== node.right) {
                this.transplant(successorParent, successor, successor.right);
                successor.right = node.right;
            }

            this.transplant(parent, node, successor);
            successor.left = node.left;
        }
    }

    findParent = (node) => {
        let iterator = this.root;
        let parent = this.root;
        while (iterator !== null) {
            parent = iterator;
            iterator = iterator.data > node.data ? iterator.left : iterator.right;
        }
        return parent;
    }

    findSuccessor = (node) => {
        let targetNode = node;
        if (targetNode === null) return null;
        if (targetNode.right !== null) return this.minimumNode(targetNode.right);

        let successor = null;
        let iterator = this.root;

        while (iterator !== null) {
            if (targetNode.data === iterator.data) return successor;
            if (targetNode.data < iterator.data && (successor === null || iterator.data < successor.data)) successor = iterator.left;
            iterator = targetNode.data < iterator.data ? iterator.left : iterator.right;
        }
        return successor;
    }

    minimumNode = (node) => {
        let iterator = node;
        while (iterator !== null && iterator.left !== null) iterator = iterator.left;
        return iterator;
    }

    printSorted = (key) => {
        switch (key) {
            case "pre": return this.root.printPreOrder();
            case "in": return this.root.printInOrder();
            case "post": return this.root.printPostOrder();
            case "reverse": return this.root.printReverseOrder();
            default: return null;
        }
    }
}
class HeapLibrary {
    static left = (i) => 2 * i + 1;
    static right = (i) => 2 * i + 2;
    static parent = (i) => Math.floor((i - 1) / 2);

    static buildMaxHeap = (arr) => {
        let mid = HeapLibrary.parent(arr.length - 1);
        for (let i = mid; i >= 0; i--) {
            HeapLibrary.maxHeapify(arr, arr.length - 1, i);
        }
        return arr;
    }

    static maxHeapify = (arr, heapEnd, i) => {
        let l = HeapLibrary.left(i);
        let r = HeapLibrary.right(i);

        let biggest = i;
        if (l <= heapEnd && arr[l] > arr[biggest]) biggest = l;
        if (r <= heapEnd && arr[r] > arr[biggest]) biggest = r;

        if (biggest !== i) {
            [arr[i], arr[biggest]] = [arr[biggest], arr[i]];
            return HeapLibrary.maxHeapify(arr, heapEnd, biggest);
        }
    }

    static heapSort = (arr) => {
        Heap.buildMaxHeap(arr);
        let heapEnd = arr.length - 1;

        while (heapEnd > 0) {
            [arr[heapEnd], arr[0]] = [arr[0], arr[heapEnd]];
            heapEnd--;
            Heap.maxHeapify(arr, heapEnd, 0);
        }
        return arr;
    }
}

class PriorityQueue {
    constructor(arr) {
        this.maxHeap = [...arr];
        HeapLibrary.buildMaxHeap(this.maxHeap);
    }

    top = () => this.maxHeap[0];

    pop = () => {
        let poped = this.maxHeap[0];
        this.maxHeap[0] = this.maxHeap[this.maxHeap.length - 1];
        this.maxHeap.pop();
        HeapLibrary.maxHeapify(this.maxHeap, this.maxHeap.length - 1, 0);
        return poped;
    }

    insert = (node) => {
        this.maxHeap.push(node);
        let len = this.maxHeap.length - 1;
        let parent = HeapLibrary.parent(len);
        while (parent >= 0 && this.maxHeap[parent] < node) {
            [this.maxHeap[len], this.maxHeap[parent]] = [this.maxHeap[parent], this.maxHeap[len]];
            len = parent;
            parent = HeapLibrary.parent(len);
        }
    }
}

class dNode extends Node {
    constructor(data) {
        super(data);
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor(arr) {
        if (arr.length <= 0) {
            this.head = new dNode(null);
            this.tail = this.head;
            return;
        }

        this.head = new dNode(arr[0]);
        let currNode = this.head;
        for (let i = 1; i < arr.length; i++) {
            currNode.next = new dNode(arr[i]);
            currNode.next.prev = currNode;
            currNode = currNode.next;
        }

        this.tail = currNode;
    }

    at = (index) => {
        let iterator = this.head;
        for (let i = 0; i < index; i++) {
            iterator = iterator.next;
            if (iterator === null) return null;
        }
        return iterator;
    }

    popFront = () => {
        let temp = this.head;
        this.head = this.head.next;
        this.head.prev = null;
        return temp.data;
    }

    pop = () => {
        let temp = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
        return temp.data;
    }

    append = (data) => {
        let newNode = new dNode(data);
        this.tail.next = newNode;
        newNode.next = null;
        newNode.prev = this.tail;
        this.tail = newNode;
    }

    addNextNode = (data, index) => {
        let newNode = new dNode(data);
        let preNode = this.at(index);
        let temp = preNode.next;
        preNode.next = newNode;
        newNode.next = temp;
        newNode.prev = preNode;

        if (preNode === this.tail) this.tail = newNode;
        else temp.prev = newNode;
    }

    deleteNode = (index) => {
        let target = this.at(index);
        if (!target) return null;
        if (target === this.tail) return this.pop();
        if (target === this.head) return this.popFront();

        target.prev.next = target.next;
        target.next.prev = target.prev;
    }

    reverse = () => {
        let reverse = this.tail;
        let iterator = this.tail.prev;

        let currNode = reverse;
        while (iterator !== null) {
            currNode.next = iterator;

            iterator = iterator.prev;
            if (iterator !== null) iterator.next = null;

            currNode.next.prev = currNode;
            currNode = currNode.next;
        }

        this.tail = currNode;
        this.head = reverse;
        this.head.prev = null;
    }

    printList = () => {
        let iterator = this.head;
        let results = "";
        while (iterator !== null) {
            results += iterator.data + " ";
            iterator = iterator.next;
        }
        console.log(results);
    }
}

class sNode extends Node {

    addNextNode(newNode) {
        let temp = this.head;
        this.next = newNode;
        newNode.next = temp;
    }
}

class SinglyLinkedList {
    constructor(arr) {
        this.head = arr.length > 0 ? new sNode(arr[0]) : new sNode(null);

        let currNode = this.head;
        for (let i = 1; i < arr.length; i++){
            currNode.next = new sNode(arr[i]);
            currNode = currNode.next;
        }
    }

    at = index => {
        let iterator = this.head;
        for (let i = 0; i < index; i++){
            iterator = iterator.next;
            if (iterator == null) return null;
        }
        return iterator;
    }

    preAppend = data => {
        let newNode = new sNode(data);
        newNode.next = this.head;
        this.head = newNode;
    }

    append = data => {
        let newNode = new sNode(data);
        let iterator = this.head;
        while (iterator.next !== null) {
            iterator = iterator.next;
        }
        iterator.next = newNode;
    }

    popFront = () => {
        let temp = this.head;
        this.head = this.head.next;
        return temp.data;
    }

    delete = (index) => {
        if (index === 0) return this.popFront();

        let iterator = this.head;
        for (let i = 0; i < index - 1; i++){
            if (iterator.next === null) return null;
            iterator = iterator.next;
        }
        iterator.next = iterator.next.next;
    }

    reverse = () => {
        if (this.head === null || this.head.next === null) return;

        let reverse = this.head;
        this.head = this.head.next;
        reverse.next = null;

        while (this.head !== null) {
            let temp = this.head;
            this.head = this.head.next;
            temp.next = reverse;
            reverse = temp;
        }

        this.head = reverse;
    }

    printList = () => {
        let iterator = this.head;
        let results = "";
        while (iterator !== null) {
            results += iterator.data + " ";
            iterator = iterator.next;
        }
        console.log(results);
    }
}

class QueueNode extends Node {
    constructor(data) {
        super(data);
        this.prev = null;
    }
}
class Deque {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    peekFront = () => {
        if (this.head === null) return null;
        return this.head.data;
    }

    peekBack = () => {
        if (this.tail === null) return null;
        return this.tail.data;
    }

    enqueueFront = (data) => {
        let newNode = new QueueNode(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = this.head;
            return;
        }
        else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
            return;
        }
    }

    enqueueBack = (data) => {
        let newNode = new QueueNode(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = this.head;
            return;
        }
        else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
            return;
        }
    }

    dequeueFront = () => {
        if (this.head === null) return null;

        let temp = this.head;
        this.head = this.head.next;
        if (this.head === null) this.head.prev = null;
        else this.tail = null;
        return temp
    }

    dequeueBack = () => {
        if (this.head === null) return null;

        let temp = this.tail;
        this.tail = this.tail.prev;

        if (this.tail !== null) this.tail.next = null;
        else this.head = null;
        return temp;
    }

    printDeque = () => {
        if (this.head === null) return null;
        let iterator = this.head;
        let results = "";
        while (iterator !== this.tail) {
            results += iterator.data + ' ';
            iterator = iterator.next;
        }
        results += iterator.data;
        return results;
    }
}

class Stack {
    constructor() {
        this.head = null;
    }

    push = (data) => {
        let temp = this.head;
        this.head = new Node(data);
        this.head.next = temp;
    }

    peek = () => {
        if (this.head === null) return null;
        return this.head.data;
    }

    pop = () => {
        if (this.head === null) return null;
        let temp = this.head;
        this.head = this.head.next;
        return temp.data;
    }
}

module.exports = {
    BinarySearchTree,
    HeapLibrary,
    PriorityQueue,
    DoublyLinkedList,
    SinglyLinkedList,
    Deque,
    Stack,
}
