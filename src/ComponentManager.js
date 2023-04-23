// html내용이 로드된 후 실행 (image등은 로드 안돼도 실행됨);
window.addEventListener("DOMContentLoaded", function() {
    setInterval(Update, 33);
});

/**
 * GameObject를 sort값(보통 Vector3.z값)을 이용해 오름차순으로 정렬합니다. 값이 같다면 나중에 추가된 값이 뒤에 옵니다.  
 * sort값은 따로 지정하지 않으면 0입니다.
 */
//const SortedGO = [];

/**
 * 지속적으로 호출되는 메인루프입니다.
 */
function UpdateLegacy() {
    // 모든 Behavior객체를 업데이트
    Behavior.instances.forEach(element => {
        element.Update();
    })
    // canvas 초기화
    GameCanvases.forEach(element => {
        element.ctx.clearRect(0, 0, 1600, 900);
    })
    // 정렬된 모든 GameObject들의 구성요소와 관련된 모든 메소드들을 실행
    SortedGO.forEach(element => {
        element.method.forEach(method => {
            element.object[method](); // method는 함수의 이름, 문자열
        })
    });
}

let debugMode = false;
function Update() {
    GameCanvas.instances.forEach(element => element.ctx.clearRect(0, 0, element.baseW, element.baseH));
    Transform.order.forEach(element => { // 일부 컴포넌트는 Transform.order(z값을 기준으로 오름차순 정렬)을 따라 렌더링
        const parent = Transform.instances[element].parent;
        if (!parent.Transform.absActivity) return;
        if (parent.Renderer && parent.Renderer.absActivity) Renderer.instances[parent.Renderer.id].render();
    });

    if (!debugMode) return;
    GameCanvas.instances.forEach(element => {
        if (element.debugColor) { 
            element.ctx.globalAlpha = 0.15;
            element.ctx.fillStyle = element.debugColor;
            element.ctx.fillRect(0, 0, element.baseW, element.baseH);
            element.ctx.restore();
            element.ctx.globalAlpha = 1;
        }
    });
}