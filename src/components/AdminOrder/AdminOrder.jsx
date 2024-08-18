import React, { useRef, useState } from 'react';
import { WrapperHeader } from './AdminOrderStyle';
import { Button, Input, message, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import { useSelector } from 'react-redux';
import * as OrderService from '../../services/OrderService';
import { useQuery } from '@tanstack/react-query';
import ChartComponent from '../ChartComponent/ChartComponent';
import { Sector } from 'recharts';

const AdminOrder = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const user = useSelector((state) => state.user);
    const [rowSelected, setRowSelected] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    // Hàm lấy tất cả dữ liệu người dùng từ api
    const getAllOrder = async () => {
        const res = await OrderService.getAllOrderAdmin(user?.access_token);
        return res;
    };
    // Lấy dữ liệu Người dùng từ api để hiển thị lên bảng
    const queryOrder = useQuery({
        queryKey: ['getAllOrder'],
        queryFn: getAllOrder,
        retry: 1,
        retryDelay: 1000,
    });
    const { isLoading: isLoadingOrder, data: Orders } = queryOrder;
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size='small'
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size='small'
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //     searchedColumn === dataIndex ? (
        //         <Highlighter
        //             highlightStyle={{
        //                 backgroundColor: '#ffc069',
        //                 padding: 0,
        //             }}
        //             searchWords={[searchText]}
        //             autoEscape
        //             textToHighlight={text ? text.toString() : ''}
        //         />
        //     ) : (
        //         text
        //     ),
    });
    const handleMethodPayment = (method) => {
        switch (method) {
            case 'default':
                return 'Thanh toán khi nhận hàng';
            case 'momo':
                return 'Thanh toán qua MoMo';
            case 'paypal':
                return 'Thanh toán qua Paypal';
            default:
                return method;
        }
    };
    const columnTable = [
        {
            title: 'User name',
            dataIndex: 'userName',
            sorter: (a, b) => a.userName.length - b.userName.length,
            ...getColumnSearchProps('userName'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Paided',
            dataIndex: 'paided',
        },
        {
            title: 'Shipping',
            dataIndex: 'shipping',
        },
        {
            title: 'Payment method',
            dataIndex: 'paymentMethod',
            sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
        },
        {
            title: 'TotalPrice',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
        },
    ];
    const dataTable =
        Orders?.data?.length &&
        Orders?.data?.map((order) => {
            return {
                key: order._id,
                userName: order.shippingAddress.name,
                phone: order.shippingAddress.phone,
                address: order.shippingAddress.address,
                paided:
                    order.ispaid || order.paymentMethod !== 'default'
                        ? 'Đã thanh toán'
                        : 'Chưa thanh toán',
                shipping:
                    order.shippingPrice === 30000
                        ? 'Giao hàng hoả tốc'
                        : 'Giao hàng tiết kiệm',
                paymentMethod: handleMethodPayment(order.paymentMethod),
                totalPrice: order.totalPrice.toLocaleString() + ' VNĐ',
            };
        });
    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const {
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            percent,
            value,
        } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path
                    d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                    stroke={fill}
                    fill='none'
                />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    textAnchor={textAnchor}
                    fill='#333'
                >{`PV ${value}`}</text>
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    dy={18}
                    textAnchor={textAnchor}
                    fill='#999'
                >
                    {`(Rate ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };
    return (
        <div>
            {contextHolder}
            <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
            <div style={{ width: '400px', height: '250px' }}>
                {!isLoadingOrder && Orders ? (
                    <ChartComponent
                        renderActiveShape={renderActiveShape}
                        order={Orders}
                    />
                ) : (
                    <div style={{ fontSize: '1.5rem' }}>
                        Đang thống kê dữ liệu...
                    </div>
                )}
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent
                    pagination={{
                        pageSize: 5,
                    }}
                    columns={columnTable}
                    data={dataTable}
                    isLoading={isLoadingOrder}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record.key);
                            }, // click row
                        };
                    }}
                    type='người dùng'
                />
            </div>
        </div>
    );
};

export default AdminOrder;
