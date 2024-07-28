import React from 'react';
import { Badge, Col, message, Popover } from 'antd';
import {
    WrapperContentPopup,
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
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { logoutUser } from '../../redux/slices/userSlice';

const HeaderComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Hook message để hiển thị thông báo
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Đăng xuất thành công',
        });
    };
    // Lấy dữ liệu user từ store global
    const user = useSelector((state) => state.user);

    const handleNavigateLogin = () => {
        navigate('/sign-in');
    };
    const handleLogout = async () => {
        const response = await UserService.logoutUser();
        if (response.status === 'success') {
            localStorage.removeItem('access_token');
            dispatch(logoutUser());
            success();
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    };
    const content = (
        <div>
            <WrapperContentPopup onClick={() => navigate('/profile-user')}>
                Thông tin người dùng
            </WrapperContentPopup>
            <WrapperContentPopup onClick={handleLogout}>
                Đăng xuất
            </WrapperContentPopup>
        </div>
    );
    return (
        <>
            {contextHolder}
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
                            {user?.access_token ? (
                                <div>
                                    <Popover
                                        placement='bottom'
                                        trigger='click'
                                        content={content}
                                    >
                                        <WrapperTextHeaderSmall>
                                            {user?.name || user?.email}
                                        </WrapperTextHeaderSmall>
                                    </Popover>
                                </div>
                            ) : (
                                <div>
                                    <WrapperTextHeaderSmall
                                        onClick={handleNavigateLogin}
                                    >
                                        Đăng nhập/Đăng ký
                                    </WrapperTextHeaderSmall>
                                    <div>
                                        <WrapperTextHeaderSmall>
                                            Tài khoản
                                        </WrapperTextHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}
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
        </>
    );
};

export default HeaderComponent;
