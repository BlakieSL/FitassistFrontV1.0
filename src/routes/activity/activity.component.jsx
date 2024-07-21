import {useContext, useState, useEffect} from "react";
import { useParams} from "react-router-dom";
import ActivityDetails from "../../components/activityCard/activityDetailsCard.component";
import { ApiContext} from "../../contexts/api.context";

const Activity = () => {
    const { id} = useParams();
    const [ activity, setActivity ] = useState(null);
    const { fetchActivityById } = useContext(ApiContext);

    useEffect(() => {
        const fetchActivity = async () => {
            try{
                const activityData = await fetchActivityById(id);
                setActivity(activityData);
            } catch(error){
                console.error('Error fetching activity:', error);
            }
        };
        fetchActivity();
    },[id,fetchActivityById]);

    if(!activity){
        return <p>Loading...</p>
    }

    return <ActivityDetails activity={activity} />
}

export default Activity