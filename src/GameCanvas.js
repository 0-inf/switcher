/**
 * 라이브러리 전용 canvas인 GameCanvas입니다.
 */
class GameCanvas extends HTMLCanvasElement {
    constructor() {
        super();
        this.baseW = 1600;
        this.baseH = 900;
        this.scale = 1;
        this.mousePos = { x: null, y: null };
        this.addEventListener("mousemove", this.#mouseMove); // canvas마다 고유의 scale을 곱해줘야 해서 mousemove는 window가 아닌 canvas에다가 event해줘야 함
        this.addEventListener("mouseout", this.#mouseOut);
        GameCanvas.instances.push(this);
    }
    static instances = [];

    /**
     * html game-canvas요소를 로딩합니다.
     * @param {string} canvasId 로딩할 canvas의 id
     * @param {number} baseW 기본 너비 (가로 해상도)
     * @param {number} baseH 기본 높이 (세로 해상도)
     * @param {number} tight 창 크기에 대한 캔버스 크기의 비율
     * @returns 로딩이 완료된 GameCanvas;
     */
    static load(canvasId, baseW = 1600, baseH = 900, tight = 1) {
        const canvas = document.getElementById(canvasId);
        GameCanvas.#setCss(canvas);
        canvas.ctx = canvas.getContext("2d");
        canvas.baseW = baseW;
        canvas.baseH = baseH;
        canvas.tight = tight;
        canvas.resize();
        return canvas;
    }

    /**
     * 인자로 받은 GameCanvas에게 필요한 css작업을 진행합니다.
     * @param {GameCanvas} canvas 
     */
    static #setCss(canvas) {
        canvas.style.display = "inline";
        canvas.style.position = "absolute";
        canvas.style.top = "50%";
        canvas.style.left = "50%";
        canvas.style.transform = "translate(-50%, -50%)";
    }

    /**
     * 캔버스의 크기를 창의 크기에 맞게 재조정합니다.
     */
    resize() {
        if (window.innerWidth * this.baseH < window.innerHeight * this.baseW)
            this.scale = window.innerWidth / this.baseW * this.tight;
        else
            this.scale = window.innerHeight / this.baseH * this.tight;
        this.width = this.baseW * this.scale;
        this.height = this.baseH * this.scale;
        this.ctx.scale(this.scale, this.scale);
    }

    #mouseMove(e) {
        this.mousePos.x = e.offsetX / this.scale;
        this.mousePos.y = e.offsetY / this.scale;
        mouse.Transform.canvas = this;
        mouse.Transform.x = this.mousePos.x;
        mouse.Transform.y = this.mousePos.y;
    }

    #mouseOut() {
        this.mousePos.x = null;
        this.mousePos.y = null;
        mouse.Transform.canvas = null;
    }
}
customElements.define("game-canvas", GameCanvas, { extends: "canvas" });


// 창 크기 재조정시 호출. 모든 GameCanvas들의 크기를 재조정한다.
window.addEventListener("resize", function (e) {
    GameCanvas.instances.forEach(element => element.resize());
});

// 마우스 클릭 감지
window.addEventListener("click", function (e) { // canvas보다 window에 event넣는게 더 편함
    console.log("마우스 클릭 됨");
});