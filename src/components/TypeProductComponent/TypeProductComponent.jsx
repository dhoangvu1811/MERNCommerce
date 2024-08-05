import React from 'react';
import { useNavigate } from 'react-router-dom';

const TypeProductComponent = ({ name }) => {
    const navigate = useNavigate();
    const handleNavigateType = () => {
        //loại bỏ dấu tiếng việt và thay thế dấu cách bằng dấu gạch ngang
        navigate(
            `/product/${name
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                ?.replace(/ /g, '-')}`,
            { state: { name } }
        );
    };

    return (
        <div
            style={{ padding: '0 10px', cursor: 'pointer', fontSize: '1.5rem' }}
            onClick={handleNavigateType}
        >
            {name}
        </div>
    );
};

export default TypeProductComponent;
