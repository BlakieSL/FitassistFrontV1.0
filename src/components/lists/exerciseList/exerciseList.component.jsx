import React from 'react';
import ExerciseCard from '../../cards/exerciseCard/exerciseCard.component';
import GenericList from '../genericList/genericList.component';

const ExerciseList = ({ exercises }) => {
    return (
        <GenericList
            items={exercises}
            ItemComponent={ExerciseCard}
            itemKey="id"
            itemProps={(exercise) => ({ name: exercise.name })}
            routePrefix="exercises"
        />
    );
}

export default ExerciseList;
