// JavaScript source code

class MouseData {

    constructor() {
        let mousePos = null;
    }

    CalcMousePos(event) {
        mousePos = {
            x: event.clientX,
            y: event.clientY
        }
    }
    
    dragNode(node) {
        node.pos = mousePos;
    }
}
