import { Input } from 'antd';
import React, { useState } from 'react';

const InputForm = ({ placeholder, type, ...rest }) => {
    const [valueInput, setValueInput] = useState('');
    const [valuePass, setValuePass] = useState('');
    const [valuePassConfirm, setValuePassConfirm] = useState('');
    const handleInputValue = (e) => {
        setValueInput(e.target.value);
    };
    const handleInputPass = (e) => {
        setValuePass(e.target.value);
    };
    const handleInputPassConfirm = (e) => {
        setValuePassConfirm(e.target.value);
    };
    if (type === 'password') {
        return (
            <Input.Password
                placeholder={placeholder}
                {...rest}
                value={valuePass}
                onChange={handleInputPass}
            />
        );
    } else if (type === 'passwordConfirm') {
        return (
            <Input.Password
                placeholder={placeholder}
                {...rest}
                value={valuePassConfirm}
                onChange={handleInputPassConfirm}
            />
        );
    } else {
        return (
            <Input
                placeholder={placeholder}
                {...rest}
                value={valueInput}
                onChange={handleInputValue}
            />
        );
    }
};

export default InputForm;
