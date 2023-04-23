const mainCanvas = GameCanvas.load("main-canvas");
const subCanvas = GameCanvas.load("sub-canvas", 800, 450, 0.5);
mainCanvas.debugColor = "#ff0000";
subCanvas.debugColor = "#00ff00";
debugMode = true;

const startScene = new StartScene();

// gameObject.delete() 를 어떻게 하지??


/**
 * const canvas = GameCanvas.load("main-canvas");
 * 
 * let button = new Button(new Vector3());
 * button.active(); // button에는 active, inactive, delete가 있다.
 * 
 * 
 * 
 * 
 * class Active {
 *      get active
 * // 하나라도 false가 있으면 false를 반환하는거지
 * }
 * 
 * 그럼 active도 parent가 있겠네?
 * vector도 parent가 있고
 * 공통되겠네?
 * 그럼 gameObject에 넣으면 되나?
 * 
 * 
 * 
 * 
 */