import React from 'react';
import {
    WrapperContent,
    WrapperLabelText,
    WrapperTextPrice,
    WrapperTextValue,
} from './NavbarStyle';
import { Checkbox, Rate } from 'antd';

const NavbarComponent = () => {
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option, index) => {
                    return (
                        <WrapperTextValue key={index}>
                            {option}
                        </WrapperTextValue>
                    );
                });
            case 'checkbox':
                return (
                    <Checkbox.Group
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}
                    >
                        {options.map((option, index) => {
                            return (
                                <Checkbox key={index} value={option.value}>
                                    {option.label}
                                </Checkbox>
                            );
                        })}
                    </Checkbox.Group>
                );
            case 'star':
                return options.map((option, index) => {
                    return (
                        <div
                            key={index}
                            style={{ display: 'flex', gap: '10px' }}
                        >
                            <Rate
                                style={{
                                    fontSize: '12px',
                                }}
                                disabled
                                defaultValue={option}
                            />
                            <span>từ {option} sao</span>
                        </div>
                    );
                });
            case 'price':
                return options.map((option, index) => {
                    return (
                        <WrapperTextPrice key={index}>
                            {option}
                        </WrapperTextPrice>
                    );
                });
            default:
                return {};
        }
    };
    return (
        <div>
            <WrapperLabelText>Label</WrapperLabelText>
            <WrapperContent>
                {renderContent('text', ['Tu lanh', 'TV', 'May giac'])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('checkbox', [
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B' },
                    { value: 'c', label: 'C' },
                ])}
            </WrapperContent>
            <WrapperContent>{renderContent('star', [3, 4, 5])}</WrapperContent>
            <WrapperContent>
                {renderContent('price', ['dưới 40.000', 'trên 50.000'])}
            </WrapperContent>
        </div>
    );
};

export default NavbarComponent;
