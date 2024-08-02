import { Button, Table } from 'antd';
import React, { useMemo, useState } from 'react';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import ModalComponent from '../ModalComponent/ModalComponent';
import { Excel } from 'antd-table-saveas-excel';

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

    // xóa cột action và sử dụng useMemo để chạy mỗi khi columns thay đổi
    const newCloumns = useMemo(() => {
        const arr = columns.filter((column) => column.dataIndex !== 'action');
        return arr;
    }, [columns]);

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

    // export excel
    const handleExportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet('test')
            .addColumns(newCloumns)
            .addDataSource(data, {
                str2Percent: true,
            })
            .saveAs('Excel.xlsx');
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
            <Button type='primary' onClick={handleExportExcel}>
                Export Excel
            </Button>
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
