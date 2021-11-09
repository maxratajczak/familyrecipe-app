var recipesBttn = document.querySelector("#recipe-dropdown");
var dropdownMenu = document.querySelector("#landing-dropdown ul");

recipesBttn.addEventListener("mouseclick", () => {
    dropdownMenu.style.opacity = "100%";
});

function focus() {
    dropdownMenu.style.opacity = "100%";
}