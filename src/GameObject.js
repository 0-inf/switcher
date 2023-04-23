import HO from "./HierarchicalObject.js";

/**
 * GameObject 의 구조를 도와주는 변수
 * parent 부모
 * childs 자식들
 * components 컴포넌트들
 * 
 * 즉, 삭제할때 이 관계도 같이 삭제해야 함.
 * 목적은 GOManager에서 실행되지 않게하는것.
 * 자식의 경우엔 자식.delete();
 * 컴포넌트는 컴포넌트.delete();
 * 해서 하위 항목을 모두 delete()
 */



class GameObject extends HO {
    #keys;

    constructor() {
        super();
        this.childs = {};
        this.#keys = {};
    }

    get keys() {
        return this.#keys;
    }

    /**
     * GameObject에 구성요소(component)를 추가합니다.
     * @param {Component} component 추가할 component입니다.
     */
    addComponent(component) {
        if (!(component instanceof Component)) // component매개변수가 Component객체 인가?
            throw new Error("추가할 컴포넌트는 Component객체여야 합니다.");
        // 컴포넌트가 존재하는 컴포넌트인지 확인. 존재하면 추가
        for (let i = 0; i < Component.types.length; i++) {
            if (component instanceof Component.types[i]) {
                if (this[Component.keys[i]] !== undefined) // 이미 추가된 컴포넌트를 다시 추가하려 했을때
                    throw new Error("이미 추가된 컴포넌트는 다시 추가할 수 없습니다.");
                this.childs[component.id] = component; // 추가된 컴포넌트에 구조화 작업 진행
                this.#keys[component.id] = Component.keys[i];
                this[Component.keys[i]] = component;
                component.parent = this;
                break;
            }
            if (i === Component.types.length - 1) // 컴포넌트 타입 리스트와 맞는게 아무것도 없을때
                throw new Error("등록되지 않은 컴포넌트를 사용하셨습니다.");
        }
    }

    /**
     * GameObject에 자식(child)를 추가합니다.
     * @param {string} key 자식을 담을 key이름입니다.
     * @param {GameObject} child 추가할 child입니다.
     */
    addChild(key, child) {
        if (!(child instanceof GameObject))
            throw new Error("추가할 자식은 GameObject객체여야 합니다.");
        if (key in Component.keys)
            throw new Error("추가할 자식의 key는 Component의 key가 아니어야 합니다.");
        if (key in this)
            throw new Error("이미 사용된 key입니다.")
        this.childs[child.id] = child;
        this.#keys[child.id] = key;
        this[key] = child;
        child.parent = this;
    }
    
    /**
     * 이 GameObject와 모든 하위 GameObject들을 삭제합니다.
     */
    delete() { 
        super.delete();
        Object.values(this.childs).forEach(element => element.delete());
    }
}