import { Input } from 'antd';
import React from 'react';

const InputComponent = ({ size, placeholder, style, bordered, ...rests }) => {
    return (
        <Input
            style={style}
            variant={bordered ? 'outlined' : 'borderless'}
            size={size}
            placeholder={placeholder}
            {...rests}
        />
    );
};

export default InputComponent;
