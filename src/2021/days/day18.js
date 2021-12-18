import { readNumberInput, readInput } from '../helpers/index.js';

function checkExplode(tree, depth = 1) {
  if (typeof tree === 'number') {
    return false;
  }
  const { left, right, parent } = tree;
  if (depth > 4 && typeof left === 'number' && typeof right === 'number') {
    return tree;
  }
  const leftExplode = checkExplode(left, depth + 1);
  if (leftExplode) {
    return leftExplode;
  }
  const rightExplode = checkExplode(right, depth + 1);
  if (rightExplode) {
    return rightExplode;
  }
  return false;
}

function checkAndPerformSplit(tree) {
  if (!tree) {
    return false;
  }
  if (typeof tree.left === 'number' && tree.left >= 10) {
    const num = tree.left;
    tree.left = { left: Math.floor(num/2), right: Math.ceil(num/2), parent: tree };
    return true;
  } else if (typeof tree.right === 'number' && tree.right >= 10) {
    const num = tree.right;
    tree.right = { left: Math.floor(num/2), right: Math.ceil(num/2), parent: tree };
    return true;
  } else if (typeof tree.left === 'number' && typeof tree.right === 'number') {
    return false;
  }
  const leftResult = checkAndPerformSplit(tree.left);
  return leftResult || checkAndPerformSplit(tree.right);
}

function doExplode(treeNode) {
  const { left, right } = treeNode;
  let previous;
  let next = treeNode;
  do {
    previous = next;
    next = next.parent;
    if (next === null) break;
  } while (next.left === previous)
  if (next && next.left !== null) {
    if (typeof next.left === 'number') {
      next.left += left;
    } else {
      next = next.left;
      while (typeof next.right !== 'number') {
        next = next.right;
      }
      next.right += left;
    }
  }

  next = treeNode;
  do {
    previous = next;
    next = next.parent;
    if (next === null) break;
  } while (next.right === previous)
  if (next && next.right !== null) {
    if (typeof next.right === 'number') {
      next.right += right;
    } else {
      next = next.right;
      while (typeof next.left !== 'number') {
        next = next.left;
      }
      next.left += right;
    }
  }
  if (treeNode.parent.left === treeNode) {
    treeNode.parent.left = 0;
  } else {
    treeNode.parent.right = 0;
  }
}

function parseToTree(val, parent = null) {
  if (typeof val === 'number') {
    return val;
  }
  const [left, right] = val;
  const result = {
    left: null,
    right: null,
    parent,
  }
  result.left = parseToTree(left, result);
  result.right = parseToTree(right, result);
  return result;
}

function parseToArray(tree) {
  if (typeof tree !== 'number') {
    const { left, right } = tree;
    return [parseToArray(left), parseToArray(right)];
  }
  return tree;
}

function parseLine(arr, i) {
  const pair = JSON.parse(arr[i]);
  return pair;
}

export function part1(fileName) {
  const arr = readInput(fileName);
  let overallPair = parseLine(arr, 0);
  arr.forEach((line, y) => {
    if (y === 0) return;
    const pair = JSON.parse(line);
    overallPair = [overallPair, pair];
    const tree = parseToTree(overallPair);
    let didAction = true;
    while (didAction) {
      didAction = false;
      const explode = checkExplode(tree);
      if (explode) {
        doExplode(explode);
        console.log('explode', JSON.stringify(parseToArray(tree)));
        didAction = true;
        continue;
      } else {
        didAction = checkAndPerformSplit(tree);
        if (didAction) {
          console.log('split', JSON.stringify(parseToArray(tree)));
        }
      }
    }
    overallPair = parseToArray(tree);
    console.log(JSON.stringify(overallPair));
  });
  
  console.log(JSON.stringify(overallPair));
}

export function part2(fileName) {
  const arr = readInput(fileName);

}