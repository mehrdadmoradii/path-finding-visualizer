const QueueFrontier = (function() {

    const queue = []; // private field

    /**
     * Constructor
     */
    function QueueFrontier() {
    }

    /**
     * Returns the number of items in the queue.
     * 
     * @returns 
     */
    QueueFrontier.prototype.size = function() {
        return queue.length;
    }

    /**
     * Returns true is queue is empty.
     * 
     * @returns 
     */
    QueueFrontier.prototype.isEmpty = function() {
        return queue.length === 0;
    }

    /**
     * Returns but not removes the item in front of the queue.
     * 
     * @returns 
     */
    QueueFrontier.prototype.peek = function() {
        return queue[0];
    }

    /**
     * Returns true if the given item exist in the queue.
     * 
     * @param {*} val 
     * @returns 
     */
    QueueFrontier.prototype.containsValue = function(val) {
        for (let item of queue) 
            if (item === val)
                return true;
        return false;
    }

    /**
     * Pushs a given item in back of the queue.
     * 
     * @param {*} elem 
     */
    QueueFrontier.prototype.enqueue = function(elem) {
        queue.push(elem);
    }

    /**
     * Removes and returns the item in front of the queue.
     * 
     * @returns 
     */
    QueueFrontier.prototype.dequeue = function() {
        if (this.isEmpty())
            throw new Error('queue is empty!');
        return queue.shift();
    }

    return QueueFrontier;

})();

// (function() {
//     const myQueue = new QueueFrontier();
//     myQueue.enqueue(1);
//     myQueue.enqueue(2);
//     myQueue.enqueue(3);
//     myQueue.enqueue(4);

//     // console.log(myQueue.containsValue(1))
//     // console.log(myQueue.containsValue(2))
//     // console.log(myQueue.containsValue(4))
//     // console.log(myQueue.containsValue(6))
//     // console.log(myQueue.containsValue(0))
//     // console.log(myQueue.peek())
//     // console.log(myQueue.peek())
//     // while (!myQueue.isEmpty()) {
//     //     console.log(myQueue.dequeue());
//     // }
// })()