import ActivityCard from "../activityCard/activityCard.component";

const ActivityList = ({ activities }) => {
    return (
        <div>
            {activities.length > 0? (
                activities.map(activity => (
                    <a href={`/activity/${activity.id}`} className="activity-link" key={activity.id}>
                        <ActivityCard name={activity.name} met={activity.met} />
                    </a>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default ActivityList;