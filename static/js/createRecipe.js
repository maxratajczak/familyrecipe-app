
$("#nameCounter").text($("#recipeName").val().length)

$("#recipeName").keyup(function() {
    $("#nameCounter").text($("#recipeName").val().length)
})

var ingredientInput = `<div class="ingredientContainer">
<button class="removeIngredient"><i class="fas fa-times"></i></button>
<label for="ingredients" hidden>Ingredient</label>
<input type="text" name="ingredients[]" id="ingredients" class="inputField" placeholder="e.g. 3 Tbsp. sweet paprika" autocomplete="off" required>
</div>`;

var directionInput = `<div class="directionContainer">
<button class="removeDirection"><i class="fas fa-times"></i></button>
<label for="directions" hidden>Direction</label>
<input type="text" name="directions[]" id="directions" class="inputField" placeholder="e.g. Marinate chicken breasts for 3 hours" autocomplete="off" required>
</div>`;


$("#addIngredient").click(function() {
    $("#addIngredient").before(ingredientInput);
});

$(document).on("click", ".removeIngredient", function() {
    $(this).closest(".ingredientContainer").remove();
});


$("#addDirection").click(function() {
    $("#addDirection").before(directionInput);
});

$(document).on("click", ".removeDirection", function() {
    $(this).closest(".directionContainer").remove();
});