import { Table } from 'antd';
import React from 'react';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const TableComponent = (props) => {
    const {
        selectionType = 'checkbox',
        isLoading = false,
        columns = [],
        data = [],
    } = props;

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                'selectedRows: ',
                selectedRows
            );
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    return (
        <LoadingComponent isPending={isLoading}>
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
