# What is this?

Data Structure for JavaScript

# Installation

`npm i rc-data-structure --save`

# Options

```
import { BinarySearchTree, HeapLibrary, PriorityQueue, SinglyLinkedList, DoublyLinkedList, Stack, Deque } from "rc-data-structure";
```

# Usage 
## BinarySearchTree
```
let bst = new BinarySearchTree(int array);
```
    - keyExist(int key) return boolean
    - search(int key) return node | null
    - insert(int value)
    - deleteNode(int key)
    - printSorted(String "pre" or "in" or "post" or "reverse")

## Stack
```
let stack = new Stack();
```
    - push(T data)
    - peek() return T data
    - pop() return T data


## Deque
```
let deq = new Deque();
```
    - peekFront() return T data | null
    - peekBack() return T data | null
    - enqueueFront(T data)
    - enqueueBack(T data)
    - dequeueFront() return T data | null
    - dequeueBack() return T data | null
    - printDeque()


## HeapLibrary
    - HeapLibrary.buildMaxHeap(int array)
    - HeapLibrary.heapSort(int array)


## PriorityQueue
```
let pq = new PriorityQueue(int array);
```
    - top() return int
    - pop() return int
    - insert(int data)


## SinglyLinkedList
```
let sll = new SinglyLinkedList(T array);
```
    - at(int index) return Node | null
    - preAppend(T data)
    - append(T data)
    - popFront() return int data | null
    - delete(int index)
    - reverse()
    - printList()


## DoublyLinkedList
```
let dll = new DoublyLinkedList(int arr)
```
    - at(int index) return Node | null
    - popFront() return int data | null
    - pop() return data | null
    - append(T data)
    - addNextNode(T data, index)
    - deleteNode(int index)
    - reverse()
    - printList()
