class Cell {
    constructor(i, j, width = 50, x0 = 0, y0 = 0, color = 200) {
        this.color = color;
        this.width = width;
        this.i = i;
        this.j = j;
        this.x = x0 + width*i;
        this.y = y0 + width*j;
        this.rect_color;
        this.wall_state = [1, 1, 1, 1]; //N, O, Z, W ; 1 = show, 0 = hide
        this.state = 0; //0: unvisited, 1: visited, 2: current; 3: player
    }
    update() {
        this.show();
    }
    show() {
        switch(this.state) {
            case 0:
                this.rect_color = [this.color, this.color, this.color];
                break;
            case 1:
                this.rect_color = [100, 100, 100];
                break;
            case 2:
                this.rect_color = [100, 100, 200];
                break;
            case 3:
                this.rect_color = [19, 141, 117];
        }
        push();
            strokeWeight(0)
            fill(this.rect_color[0], this.rect_color[1], this.rect_color[2]);
            rect(this.x, this.y, this.width, this.width);
        pop();
        push();
            stroke(200);
            if (this.state == 0) strokeWeight(1);
            else strokeWeight(2);
            if (this.wall_state[0]) line(this.x, this.y, this.x + this.width, this.y);
            if (this.wall_state[1]) line(this.x + this.width, this.y, this.x + this.width, this.y + this.width);
            if (this.wall_state[2]) line(this.x, this.y + this.width, this.x + this.width, this.y + this.width);
            if (this.wall_state[3]) line(this.x, this.y, this.x, this.y + this.width);
        pop();
    }
    
    visited(dir) {
        switch(dir) {
            case 'N':
                this.wall_state[0] = 0;
                break;
            case 'E':
                this.wall_state[1] = 0;
                break;
            case 'S':
                this.wall_state[2] = 0;
                break;
            case 'W':
                this.wall_state[3] = 0;
                break;
        }
    }
}