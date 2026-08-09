class ItemNode {

    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.node = null;
    }

    GenerateNode() {
        this.node = document.createElement("div");  // This div will hold the entire node
        this.node.setAttribute("style", `height: ${this.height}px; width: ${this.width}px;`);
        this.node.id = "recipe-node";
        this.node.classList.add("divdrag");
        this.node.appendChild(document.createTextNode("this is a node"));
    }
}
