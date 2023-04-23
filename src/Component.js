class Component extends HO {
    constructor() {
        super();
    }
    static types = [];
    static keys = [];

    static define(type, key) {
        Component.types.push(type);
        Component.keys.push(key);
    }
}