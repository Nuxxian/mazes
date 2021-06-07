class Player {
    constructor(cell) {
        this.current = cell;
    }
    check_move(grid, dir, n, m) {
        switch(dir) {
            case 'N':
                if (this.current.j == 0) return -1;
                else if (this.current.wall_state[0] == 1) return -1;
                else return grid[this.current.i][this.current.j - 1];
            case 'E':
                if (this.current.i == n - 1) return -1;
                else if (this.current.wall_state[1] == 1) return -1;
                else return grid[this.current.i + 1][this.current.j];
            case 'S':
                if (this.current.j == m - 1) return -1;
                else if (this.current.wall_state[2] == 1) return -1;
                else return grid[this.current.i][this.current.j + 1];
            case 'W':
                if (this.current.i == 0) return -1;
                else if (this.current.wall_state[3] == 1) return -1;
                else return grid[this.current.i - 1][this.current.j];
        }
    }
    move(cell) {
        this.current.state = 1;
        this.current = cell;
        this.current.state = 3;
    }
    victory(n, m) {
        if (this.current.i == n - 1 && this.current.j == m - 1) return 'won';
    }
}