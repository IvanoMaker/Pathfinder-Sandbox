function update_field(field, screen, tree, end) {
    var updates = 0;
    var updated = [];
    
    for (let n = 0; n < valid_tiles.length; n++) {
        if (field[valid_tiles[n][0]][valid_tiles[n][1]].tick(field) == 1) {
            updated.push([valid_tiles[n][0], valid_tiles[n][1]]);
        }
    }

    for (let k = 0; k < updated.length; k++) {
        var temp_2 = field[updated[k][0]][updated[k][1]].update(tree);
        if (temp_2 > 0) {
            field[updated[k][0]][updated[k][1]].draw(screen);
        }
        updates += temp_2;
    }

    if (backtrack(end).length > 0) {
        end.set_state(4);
        var backtrackPath = backtrack(end)[0];
        for (let x = 0; x < backtrackPath.length; x++) {
            field[backtrackPath[x][0]][backtrackPath[x][1]].set_state(4);
        }
    
        for (let y = 0; y < valid_tiles.length; y++) {
            field[valid_tiles[y][0]][valid_tiles[y][1]].draw(screen);
        }
    }
    
    return updates;
}

function solve_setup() {
    steps = 0;
    tiles = 0;
    len = 0;
    hault = false
    step = Number(document.getElementById("ts").value);
    timing = true;
    document.getElementById("steps").innerHTML = "";
    console.time("timer");
    if (loop == 1){
        if (document.getElementById("algorithm").value == "bfs"){
            document.getElementById("path_len").innerHTML = "";
            selected_alg = "bfs";
            breadth_first_search();
        } else if (document.getElementById("algorithm").value == "dfs") {
            document.getElementById("path_len").innerHTML = "";
            document.getElementById("tiles").innerHTML = "";
            selected_alg = "dfs";
            depth_first_search();
        }
    }
}

var selected_alg = null;
var timing = false;
var hault;
var config;
var set_cs;
var field_data;
var steps, tiles, len;
var step = 100;
var field = [];
var valid_tiles = [];
var tree = [];
var roadmap = [];
var loop = 1;
var canvas, context;
var start, end;