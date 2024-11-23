const number_of_games = 64;

let game_box = document.getElementById('game_box');

let games = new Array(number_of_games);
for (let i = 0; i < number_of_games; ++i){
    games[i] = new game_canvas(game_box);
}

function init(){
    for (let i = 0; i < number_of_games; ++i){
        games[i].init();
    }


    requestAnimationFrame(update);
    //setInterval(update, 1);
}

function update(){
    for (let i = 0; i < number_of_games; ++i){
        games[i].update();
        games[i].draw();
    }
    requestAnimationFrame(update);
}

init();
