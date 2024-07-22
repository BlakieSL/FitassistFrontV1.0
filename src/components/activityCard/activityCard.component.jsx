import TextOutput from "../textOutput/textOutput.component";
import TextOutputTitle from "../textOutputTitle/textOutputTitle.component";
const ActivityCard = ({name, met }) => {
    return (
        <div>
            <TextOutputTitle id="activityCardTitle" value={name}/>
            <TextOutput
                iconClass="fas fa-bolt"
                id="activityMet"
                value={`MET: ${met}`}
            />
        </div>
    )
}

export default ActivityCard;