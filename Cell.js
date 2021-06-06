class Cell {
    constructor(i, j, x0, y0, width = 50) {
        this.width = width;
        this.i = i;
        this.j = j;
        this.x = x0 + width*i;
        this.y = y0 + width*j;
        this.color = [200, 200, 200];
    }
    update() {
        this.show();
    }
    show() {
        push();
            stroke(this.color[0], this.color[1], this.color[2]);
            strokeWeight(2);
            line(this.x, this.y, this.x + this.width, this.y);
            line(this.x, this.y, this.x, this.y + this.width);
            line(this.x + this.width, this.y, this.x + this.width, this.y + this.width);
            line(this.x, this.y + this.width, this.x + this.width, this.y + this.width);
        pop();

    }
    highlight() {
        push();
            fill(120, 50, 150);
            strokeWeight(2);
            stroke(200);
            rect(this.x, this.y, this.width, this.width);
        pop();
    }
}