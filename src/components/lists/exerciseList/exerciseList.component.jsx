import React from 'react';
import ExerciseCard from '../../cards/exerciseCard/exerciseCard.component';
import { useNavigate } from 'react-router-dom';

const ExerciseList = ({ exercises }) => {
    const navigate = useNavigate();

    const handleExerciseClick = (exerciseId) => {
        navigate(`/exercises/${exerciseId}`);
    }

    return (
        <div>
            {exercises.length > 0 ? (
                exercises.map(exercise => (
                    <div
                        key={exercise.id}
                        className="exercise-link"
                        onClick={() => handleExerciseClick(exercise.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <ExerciseCard name={exercise.name} />
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}

export default ExerciseList;
