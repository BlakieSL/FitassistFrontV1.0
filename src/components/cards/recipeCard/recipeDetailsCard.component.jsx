import TextOutputTitle from "../../textOutputTitle/textOutputTitle.component";
import TextOutput from "../../textOutput/textOutput.component";
import React from "react";

const RecipeDetails = ({ recipe }) => {
    return (
        <div>
            <TextOutputTitle id="recipeTitle" value={recipe.name} />
            <TextOutput
                iconClass="fas fa-align-left"
                id="exerciseDescription"
                value={`Description: ${recipe.description}`}
            />
            <TextOutput
                iconClass="fas fa-file-alt"
                id="exerciseText"
                value={`Text: ${recipe.text}`}
            />
        </div>
    )
}
export default RecipeDetails;