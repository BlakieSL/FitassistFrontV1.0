import TextOutputTitle from "../../textOutputTitle/textOutputTitle.component";

const ExerciseCard = ({ name }) => {
    return (
        <div>
            <TextOutputTitle id="exerciseCardTitle" value={name} />
        </div>
    )
};

export default ExerciseCard;