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
let width = 1536//1000;
let height = 753;
let grid;
let bwidth = 25;
let bcolor = 50;
let easyn =  width /*10 */ 
let easym = height /* 10 */ 
function setup() {
  let n = floor(min(easyn, ((width - 50)/bwidth)));
  let m = floor(min(easym, ((height - 50)/bwidth)));
  grid = new Grid(n, m, bwidth, bcolor);
  createCanvas(width, height);
}

function draw() {
  //frameRate(15)
  background(bcolor);
  grid.update();
}

function mousePressed() {
  grid.mousePressed(mouseX, mouseY);
}
