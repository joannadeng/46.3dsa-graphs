class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let vertex of vertexArray) {
      this.nodes.add(vertex)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if(v1.adjacent.has(v2)) v1.adjacent.delete(v2);
    if(v2.adjacent.has(v1)) v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if(this.nodes.has(vertex)) this.nodes.delete(vertex);
    for(let node in this.nodes) {
      if (node.adjacent.has(vertex)) node.adjacent.delete(node)
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function traverse(vertex) {
      // base case
      if (!vertex) {
        return null;
      }
      // visit node
      visited.add(vertex);
      result.push(vertex.value);

      // visit neighbors
      vertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          return traverse(neighbor);
        }
      });

      // for(let v of vertex.adjacent){  ??
      //   if(!visited.has(v)){
      //     return traverse(v)
      //   }
      // }
    }

    traverse(start);

    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const toVisitQueue = [start];
    const seen = new Set();
    const result = [];
    let current;

    seen.add(start);

    while(toVisitQueue.length){
      current = toVisitQueue.shift();
      result.push(current.value);
      
      current.adjacent.forEach(neighbor => {
        if(!seen.has(neighbor)){
          seen.add(neighbor);
          toVisitQueue.push(neighbor)
        }
      })
    }
    return result;
  }
}

module.exports = {Graph, Node}