/**
 * Update() 메소드가 지속적으로 호출되는 객체입니다. 필요시 상속받을 수 있습니다.
 */
class Behavior {
    #actived

    constructor() {
        this.#actived = false;
    }
    static instances = [];

    get actived() {
        return this.#actived;
    }

    set actived(value) {
        throw new Error("'actived' cannot be modified externally.");
    }

    active() {
        if (this.#actived) return;
        this.#actived = true;
        Behavior.instances.push(this);
    }

    inactive() {
        if (!this.#actived) return;
        this.#actived = false;
        Behavior.instances.splice(Behavior.instances.indexOf(this), 1);
    }

    Update() {}
}