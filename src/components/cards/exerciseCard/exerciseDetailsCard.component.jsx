import React, {useContext} from 'react';
import TextOutput from '../../textOutput/textOutput.component';
import TextOutputTitle from "../../textOutputTitle/textOutputTitle.component";
import {ApiContext} from "../../../contexts/api.context";

const ExerciseDetails = ({ exercise }) => {
    const { addExerciseToUser } = useContext(ApiContext);

    const handleAddExercise = async () => {
        try{
            await addExerciseToUser(exercise.id);
        } catch (error){
            console.error('Error occurred during saving recipe:',error);
        }
    }

    return (
        <div>
            <TextOutputTitle id="exerciseTitle" value={exercise.name}/>
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
            <button id="addToSaved" onClick={handleAddExercise}>Save</button>
        </div>
    );
};

export default ExerciseDetails;
