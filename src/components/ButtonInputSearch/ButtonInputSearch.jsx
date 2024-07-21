import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
    const {
        size,
        placeholder,
        textButton,
        backgroundColorInput,
        colorButton,
        backgroundColorButton,
        bordered,
    } = props;
    return (
        <div style={{ display: 'flex' }}>
            <InputComponent
                styleInput={{
                    borderTopRightRadius: '0',
                    borderBottomRightRadius: '0',
                    backgroundColor: backgroundColorInput,
                }}
                bordered={bordered}
                size={size}
                placeholder={placeholder}
            />
            <ButtonComponent
                styleButton={{
                    borderTopLeftRadius: '0',
                    borderBottomLeftRadius: '0',
                    border: 'none',
                    backgroundColor: backgroundColorButton,
                    color: colorButton,
                }}
                size={size}
                icon={<SearchOutlined />}
                textButton={textButton}
            />
        </div>
    );
};

export default ButtonInputSearch;
