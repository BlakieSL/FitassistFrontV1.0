import React from 'react';
import RecipeCard from '../../cards/recipeCard/recipeCard.component';
import GenericList from '../genericList/genericList.component';

const RecipeList = ({ recipes }) => {
    return (
        <GenericList
            items={recipes}
            ItemComponent={RecipeCard}
            itemKey="id"
            itemProps={(recipe) => ({ name: recipe.name })}
            routePrefix="recipes"
        />
    );
}

export default RecipeList;
