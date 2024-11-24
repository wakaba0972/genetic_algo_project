const number_of_games = 60;


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

function init(){
    // 宣告game_canvas
    for (let i = 0; i < number_of_games; ++i){
        games[i] = new game_canvas(game_box);
        idle_games.enqueue(i);
    }

    let a = new generation(10000);
    a.calculate();

    // 讀取balls屬性
    /*for (let i = 0; i < number_of_games; ++i){
        games[i].init();
        games[i].input_object(object_balls_properties);
        games[i].input_cue(rand_cue_ball());
    }*/
    //requestAnimationFrame(update);
    
    /*setInterval(() => {
        let cnt = 0;
        for (let i = 0; i < number_of_games; ++i){ if(games[i].isEnd) ++cnt; }
        if(cnt == number_of_games) return;
        update();
    }, 0.0001);*/

    /*while(1){
        let cnt = 0;
        for (let i = 0; i < number_of_games; ++i){ if(games[i].isEnd) ++cnt; }
        if(cnt == number_of_games) break;
        update();
    }*/
    //draw();

    requestAnimationFrame(draw);
}

function update(){
    for (let i = 0; i < number_of_games; ++i){
        if(games[i].isEnd) continue;
        if(!games[i].isEnd && games[i].check_isEnd()) idle_games.enqueue(i);

        games[i].update();
        //games[i].draw();
    }
    //requestAnimationFrame(update);
}


function draw(){
    for (let i = 0; i < number_of_games; ++i){
        //if(games[i].isEnd) continue;
        games[i].draw();
    }
    requestAnimationFrame(draw);
}
init();
