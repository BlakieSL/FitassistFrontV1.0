import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ApiContext} from "../../contexts/api.context";
import PlanDetails from "../../components/cards/planCard/planDetailsCard.component";

const Plan = () => {
    const { id} = useParams();
    const [plan, setPlan] = useState(null);
    const { fetchPlanById } = useContext(ApiContext);

    useEffect(() => {
        const fetchPlan = async () => {
            try{
                const planData = await fetchPlanById(id);
                setPlan(planData);
            } catch (error){
                console.error("Error fetching plan:",error);
            }
        }
        fetchPlan();
    }, [id, fetchPlanById]);

    if(!plan){
        return <p>Loading...</p>
    }

    return <PlanDetails plan={plan} />
}
export default Plan;