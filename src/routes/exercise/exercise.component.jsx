import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ApiContext} from "../../contexts/api.context";
import ExerciseDetails from "../../components/cards/exerciseCard/exerciseDetailsCard.component";

const Exercise = () => {
    const { id } = useParams();
    const [exercise, setExercise] = useState(null);
    const { fetchExerciseById } = useContext(ApiContext);

    useEffect(() => {
        const fetchExercise = async () => {
            try{
                const exerciseData = await fetchExerciseById(id);
                setExercise(exerciseData);
            } catch (error){
                console.error('Error fetching food:',error);
            }
        }
        fetchExercise();
    }, [id, fetchExerciseById]);

    if(!exercise){
        return <p>Loading...</p>
    }

    return <ExerciseDetails exercise={exercise} />;
}

export default Exercise;