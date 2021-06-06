class Grid {
	constructor(n, m) {
		this.n = n;
		this.m = m;
		this.width = 50;
		this.x0 = width / 2 - (n / 2) * this.width;
		this.y0 = height / 2 - (m / 2) * this.width;
		this.grid = [];
		for (let i = 0; i < this.n; i++) {
			this.grid[i] = [];
			for (let j = 0; j < this.m; j++) {
				console.log(i);
				this.grid[i][j] = new Cell(i, j, this.x0, this.y0, this.width);
			}
		}
		this.stack = [];
		this.current;
		this.state = 0; //0 not started, 1 buzy, 2 finished
	}
	update() {
		//Initialize grid
		for (let i = 0; i < this.n; i++) {
			for (let j = 0; j < this.m; j++) {
				this.grid[i][j].update();
			}
		}
		if (this.current) {
			this.current.highlight();
		}
	}

	get_cell(i, j) {
		return this.grid[i][j];
	}

	mousePressed(xi, yi) {
		let x = xi - this.x0;
		let y = yi -this.y0;
		let i = floor(x / this.width);
		let j = floor(y / this.width);
		if ((i < this.n && i >= 0) && (j < this.m && j >= 0)) {
			if (this.state == 0) {
				//this.state = 1;
				this.current = this.get_cell(i, j);
			}
		}
	}
}
