import { Node } from "../node.js";

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

export { Stack };
