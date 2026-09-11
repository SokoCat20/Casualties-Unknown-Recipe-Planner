class ItemNode {

    data = null;                // item JSON data from items.json
    height = null;
    width = null; 
    nodeID = null;              // The location of this node in the nodeList array. Also stored as the last character in the ID of this node's first element.

    // Decorative
    ingrediantPinImage = null;  // Link to the image for ingrediant pins
    recipePinImage = null;      // Link to the image for recipe pins
    qualityPinImage = null;     // Link to the image for quality-type ingrediant pins

    // Elements
    node;

    // Other
    mousePos = [0, 0];
    offset = [0, 0];
    mouseDown = false;
    mouseStartPos = [0, 0];

    constructor(data, height, width, ingrediantPinImage, recipePinImage, qualityPinImage, nodeID) {
        this.data = data;                               // item JSON data from items.json
        this.height = height;
        this.width = width; 
        this.nodeID = nodeID;

        // Decorative
        this.ingrediantPinImage = ingrediantPinImage;   // Link to the image for ingrediant pins
        this.recipePinImage = recipePinImage;           // Link to the image for recipe pins
        this.qualityPinImage = qualityPinImage;         // Link to the image for quality-type ingrediant pins
    }

    GenerateNode() {

        /***** Create node *****/

        this.node = document.createElement("div");  // This div will hold the entire node
        this.node.setAttribute("style", `height: ${this.height}px; width: ${this.width}px;`);
        this.node.class = "recipe-node";
        this.node.id = `recipe-node-${this.nodeID}`;
        this.node.draggable = "true";
        //this.node.classList.add("divdrag");

        /***** Create title *****/
         
        let titleDiv = document.createElement("div");
        this.node.appendChild(titleDiv);
        titleDiv.id = "title-div"; 

        let title = document.createElement("p");
        titleDiv.appendChild(title);
        title.id = "node-title";
        title.textContent = this.data.name;

        /*let dragButton = document.createElement("button");
        titleDiv.appendChild(dragButton);
        dragButton.id = "drag-button";
        dragButton.textContent = "drag";*/

        // Add ability to drag with mouse

        // from https://jsfiddle.net/f5EMT/1/

        /*this.node.titleDiv.addEventListener("mousedown", function (e) {
            this.mouseDown = true;
            //this.offset = [this.node.left - e.clientX, this.node.style.top - e.clientY];
            this.offset = [e.clientX, e.clientY];
        }, true);

        this.node.addEventListener("mouseup", function () {
            this.mouseDown = false;
        }, true);

        this.node.addEventListener("mousemove", function (e) {
            e.preventDefault();

            if (this.mouseDown) {
                this.mousePos = [e.clientX, e.clientY];
                this.node.style.left = (this.mousePosition[0] + this.offset[0]) + 'px';
                this.node.style.top = (this.mousePosition[1] + this.offset[1]) + 'px';
            }
        }, true);*/

        // attempt to combine https://jsfiddle.net/f5EMT/1/ and https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable

        /*titleDiv.addEventListener("mousedown", function (e) {
            e.preventDefault();
            this.mouseDown = true;
            //this.offset = [this.node.left - e.clientX, this.node.style.top - e.clientY];
            this.mouseStartPos = [e.clientX, e.clientY];
        }, true);

        titleDiv.addEventListener("mouseup", function () {
            this.mouseDown = false;
        }, true);

        titleDiv.addEventListener("mousemove", function (e) {
            e.preventDefault();

            if (this.mouseDown) {
                this.mousePos = [this.mouseStartPos[0] - e.clientX, this.mouseStartPos[1] - e.clientY];
                this.mouseStartPos = [e.clientX, e.clientY];

                this.node.setAttribute("style", `left: ${(this.node.offsetLeft - this.mouseStartPos[0])} + 'px'`)
                this.node.setAttribute("style", `top: ${(this.node.offsetTop - this.mouseStartPos[1])} + 'px'`)
            }
        }, true);*/

        /***** Create pins *****/
        // TO DO: Implement functionality for multiple recipes by making buttons to cycle through
        //        recipes and an input to get a specific one in the list by number.  Input should
        //        update when cycling to show the current recipe number. There should be a "gen chart"
        //        button. "gen chart" generates a flowchart for the recipe. For now it just uses the
        //        first recipe.

        let pinsDiv = document.createElement("div");
        this.node.appendChild(pinsDiv);
        pinsDiv.id = "all-pins";

        // Ingrediant pins

        if (this.data.recipes.length > 0) { 

            let currRecipe = this.data.recipes[0];
            let pinCount = currRecipe.ingredients.length;
            let list = document.createElement("div");
            pinsDiv.appendChild(list);

            list.id = "ingrediant-pins";

            for (let i = 0; i < pinCount; i++) {
                let currIng = currRecipe.ingredients[i];

                // Item div
                let listItem = document.createElement("div");
                list.appendChild(listItem);

                // Image
                let listItemImage = document.createElement("img");
                listItem.appendChild(listItemImage);

                if (currIng.craftingQualities.length == 0) {
                    listItemImage.src = this.ingrediantPinImage;
                    listItemImage.id = "ing-pin-image";
                }
                else {
                    listItemImage.src = this.qualityPinImage;
                    listItemImage.id = "qua-pin-image";
                }

                // Text
                let itemText = document.createElement("p");
                listItem.appendChild(itemText);
                itemText.id = "pin-text";

                if (currIng.craftingQualities.length == 0) {
                    itemText.textContent = `${currIng.name} (${currIng.amount})`;
                }
                else {
                    let currQuality = currIng.craftingQualities[0]; 
                    let unit = ``;

                    if (currQuality.amount != null) unit = `${currQuality.amount}`;
                    else unit = `${currQuality.percent}%`

                    itemText.textContent = `${currQuality.quality} (${unit})`;
                }
            }
        }

        // Recipe pin (acts as an "output")

        let recPin = document.createElement("div");
        pinsDiv.appendChild(recPin);
        recPin.id = "recipe-pin";

        let recPinImage = document.createElement("img");
        recPin.appendChild(recPinImage);
        recPinImage.src = this.recipePinImage;
        recPinImage.id = "rec-pin-image";
    }

    // from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable

    /*DragMouseDown(e) {
        e.preventDefault();

        let nodeObj = getNode(this.id);

        // Get mouse position at startup
        nodeObj.mouseStartPos = [e.clientX, e.clientY];

        document.onmouseup = nodeObj.StopDragging;

        // Call function whenever cursor moves
        document.onmousemove = nodeObj.NodeDrag;
    }

    NodeDrag(e) {
        e.preventDefault();

        let nodeObj = getNode(this.id);

        // calculate new cursor position
        nodeObj.mousePos = [nodeObj.mouseStartPos[0] - e.clientX, nodeObj.mouseStartPos[1] - e.clientY];
        nodeObj.mouseStartPos = [e.clientX, e.clientY];

        // set the node's new position
        nodeObj.node.style.left = (nodeObj.node.offsetLeft - nodeObj.mousePos[0]) + "px";
        nodeObj.node.style.top = (nodeObj.node.offsetTop - nodeObj.mousePos[1]) + "px";
    }

    StopDragging() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }*/
}
