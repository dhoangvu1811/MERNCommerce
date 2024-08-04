import React from 'react';

const TypeProductComponent = ({ name }) => {
    return (
        <div
            style={{ padding: '0 10px', cursor: 'pointer', fontSize: '1.5rem' }}
        >
            {name}
        </div>
    );
};

export default TypeProductComponent;
