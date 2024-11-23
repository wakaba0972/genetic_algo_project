const number_of_games = 64;
let object_balls_properties = [
    {x: 235, y: 100},
    {x: 540, y: 254},
    {x: 354, y: 100}
]

let game_box = document.getElementById('game_box');

let games = new Array(number_of_games);
for (let i = 0; i < number_of_games; ++i){
    games[i] = new game_canvas(game_box);
}

function init(){
    for (let i = 0; i < number_of_games; ++i){
        games[i].init(object_balls_properties);
    }
    requestAnimationFrame(update);
}

function update(){
    for (let i = 0; i < number_of_games; ++i){
        if(games[i].isEnd) continue;
        if(!games[i].isEnd) games[i].check_isEnd();

        if(games[i].isEnd){
            games[i].canvas.style.backgroundColor = "red";
            if(games[i].score >= 0) console.log(games[i].score);
        }
        games[i].update();
        games[i].draw();
    }
    requestAnimationFrame(update);
}

init();
