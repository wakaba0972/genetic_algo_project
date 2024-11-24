// 產生隨機cue ball
function rand_cue_ball(){
    return {
        angle: rand(0, 2 * Math.PI),
        v: rand(0, 40),
        x: rand(0, 700),
        y: rand(0, 350),
    }
}

let game_box = document.getElementById('game_box');

let games = new Array(number_of_games);
let idle_games = new Queue();

function simulate(){
    console.log("generation: " + a.id);
    a.calculate().then((res) => {
        console.log(a.total_fitness + ' / ' + population_size*18);
        console.log(1 + ':' + a.tb[1] + ' ' + 2 + ':' + a.tb[2] + ' ' + 3 + ':' + a.tb[3] + '\n');
        a = res;
        return simulate();
    });
}

function init(){
    // 宣告game_canvas
    for (let i = 0; i < number_of_games; ++i){
        games[i] = new game_canvas(game_box);
        idle_games.enqueue(i);
    }

    a = new generation(1, population_size);
    a.rand_generation();
    simulate();

    //requestAnimationFrame(draw);
}

function draw(){
    for (let i = 0; i < number_of_games; ++i){
        //if(games[i].isEnd) continue;
        games[i].draw();
    }
    requestAnimationFrame(draw);
}
init();
