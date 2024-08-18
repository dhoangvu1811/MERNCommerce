import { DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { WrapperLeft } from './MyOrderPageStyle';
import { useSelector } from 'react-redux';
import TableOrderComponent from '../../components/TableOrderComponent/TableOrderComponent';
import { message, Modal } from 'antd';
import * as OrderService from '../../services/OrderService';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useMutationHook } from '../../hooks/useMutationHook';

const MyOrderPage = () => {
    const navigate = useNavigate();
    const orders = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateIdOrder, setStateIdOrder] = useState('');

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

    // Hàm huỷ đơn hàng
    const mutationCancelOrder = useMutationHook((data) => {
        const { idOrder, token, idUser } = data;
        const res = OrderService.cancelOrder(idOrder, token, idUser);
        return res;
    });
    const {
        data: dataCancelOrder,
        isPending: isPendingCancelOrderMutation,
        isSuccess: isSuccessCancelOrder,
        isError: isErrorCancelOrder,
        failureReason: failureReasonCancelOrder,
        failureCount: failureCountCancelOrder,
    } = mutationCancelOrder;

    const showModal = (idOrder) => {
        setIsModalOpen(true);
        setStateIdOrder(idOrder);
    };

    const handleOk = () => {
        mutationCancelOrder.mutate(
            {
                idOrder: stateIdOrder,
                token: user?.access_token,
                idUser: user?.id,
            },
            {
                onSettled: () => {
                    queryOrder.refetch();
                },
            }
        );
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
                            onClick={() => showModal(order?._id)}
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
    useEffect(() => {
        if (isSuccessCancelOrder) {
            success('Huỷ đơn hàng thành công');
            handleCancel();
        } else if (failureCountCancelOrder.length > 0) {
            error(failureReasonCancelOrder?.response?.data.message);
        }
    }, [isErrorCancelOrder, isSuccessCancelOrder]);
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
                                    OrderSuccess={true}
                                />
                            </WrapperLeft>
                        </div>
                    </div>
                </div>
            </LoadingComponent>
            <LoadingComponent isPending={isPendingCancelOrderMutation}>
                <Modal
                    title='Huỷ đơn hàng'
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    Bạn có muốn huỷ đơn hàng này không?
                </Modal>
            </LoadingComponent>
        </>
    );
};

export default MyOrderPage;
