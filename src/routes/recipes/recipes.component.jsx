import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../contexts/api.context";
import RecipeList from "../../components/lists/recipeList/recipeList.component";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const { fetchRecipes } = useContext(ApiContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipesData = await fetchRecipes();
                setRecipes(recipesData);
            } catch (error) {
                console.error("Error fetching recipes", error);
            }
        };
        fetchData();
    }, [fetchRecipes]);

    return (
        <div>
            <h1>Recipes List</h1>
            <RecipeList recipes={recipes} />
        </div>
    );
};

export default Recipes;
