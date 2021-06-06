class Grid {
    constructor(n, m) {
        this.n = n;
        this.m = m;
        this.width = 50
        this.x0 = width/2 - n/2*this.width;
        this.y0 = height/2  - m/2*this.width;
        this.grid = [];
        for (let i = 0; i < this.n; i++) {
            this.grid[i] = []
            for (let j = 0; j < this.m; j++) {
                console.log(i)
                this.grid[i][j] = new Cell(i, j, this.x0, this.y0, this.width);
            }
        }
    }
    update() {
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.m; j++) {
                this.grid[i][j].update();
            }
        }
    }
}