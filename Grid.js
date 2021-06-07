class Grid {
	constructor(n, m, bwidth, color) {
		this.n = n;
		this.m = m;
		this.width = bwidth;
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
		this.state = 0; //0 not started, 1 buzzy, 2 ready, 3 playing, 4 exit found
	}
	update() {
		//Initialize grid
		this.draw_border();
		for (let i = 0; i < this.n; i++) {
			for (let j = 0; j < this.m; j++) {
				this.grid[i][j].update();
			}
		}
		this.make_maze('DFB')
	}
	draw_border() {
		if (this.state < 2) {
			push();
				strokeWeight(5);
				stroke(255)
				line(this.x0, this.y0, this.x0 + this.n*this.width, this.y0);
				line(this.x0, this.y0, this.x0, this.y0  + this.m*this.width);
				line(this.x0, this.y0 + this.m*this.width, this.x0 + this.n*this.width, this.y0 + this.m*this.width);
				line(this.x0 + this.n*this.width, this.y0, this.x0 + this.n*this.width, this.y0 + this.m*this.width);
			pop();
		} else if (this.state > 1) {
			push();
				strokeWeight(5);
				stroke(255)
				line(this.x0, this.y0, this.x0 + this.n*this.width, this.y0);
				line(this.x0, this.y0 + this.width, this.x0, this.y0  + this.m*this.width);
				line(this.x0, this.y0 + this.m*this.width, this.x0 + this.n*this.width, this.y0 + this.m*this.width);
				line(this.x0 + this.n*this.width, this.y0, this.x0 + this.n*this.width, this.y0 + (this.m - 1)*this.width);
			pop();
		}
 	}
	make_maze(algorthim) {
		if (algorthim == 'DFB') {
			if (this.state == 1) {
				this.algorithm();
			}
		}
	}
	get_cell(i, j) {
		return this.grid[i][j];
	}
	choose_neighbour() {
		let i = this.current.i;
		let j = this.current.j;
		let neighbours = [];
		let dir = [];
		let N, E, S, W = undefined;
		if (j != 0) N = this.grid[i][j - 1];
		if (i != this.n - 1) E = this.grid[i + 1][j]; 
		if (j != this.m - 1) S = this.grid[i][j + 1]; 
		if (i != 0) W = this.grid[i - 1][j]; 

		if (N&& N.state != 1) {
			neighbours.push(N);
			dir.push('N');
		} 
		if (E && E.state != 1) {
			neighbours.push(E);
			dir.push('E');
		}
		if (S && S.state != 1) {
			neighbours.push(S);
			dir.push('S');
		}
		if (W && W.state != 1) {
			neighbours.push(W);
			dir.push('W');
		}
		if (neighbours == []) {
			return undefined;
		}
		let n = floor(random(0,neighbours.length));
		return [neighbours[n], dir[n]];
	}
	complement(dir) {
		switch(dir) {
			case 'N':
				return 'S';
			case 'E':
				return 'W';
			case 'S':
				return 'N';
			case 'W':
				return 'E';
		}
	}
	algorithm() {
		if (this.current) {
			let res = this.choose_neighbour();
			if (res[0]) {
				let dir = res[1];
				this.current.state = 1;
				this.current.visited(dir);
				this.current = res[0];
				this.current.visited(this.complement(dir))
				this.current.state = 2;
				this.stack.push(this.current);
				console.log(this.current.wall_state)
			}
			else {
				this.current.state = 1;
				this.current = this.stack.pop()
				if (this.current) this.current.state = 2;
				else console.log('full')
			}
		} else  {
			this.grid[0][0].visited('W');
			this.grid[this.n-1][this.m-1].visited('E')
			this.state = 2;
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
				this.stack[0] = this.current;
			}
		}
	}
}
