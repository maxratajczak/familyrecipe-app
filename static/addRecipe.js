
document.querySelector("#addIngredient").onclick = () => {
    var test = document.createElement("input")
    
    test.type = "text";
    test.name = "ingredients";
    document.querySelector("#ingredientList").appendChild(test);
    document.querySelector("#ingredientList").appendChild(document.createElement("br"))

}
