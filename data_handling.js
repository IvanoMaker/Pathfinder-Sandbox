/*
DATA HANDLING . JS
This file primarily deals with processing maze data and updating the field in the program accordingly
read_maze() deals with importing text files to read as mazes.
load_maze() processes maze data into the program, it also serves to reset the maze when needed.
read_preset() reads in a preset maze based on HTML selections (see presets.js if you so desire).
*/
function read_maze() {
    const file_source = document.getElementById("maze_source");
    const file = file_source.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileContents = e.target.result;
            lines = fileContents.split('\n');
            
            config = eval(lines[0]);
            field_data = lines.slice(1, lines.length);
        
            if (document.getElementById("cell_size_input").value == "") {
                document.getElementById("cell_size_input").value = config[2];
            } else {
                config[2] = document.getElementById("cell_size_input").value;
            }

            canvas = document.getElementById("maze");   
            context = canvas.getContext("2d");
            canvas.width = config[0] * config[2];
            canvas.height = config[1] * config[2];

            load_maze();
        };
        
        reader.readAsText(file);
    }
}

function load_maze() {
    valid_tiles = [];
    field = [];
    hault = true;
    for (i = 0; i < config[0]; i++) {
        field.push([]);
        for (j = 0; j < config[1]; j++) {
            field[i].push(new Tile(i, j, field_data[j].charAt(i), config[2]));
            field[i][j].draw(context);

            if (field_data[j].charAt(i) == 1) {
                start = field[i][j];
            } else if (field_data[j].charAt(i) == 3) {
                end = field[i][j];
            }

            if (field_data[j].charAt(i) != 2) {
                valid_tiles.push([i, j]);
            }
        }
    }
}

var current_ps = null;

function read_preset(preset) {
    current_ps = preset;
    config = eval(preset[0]);
    field_data = preset.slice(1, preset.length);

    if (document.getElementById("cell_size_input").value == "") {
        document.getElementById("cell_size_input").value = config[2];
    } else {
        config[2] = document.getElementById("cell_size_input").value;
    }

    canvas = document.getElementById("maze");   
    context = canvas.getContext("2d");
    canvas.width = config[0] * config[2];
    canvas.height = config[1] * config[2];

    load_maze();
}
