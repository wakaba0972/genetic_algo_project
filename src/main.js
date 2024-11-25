var SHUT_DOWN = false

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
    if(!a.isEnd) return;

    if(a.id % 1000 == 0) console.clear();
    console.log("generation: " + a.id);
    a.calculate().then((res) => {
        console.log("fitness: " + a.total_fitness / population_size)
        console.log(0 + ':' + a.tb[0] + ' ' + 1 + ':' + a.tb[1] + ' ' + 2 + ':' + a.tb[2] + ' ' + 3 + ':' + a.tb[3] + '\n');
        /*if(a.tb[3]) {
            a.isEnd = true;
            SHUT_DOWN = true;
        }*/
        a = res;
        return;
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

    let timer2 = setInterval(()=>{
        simulate();
        if(SHUT_DOWN) clearInterval(timer2);
        
    }, 0.001)

    requestAnimationFrame(draw);
}

function draw(){
    for (let i = 0; i < number_of_games; ++i){
        //if(games[i].isEnd) continue;
        games[i].draw();
    }
    requestAnimationFrame(draw);
}
init();
