import TextOutputTitle from "../../textOutputTitle/textOutputTitle.component";
import TextOutput from "../../textOutput/textOutput.component";
import React, {useContext} from "react";
import {ApiContext} from "../../../contexts/api.context";

const PlanDetails = ({ plan }) => {
    const { addPlanToUser } = useContext(ApiContext);

    const handleAddPlan= async () => {
        try{
            await addPlanToUser(plan.id);
        } catch (error){
            console.error('Error occurred during saving plan:', error);
        }
    };

    return (
        <div>
            <TextOutputTitle id="planTitle" value={plan.name}/>
            <TextOutput
                iconClass="fas fa-align-left"
                id="exerciseDescription"
                value={`Description: ${plan.description}`}
            />
            <TextOutput
                iconClass="fas fa-file-alt"
                id="exerciseText"
                value={`Text: ${plan.text}`}
            />
            <button id="addToSaved" onClick={handleAddPlan}>Save</button>
        </div>
    )
}

export default PlanDetails;