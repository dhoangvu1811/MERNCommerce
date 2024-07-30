import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { getLevelKeys } from '../../until';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
const items = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: 'Người dùng',
    },
    {
        key: '2',
        icon: <AppstoreOutlined />,
        label: 'Sản phẩm',
    },
    {
        key: '3',
        icon: <SettingOutlined />,
        label: 'Cài đặt',
    },
];

const levelKeys = getLevelKeys(items);
const AdminPage = () => {
    const [keySelected, setKeySelected] = useState('');
    const renderPage = (key) => {
        switch (key) {
            case '1':
                return <AdminUser />;
            case '2':
                return <AdminProduct />;
            default:
                return <></>;
        }
    };

    const handleOnClick = ({ key }) => {
        setKeySelected(key);
    };
    console.log('keySelected', keySelected);
    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{ display: 'flex' }}>
                <Menu
                    mode='inline'
                    defaultSelectedKeys={['1']}
                    onClick={handleOnClick}
                    style={{
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                        width: '256px',
                        height: '100vh',
                    }}
                    items={items}
                />
                <div style={{ flex: '1', padding: '15px' }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    );
};

export default AdminPage;
