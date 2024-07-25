import TextOutputTitle from "../../textOutputTitle/textOutputTitle.component";
import TextOutput from "../../textOutput/textOutput.component";
import React from "react";

const PlanDetails = ({ plan }) => {
    return (
        <div>
            <TextOutputTitle id="planTitle" value={plan.name} />
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
        </div>
    )
}

export default PlanDetails;