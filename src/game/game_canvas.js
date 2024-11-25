class game_canvas {
    constructor(parrent) {
        // node屬性
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 700 * SCALE;
        this.canvas.height = 350 * SCALE;
        this.canvas.style.margin = "3px";
        this.canvas.style.border = "1px solid black";
        this.canvas.style.backgroundColor = "green";
        this.canvas.style.zoom = "1";
        this.canvas.addEventListener('click', () => { this.restart(); });

        // game屬性
        this.id = null;
        this.isEnd = false;
        this.ready = false;
        this.score = 0;
        this.bad = false;
        this.inball = 0;
        this.number_of_pockets = 6;
        this.pockets = [ 
            new pocket(0, 0), 
            new pocket(this.canvas.width / 2, 0 - 10 * SCALE), 
            new pocket(this.canvas.width, 0),
            new pocket(0, this.canvas.height), 
            new pocket(this.canvas.width / 2, this.canvas.height + 10 * SCALE), 
            new pocket(this.canvas.width, this.canvas.height),
        ]

        // 加入body
        parrent.appendChild(this.canvas);
    }

    // 遊戲渲染
    draw(){
        if(this.ready == false) return;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 繪製球袋
        for(let i=0; i<this.number_of_pockets; ++i){
            this.pockets[i].draw(this.context);
        }

        // 繪製球
        for(let i=0; i<this.number_of_balls; ++i){
            this.balls[i].draw(this.context);
        }

        // 繪製球桿
        let len = 500;
        let angle = this.cur_ball_properties.angle - Math.PI;
        let x1 = (this.cur_ball_properties.x + 50 * Math.cos(angle)) * SCALE;
        let y1 = (this.cur_ball_properties.y + 50 * Math.sin(angle)) * SCALE;

        let x2 = (this.cur_ball_properties.x + (50 + len) * Math.cos(angle)) * SCALE;
        let y2 = (this.cur_ball_properties.y + (50 + len) * Math.sin(angle)) * SCALE;

        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.strokeStyle = 'black';
        this.context.stroke();
        this.context.closePath();
    }

    // init
    init(id){
        this.canvas.style.backgroundColor = "green";
        this.isEnd = false;
        this.ready = false;
        this.id = id;
        this.score = 0;
        this.bad = false;
        this.inball = 0;
    }

    // 重新播放
    restart(){
        this.init();
        this.input_object(this.object_balls_properties);
        this.input_cue(this.cur_ball_properties);
    }

    // 讀取object balls屬性
    input_object(object_balls_properties){
        this.object_balls_properties = object_balls_properties;
        this.number_of_balls = object_balls_properties.length + 1;

        this.balls = new Array(this.number_of_balls);
        for (let i = 0; i < this.number_of_balls - 1; ++i){
            this.balls[i] = new ball(object_balls_properties[i].x * SCALE, object_balls_properties[i].y * SCALE);
        }
    }

    // 讀取cue ball屬性
    input_cue(cue_ball_properties){
        this.ready = true;
        this.cur_ball_properties = cue_ball_properties;

        this.balls[this.number_of_balls - 1] = new ball(0, 0);
        this.balls[this.number_of_balls - 1].x = cue_ball_properties.x * SCALE;
        this.balls[this.number_of_balls - 1].y = cue_ball_properties.y * SCALE;
        this.balls[this.number_of_balls - 1].vx = Math.cos(cue_ball_properties.angle) * cue_ball_properties.v * SCALE;
        this.balls[this.number_of_balls - 1].vy = Math.sin(cue_ball_properties.angle) * cue_ball_properties.v * SCALE;
        this.balls[this.number_of_balls - 1].color = 'white';
    }

    // game結束時的事件
    end_Doing(){
        this.canvas.style.backgroundColor = "red";
        //if(this.score >= 0) console.log(this.score);
    }

    // 檢查game是否結束
    check_isEnd(){
        if(!this.ready) return false;

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
        if(dead == this.number_of_balls) {
            this.end_Doing();
            return this.isEnd = true;
        }
    }

    fitness(){
        if(this.bad || this.score == 0) return 1;
        else return this.score;
    }

    // 遊戲更新
    update(){
        for (let i = 0; i < this.number_of_balls; ++i){
            if(this.balls[i].isLive == false) continue;

            this.balls[i].move();

            for(let j=0; j<this.number_of_pockets; ++j){
                if(this.pockets[j].inPocket(this.balls[i])){
                    this.balls[i].isLive = false;
                    if(this.balls[i].color == 'white'){
                        this.bad = true;
                    }
                    else {
                        this.inball += 1;
                        this.score += 100;
                    }
                }
            }

            for (let j = i + 1; j < this.number_of_balls; ++j){
                if(this.balls[j].isLive == false) continue;

                if (isCollide(this.balls[i], this.balls[j])){
                    collide(this.balls[i], this.balls[j]);

                    if(this.balls[i].color == 'white') this.score += 10;
                    else this.score += 3;
                }
            }
        }
    }
}