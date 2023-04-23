/**
class TestWindow {
    constructor(canvas) {
        this.canvas = canvas;
        this.pos = new Vector3(0, 0, 100);

        // 테스트: 배경 생성 (렌더링)
        this.bg = new Rect(canvas, new Vector3(0, 0, 0, this.pos), 1600, 900, "#dfdfdf");

        // 테스트: 윈도우 속에 버튼 생성 (마우스 이벤트)
        this.button1 = new Button(canvas, new Vector3(800, 450, 10, this.pos));

        // 테스트: 지속적으로 움직이는 객체 생성 (행동자)
        this.yap = [];
        for (let i = 0; i < 100; i++) {
            this.yap.push(new MovingDesign(canvas, new Vector3(100 + i *10, 100 + i * 5, 5, this.pos)));
        }
    }
}*/

const blueImage = new Rect(200, 100, "#00dfff");
const greenImage = new Rect(200, 100, "#00ff00");

class StartScene extends GameObject {
    constructor() {
        super();
        this.addChild("button1", new Button(300, 400, 0, blueImage));
        this.addChild("button2", new Button(400, 450, 2, greenImage));
    }
}
