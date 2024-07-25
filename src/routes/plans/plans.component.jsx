import {useContext, useEffect, useState} from "react";
import {ApiContext} from "../../contexts/api.context";
import PlanList from "../../components/lists/planList/planList.component";

const Plans = () => {
    const [plans, setPlans] = useState([]);
    const { fetchPlans } = useContext(ApiContext);

    useEffect(() => {
        const fetchData = async() => {
            try{
                const plansData = await fetchPlans();
                setPlans(plansData);
            } catch (error){
                console.error("Error fetching plans", error);
            }
        }
        fetchData();
    }, [fetchPlans]);

    return (
        <div>
            <h1>Plans List</h1>
            <PlanList plans={plans} />
        </div>
    )
}
export default Plans;