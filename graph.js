const generateGraphBtn = document.querySelector('#generate-graph-btn');
const startBtn =  document.querySelector('#algorithm-selector-btn');

const width = (window.innerWidth), height = (window.innerHeight);

let traversalStarted = false;

/********************************************************************
 ***                       Initial setup                          ***
 ********************************************************************/

window.addEventListener('load', () => {
   popluateNodes();
   generateGraph();
});

/********************************************************************
 ***                      Event-Listeners                         ***
 ********************************************************************/

startBtn.addEventListener('click', () => {
    if (traversalStarted) 
        location.reload();
    traversalStarted = true;
    document.querySelector('.algorithm-selector-container').style.visibility = 'hidden';
    const selector = document.querySelector('#algorithm-selector');
    switch (selector.value) {
        case 'bfs':
            BFS();
            break;
        case 'dfs':
            DFS();
            break;
        case 'dijkstra':
            Dijkstra();
            break;
        case 'greedy':
            GreedyBFS();
            break;
        case 'astar':
            AStar();
            break;
    }
})

generateGraphBtn.addEventListener('click', () => {
    if (traversalStarted) 
        location.reload();
    generateGraph();
});


/********************************************************************
 ***                   Graph creator functions                    ***
 ********************************************************************/

const numberOfNodes = 15;
const spaceBetweenNodes = -1300;

let nodes = [];
let links = [];

function popluateNodes() {
    for (let i=0; i<numberOfNodes; i++) {
        nodes.push({});
    }
}

function populateLinks() {
    for (let i=0; i<numberOfNodes; i++) {
        const numberOfEdges = Math.floor(Math.random()*3)+1;
        for (let j=0; j<numberOfEdges; j++) {
            let target = Math.floor(Math.random() * 8)+1;
            while (target === i) target = Math.floor(Math.random() * numberOfEdges-1)+1;
            while (connectionExist(i, target)) target = Math.floor(Math.random() * 8)+1;
            links.push({source: i, target, vertices: i+":"+target})
        }
    } 
}

function generateGraph() {
    links = [];
    populateLinks();
    d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(spaceBetweenNodes))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('link', d3.forceLink().links(links))
        .on('tick', tick);
}

function updateLinks() {
    d3.select('.links')
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('x1', function(d) {
            return d.source.x
        })
        .attr('y1', function(d) {
            return d.source.y
        })
        .attr('x2', function(d) {
            return d.target.x
        })
        .attr('y2', function(d) {
            return d.target.y
        })
        .attr('data-vertices', function(d) {
            return d.vertices
        });
}

function updateNodes() {
	d3.select('.nodes')
		.selectAll('circle')
		.data(nodes)
		.join('circle')
        .attr('r', 10)
		.attr('cx', function(d) {
			return d.x
		})
		.attr('cy', function(d) {
			return d.y
		})
		.attr('dy', function(d) {
			return 5
		})
        .attr('id', function(d, i) {
            return 'node-' + i;
        })
}

function tick() {
    updateLinks();
    updateNodes();
}

/********************************************************************
 ***                      Utility functions                       ***
 ********************************************************************/

function getNode(i) {
    return document.getElementById('node-'+i);
}

function getVertices(i) {
    const lines = document.querySelectorAll('line');
    const result = [];
    for (let line of lines) {
        const vertices = line.getAttribute('data-vertices').split(':').map(v => parseInt(v));
        if (vertices.includes(i)) result.push(line);
    }
    return result;
}

function getVertex(i, j) {
    const lines = document.querySelectorAll('line');
    for (let line of lines) {
        const vertices = line.getAttribute('data-vertices').split(':').map(v => parseInt(v));
        if (vertices.includes(i) && vertices.includes(j)) {
            return line;
        }
    }
}

function getNeighbors(i) {
    const lines = document.querySelectorAll('line');
    const result = [];
    for (let line of lines) {
        const vertices = line.getAttribute('data-vertices').split(':').map(v => parseInt(v));
        if (vertices.includes(i)) {
            for (let v of vertices) 
                if (v!=i && !result.includes(v))
                    result.push(v);
        }
    }
    return result; 
}

