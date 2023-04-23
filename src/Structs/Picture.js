/**
class Figure extends GameObject {
    constructor(canvas, vector3, color) {
        super();
        this.canvas = canvas;
        this.pos = vector3;
        this.color = color;
    }
    static instances = [];

    // sort함수는 정렬의 기준이 되는 값인 Vector3.z값을 반환합니다.
    sort() {
        return this.pos.absZ;
    }

    render() {}
}

class Rect extends Figure {
    constructor(canvas, vector3, w, h, color) {
        super(canvas, vector3, color);
        this.w = w;
        this.h = h;
    }

    render() {
        const ctx = this.canvas.ctx; // 코드 단축
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.absX, this.pos.absY, this.w, this.h);
        ctx.restore();
    }
}

class Circle extends Figure {
    constructor(canvas, vector3, color) {
        super(canvas, vector3, color);
    }

    render() {
        // 만들기
    }
}
*/

class Picture {
    /**
     * 이 사진을 렌더링합니다.
     * @param {Transform} transform 그릴 Transform
     */
    render(transform) {}
}

class Rect extends Picture {
    constructor(w, h, color) {
        super();
        this.w = w;
        this.h = h;
        this.color = color;
    }
    
    render(transform) {
        const ctx = transform.canvas.ctx;
        const pivotX = this.w * transform.pivotX, pivotY = this.h * transform.pivotY;
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(transform.absX - pivotX, transform.absY - pivotY, this.w, this.h);
        ctx.restore();
    }
}

class Custom extends Picture {
    constructor() {

    }
}