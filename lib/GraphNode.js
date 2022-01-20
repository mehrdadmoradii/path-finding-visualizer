const GraphNode = (function() {

    function GraphNode(val) {
        this.depth = 0;
        this.parent = null;
        this.value = val;
        this.childs = [];
    }

    GraphNode.prototype.addChild = function(child) {
        this.childs.push(child);
        child.parent = this;
        child.depth = this.depth+1;
    }

    GraphNode.prototype.getPath = function() {
        const path = [];
        for (let cursor=this; ; cursor=cursor.parent) {
            path.push(cursor.value);
            if (cursor.parent === null) break;
        }
        return path;
    }

    GraphNode.prototype.toString = function() {
        return this.value.toString();
    }

    return GraphNode;

})();

function WeightedGraphNode(val) {
    GraphNode.call(this, val);
    this._cost = 0;
}

WeightedGraphNode.prototype = Object.create(GraphNode.prototype, {
    constructor: {
        configurable: true,
        enumerable: true,
        value: GraphNode,
        writable: true
    }
});

;(function() {
    // const myNode = new GraphNode(22);

    // const myNode1 = new GraphNode(34);
    // const myNode2 = new GraphNode(35);
    // myNode.addChild(myNode1);
    // myNode.addChild(myNode2);

    // const myNode3 = new GraphNode(41);
    // const myNode4 = new GraphNode(43);
    // myNode1.addChild(myNode3);
    // myNode1.addChild(myNode4);

    // const myNode5 = new GraphNode(45);
    // const myNode6 = new GraphNode(47);
    // myNode2.addChild(myNode5);
    // myNode2.addChild(myNode6);


    // console.log(myNode6.getPath())

    // const gn0 = new WeightedGraphNode(20);

    // const myNode1 = new WeightedGraphNode(31);
    // const myNode2 = new WeightedGraphNode(34);

    // gn0.addChild(myNode1);
    // gn0.addChild(myNode2);

    // console.log(myNode1.parent)

    // const mynode = new GraphNode(97);
})()