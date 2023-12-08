/*
    AUGMENTED DEPTH FIRST SEARCH w/ PRIORITY QUEUE
    The prority in this case is the number of child tiles the child tiles of the current tile has (<- mouthfull)

*/ 

function manhattan_sort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j].heuristic > array[j + 1].heuristic) {
                var temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
}

function manhattanDist(node, goal) {
    return Math.sqrt(Math.pow(goal.pos[0] - node.pos[0], 2) + Math.pow(goal.pos[1] - node.pos[1], 2));
}

function priority_breadth_first_search() {

    // Necessary Variables
    var visited = [];
    var final_path = [];
    hault = false;
    var solved = false;
    var stack = [start];

    // Customizing Values
    var last_updated;
    step = document.getElementById("ts").value;
    var highlighted = document.getElementById('highlight').checked;
    var doAnimation = document.getElementById('animate').checked;
    var justRed = document.getElementById('just_draw_red').checked;

    function spread() {
        var node = stack.shift(0);
        if (!(visited.includes(node))) {
            visited.push(node);

            if (node.get_state() == 3){
                hault = true; solved = true;
                final_path = backtrack(end)[0];
                final_path.push(end);
            }

            if (last_updated != null && highlighted) {
                last_updated.draw(context);
            }

            steps++;
            document.getElementById("steps").innerHTML = "Steps: " + String(steps);

            if (highlighted) {
                node.set_state(5);
                node.draw(context);
                node.set_state(1);
            } else {
                node.set_state(1);
                if (doAnimation || (!justRed && !highlighted)) {
                    node.draw(context);
                }
            }

            last_updated = node;
            node.find_kiddos(field);

            // PRORITY QUEUE
            var temp_stack = []
            for (let i = 0; i < node.children.length; i++) {
                var child_node = (node.children[i]);
                child_node.heuristic = manhattanDist(child_node, end);
                temp_stack.push(child_node);
            }

            manhattan_sort(temp_stack);

            for (let i = 0; i < temp_stack.length; i++) {
                stack.push(temp_stack[i]);
            }
        }

        if (stack.length == 0 || solved == true) {
            clearInterval(loop);
            console.timeEnd('timer');
            loop = 1; selected_alg = null;
            if (solved == true) {
                end.set_state(4);
                end.draw(context);
                
                for (let k = 0; k < final_path.length-1; k++) {
                    field[final_path[k][0]][final_path[k][1]].set_state(4);
                    field[final_path[k][0]][final_path[k][1]].draw(context);
                }
                document.getElementById("path_len").innerHTML = "Path Length: " + backtrack(end)[0].length;
            } else {
                document.getElementById("path_len").innerHTML = "No Path Exists";
            }
        }
    }
    if (doAnimation) {
        loop = setInterval(spread, step);
    } else {
        while(solved == false) {
            spread();
        }
        
    }
}
