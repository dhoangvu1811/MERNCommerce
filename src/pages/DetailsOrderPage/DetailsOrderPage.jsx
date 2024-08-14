import React from 'react';
import {
    WrapperCountOrder,
    WrapperInfo,
    WrapperInputNumber,
    WrapperLeft,
    WrapperRight,
} from './DetailsOrderPageStyle';
import { useDispatch, useSelector } from 'react-redux';

import TableOrderComponent from '../../components/TableOrderComponent/TableOrderComponent';
import { message } from 'antd';
import * as OrderService from '../../services/OrderService';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const DetailsOrderPage = () => {
    const navigate = useNavigate();
    const orders = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { idOrder } = useParams();
    console.log('idOrder', idOrder);
    const [messageApi, contextHolder] = message.useMessage();

    // Hàm lấy thông tin order
    const handleGetDetailsOrder = async (idOrder, access_token, idUser) => {
        const res = await OrderService.getDetailsOrder(
            idOrder,
            access_token,
            idUser
        );
        return res;
    };
    const queryOrder = useQuery({
        queryKey: ['order'],
        queryFn: () =>
            handleGetDetailsOrder(idOrder, user?.access_token, user?.id),
        //ép kiểu boolean
        enabled: !!(idOrder && user?.access_token),
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
            title: `(Tất cả sản phẩm ${orderData?.data?.orderItems?.length})`,
            dataIndex: 'name',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
        },
    ];
    let sumtotal = 0;
    const data =
        orderData?.data?.orderItems?.length &&
        orderData?.data?.orderItems?.map((order) => {
            let discount = (order?.price * order?.discount) / 100;
            let total = (order?.price - discount) * order?.amount;
            sumtotal += total;
            return {
                key: order?.product,
                name: (
                    <div
                        style={{
                            width: '390px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            alt='img'
                            src={order?.image}
                            style={{
                                width: '77px',
                                height: '79px',
                                objectFit: 'cover',
                            }}
                        />
                        <div
                            style={{
                                width: '200px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {order?.name}
                        </div>
                    </div>
                ),
                price: (
                    <span
                        style={{
                            fontSize: '1.3rem',
                            color: '#242424',
                        }}
                    >
                        {order?.price?.toLocaleString()}
                    </span>
                ),
                discount: (
                    <span
                        style={{
                            fontSize: '1.3rem',
                            color: '#242424',
                        }}
                    >
                        {order?.discount}%
                    </span>
                ),
                amount: (
                    <WrapperCountOrder>
                        <WrapperInputNumber
                            disabled
                            defaultValue={order?.amount}
                            value={order?.amount}
                        ></WrapperInputNumber>
                    </WrapperCountOrder>
                ),
                total: (
                    <span
                        style={{
                            color: 'rgb(255,66,78)',
                            fontSize: '1.3rem',
                        }}
                    >
                        {total.toLocaleString()}
                    </span>
                ),
            };
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
    return (
        <>
            {contextHolder}
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
                    <h3>Chi tiết đơn hàng</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperLeft>
                            <TableOrderComponent
                                dataTable={data}
                                columnsTable={columns}
                                OrderSuccess={true}
                            />
                        </WrapperLeft>
                        <WrapperRight>
                            <div style={{ width: '100%' }}>
                                <WrapperInfo>
                                    <div>
                                        <span style={{ fontSize: '2rem' }}>
                                            Thông tin giao hàng
                                        </span>
                                        <div
                                            style={{
                                                display: 'flex',
                                                fontSize: '1.4rem',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <span>
                                                Địa chỉ nhận hàng:
                                                <span
                                                    style={{
                                                        fontWeight: 'bolder',
                                                        marginLeft: '5px',
                                                    }}
                                                >{`${orderData?.data?.shippingAddress?.city} - ${orderData?.data?.shippingAddress?.address}`}</span>
                                            </span>
                                            <span>
                                                Số điện thoại:
                                                <span
                                                    style={{
                                                        fontWeight: 'bolder',
                                                        marginLeft: '5px',
                                                    }}
                                                >{`${orderData?.data?.shippingAddress?.phone}`}</span>
                                            </span>
                                        </div>
                                    </div>
                                </WrapperInfo>
                                <WrapperInfo>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <span style={{ fontSize: '2rem' }}>
                                            Hình thức thanh toán
                                        </span>
                                        <span
                                            style={{
                                                color: '#000',
                                                fontWeight: '400',
                                                fontSize: '1.4rem',
                                            }}
                                        >
                                            {handleMethodPayment(
                                                orderData?.data?.paymentMethod
                                            )}
                                        </span>
                                        <span
                                            style={{
                                                color: '#d5ae9d',
                                                fontSize: '1.5rem',
                                            }}
                                        >
                                            Chưa thanh toán
                                        </span>
                                    </div>
                                </WrapperInfo>
                                <WrapperInfo>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <span style={{ fontSize: '2rem' }}>
                                            Hình thức giao hàng
                                        </span>
                                        <span
                                            style={{
                                                color: '#000',
                                                fontWeight: '400',
                                                fontSize: '1.4rem',
                                            }}
                                        >
                                            {orderData?.data?.shippingPrice ===
                                            30000
                                                ? 'Giao hàng hoả tốc'
                                                : 'Giao hàng tiết kiệm'}
                                        </span>
                                    </div>
                                </WrapperInfo>
                            </div>
                        </WrapperRight>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailsOrderPage;