function connectionExist(i, j) {
    for (let link of links) {
        if (link.source === i && link.target === j)
            return true;
        if (link.source === j && link.target === i)
            return true;
    }
    return false;
}

function randomBetweenRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomExcept(min, max, exception) {
    let random = randomBetweenRange(min, max);
    while (random === exception) random = randomBetweenRange(min, max);
    return random;
}

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

function changeVertexColorToVisit(i, j) {
    const vertex = getVertex(i, j);
    vertex.style.stroke = 'red';
    vertex.style.opacity = .7;
}

function changeVertexColorToPath(i, j) {
    const vertex = getVertex(i, j);
    vertex.style.stroke = 'blue';
}

function manhattanDistance(i, j) {
    const nodeI = getNode(i);
    const nodeJ = getNode(j);

    const distanceX = Math.abs(nodeI.getAttribute('cx') - nodeJ.getAttribute('cx'));
    const distanceY = Math.abs(nodeI.getAttribute('cy') - nodeJ.getAttribute('cy'));
    return (distanceX+distanceY);
}

function elucidateDistance(i, j) {
    const nodeI = getNode(i);
    const nodeJ = getNode(j);

    const distanceX = nodeI.getAttribute('cx') - nodeJ.getAttribute('cx');
    const distanceY = nodeI.getAttribute('cy') - nodeJ.getAttribute('cy');
    return Math.sqrt( Math.pow(distanceX, 2) + Math.pow(distanceY, 2) );
}

/********************************************************************
 ***                       Graph functions                        ***
 ********************************************************************/


const BFS = async () => {
    const start = randomBetweenRange(0,numberOfNodes-1);
    const stop = randomExcept(0, numberOfNodes-1, start);

    getNode(start).style.fill = 'orange';
    getNode(start).style.opacity = 1;
    getNode(stop).style.fill = 'green';
    getNode(stop).style.opacity = 1;

    const queue = new QueueFrontier();
    queue.enqueue(new GraphNode(start));
    
    const visited = [];
    
    while (queue.length !== 0) {
        await sleep(450)

        const current = queue.dequeue();
        visited.push(current.value);

        if (current.parent !== null) {
            changeVertexColorToVisit(current.value, current.parent.value);
        }

        if (current.value === stop) {
            let cursor = current;
            while (cursor.parent!==null) {
                changeVertexColorToPath(cursor.value, cursor.parent.value);
                cursor = cursor.parent;
            }
            break;
        }

        if (current.parent!==null) 
            getNode(current).style.fill = 'red';

        for (let neighbor of getNeighbors(current.value))
            if (!visited.includes(neighbor)) {
                const child = new GraphNode(neighbor);
                current.addChild(child);
                queue.enqueue(child)
            }
     
    }
}

const DFS = async () => {
    const start = randomBetweenRange(0,numberOfNodes-1);
    const stop = randomExcept(0, numberOfNodes-1, start);

    getNode(start).style.fill = 'orange';
    getNode(start).style.opacity = 1;
    getNode(stop).style.fill = 'green';
    getNode(stop).style.opacity = 1;

    const stack = new StackFrontier();
    stack.push(new GraphNode(start));

    const visited = [];

    while (stack.size() !== 0) {
        await sleep(400)
        const current = stack.pop();
        visited.push(current.value);

        if (current.parent!==null) {
            changeVertexColorToVisit(current.value, current.parent.value);
        }

        if (current.value === stop) {
            let cursor = current;
            while (cursor.parent!==null) {
                changeVertexColorToPath(cursor.value, cursor.parent.value);
                cursor = cursor.parent;
            }
            break;
        }

        if (current.parent!==null)
            getNode(current.value).style.fill = 'red';


        for (let neighbor of getNeighbors(current.value).reverse())
            if (!visited.includes(neighbor)) {
                const child = new GraphNode(neighbor);
                current.addChild(child);
                stack.push(child);
            }
     
    }
}

