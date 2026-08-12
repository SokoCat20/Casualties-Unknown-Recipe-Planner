class ItemNode {

    constructor(data, height, width) {
        this.data = data;       // item JSON data from items.json
        this.height = height;
        this.width = width;

        this.node = null;
    }

    GenerateNode() {
        this.node = document.createElement("div");  // This div will hold the entire node
        this.node.setAttribute("style", `height: ${this.height}px; width: ${this.width}px;`);
        this.node.id = "recipe-node";
        this.node.classList.add("divdrag");
        this.node.appendChild(document.createTextNode(this.data.name));

        // Create pins
        // TO DO: Implement functionality for multiple recipes by making buttons to cycle through
        //        recipes and an input to get a specific one in the list by number.  Input should
        //        update when cycling to show the current recipe number. There should be a "gen chart"
        //        button. "gen chart" generates a flowchart for the recipe. For now it just uses the
        //        first recipe.

        let currRecipe = this.data.recipes[0];
        let pinCount = currRecipe.ingredients.length;

        let list = document.createElement("ul");
        for (let i = 0; i < pinCount; i++) {
            let listItem = document.createElement("li");
            listItem.textContent = `${currRecipe.ingredients[i].name} (${currRecipe.ingredients[i].amount})`;
            list.appendChild(listItem);
        }
        this.node.appendChild(list);
    }
}
