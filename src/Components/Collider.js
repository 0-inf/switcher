class Collider extends Component {
    constructor() {
        super();
        Collider.instances[this.id] = this;
    }
    static instances = [];

    delete() {
        super.delete();
        delete Collider.instances[this.id];
    }
}
Component.define(Collider, "Collider");

class PointCollider extends Collider {
    constructor(dx, dy) {
        super();
        this.dx = dx;
        this.dy = dy;
    }
}

class RectCollider extends Collider {
    constructor(dx, dy, w, h) {
        super();
        this.dx = dx;
        this.dy = dy;
        this.w = w;
        this.h = h;
    }

    /**
     * 콜라이더가 충돌했는지 확인 후 bool값을 반환합니다.
     * @param {Collider} collider 충돌을 확인할 콜라이더
     * @returns 충돌여부 bool값
     */
    isCollision(collider) {
        const x = collider.pos.x, y = collider.pos.y;
        if (collider instanceof PointCollider) {
            if (this.pos.x <= x && x <= this.pos.w && this.pos.y <= y && y <= this.pos.h) {
                return true;
            } else {
                return false;
            }
        }
    }

    // 충돌 확인시 주의사항: Transform의 canvas가 같아야 함. 그리고 충돌을 바탕으로 무엇과 충돌했는지 반환하는 함수 만들기
}