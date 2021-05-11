class HeapLibrary {
    static left = (i) => 2 * i + 1;
    static right = (i) => 2 * i + 2;
    static parent = (i) => Math.floor((i - 1) / 2);

    static buildMaxHeap = (arr) => {
        let mid = HeapLibrary.parent(arr.length - 1);
        for (let i = mid; i >= 0; i--){
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

export {
    HeapLibrary,
    PriorityQueue
}
