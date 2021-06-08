// The depth-first search algorithm of maze generation is frequently implemented using backtracking. This can be described with a following recursive routine:

// 1. Make the initial cell the current cell and mark as visited
// 2. while there are unvisited cells
//  1.if the current cell has any neighbours which have not been visited
//    1. choose randomly one of the unvisited neighbours
//    2. push the current cell to the stack
//    3. remove the wall betrween curretn cell and chose cell
//    4. make the chosen cell the curretn cell and mark as visited
//  2. else if stack is not empty
//    1. pop a cell from the stack
//    2. make it the current cell

let grid;
let bwidth = 50;
let bcolor = 150;

function setup() {
  createCanvas(windowWidth, windowHeight - 1);
  let easyn = 12//width
  let easym = 12//height /* 10 */ 
  let n = floor(min(easyn, ((width - 50)/bwidth))) ;
  let m = floor(min(easym, ((height - 50)/bwidth)));
  console.log(n, m)
  if (n%2 + m%2 != 0 ){
    console.log("Geen even dimensies")
  } else {
    grid = new Grid(n, m, bwidth, bcolor);
  }
}

function draw() {
 // frameRate(10)
  background(25);
  grid.update();
}

function mousePressed() {
  grid.event = 'mousePressed'
}

function keyReleased() {
  grid.event = 'keyReleased'
}

function windowResized()
 {
   resizeCanvas(windowWidth, windowHeight)
 }