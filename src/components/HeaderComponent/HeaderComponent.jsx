import React from 'react';
import { Col } from 'antd';
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
        <div>
            <WrapperHeader>
                <Col span={6}>
                    <WrapperTextHeader>THUCTAPTHUCTE</WrapperTextHeader>
                </Col>
                <Col span={12}>
                    {/*  <Search
                        placeholder='input search text'
                        // onSearch={onSearch}
                        enterButton
                        allowClear
                    /> */}
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
                <Col span={6} style={{ display: 'flex', gap: '20px' }}>
                    <WrapperHeaderAccount>
                        <WrapperIconHeader>
                            <UserOutlined />
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
                        <WrapperIconHeader>
                            <ShoppingCartOutlined />
                        </WrapperIconHeader>
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
