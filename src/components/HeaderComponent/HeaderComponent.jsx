import React from 'react';
import { Badge, Col } from 'antd';
import {
    WrapperHeader,
    WrapperHeaderAccount,
    WrapperIconHeader,
    WrapperTextHeader,
    WrapperTextHeaderSmall,
} from './HeaderStyles';
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
const HeaderComponent = () => {
    return (
        <div
            style={{
                width: '100%',
                background: 'rgb(26,148,255)',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <WrapperHeader>
                <Col span={5}>
                    <WrapperTextHeader>THUCTAPTHUCTE</WrapperTextHeader>
                </Col>
                <Col span={13}>
                    <ButtonInputSearch
                        size='large'
                        textButton='Tìm kiếm'
                        placeholder='Tìm sản phẩm mong muốn...'
                        backgroundColorInput='#fff'
                        backgroundColorButton='#0f60b8'
                        colorButton='#fff'
                        bordered={false}
                    />
                </Col>
                <Col
                    span={6}
                    style={{
                        display: 'flex',
                        gap: '54px',
                        alignItems: 'center',
                    }}
                >
                    <WrapperHeaderAccount>
                        <WrapperIconHeader>
                            <UserOutlined style={{ fontSize: '3rem' }} />
                        </WrapperIconHeader>
                        <div>
                            <WrapperTextHeaderSmall>
                                Đăng nhập/Đăng ký
                            </WrapperTextHeaderSmall>
                            <div>
                                <WrapperTextHeaderSmall>
                                    Tài khoản
                                </WrapperTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>
                        </div>
                    </WrapperHeaderAccount>
                    <div>
                        <Badge count={4} size='small'>
                            <WrapperIconHeader>
                                <ShoppingCartOutlined />
                            </WrapperIconHeader>
                        </Badge>
                        <WrapperTextHeaderSmall>
                            Giỏ hàng
                        </WrapperTextHeaderSmall>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    );
};

export default HeaderComponent;
