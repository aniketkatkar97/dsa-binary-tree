function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

let arr = [
  9, 8, 7, 4, 5, 6, -1, -3, -2, 2, 3, 1, -10, -6, -8, -5, -7, 19, 45, -4, 56,
  85, 74, -9, 12, 16, -15, 22, -21,
];

//function to add nodes to the binary tree
//Approach for construction of a tree with minimum levels possible
arr.sort((x, y) => x - y);
const addNode = (arr, start, end) => {
  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);
    let newNode = new Node(arr[mid]);
    newNode.left = addNode(arr, start, mid - 1, newNode);
    newNode.right = addNode(arr, mid + 1, end, newNode);
    return newNode;
  }
  return null;
};

//Constructing a binary tree
let root = addNode(arr, 0, arr.length - 1);

//1. Iterative approach
const iterationCount = (k, root) => {
  if (!root) return 0;
  let arr = [];
  let count = 0;
  if (root.val < k) {
    arr.push(root);
  } else {
    arr.push(root.left);
  }
  while (arr.length !== 0) {
    let node = arr.shift();
    if (node.val < k) {
      count++;
      if (node.left !== null) {
        arr.push(node.left);
      }
      if (node.right !== null) {
        arr.push(node.right);
      }
    } else {
      if (node.left !== null) {
        arr.push(node.left);
      }
    }
  }
  return count;
};

//2. Recursive approach
const recursionCount = (k, root) => {
  if (root) {
    if (root.val < k) {
      return recursionCount(k, root.left) + recursionCount(k, root.right) + 1;
    } else {
      return recursionCount(k, root.left);
    }
  } else return 0;
};

let k = 15;
let iterativeCount = iterationCount(k, root);
let recursiveCount = recursionCount(k, root);

//Result Display
document.getElementById("numbers").innerHTML = arr.toString();
document.getElementById("iterative").innerHTML = iterativeCount;
document.getElementById("recursive").innerHTML = recursiveCount;
