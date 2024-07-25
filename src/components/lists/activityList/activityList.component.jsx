import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityCard from '../../cards/activityCard/activityCard.component';

const ActivityList = ({ activities }) => {
    const navigate = useNavigate();

    const handleActivityClick = (activityId) => {
        navigate(`/activity/${activityId}`);
    };

    return (
        <div>
            {activities.length > 0 ? (
                activities.map(activity => (
                    <div
                        key={activity.id}
                        className="activity-link"
                        onClick={() => handleActivityClick(activity.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <ActivityCard name={activity.name} met={activity.met} />
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default ActivityList;
