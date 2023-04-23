class Mouse extends GameObject {
    constructor() {
        super();
        this.addComponent(new Transform(null));
        this.addComponent(new PointCollider(0, 0));
    }
}
const mouse = new Mouse();