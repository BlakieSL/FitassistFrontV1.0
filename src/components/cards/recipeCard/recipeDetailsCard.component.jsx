import TextOutputTitle from "../../textOutputTitle/textOutputTitle.component";
import TextOutput from "../../textOutput/textOutput.component";
import React, {useContext, useState} from "react";
import {ApiContext} from "../../../contexts/api.context";

const RecipeDetails = ({ recipe }) => {
    const { addRecipeToUser } = useContext(ApiContext);

    const handleAddRecipe = async () => {
        try{
            await addRecipeToUser(recipe.id);
        } catch (error){
            console.error('Error occurred during saving recipe:', error);
        }
    };

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
            <button id="addToSaved" onClick={handleAddRecipe}>Save</button>
        </div>
    )
}
export default RecipeDetails;