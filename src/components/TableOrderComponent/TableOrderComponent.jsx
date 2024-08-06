import { Button, Modal, Table } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeAllOrderProduct } from '../../redux/slices/OrderSlice';

const TableOrderComponent = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const dispatch = useDispatch();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        if (selectedRowKeys.length > 0) {
            dispatch(removeAllOrderProduct({ products: selectedRowKeys }));
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const { dataTable, columnsTable } = props;
    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };
    return (
        <div>
            <Modal
                title='Xoá sản phẩm'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                Bạn có muốn xoá các sản phẩm đã chọn không?
            </Modal>
            <Table
                rowSelection={{
                    ...rowSelection,
                }}
                columns={columnsTable}
                dataSource={dataTable}
                pagination={false}
            />
            {selectedRowKeys.length > 0 && (
                <Button
                    type='primary'
                    onClick={showModal}
                    style={{
                        marginTop: '10px',
                        width: 'fit-content',
                        float: 'right',
                    }}
                >
                    Xoá tất cả
                </Button>
            )}
        </div>
    );
};

export default TableOrderComponent;
