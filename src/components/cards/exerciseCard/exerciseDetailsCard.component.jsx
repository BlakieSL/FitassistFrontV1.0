import React from 'react';
import TextOutput from '../../textOutput/textOutput.component';
import TextOutputTitle from "../../textOutputTitle/textOutputTitle.component";

const ExerciseDetails = ({ exercise }) => {
    return (
        <div>
            <TextOutputTitle id="exerciseTitle" value={exercise.name} />
            <TextOutput
                iconClass="fas fa-align-left"
                id="exerciseDescription"
                value={`Description: ${exercise.description}`}
            />
            <TextOutput
                iconClass="fas fa-file-alt"
                id="exerciseText"
                value={`Text: ${exercise.text}`}
            />
        </div>
    );
};

export default ExerciseDetails;
