function depth_first_search() {

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

    function dive() {
        var node = stack.pop();
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

            for (let i = 0; i < node.children.length; i++) {
                stack.push(node.children[i]);
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
        loop = setInterval(dive, step);
    } else {
        while(solved == false) {
            dive();
        }
        
    }
}