import React from 'react';
import { useNavigate } from 'react-router-dom';

const GenericList = ({ items, ItemComponent, itemKey, itemProps, routePrefix }) => {
    const navigate = useNavigate();

    const handleItemClick = (itemId) => {
        navigate(`/${routePrefix}/${itemId}`);
    }

    return (
        <div>
            {items.length > 0 ? (
                items.map(item => (
                    <div
                        key={item[itemKey]}
                        className={`${routePrefix}-link`}
                        onClick={() => handleItemClick(item[itemKey])}
                        style={{ cursor: 'pointer' }}
                    >
                        <ItemComponent {...itemProps(item)} />
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}

export default GenericList;
