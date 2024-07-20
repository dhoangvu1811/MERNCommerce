import { Button } from 'antd';
import React from 'react';

const ButtonComponent = ({
    size,
    backgroundColorButton,
    colorButton,
    textButton,
    icon,
    style,
    ...rests
}) => {
    return (
        <Button style={style} size={size} icon={icon} {...rests}>
            {textButton}
        </Button>
    );
};

export default ButtonComponent;
