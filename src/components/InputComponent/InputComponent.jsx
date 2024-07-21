import { Input } from 'antd';
import React from 'react';

const InputComponent = ({
    size,
    placeholder,
    styleInput,
    bordered,
    ...rests
}) => {
    return (
        <Input
            style={styleInput}
            variant={bordered ? 'outlined' : 'borderless'}
            size={size}
            placeholder={placeholder}
            {...rests}
        />
    );
};

export default InputComponent;
