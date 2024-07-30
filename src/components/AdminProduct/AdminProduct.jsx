import { PlusCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { WrapperHeader } from './AdminProductStyle';
import TableComponent from '../TableComponent/TableComponent';

const AdminProduct = () => {
    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button
                    style={{
                        height: '150px',
                        width: '150px',
                        borderRadius: '6px',
                        borderStyle: 'dashed',
                    }}
                >
                    <PlusCircleFilled style={{ fontSize: '4rem' }} />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent />
            </div>
        </div>
    );
};

export default AdminProduct;
