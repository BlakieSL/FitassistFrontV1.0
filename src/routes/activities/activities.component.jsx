import {useEffect, useState, useContext} from "react";
import ActivityList from "../../components/activityList/activityList.component";
import {ApiContext} from "../../contexts/api.context";

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const { fetchActivities } = useContext(ApiContext);

    useEffect(() => {
        const fetchData = async () => {
          try{
              const activitiesData = await fetchActivities();
              setActivities(activitiesData);
          }  catch (error){
              console.error('Error fetching activities: ', error);
          }
        };
        fetchData();

    }, [fetchActivities]);

    return (
        <div>
            <h1>Activities List</h1>
            <ActivityList activities={activities} />
        </div>
    )
}

export default Activities;