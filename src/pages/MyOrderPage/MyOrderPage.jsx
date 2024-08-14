import { DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import React from 'react';
import {
    WrapperCountOrder,
    WrapperInputNumber,
    WrapperLeft,
} from './MyOrderPageStyle';
import { useDispatch, useSelector } from 'react-redux';
import TableOrderComponent from '../../components/TableOrderComponent/TableOrderComponent';
import { message } from 'antd';
import * as OrderService from '../../services/OrderService';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

const MyOrderPage = () => {
    const navigate = useNavigate();
    const orders = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    // Hàm lấy thông tin order
    const handleGetDetailsOrder = async (id, access_token) => {
        const res = await OrderService.getAllOrder(id, access_token);
        return res;
    };
    const queryOrder = useQuery({
        queryKey: ['userOrder'],
        queryFn: () => handleGetDetailsOrder(user?.id, user?.access_token),
        //ép kiểu boolean
        enabled: !!(user?.id && user?.access_token),
    });
    const { isPending, data: orderData } = queryOrder;
    console.log('orderData', orderData?.data);
    // Hàm thông báo
    const success = (mes = 'Thành công') => {
        messageApi.open({
            type: 'success',
            content: mes,
        });
    };
    const error = (mes = 'Thất bại') => {
        messageApi.open({
            type: 'error',
            content: mes,
        });
    };

    const columns = [
        {
            title: `(${
                orderData?.data?.length ? orderData?.data?.length : 0
            } đơn hàng )`,
            dataIndex: 'name',
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'method',
        },
        {
            title: 'Tổng tiền đơn hàng',
            dataIndex: 'totalPrice',
        },
        {
            title: 'Phí giao hàng',
            dataIndex: 'shipprice',
        },
        {
            title: 'Tuỳ chọn',
            dataIndex: 'option',
        },
    ];
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
    const data =
        orderData?.data?.length &&
        orderData?.data?.map((order, index) => {
            return {
                key: index,
                name: (
                    <div
                        style={{
                            width: '390px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                width: '200px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Đơn hàng {index + 1}
                        </div>
                    </div>
                ),
                method: (
                    <span
                        style={{
                            fontSize: '1.3rem',
                            color: '#242424',
                        }}
                    >
                        {handleMethodPayment(order?.paymentMethod)}
                    </span>
                ),
                totalPrice: (
                    <span
                        style={{
                            fontSize: '1.3rem',
                            color: '#242424',
                        }}
                    >
                        {order?.totalPrice.toLocaleString()}đ
                    </span>
                ),
                shipprice: (
                    <span
                        style={{
                            fontSize: '1.3rem',
                            color: '#242424',
                        }}
                    >
                        {order?.shippingPrice.toLocaleString()}đ
                    </span>
                ),
                total: (
                    <span
                        style={{
                            color: 'rgb(255,66,78)',
                            fontSize: '1.3rem',
                        }}
                    ></span>
                ),
                option: (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <DeleteOutlined
                            style={{ cursor: 'pointer' }}
                            // onClick={() => handleDeleteOrder(order?.product)}
                        />
                        <InfoCircleFilled
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                                navigate(`/detailsOrder/${order?._id}`)
                            }
                        />
                    </div>
                ),
            };
        });
    return (
        <>
            {contextHolder}
            <LoadingComponent isPending={isPending}>
                <div
                    style={{
                        background: '#f5f5fa',
                        width: '100%',
                        height: '100vh',
                    }}
                >
                    <div
                        style={{
                            height: '100%',
                            width: '1270px',
                            margin: '0 auto',
                        }}
                    >
                        <h3>Danh sách đơn hàng</h3>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <WrapperLeft>
                                <TableOrderComponent
                                    dataTable={data}
                                    columnsTable={columns}
                                />
                            </WrapperLeft>
                        </div>
                    </div>
                </div>
            </LoadingComponent>
        </>
    );
};

export default MyOrderPage;
