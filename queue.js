import Node from "./node.js";

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

    enqueue = (data) => {
        if (this.head === null) {
            this.head = new Node(data);
        }
        else if (this.tail === null) {
            this.tail = new Node(data);
            this.head.next = this.tail;
        }
        else {
            this.tail.next = new Node(data);
            this.tail = this.tail.next;
        }
    }

    dequeue = () => {
        if (this.head === null) return null;
        let temp = this.head;

        if (this.head.next === null) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.head = this.head.next;
        }

        return temp.data;
    }
}
