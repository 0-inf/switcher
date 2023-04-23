// 용어 정리
// paint: 그려지는 요소 (예: 직사각형, 원, 이미지파일 등)
// composer: 자신을 구성하는 객체 (예: 버튼 이미지의 composer는 버튼이다.)

// "렌더링이 가능함" 특성
class Renderable {
    constructor(vector3) {
        //vector3.render()
        //SortedRenderable.append(vector3);
    }

    render() {
        //
    }
}

/**
class Renderable {
    // Vector2 인자로 받기
    constructor(ctx, vector2) {
        this.paints = [];
        this.ctx = ctx;
        this.composer = vector2;
    }

    addPaint(paint) {
        paint.ctx = this.ctx; // paint에게 렌더링할 ctx를 알려줌
        paint.composer = this.composer; // composer를 알려줌
        this.paints.push(paint);
    }

    render() {
        this.paints.forEach(element => element.render());
    }
}*/

// paint 클래스들
class Paint {
    constructor(x, y) {
        this.ctx;
        this.composer;
        this.x = x;
        this.y = y;
    }
    
    render() {}
}

class Rect extends Paint {
    constructor(x, y, w, h, color) {
        super(x, y);
        this.w = w;
        this.h = h;
        this.color = color;
    }

    render() {
        const ctx = this.ctx; // 코드 단축
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x + this.composer.x, this.y + this.composer.y, this.w, this.h);
        ctx.restore();
    }
}

class Circle extends Paint {
    constructor(x, y, r, color) {
        super(x, y);
        this.r = r;
        this.color = color;
    }

    render() {
        const ctx = this.ctx; // 코드 단축
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x + this.composer.x, this.y + this.composer.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

class RoundedRect extends Paint {
    /**
     * 꼭짓점이 둥근 직사각형
     * @param {num} x 중심 x좌표
     * @param {num} y 중심 y좌표
     * @param {num} width 너비
     * @param {num} height 높이
     * @param {num} arcRadius 둥근 꼭짓점 반지름
     * @param {rgba} fillColor 채우기 색
     * @param {rgba} strokeColor 테두리 색
     * @param {num} strokeWidth 테두리 굵기
     */
    constructor(x, y, width, height, arcRadius, fillColor, strokeColor = null, strokeWidth = 1) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.arcRadius = arcRadius;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
    }

    render() {
        // 코드 단축
        const ctx = this.ctx, width = this.width * 0.5, height = this.height * 0.5, arcRadius = this.arcRadius;
        const x = this.x + this.composer.x;
        const y = this.y + this.composer.y;
        // 시계방향으로 돌면서 렌더링
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x - width + arcRadius, y - height);
        ctx.lineTo(x + width - arcRadius, y - height);
        ctx.arcTo(x + width, y - height, x + width, y + height, arcRadius);
        ctx.lineTo(x + width, y + height - arcRadius);
        ctx.arcTo(x + width, y + height, x - width, y + height, arcRadius);
        ctx.lineTo(x - width + arcRadius, y + height);
        ctx.arcTo(x - width, y + height, x - width, y - height, arcRadius);
        ctx.lineTo(x - width, y - height + arcRadius);
        ctx.arcTo(x - width, y - height, x + width, y - height, arcRadius);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        if (this.strokeColor) { // 테두리가 있는가?
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = this.strokeWidth;
            ctx.stroke();
        }
        ctx.restore();
    }
}