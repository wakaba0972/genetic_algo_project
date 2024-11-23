
class pocket{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.r = 40;
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fillStyle = "black";
        context.fill();
        context.closePath();
    }

    inPocket(ball){
        let distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
        if(distance < this.r){
            return true;
        } else {
            return false;
        }
    }
}