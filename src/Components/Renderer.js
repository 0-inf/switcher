class Renderer extends Component {
    constructor(picture = null) {
        super();
        this.picture = picture;
        Renderer.instances[this.id] = this;
    }
    static instances = {};

    render() {
        if (this.parent.Transform && this.picture != null) // Transform이 있고 picture값이 있을때만 Renderer가 작동
            this.picture.render(this.parent.Transform);
    }

    delete() {
        super.delete();
        delete Renderer.instances[this.id];
    }
}
Component.define(Renderer, "Renderer");