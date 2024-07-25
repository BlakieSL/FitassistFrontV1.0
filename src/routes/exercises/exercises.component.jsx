import {useContext, useEffect, useState} from "react";
import {ApiContext} from "../../contexts/api.context";
import ExerciseList from "../../components/lists/exerciseList/exerciseList.component";

const Exercises = () => {
    const [exercises, setExercises] = useState([]);
    const { fetchExercises } = useContext(ApiContext);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const exercisesData = await fetchExercises();
                setExercises(exercisesData);
            } catch (error){
                console.error("Error fetching exercises",error)
            }
        };
        fetchData();
    },[fetchExercises]);

    return (
        <div>
            <h1>Exercises List</h1>
            <ExerciseList exercises={exercises} />
        </div>
    );
}
export default Exercises;