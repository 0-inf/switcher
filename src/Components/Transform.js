class Transform extends Component {
    #z;

    /**
     * 3차원 좌표를 생성합니다.
     * @param {GameCanvas} canvas 이 3차원좌표가 위치할 canvas
     * @param {Number} x x좌표
     * @param {Number} y y좌표
     * @param {Number} z z좌표
     * @param {Number} pivotX 중심점의 x좌표입니다. 0 ~ 1 값입니다.
     * @param {Number} pivotY 중심점의 y좌표입니다. 0 ~ 1 값입니다.
    */
    constructor(canvas = null, x = 0, y = 0, z = 0, pivotX = 0, pivotY = 0) {
        super();
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.#z = z;
        this.pivotX = pivotX;
        this.pivotY = pivotY;
        Transform.instances[this.id] = this;
        Transform.order.push(this.id);
        Transform.#sort(this.id);
    }
    static instances = {};
    static order = [];

    /**
     * Transform의 id를 넣으면 그 Transform의 z값을 기준으로 오름차순 정렬합니다.
     * @param {int} id 정렬할 Transform의 id입니다.
     */
    static #sort(id) {
        Transform.order.splice(Transform.order.indexOf(id), 1); // 자기자신 삭제
        let done = false;
        for (let i = 0; i < Transform.order.length; i++) { // 자신에게 알맞는 위치에 자기자신 추가
            if (Transform.instances[id].absZ < Transform.instances[Transform.order[i]].absZ) {
                Transform.order.splice(i, 0, id);
                done = true;
                break;
            }
        }
        if (!done) Transform.order.push(id);
    }

    get z() {
        return this.#z;
    }

    set z(value) {
        this.#z = value;
        Transform.#sort(this.id);
    }

    /**
     * 부모의 좌표를 모두 합산한 화면상의 절대x좌표입니다.
     */
    get absX() {
        return this.x + (this.parent?.absX ?? 0);
    }

    /**
     * 부모의 좌표를 모두 합산한 화면상의 절대y좌표입니다.
     */
    get absY() {
        return this.y + (this.parent?.absY ?? 0);
    }

    /**
     * 부모의 좌표를 모두 합산한 화면상의 절대z좌표입니다.
     */
    get absZ() {
        return this.z + (this.parent?.absZ ?? 0);
    }

    delete() {
        super.delete();
        delete Transform.instances[this.id];
        Transform.order.splice(Transform.order.indexOf(this.id), 1);
    }
}
Component.define(Transform, "Transform");