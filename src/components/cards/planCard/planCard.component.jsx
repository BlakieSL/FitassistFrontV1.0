import TextOutputTitle from "../../textOutputTitle/textOutputTitle.component";

const PlanCard = ({ name }) => {
    return (
        <div>
            <TextOutputTitle id="planCardTitle" value={name} />
        </div>
    )
}

export default PlanCard;