const GreedyBFS = async () => {
    const start = randomBetweenRange(0,numberOfNodes-1);
    const stop = randomExcept(0, numberOfNodes-1, start);

    getNode(start).style.fill = 'orange';
    getNode(start).style.opacity = 1;
    getNode(stop).style.fill = 'green';
    getNode(stop).style.opacity = 1;

    const priorityQueue = new HeapPriorityQueue();
    priorityQueue.add(0, new GraphNode(start));

    const visited = [];

    while(!priorityQueue.isEmpty()) {
        await sleep(400);
        const currentPQItem = priorityQueue.removeMin();
        const current = currentPQItem.value;
        visited.push(current.value);

        if (current.parent!==null) {
            changeVertexColorToVisit(current.value, current.parent.value);
        }

        if (current.value === stop) {
            let cursor = current;
            while (cursor.parent!==null) {
                changeVertexColorToPath(cursor.value, cursor.parent.value);
                cursor = cursor.parent;
            }
            break;
        }

        if (current.parent!==null)
            getNode(current.value).style.fill = 'red';
           
        for (let neighbor of getNeighbors(current.value))
            if (!visited.includes(neighbor)) {
                const heuristic = elucidateDistance(neighbor, stop);
                const newChild = new GraphNode(neighbor);
                current.addChild(newChild);
                priorityQueue.add(heuristic, newChild);
            }
        
    }
}

const Dijkstra = async () => {
    const start = randomBetweenRange(0,numberOfNodes-1);
    const stop = randomExcept(0, numberOfNodes-1, start);

    getNode(start).style.fill = 'orange';
    getNode(start).style.opacity = 1;
    getNode(stop).style.fill = 'green';
    getNode(stop).style.opacity = 1;

    const priorityQueue = new HeapPriorityQueue();
    priorityQueue.add(0, new WeightedGraphNode(start));

    const visited = [];

    while(!priorityQueue.isEmpty()) {
        await sleep(400);
        const currentPQItem = priorityQueue.removeMin();
        const current = currentPQItem.value;
        visited.push(current.value);

        if (current.parent!==null) {
            changeVertexColorToVisit(current.value, current.parent.value);
        }

        if (current.value === stop) {
            let cursor = current;
            while (cursor.parent!==null) {
                changeVertexColorToPath(cursor.value, cursor.parent.value);
                cursor = cursor.parent;
            }
            break;
        }

        if (current.parent!==null)
            getNode(current.value).style.fill = 'red';

        for (let neighbor of getNeighbors(current.value))
            if (!visited.includes(neighbor)) {
                const cost = elucidateDistance(current.value, neighbor);
                const newChild = new WeightedGraphNode(neighbor);
                newChild._cost = current._cost + cost;
                current.addChild(newChild);
                priorityQueue.add(newChild._cost, newChild);
            }

    }
}

const AStar = async () => {
    const start = randomBetweenRange(0,numberOfNodes-1);
    const stop = randomExcept(0, numberOfNodes-1, start);

    getNode(start).style.fill = 'orange';
    getNode(start).style.opacity = 1;
    getNode(stop).style.fill = 'green';
    getNode(stop).style.opacity = 1;

    const priorityQueue = new HeapPriorityQueue();
    priorityQueue.add(0, new WeightedGraphNode(start));

    const visited = [];

    while(!priorityQueue.isEmpty()) {
        await sleep(400);
        const currentPQItem = priorityQueue.removeMin();
        const current = currentPQItem.value;
        visited.push(current.value);

        if (current.parent!==null) {
            changeVertexColorToVisit(current.value, current.parent.value);
        }

        if (current.value === stop) {
            let cursor = current;
            while (cursor.parent!==null) {
                changeVertexColorToPath(cursor.value, cursor.parent.value);
                cursor = cursor.parent;
            }
            break;
        }

        if (current.parent!==null)
            getNode(current.value).style.fill = 'red';

        for (let neighbor of getNeighbors(current.value))
            if (!visited.includes(neighbor)) {
                const cost = elucidateDistance(current.value, neighbor);
                const newChild = new WeightedGraphNode(neighbor);
                newChild._cost = current._cost + cost;
                const heuristic = elucidateDistance(neighbor, stop) + newChild._cost;
                current.addChild(newChild);
                priorityQueue.add(heuristic, newChild);
            }

    }
}