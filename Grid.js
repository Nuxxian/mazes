class Grid {
	constructor(n, m, bwidth, color) {
		this.n = n;
		this.m = m;
		this.width = bwidth;
		this.x0 = width / 2 - (n / 2) * this.width;
		this.y0 = height / 2 - (m / 2) * this.width;
		this.grid = [];
		this.color = color;
		this.count_visited = 0;
		for (let i = 0; i < this.n; i++) {
			this.grid[i] = [];
			for (let j = 0; j < this.m; j++) {
				this.grid[i][j] = new Cell(i, j, this.x0, this.y0, this.width, this.color);
			}
		}
		this.stack = [];
		this.current = [];
		this.state = 0; //0 not started, 1 buzzy, 2 ready, 3 playing, 4 exit found
		this.event = '';
		this.player;
		this.divide = 1;
		for (let i = 0; i < this.divide*this.divide; i++) {
			this.stack[i] = [];	
		}
		
	}
	update() {
		//Initialize grid
		for (let i = 0; i < this.n; i++) {
			for (let j = 0; j < this.m; j++) {
				this.grid[i][j].update();
			}
		}
		this.keyReleased();
		switch(this.state) {
			case 0:
				this.mousePressed(mouseX, mouseY);
				this.draw_border();

				break;
			case 1:
				this.draw_border();
				this.make_maze('DFB');
				break;
			case 2:
				frameRate(2);
				this.initgame();
				break;
			case 3:
				frameRate(60)
				this.draw_border();
				this.play();
				break;
			default:
				this.draw_border();
		}
		this.event = '';
	}
	draw_border() {
		if (this.state < 2) {
			push();
				strokeWeight(2);
				stroke(200)
				line(this.x0, this.y0, this.x0 + this.n*this.width, this.y0);
				line(this.x0, this.y0, this.x0, this.y0  + this.m*this.width);
				line(this.x0, this.y0 + this.m*this.width, this.x0 + this.n*this.width, this.y0 + this.m*this.width);
				line(this.x0 + this.n*this.width, this.y0, this.x0 + this.n*this.width, this.y0 + this.m*this.width);
			pop();
		} else if (this.state > 2) {
			push();
				strokeWeight(4);
				stroke(255)
				let middle;
				let factor = 1
				if (this.m%2 == 0) middle = this.m/2 - 1;
				else {
					middle = floor(this.m/2)
					factor = 0;
				}
				rect(this.x0, this.y0, this.n*this.width, 1);
				rect(this.x0, this.y0 + this.m*this.width, this.n*this.width, 1);
				rect(this.x0, this.y0, 1, middle*this.width);
				rect(this.x0, this.y0 + (middle + 1)*this.width, 1, (middle + factor)*this.width);
				rect(this.x0 + this.n*this.width, this.y0, 1, (middle)*this.width);
				rect(this.x0 + this.n*this.width, this.y0 + (middle+1)*this.width, 1, (middle + factor)*this.width);
			pop();
			this.grid[0][middle].wall_state[3] = 0;
			this.grid[this.n - 1][middle].wall_state[1] = 0;

		}
 	}
	make_maze(algorthim) {
		if (algorthim == 'DFB') {
			if (this.state == 1) {
				this.DFB(this.divide*this.divide);
			}
		}
	}
	get_cell(i, j) {
		return this.grid[i][j];
	}
	choose_neighbour(I, minn, minm, maxn, maxm) {
		let i = this.current[I].i;
		let j = this.current[I].j;
		let neighbours = [];
		let dir = [];
		let N, E, S, W = undefined;
		if (j != minm) N = this.grid[i][j - 1];
		if (i != maxn - 1) E = this.grid[i + 1][j]; 
		if (j != maxm - 1) S = this.grid[i][j + 1]; 
		if (i != minn) W = this.grid[i - 1][j]; 

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

	// algorthims
	DFB(N) {
		for (let i = 0; i < N; i++) { //van links naar rechts, boven naar onder
			let x0 = index(i, N)[0];
			let y0 = index(i, N)[1]
			let partn = this.n/sqrt(N);
			let partm = this.m/sqrt(N);
			if (this.current[i]) {
				let res = this.choose_neighbour(i, x0*partn, y0*partm, x0*partn + partn, y0*partm + partm);
				if (res[0]) {
					let dir = res[1];
					this.current[i].state = 1;
					this.current[i].visited(dir);
					this.current[i] = res[0];
					this.current[i].visited(this.complement(dir))
					this.current[i].state = 2;
					this.stack[i].push(this.current[i]);
				}
				else {
					this.current[i].state = 1;
					this.current[i] = this.stack[i].pop()
					if (this.current[i]) this.current[i].state = 2;
				}
			}
			if (this.check_state() == this.n*this.m) {
				for (let i = 0; i < N; i++) {
					this.current[i].state = 1;
				}
				this.state = 2;
			}			
		}
	}
	Division() {

	}

	//end algorithms
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
	split_up() {
		let amount_walls = this.divide*this.divide - 1;
		let walls = [];
		for (let i = 0; i < 2*(this.divide*this.divide - this.divide); i++) {
			walls[i] = random();
		}
		let chosen_walls = get_n_highest(amount_walls, walls)
		console.log(chosen_walls)
		for (let i = 0; i < this.divide*this.divide; i++) {
			let [x, y] = index(i, this.divide*this.divide);
			let N = this.n/this.divide;
			let M = this.m/this.divide;
			let del = [-1, -1];
			if (x == this.divide - 1) {
				if (y != this.divide - 1) {
					if (chosen_walls.includes(x+y*this.divide)) del = [-1, floor(random(N))];
				}
			} else if (y == this.divide - 1) {
				if (chosen_walls.includes(x+y*this.divide)) del = [floor(random(M)), -1];
			} else {
				if (chosen_walls.includes(x+y*this.divide)) del = [floor(random(M)), floor(random(N))];
			}


			if (del[0] != -1) {
				this.grid[(x+1)*N - 1][y*M + del[0]].visited('E');
				this.grid[(x+1)*N][y*M + del[0]].visited('W');

			}
			if (del[1] != -1) {
				this.grid[x*N + del[1]][M*(y + 1) - 1].visited('S');
				this.grid[x*N + del[1]][M*(y + 1)].visited('N');
			}

		}
	}
	mousePressed(xi, yi) {
		if (this.event == 'mousePressed') {
			/*
			let x = xi - this.x0;
			let y = yi -this.y0;
			let i = floor(x / this.width);
			let j = floor(y / this.width);
			*/
			for (let i = 0; i < this.divide*this.divide; i++) {
				let x = index(i, this.divide*this.divide);
				this.current[i] = this.grid[x[0]*this.n/this.divide][x[1]*this.m/this.divide];
				this.stack[i][0] = this.current[i];
			}			
			this.state = 1;
		}
	}
	keyReleased() {
		if (this.event == 'keyReleased') {
			if (keyCode == 82) {
				this.reset(1);
			}
			if (keyCode == 32 && this.state > 2) {
				this.reset(2);
			}
		}
	}
	initgame() {
		
		let factor = 0;
		if (this.m%2 != 0) factor = 1
		this.player = new Player(this.grid[0][floor(this.m / 2) - 1 + factor]);
		this.split_up()
		this.player.current.state = 3
		this.state = 3;
	}
	play() {
		if (this.event == 'keyReleased') {
			if (keyCode == 90) {
				if (this.player.check_move(this.grid, 'N', this.n, this.m) != -1) {
					this.player.move(this.player.check_move(this.grid, 'N', this.n, this.m));
				}
			}
			if (keyCode == 68) {
				if (this.player.check_move(this.grid, 'E', this.n, this.m) != -1) {
					this.player.move(this.player.check_move(this.grid, 'E', this.n, this.m));
				}
			}
			if (keyCode == 83) {
				if (this.player.check_move(this.grid, 'S', this.n, this.m) != -1) {
					this.player.move(this.player.check_move(this.grid, 'S', this.n, this.m));
				}
			}
			if (keyCode == 81) {
				if (this.player.check_move(this.grid, 'W', this.n, this.m) != -1) {
					this.player.move(this.player.check_move(this.grid, 'W', this.n, this.m));
				}
			}
		}
		if (keyCode == 38) {
			if (this.player.check_move(this.grid, 'N', this.n, this.m) != -1) {
				this.player.move(this.player.check_move(this.grid, 'N', this.n, this.m));
			}
		}
		if (keyCode == 39) {
			if (this.player.check_move(this.grid, 'E', this.n, this.m) != -1) {
				this.player.move(this.player.check_move(this.grid, 'E', this.n, this.m));
			}
		}
		if (keyCode == 40) {
			if (this.player.check_move(this.grid, 'S', this.n, this.m) != -1) {
				this.player.move(this.player.check_move(this.grid, 'S', this.n, this.m));
			}
		}
		if (keyCode == 37) {
			if (this.player.check_move(this.grid, 'W', this.n, this.m) != -1) {
				this.player.move(this.player.check_move(this.grid, 'W', this.n, this.m));
			}
		}
		let factor = 0;
		if (this.m%2 != 0) factor = 1;
		if (this.player.victory(this.n, floor(this.m/2) + factor)) this.state = 4;
	}
	reset(status) {
		switch(status) {
			case 1:
				this.state = 0;
				this.check_state(1, 0);	
				break;
			case 2:
				this.player.current.state = 1;
				this.state = 2;
				break;
		}
			
	}
	check_state(ws = -1, N = -1) {
		let count = 0;
		for (let i = 0; i < this.n; i++) {
			for (let j = 0; j < this.m; j++) {
				if (N != -1) {
					this.grid[i][j].state = N;
				} else {
					if (this.grid[i][j].state >= 1) {
						count++;
					}
				}
				if (ws == 1) {
					this.grid[i][j].wall_state = [1, 1, 1, 1]
				}
			}
		}
		if (count != 0) return count;
	}
}

function index(i, max) {
	let n = sqrt(max);
	return [i%n, floor(i/n)%n]
}

function get_n_highest(n, L) {
	let res = [];
	for (const el of L) {
		if (res.length < n) res.push(el);
		else if (minimum(res) < el) {
			res.splice(res.indexOf(minimum(res)), 1);
			res.push(el);
		}
	}
	for (let i = 0; i < n; i++) {
		res[i] = L.indexOf(res[i]);
	}
	return res;
}
function minimum(L) {
	let res = L[0];
	for (const el of L) {
		if (el < res) res = el;
	}
	return res;
}