class game_canvas {
    constructor(parrent) {
        // node屬性
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 700 * SCALE;
        this.canvas.height = 350 * SCALE;
        this.canvas.style.margin = "10px";
        this.canvas.style.border = "1px solid black";
        this.canvas.style.backgroundColor = "green";
        this.canvas.style.zoom = "0.2";

        // game屬性
        this.isEnd = false;
        this.score = 0;
        this.number_of_pockets = 6;
        this.pockets = [ 
            new pocket(0, 0), 
            new pocket(this.canvas.width / 2, 0 - 10), 
            new pocket(this.canvas.width, 0),
            new pocket(0, this.canvas.height), 
            new pocket(this.canvas.width / 2, this.canvas.height + 10), 
            new pocket(this.canvas.width, this.canvas.height),
        ]

        // 加入body
        parrent.appendChild(this.canvas);
    }

    draw(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.pockets.forEach(pocket => {
            pocket.draw(this.context);
        });

        this.balls.forEach(ball => {
            ball.draw(this.context);
        });
    }

    init(object_balls_properties){
        this.number_of_balls = object_balls_properties.length + 1;

        this.balls = new Array(this.number_of_balls);
        for (let i = 0; i < this.number_of_balls - 1; ++i){
            this.balls[i] = new ball(object_balls_properties[i].x, object_balls_properties[i].y);
        }


        this.balls[this.number_of_balls - 1] = new ball(rand(0, 700), rand(0, 350));
        this.balls[this.number_of_balls - 1].vx = rand(-40, 40);
        this.balls[this.number_of_balls - 1].vy = rand(-40, 40);
        this.balls[this.number_of_balls - 1].color = 'white';
    }

    check_isEnd(){
        let dead = 0;
        this.balls.forEach(ball => {
            if(ball.isLive == false) {
                ++dead;
                return;
            }
            if(ball.vx == 0 && ball.vy == 0){
                ++dead;
                return;
            }
        })
        if(dead == this.number_of_balls) return this.isEnd = true;
    }

    update(){
        for (let i = 0; i < this.number_of_balls; ++i){
            if(this.balls[i].isLive == false) continue;

            this.balls[i].move();

            for(let j=0; j<this.number_of_pockets; ++j){
                if(this.pockets[j].inPocket(this.balls[i])){
                    this.balls[i].isLive = false;
                    if(this.balls[i].color == 'white'){
                        this.score = -999;
                    }
                    else {
                        this.score += 1;
                    }
                }
            }

            for (let j = i + 1; j < this.number_of_balls; ++j){
                if(this.balls[j].isLive == false) continue;

                if (isCollide(this.balls[i], this.balls[j])){
                    collide(this.balls[i], this.balls[j]);
                }
            }
        }
    }
}