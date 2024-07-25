import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../contexts/api.context";
import RecipeDetails from "../../components/cards/recipeCard/recipeDetailsCard.component";

const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const { fetchRecipeById } = useContext(ApiContext);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const recipeData = await fetchRecipeById(id);
                setRecipe(recipeData);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        };
        fetchRecipe();
    }, [id, fetchRecipeById]);

    if (!recipe) {
        return <p>Loading...</p>;
    }

    return <RecipeDetails recipe={recipe} />;
};

export default Recipe;
