class Tile {
    constructor(x, y, state, size) {
        this.pos = [x, y];
        this.state = state;
        this.size = size;
        this.nearbys = 0;
        this.parents = [];
        this.children = [];
        this.parent_intersection = null;
    }

    get_state() {
        return this.state;
    }

    set_state(state) {
        this.state = state;
    }

    update(tree) {
        if (this.nearbys > 0) {
            tree.push(this)
            return 1;
        } else {
            return 0;
        }
    }
    
    draw(screen) {
        if (this.get_state() == 0) {
            screen.fillStyle = "#b8b8b2";
        } else if (this.get_state() == 1) {
            screen.fillStyle = "#3c6e39";
        } else if (this.get_state() == 2) {
            screen.fillStyle = "#30302f";
        } else if (this.get_state() == 3) {
            screen.fillStyle = "#d0ff61";
        } else if (this.get_state() == 4) {
            screen.fillStyle = "#ba1611";
        } else if (this.get_state() == 5) {
            screen.fillStyle = "#67c981";
        }
        screen.fillRect(this.pos[0]*this.size, this.pos[1]*this.size, this.size, this.size);
        
    }

    tick(field) {
        var count = 0;
        for (i = -1; i < 2; i++) {
            for (j = -1; j < 2; j++) {
                if (this.get_state() == 0 || this.get_state() == 3) {
                    if (i == 0 || j == 0) {
                        var nX = this.pos[0] + i;
                        var nY = this.pos[1] + j;
                        if (nX >= 0 && nX < field.length && nY >= 0 && nY < field[0].length) {
                            if (field[nX][nY].get_state() == 1) {
                                count++;
                                this.parents.push(field[nX][nY]);
                            }
                        }
                    }
                }
            }
        }
        
        this.nearbys = count;
        if (count == 0) {
            return 0;
        } else {
            return 1;
        }
    }

    // wrote this function at like 10pm and thought it was a funny name
    find_kiddos(field) {
        var child_count = 0;
        for (i = -1; i < 2; i++) {
            for (j = -1; j < 2; j++) {
                if (i == 0 || j == 0) {
                    var nX = this.pos[0] + i;
                    var nY = this.pos[1] + j;
                    if (nX >= 0 && nX < field.length && nY >= 0 && nY < field[0].length) {
                        if (field[nX][nY].get_state() == 0 || field[nX][nY].get_state() == 3) {
                            
                                this.children.push(field[nX][nY]);
                                child_count++;
                                field[nX][nY].parents.push(this);
                                                        
                        }
                    }
                }
            }
        }
        if (child_count > 2) {
            roadmap.push(new Intersection(this.pos[0], this.pos[1], 'none'));
        }
    }
}