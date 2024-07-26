import { Input } from 'antd';
import React from 'react';

const InputForm = ({ placeholder, type, ...rest }) => {
    if (type === 'password') {
        return <Input.Password placeholder={placeholder} {...rest} />;
    } else if (type === 'confirmPassword') {
        return <Input.Password placeholder={placeholder} {...rest} />;
    } else {
        return <Input placeholder={placeholder} {...rest} />;
    }
};

export default InputForm;
