import { Button, Table } from 'antd';
import React, { useState } from 'react';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import ModalComponent from '../ModalComponent/ModalComponent';

const TableComponent = (props) => {
    const {
        selectionType = 'checkbox',
        isLoading = false,
        columns = [],
        data = [],
        handleDeleteManyProduct,
        handleDeleteManyUser,
        isPendingDeleteMutationMany = false,
        isPendingDeleteMutationManyUser = false,
        type,
    } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelectedKey, setrowSelectedKey] = useState([]);

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setrowSelectedKey(selectedRowKeys);
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        if (handleDeleteManyProduct) {
            handleDeleteManyProduct(rowSelectedKey);
        } else if (handleDeleteManyUser) {
            handleDeleteManyUser(rowSelectedKey);
        }
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <LoadingComponent isPending={isLoading}>
            {rowSelectedKey.length > 0 && (
                <LoadingComponent
                    isPending={
                        isPendingDeleteMutationMany ||
                        isPendingDeleteMutationManyUser
                    }
                >
                    <div>
                        <Button type='primary' onClick={showModal}>
                            Xoá tất cả
                        </Button>
                        <ModalComponent
                            isOpen={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        >
                            Bạn có muốn xoá những {type} này không?
                        </ModalComponent>
                    </div>
                </LoadingComponent>
            )}
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </LoadingComponent>
    );
};

export default TableComponent;
