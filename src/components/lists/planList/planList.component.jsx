import React from 'react';
import PlanCard from '../../cards/planCard/planCard.component';
import GenericList from '../genericList/genericList.component';

const PlanList = ({ plans }) => {
    return (
        <GenericList
            items={plans}
            ItemComponent={PlanCard}
            itemKey="id"
            itemProps={(plan) => ({ name: plan.name })}
            routePrefix="plans"
        />
    );
}

export default PlanList;
