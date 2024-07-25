import {useNavigate} from "react-router-dom";
import RecipeCard from "../../cards/recipeCard/recipeCard.component";

const RecipeList = ({ recipes}) => {
    const navigate = useNavigate();

    const handleRecipeClick = (recipeId) => {
        navigate(`/recipes/${recipeId}`);
    }

    return (
        <div>
            {recipes.length > 0 ? (
                recipes.map(plan => (
                    <div
                        key={plan.id}
                        className="plan-link"
                        onClick={() => handleRecipeClick(plan.id)}
                        style={{ cursor: 'pointer'}}
                    >
                        <RecipeCard name={plan.name} />
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}
export default RecipeList;