import Node from "./node.js";

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
        for (let i = 1; i < arr.length; i++){
            currNode.next = new dNode(arr[i]);
            currNode.next.prev = currNode;
            currNode = currNode.next;
        }

        this.tail = currNode;
    }

    at = (index) => {
        let iterator = this.head;
        for (let i = 0; i < index; i++){
            iterator = iterator.next;
            if (iterator === null) return null;
        }
        return iterator;
    }

    popFront = () => {
        this.head = this.head.next;
        this.head.prev = null;
    }

    pop = () => {
        this.tail = this.tail.prev;
        this.tail.next = null;
    }

    append = (newNode) => {
        this.tail.next = newNode;
        newNode.next = null;
        newNode.prev = this.tail;
        this.tail = newNode;
    }

    addNextNode = (node, newNode) => {
        let temp = node.next;
        node.next = newNode;
        newNode.next = temp;
        newNode.prev = node;

        if (node === this.tail) this.tail = newNode;
        else temp.prev = newNode;
    }

    deleteNode = (node) => {
        if (node === this.tail) return this.pop();
        if (node === this.head) return this.popFront();

        node.prev.next = node.next;
        node.next.prev = node.prev;
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

console.log(new dNode(10));
