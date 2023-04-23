/**
class Button {
    constructor(canvas, x, y, width, height, fillColor, strokeColor = null) {
        this.pos = new Vector2(x, y);
        this.renderable = new Renderable(this.pos);
        this.renderable.addPaint(new RoundedRect(0, 0, width, height, 10, fillColor, strokeColor, 2));
        this.clickable = new Clickable(canvas, this.pos, width * -0.5, height * -0.5, width, height); // 클릭이 가능한 특성. 직사각형으로 콜리이더를 생성한다.
    }

    render() { this.renderable.render(); }
    click() { this.clickable.click(); }
}*/

/**
class Button {
    constructor(canvas, vector3) {
        this.pos = vector3;
        this.rect = new Rect(canvas, new Vector3(0, 0, 0, this.pos), 300, 150, "#7fdfff");
        this.collider = new RectCollider(new Vector3(0, 0, 0, this.pos), 300, 150);
        this.collider.event;
    }
}

class MovingDesign extends Behavior {
    constructor(canvas, vector3) {
        super();
        this.pos = vector3;
        this.rect = new Rect(canvas, new Vector3(0, 0, 0, this.pos), 100, 100, "#00ff00");
        this.moveType = 0;
        this.count = 20;
    }

    Update() {
        this.move();
    }
    
    move() {
        switch (this.moveType) {
            case 0:
                this.pos.x += 10;
                break;
            case 1:
                this.pos.y += 10;
                break;
            case 2:
                this.pos.x -= 10;
                break;
            case 3:
                this.pos.y -= 10;
                break;
        }
        this.count -= 1;
        if (!this.count) {
            this.moveType = (this.moveType + 1) % 4;
            this.count = 20;
        }
    }
}*/

class Button extends GameObject {
    constructor(x, y, z, image) {
        super();
        this.addComponent(new Transform(mainCanvas, x, y, z, 0.5, 0.5));
        this.addComponent(new Renderer(image));
        this.addComponent(new RectCollider(200, 100));
        this.Collider.mouseTouch = function() {
            console.log("마우스와 닿음");
        }
    }
}

/**
class Surface extends GameObject {
    constructor(x, y, z) {
        super();
        this.addComponent("pos", new Transform(mainCanvas, x, y, z, 0.5, 0.5));
        this.addComponent("image", new Renderer(buttonImage));
    }
}*/