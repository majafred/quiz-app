import React from 'react';

function ListItem({ id, value, checked, disabled, onChange }) {
    return (
        <div className='list-item'>
            <input
                type='radio'
                id={id}
                value={value}
                checked={checked === id}
                disabled={disabled}
                onChange={() => onChange(id)}
            />
            <label className='list-item--label' htmlFor={id}>{value}</label>
        </div>
    );
}

export default ListItem;