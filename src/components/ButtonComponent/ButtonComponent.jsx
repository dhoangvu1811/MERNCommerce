import { Button } from 'antd';
import React from 'react';

const ButtonComponent = ({
    size,
    textButton,
    icon,
    styleButton,
    styleTextButton,
    ...rests
}) => {
    return (
        <Button style={styleButton} size={size} icon={icon} {...rests}>
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    );
};

export default ButtonComponent;
