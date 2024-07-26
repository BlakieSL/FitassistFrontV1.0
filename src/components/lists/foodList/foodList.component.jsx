import React from 'react';
import FoodCard from '../../cards/foodCard/foodCard.component';
import GenericList from '../genericList/genericList.component';

const FoodList = ({ foods }) => {
    return (
        <GenericList
            items={foods}
            ItemComponent={FoodCard}
            itemKey="id"
            itemProps={(food) => ({ name: food.name, calories: food.calories })}
            routePrefix="foods"
        />
    );
}

export default FoodList;
