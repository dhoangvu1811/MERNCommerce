import React from 'react';
import {
    WrapperInfo,
    WrapperContainer,
    WrapperValue,
    WrapperCountOrder,
    WrapperInputNumber,
} from './OrderSuccessStyle';
import { useSelector } from 'react-redux';

import { message } from 'antd';
import TableOrderComponent from '../../components/TableOrderComponent/TableOrderComponent';
import { useLocation } from 'react-router-dom';
import StepComponent from '../../components/StepComponent/StepComponent';

const OrderSuccess = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const columns = [
        {
            title: `( ${location?.state?.order?.length} sản phẩm)`,
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
            title: 'Phí giao hàng',
            dataIndex: 'shipping',
        },
    ];

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
    const data =
        location?.state?.order?.length &&
        location?.state?.order?.map((order) => {
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
                shipping: (
                    <span
                        style={{
                            fontSize: '1.3rem',
                            color: '#242424',
                        }}
                    >
                        {location?.state?.shipping?.toLocaleString()}
                    </span>
                ),
            };
        });
    const handleMethod = () => {
        switch (location?.state?.method) {
            case 'momo':
                return ' bằng ví MoMo';
            case 'paypal':
                return ' bằng PayPal';
            default:
                return ' khi nhận hàng';
        }
    };
    const items = [
        {
            title: 'Thêm sản phẩm vào giỏ hàng',
            description: '',
        },
        {
            title: 'Đặt hàng',
            description: '',
        },
        {
            title: 'Đặt hàng thành công',
            description: '',
        },
    ];
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
                    <h3>Danh sách các sản phẩm đã đặt thành công</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperContainer>
                            <WrapperInfo>
                                <StepComponent items={items} current={3} />
                            </WrapperInfo>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <WrapperInfo>
                                    <h4>Phương thức giao hàng</h4>
                                    <WrapperValue>
                                        <span>
                                            Giao hàng
                                            {location?.state?.shipping === 30000
                                                ? ' hoả tốc'
                                                : ' tiết kiệm'}
                                        </span>
                                    </WrapperValue>
                                </WrapperInfo>
                                <WrapperInfo>
                                    <h4>Phương thức thanh toán</h4>
                                    <WrapperValue>
                                        <span>
                                            {' '}
                                            Thanh toán {handleMethod()}
                                        </span>
                                    </WrapperValue>
                                </WrapperInfo>
                                <TableOrderComponent
                                    OrderSuccess={true}
                                    dataTable={data}
                                    columnsTable={columns}
                                />
                                <WrapperInfo>
                                    <h4>Tổng tiền của đơn hàng: </h4>
                                    <WrapperValue>
                                        <span
                                            style={{
                                                color: 'red',
                                                fontSize: '2rem',
                                            }}
                                        >
                                            {location?.state?.total.toLocaleString()}
                                            đ
                                        </span>
                                    </WrapperValue>
                                </WrapperInfo>
                            </div>
                        </WrapperContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderSuccess;
