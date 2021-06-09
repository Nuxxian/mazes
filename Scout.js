class Scout {
    constructor(grid, heading = 'right') {
        this.grid = grid
        this.cells = this.grid.grid;
        this.player = this.grid.player
        
        this.posx = this.grid.startpos[0];
        this.posy = this.grid.startpos[1];
        this.goalx = this.grid.endpos[0];
        this.goaly = this.grid.endpos[1];

        this.visited;
        this.avoid = [];
        this.heading = heading
        this.state = 0;
    }

    wall_follower() {
        frameRate(2)
        if (this.state == 0) {
            this.player = this.grid.player.current
            this.visited = []
            this.state = 1;
        }
        let dir = ['S', 'E', 'N', 'W'];
        if (this.heading == 'left') dir = ['N', 'E', 'S', 'W'];
      
        this.posx = this.player.i
        this.posy = this.player.j
        dir = removedir(this.posx, this.posy, this.grid.n, this.grid.m, dir);
        console.log(dir)
        if (this.posx == this.goalx && this.posy == this.goaly) this.grid.state = 4;
        this.player.state = 1;

        for (const direction of dir) {
            let next = this.grid.freecell(direction);
            if (next) {
                if (this.avoid.includes(next) || this.visited.includes(next));
                else this.player = next;
                console.log('next')
                break;
            }
        }
        if (this.visited.includes(this.player)) {
            let temp = this.visited.pop();
            this.avoid.push(temp);
            this.player = temp;
            console.log('return')
        }
        this.player.state = 3;
        this.visited.push(this.player);
        this.changeplayer(this.player);

    }
    changestates() {

    }
    changeplayer(newplayer) {
        let newpl = new Player(newplayer)
        this.grid.player = newpl;
    }
    /*shortest path
    Astar() {

    }
    Dijkstra() {

    }
    */
}

function removedir(i, j, n, m, L) {
    if (i == 0) L.splice(L.indexOf('W'), 1);
    if (i == n - 1) L.splice(L.indexOf('E'), 1);
    if (j == 0) L.splice(L.indexOf('N'), 1);
    if (j == m - 1) L.splice(L.indexOf('S'), 1);
    return L;
}