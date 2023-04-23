/**
 * HierarchicalObject(이하 HO)은 활동성을 부모관계와 연결하여 지원하는 객체입니다.
 * activity(활동성)는 bool값입니다.
 * parent(부모)는 HO객체거나 null이어야 하며, 하나만 참조할 수 있습니다.
 * absActivity는 parent가 가리키는 HO객체의 activity가 false라면 자신의 activity도 false가 됩니다.
 * 이는 계층적 GameObject/Component를 위한 초석입니다.
 */
class HO {
    #activity; #parent;

    constructor() {
        this.id = HO.#nextId++;
        this.#parent = null;
        this.#activity = true;
        HO.instances[this.id] = this;
    }
    static #nextId = 0;
    static instances = {};

    /**
     * 부모 HO
     */
    get parent() {
        return this.#parent;
    }

    set parent(value) {
        if ((value instanceof HO) || value === null)
            this.#parent = value;
        else
            throw new Error(`HO의 "parent" 멤버 변수는 ARS객체거나 null이어야 합니다.`);
    }

    /**
     * 이 HO의 활동성여부.
     * 반드시 bool값이어야 합니다.
     */
    get activity() {
        return this.#activity;
    }

    set activity(value) {
        if (value === true || value === false)
            this.#activity = value;
        else
            throw new Error(`GameObject의 "activity" 멤버 변수는 bool값 이어야 합니다.`);
    }

    /**
     * 이 HO의 절대적인 활동성여부.  
     * 부모의 활동성이 모두 true여야 true값이 반환됩니다.
     */
    get absActivity() {
        return this.#activity && (this.#parent?.absActivity ?? true); // 모든 자식과 부모의 #activity가 true여야 true반환
    }

    delete() {
        if (this.parent) {
            delete this.#parent.childs[this.id]; // 부모의 childs에서 삭제
            delete this.#parent[this.#parent.keys[this.id]]; // 부모의 key에서 삭제
            delete this.#parent.keys[this.id]; // 부모의 키 값을 삭제
        }
    }
}