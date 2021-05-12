import { BinarySearchTree } from "./binary_tree/binaryTree.js";
import { HeapLibrary, PriorityQueue } from "./binary_tree/heap.js";
import { SinglyLinkedList } from "./linked_list/singlyLinkedList.js";
import { DoublyLinkedList } from "./linked_list/doublyLinkedList.js";
import { Stack } from "./stack_and_queue/stack.js";
import { Deque } from "./stack_and_queue/deque.js";

let arr = [2, 3, 5, 6, 7, 8];
let binTree = new BinarySearchTree(arr);
let maxHeap = HeapLibrary.buildMaxHeap(arr)
// console.log(maxHeap);
// console.log(binTree)
let pq = new PriorityQueue(arr);
// console.log(pq.top());
let sll = new SinglyLinkedList(arr);

// sll.append(5);
// console.log(sll.popFront());
// sll.preAppend(2);
// sll.delete(1);
// console.log(sll.at(1));
// sll.printList();

let dll = new DoublyLinkedList(arr);
// console.log(dll.at(2));
// dll.append(10);
// dll.addNextNode(44, 3);
// dll.deleteNode(2);
// dll.pop();
// dll.popFront();
// dll.reverse();
// dll.printList();

let queue = new Deque();
// queue.enqueueFront(1);
// queue.enqueueFront(2);
// queue.enqueueFront(3);
queue.enqueueBack(5)
queue.enqueueBack(4)
queue.enqueueBack(3)
queue.enqueueBack(2)
queue.enqueueBack(1)
console.log(queue.printDeque());
