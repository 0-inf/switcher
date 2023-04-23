class Clickable {
    /**
     * "클릭이 가능한" 구성요소. 직사각형 범위지정후 범위안에 들어오면 특정함수를 실행할 수 있습니다.  
     * 범위의 중심점은 왼쪽 위 입니다.
     * @param {Canvas} canvas 캔버스
     * @param {Vector2} composer 구성자의 2차원 좌푯값
     * @param {num} x 범위의 x좌표
     * @param {num} y 범위의 y좌표
     * @param {num} w 범위의 너비
     * @param {num} h 범위의 높이
     */
    constructor(canvas, composer, x, y, w, h) {
        this.canvas = canvas;
        this.composer = composer;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.event;
    }

    click() {
        const x = this.x + this.composer.x;
        const y = this.y + this.composer.y;
        const mouseX = this.canvas.mousePos.x, mouseY = this.canvas.mousePos.y;
        if (x <= mouseX && mouseX <= x + this.w && y <= mouseY && mouseY <= y + this.h) {
            this.event();
        }
    }
}