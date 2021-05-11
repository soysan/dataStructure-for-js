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

    printSorted = (key) => {
        switch (key) {
            case "pre":     return this.root.printPreOrder();
            case "in":      return this.root.printInOrder();
            case "post":    return this.root.printPostOrder();
            case "reverse": return this.root.printReverseOrder();
            default: return null;
        }
    }
}

export default BinarySearchTree;
