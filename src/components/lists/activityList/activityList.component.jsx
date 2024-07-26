import React from 'react';
import ActivityCard from '../../cards/activityCard/activityCard.component';
import GenericList from '../genericList/genericList.component';

const ActivityList = ({ activities }) => {
    return (
        <GenericList
            items={activities}
            ItemComponent={ActivityCard}
            itemKey="id"
            itemProps={(activity) => ({ name: activity.name, met: activity.met })}
            routePrefix="activities"
        />
    );
}

export default ActivityList;
