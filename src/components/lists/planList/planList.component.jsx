import {useNavigate} from "react-router-dom";
import PlanCard from "../../cards/planCard/planCard.component";

const PlanList = ({ plans }) => {
    const navigate = useNavigate();

    const handlePlanClick = (planId) => {
        navigate(`/plans/${planId}`);
    }

    return (
        <div>
            {plans.length > 0 ? (
                plans.map(plan => (
                    <div
                        key={plan.id}
                        className="plan-link"
                        onClick={() => handlePlanClick(plan.id)}
                        style={{ cursor: 'pointer'}}
                    >
                        <PlanCard name={plan.name} />
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}

export default PlanList;