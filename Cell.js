class Cell {
    constructor(i, j, x0, y0, width = 50) {
        this.width = width;
        this.i = i;
        this.j = j;
        this.x = x0 + width*i;
        this.y = y0 + width*j;
    }
    update() {
        this.show();
    }
    show() {
        stroke(200);
        strokeWeight(2);
        line(this.x, this.y, this.x + this.width, this.y);
        line(this.x, this.y, this.x, this.y + this.width);
        line(this.x + this.width, this.y, this.x + this.width, this.y + this.width);
        line(this.x, this.y + this.width, this.x + this.width, this.y + this.width);

    }
}