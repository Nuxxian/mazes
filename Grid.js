class Grid {
	constructor(n, m, color) {
		this.n = n;
		this.m = m;
		this.width = 50;
		this.x0 = width / 2 - (n / 2) * this.width;
		this.y0 = height / 2 - (m / 2) * this.width;
		this.grid = [];
		this.color = color;
		for (let i = 0; i < this.n; i++) {
			this.grid[i] = [];
			for (let j = 0; j < this.m; j++) {
				console.log(i);
				this.grid[i][j] = new Cell(i, j, this.x0, this.y0, this.width, this.color);
			}
		}
		this.stack = [];
		this.current;
		this.state = 0; //0 not started, 1 buzzy, 2 finished
	}

	update() {
		//Initialize grid
		for (let i = 0; i < this.n; i++) {
			for (let j = 0; j < this.m; j++) {
				this.grid[i][j].update();
			}
		}
		if (this.current) {
			this.current.state = 2;
		}
		this.algorithm();
	}

	get_cell(i, j) {
		return this.grid[i][j];
	}

	choose_neighbour() {
		let dir = ['N', 'E', 'S', 'W'];
		let n = floor(random(4));
		if (this.current.i == 0) {
			if (this.current.j == 0) return dir[1 + n%2];
			else if (this.current.j == this.m - 1) return dir[n%2];
			else return dir[n%3];
		} else if (this.current.i == this.n - 1) {
			if (this.current.j = 0) return dir[2 + n%2];
			else if (this.current.j == this.m - 1) return random(['N', 'W']);
			else return random(['N', 'S', 'W']);
		} else if (this.current.j == 0) {
			return dir[1 + n%3];
		} else if (this.current.j == this.m - 1) {
			return random(['N', 'E', 'W']);
		} else {
			return dir[n];
		}
	}

	algorithm() {
		if (this.current) {
			if (this.has_available_neighbour()) {
				let go = false;
				this.current.state = 1;
				while (!go) {
					let dir = this.choose_neighbour();
					console.log(this.current)
					console.log(dir);
					let temp;
					switch (dir) {
						case 'N':
							temp = this.grid[this.current.i][this.current.j - 1]
							if (temp.state == 0) {
								this.current.wall_state[0] = 0;
								this.current = temp;
								go = true;
							}
							break;
						case 'E':
							temp = this.grid[this.current.i + 1][this.current.j]
							if (temp.state == 0) {
								this.current.wall_state[1] = 0;
								this.current = temp;
								go = true;
							}
							break;
						case 'S':
							temp = this.grid[this.current.i][this.current.j + 1]
							if (temp.state == 0) {
								this.current.wall_state[2] = 0;
								this.current = temp;
								go = true;
							}
							break;
						case 'W':
							temp = this.grid[this.current.i - 1][this.current.j]
							if (temp.state == 0) {
								this.current.wall_state[3] = 0;
								this.current = temp;
								go = true;
							}
							break;
					}
				}
				this.current.state = 2;
			}
		}
	}
	has_available_neighbour() {
        let i = this.current.i;
		let j = this.current.j;
		if (this.grid[i-1][j]) {
			if (this.grid[i-1][j].state != 1) return true;
		}
		if (this.grid[i+1][j]) {
			if (this.grid[i-+1][j].state != 1) return true;
		}
		if (this.grid[i][j-1]) {
			if (this.grid[i][j-1].state != 1) return true;
		}
		if (this.grid[i][j+1]) {
			if (this.grid[i][j+1].state != 1) return true;
		}
		return false;
    }
	mousePressed(xi, yi) {
		let x = xi - this.x0;
		let y = yi -this.y0;
		let i = floor(x / this.width);
		let j = floor(y / this.width);
		if ((i < this.n && i >= 0) && (j < this.m && j >= 0)) {
			if (this.state == 0) {
				this.state = 1;
				this.current = this.get_cell(i, j);
			}
		}
	}
}
