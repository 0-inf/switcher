class WindowSet {
    constructor(canvas) {
        this.canvas = canvas;
    }

    render() {}
    click() {}
}

function activeSub(windowSet) {
    subCanvas.setWindow(windowSet);
    subCanvas.active();
    subCanvas.tight = 0.6;
    subCanvas.resize();
}

// 시작화면
class StartWindow extends WindowSet {
    constructor(canvas) {
        super(canvas);
        this.player = new Player(this.canvas, 300, 200, "#ffff00", "#00ff00");
        this.startButton = new Button(this.canvas, 800, 500, 600, 100, "#7fdfff", "#000000");
        this.startButton.clickable.event = function() {
            activeSub(SettingWindow);
            this.canvas.inactive();
        }
    }

    render() {
        this.canvas.ctx.clearRect(0, 0, 1600, 900);
        this.player.render();
        this.startButton.render();
    }

    click() {
        this.startButton.click();
    }
}

// 설정화면
class SettingWindow extends WindowSet {
    constructor(canvas) {
        super(canvas);
        this.closeButton = new Button(this.canvas, 1500, 100, 100, 100, "#7f7f7f", "#3f3f3f");
        this.closeButton.clickable.event = function() {
            mainCanvas.active();
            this.canvas.inactive();
            this.canvas.ctx.clearRect(0, 0, 1600, 900);
            this.canvas.window = null;
        }
    }

    render() {
        this.canvas.ctx.fillStyle = "#bfbfbf";
        this.canvas.ctx.fillRect(0, 0, 1600, 900);
        this.closeButton.render();
    }

    click() {
        this.closeButton.click();
    }
}