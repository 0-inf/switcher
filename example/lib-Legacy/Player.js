// composition over inheritance
class Player {
    constructor(canvas, x, y, color1, color2) {
        this.turn = x;
        this.type = 0;
        this.speed = 5;
        this.pos = new Vector2(x, y); // 2차원 좌표
        this.renderable = new Renderable(canvas.ctx, this.pos); // "Player" 객체는 "렌더링이 가능함"(Render + able)
        this.renderable.addPaint(new Rect(-50, -50, 100, 100, color1));
        this.renderable.addPaint(new Circle(0, 0, 40, color2))
    }

    render() { this.renderable.render(); }

    move() {
        if (this.type == 0) {
            this.pos.x += this.speed;
            if (this.pos.x >= this.turn + 150) this.type = 1;
        } else {
            this.pos.x -= this.speed;
            if (this.pos.x <= this.turn) this.type = 0;
        }
    }
}