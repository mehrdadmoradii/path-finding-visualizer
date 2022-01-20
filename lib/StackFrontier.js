const StackFrontier = (function() {

    const stack = []; // private field

    /**
     * Constructor
     */
    function StackFrontier() {
    }

    /**
     * Returns the number of elements in the stack.
     * 
     * @returns 
     */
    StackFrontier.prototype.size = function() {
        return stack.length;
    }

    /**
     * Returns true if stack is empty.
     * 
     * @returns 
     */
    StackFrontier.prototype.isEmpty = function() {
        return stack.length === 0;
    }

    /**
     * Returns true if stack contains the given value.
     * 
     * @param {*} val 
     * @returns 
     */
    StackFrontier.prototype.containsValue = function(val) {
        for (let item of stack) 
            if (item === val)
                return true;
        return false;
    }

    /**
     * Returns but not removes the element on top of the stack.
     * 
     * @returns 
     */
    StackFrontier.prototype.peek = function() {
        if (this.isEmpty())
            throw new Error('Stack is empty');
        return stack[stack.length-1];
    }

    /**
     * Pushs the element on top of the stack.
     * 
     * @param {*} val 
     */
    StackFrontier.prototype.push = function(val) {
        stack.push(val);
    }

    /**
     * Returns and removes the element from top of the stack.
     * 
     * @param {*} val 
     * @returns 
     */
    StackFrontier.prototype.pop = function(val) {
        if (this.isEmpty())
            throw new Error('Stack is empty');
        return stack.pop();
    }

    return StackFrontier;

})();

// (function() {
//     const myFrontier = new StackFrontier();
//     myFrontier.push(1);
//     myFrontier.push(2);
//     myFrontier.push(3);
//     myFrontier.push(4);
//     myFrontier.push(5);
//     myFrontier.push(6);

//     // console.log(myFrontier.peek())
//     console.log(myFrontier.pop())


//     // console.log(myFrontier.size())
//     // for (let i = 1; i<7; i++)
//         // console.log(myFrontier.containsValue(i))
//     // while (!myFrontier.isEmpty()) 
//     //     console.log(myFrontier.pop())
// })()