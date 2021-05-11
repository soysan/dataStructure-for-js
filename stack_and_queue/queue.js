import Node from "../node.js";

class QueueNode extends Node {
    constructor(data) {
        super(data);
        this.prev = null;
    }
}
class Queue {
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
        }
        else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    enqueueBack = (data) => {
        let newNode = new QueueNode(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = this.head;
        }
        else {
            this.tail.next = newNode;
            newNode.next = this.tail;
            this.tail = newNode;
        }
    }

    dequeueFront = () => {
        if (this.head === null) return null;

        let temp = this.head;
        this.head = this.head.next;
        if (this.head === null) this.head.prev = null;
        else this.tail = null;
        return temp.data;
    }

    dequeueBack = () => {
        if (this.head === null) return null;

        let temp = this.tail;
        this.tail = this.tail.prev;

        if (this.tail !== null) this.tail.next = null;
        else this.head = null;
        return temp.data;
    }
}

export { Queue };
