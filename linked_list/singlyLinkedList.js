import { Node } from "../node.js";

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

export { SinglyLinkedList };
