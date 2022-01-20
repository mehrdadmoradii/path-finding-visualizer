const PQNode = (function() {

    function PQNode(key, value) {
        this.key = key;
        this.value = value;
    }

    PQNode.prototype.valueOf = function() {
        return this.key;
    }

    return PQNode;

})();

const HeapPriorityQueue = (function() {

    /**
     * Constructor
     */
    function HeapPriorityQueue() {
        this._heap = [];
    }

    HeapPriorityQueue.prototype.left = function(i) {
        return (i*2)+1;
    }

    HeapPriorityQueue.prototype.right = function(i) {
        return (i*2)+2;
    }

    HeapPriorityQueue.prototype.parent = function(i) {
        return Math.floor( (i-1) / 2 ); 
    }

    HeapPriorityQueue.prototype._hasLeft = function(i) {
        return this.left(i) < this._heap.length;
    }

    HeapPriorityQueue.prototype._hasRight = function(i) {
        return this.right(i) < this._heap.length;
    }

    HeapPriorityQueue.prototype._swap = function(i, j) {
        const temp = this._heap[i];
        this._heap[i] = this._heap[j];
        this._heap[j] = temp;
    }

    HeapPriorityQueue.prototype._upheap = function(i) {
        if (this.parent(i) >= 0) {
            const parent = this.parent(i);
            if (this._heap[i] < this._heap[parent]) {
                this._swap(i, parent);
                this._upheap(parent);
            }
        }
    }

    HeapPriorityQueue.prototype._downheap = function(i) {
        if (this._hasLeft(i)) {
            const leftChild = this.left(i);
            let smallerChild = leftChild;
            if (this._hasRight(i)) {
                const right = this.right(i);
                if (this._heap[right] < this._heap[smallerChild]) {
                    smallerChild = right;
                }
            }
            if (this._heap[i] > this._heap[smallerChild]) {
                this._swap(i, smallerChild);
                this._downheap(smallerChild);
            }
        }
    }

    /*************************************************
     *                 Public Methods
     *************************************************/

    /**
     * Returns the number of items in the queue.
     * 
     * @returns 
     */
    HeapPriorityQueue.prototype.size = function() {
        return this._heap.length;
    }

    /**
     * Returns true if queue is empty.
     * 
     * @returns 
     */
    HeapPriorityQueue.prototype.isEmpty = function() {
        return this._heap.length === 0;
    }

    /**
     * Adds the given key-value pair to the queue.
     * 
     * @param {*} key 
     * @param {*} value 
     */
    HeapPriorityQueue.prototype.add = function(key, value) {
        const newNode = new PQNode(key, value);
        this._heap.push(newNode);
        this._upheap(this._heap.length-1);
    }

    /**
     * Returns the element with the least key from the queue.
     * 
     * @returns 
     */
    HeapPriorityQueue.prototype.min = function() {
        if (this.isEmpty())
            throw new Error('Priorityqueue is empty!');
        return this._heap[0];
    }

    /**
     * Returns and removes the element with the least key from the queue.
     * 
     * @returns 
     */
    HeapPriorityQueue.prototype.removeMin = function() {
        if (this.isEmpty())
            throw new Error('Priorityqueue is empty!');
        this._swap(0, this._heap.length-1); // change first and last item
        const min = this._heap.pop();
        this._downheap(0);
        return min;
    }

    return HeapPriorityQueue;

})();

// (function() {
//     const mypq = new HeapPriorityQueue();

    
//     for (let i=0; i<20; i++) {
//         const random = Math.floor(Math.random()*100) -25;
//         mypq.add(random, `${random} has value ${random}`);
//     }

//     console.log(mypq.min() === mypq.min())

//     while (!mypq.isEmpty()) {
//         console.log(mypq.removeMin())
//     }

//     try {
//         mypq.removeMin();
//     } catch(e) {console.log('remove min is working')};
//     try {
//         mypq.min();
//     } catch(e) {console.log('min is working')};

// })()