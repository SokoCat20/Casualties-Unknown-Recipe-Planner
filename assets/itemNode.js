class ItemNode {

    constructor(data, height, width, ingrediantPinImage, recipePinImage, qualityPinImage) {
        this.data = data;                               // item JSON data from items.json
        this.height = height;
        this.width = width; 

        // Decorative
        this.ingrediantPinImage = ingrediantPinImage;   // Link to the image for ingrediant pins
        this.recipePinImage = recipePinImage;           // Link to the image for recipe pins
        this.qualityPinImage = qualityPinImage;         // Link to the image for quality-type ingrediant pins

        // Elements
        this.node = null;
    }

    GenerateNode() {

        /***** Create node *****/

        this.node = document.createElement("div");  // This div will hold the entire node
        this.node.setAttribute("style", `height: ${this.height}px; width: ${this.width}px;`);
        this.node.id = "recipe-node";
        this.node.classList.add("divdrag");

        /***** Create title *****/

        let titleDiv = document.createElement("div");
        this.node.appendChild(titleDiv);
        titleDiv.id = "title-div";

        let title = document.createElement("p");
        titleDiv.appendChild(title);
        title.id = "node-title";
        title.textContent = this.data.name;

        let dragButton = document.createElement("button");
        titleDiv.appendChild(dragButton);
        dragButton.id = "drag-button";
        dragButton.textContent = "drag";
        dragButton.setAttribute("onclick", "mouseData.DragNode(this)");

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
}
