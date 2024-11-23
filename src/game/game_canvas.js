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
        this.number_of_balls = 8;

        // 加入body
        parrent.appendChild(this.canvas);
    }

    draw(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.balls.forEach(ball => {
            ball.draw(this.context);
        });
    }

    init(){
        this.balls = new Array(this.number_of_balls);
        for (let i = 0; i < this.number_of_balls; ++i){
            this.balls[i] = new ball();
        }
    }

    update(){
        for (let i = 0; i < this.number_of_balls; ++i){
            this.balls[i].move();
            for (let j = i + 1; j < this.number_of_balls; ++j){
                if (isCollide(this.balls[i], this.balls[j])){
                    collide(this.balls[i], this.balls[j]);
                }
            }
        }
    }
}