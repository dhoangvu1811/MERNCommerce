import { Spin } from 'antd';
import React from 'react';

const LoadingComponent = ({ children, isPending, delay = 500 }) => {
    return (
        <Spin spinning={isPending} delay={delay}>
            {children}
        </Spin>
    );
};

export default LoadingComponent;
