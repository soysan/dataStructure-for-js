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
            case "pre":     return this.root.printPreOrder();
            case "in":      return this.root.printInOrder();
            case "post":    return this.root.printPostOrder();
            case "reverse": return this.root.printReverseOrder();
            default: return null;
        }
    }
}

export default BinarySearchTree;
