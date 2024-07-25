import TextOutputTitle from "../../textOutputTitle/textOutputTitle.component";

const RecipeCard = ({ name }) => {
    return (
        <div>
            <TextOutputTitle id="recipeCardTitle" value={name} />
        </div>
    )
}
export default RecipeCard;