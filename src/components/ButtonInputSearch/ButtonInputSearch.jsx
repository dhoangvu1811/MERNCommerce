import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';

const ButtonInputSearch = (props) => {
    const {
        size,
        placeholder,
        textButton,
        backgroundColorInput,
        colorButton,
        backgroundColorButton,
    } = props;
    return (
        <div style={{ display: 'flex' }}>
            <Input
                style={{
                    borderTopRightRadius: '0',
                    borderBottomRightRadius: '0',
                    backgroundColor: backgroundColorInput,
                }}
                variant='borderless'
                size={size}
                placeholder={placeholder}
            />
            <Button
                style={{
                    borderTopLeftRadius: '0',
                    borderBottomLeftRadius: '0',
                    border: 'none',
                    backgroundColor: backgroundColorButton,
                    color: colorButton,
                }}
                size={size}
                icon={<SearchOutlined />}
            >
                {textButton}
            </Button>
        </div>
    );
};

export default ButtonInputSearch;
