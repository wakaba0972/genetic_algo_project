const SCALE = 0.2;
const RADIUS = 19 * SCALE;
const FRICTION = 0.98;
const MIN_VELOCITY = 0.15 * SCALE;

const LEFT = 0;
const TOP = 0;
const RIGHT = 700 * SCALE;
const BUTTOM = 350 * SCALE;

//碰撞檢測
function isCollide(b1, b2){
    let curDistance = (b1.x - b2.x) ** 2 + (b1.y - b2.y) ** 2;
	let nextDistance = ((b1.x + b1.vx) - (b2.x + b2.vx)) ** 2 + ((b1.y + b1.vy) - (b2.y + b2.vy)) ** 2;

    // nextDistance < curDistance可以避免球黏在一起
	return  curDistance <= (b1.r + b2.r) ** 2 && nextDistance < curDistance ;
}

// 二維彈性碰撞
function collide(b1, b2){
    let u_vector = {
        x: b2.x - b1.x,
        y: b2.y - b1.y
    };
    let un_vector = {
        x: u_vector.x / Math.sqrt(u_vector.x ** 2 + u_vector.y ** 2),
        y: u_vector.y / Math.sqrt(u_vector.x ** 2 + u_vector.y ** 2)
    };
    let ut_vector = {
        x: -un_vector.y,
        y: un_vector.x
    };
    let v1n = b1.vx * un_vector.x + b1.vy * un_vector.y;
    let v1t = b1.vx * ut_vector.x + b1.vy * ut_vector.y;
    let v2n = b2.vx * un_vector.x + b2.vy * un_vector.y;
    let v2t = b2.vx * ut_vector.x + b2.vy * ut_vector.y;
    let v1n_after = v2n;
    let v2n_after = v1n;
    let v1n_after_vector = {
        x: v1n_after * un_vector.x,
        y: v1n_after * un_vector.y
    };
    let v1t_after_vector = {
        x: v1t * ut_vector.x,
        y: v1t * ut_vector.y
    };
    let v2n_after_vector = {
        x: v2n_after * un_vector.x,
        y: v2n_after * un_vector.y
    };
    let v2t_after_vector = {
        x: v2t * ut_vector.x,
        y: v2t * ut_vector.y
    };
    let v1_final_vector = {
        x: v1n_after_vector.x + v1t_after_vector.x,
        y: v1n_after_vector.y + v1t_after_vector.y
    };
    let v2_final_vector = {
        x: v2n_after_vector.x + v2t_after_vector.x,
        y: v2n_after_vector.y + v2t_after_vector.y
    };
    b1.vx = v1_final_vector.x;
    b1.vy = v1_final_vector.y;
    b2.vx = v2_final_vector.x;
    b2.vy = v2_final_vector.y;
}

function rand(min,max){
    return Math.random()*(max-min)+min;
};

class ball{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.r = RADIUS;
        this.color = 'yellow';
        this.isLive = true;
    }

    draw(ctx){
        if(this.isLive == false) return;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move(){
        // 檢測邊界碰撞, 如果碰到該速度分量 * -1
        if(this.x - this.r <= LEFT && this.vx < 0 || this.x + this.r >= RIGHT && this.vx > 0) this.vx *= -1
        if(this.y - this.r <= TOP && this.vy < 0 || this.y + this.r >= BUTTOM && this.vy > 0) this.vy *= -1

        // 摩擦力
        this.vx *= FRICTION
        this.vy *= FRICTION

        if(Math.abs(this.vx) <= MIN_VELOCITY) this.vx = 0
        if(Math.abs(this.vy) <= MIN_VELOCITY) this.vy = 0

        this.x += this.vx;
        this.y += this.vy;
    }
}