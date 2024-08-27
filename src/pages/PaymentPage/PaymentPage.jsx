import React, { useEffect, useState } from 'react';
import {
    WrapperCountOrder,
    WrapperForm,
    WrapperInfo,
    WrapperInputNumber,
    WrapperLeft,
    WrapperRight,
    WrapperTotal,
} from './PaymentPageStyle';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
    addShippingAddress,
    removeOrderAfterPayment,
} from '../../redux/slices/OrderSlice';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputForm from '../../components/InputForm/InputForm';
import { Form, message, Radio, Space } from 'antd';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import * as OrderService from '../../services/OrderService';
import * as PaymentService from '../../services/PaymentService';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { updateUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import StepComponent from '../../components/StepComponent/StepComponent';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PaymentPage = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [formUpdate] = Form.useForm();
    const orders = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [valueShipping, setValueShipping] = useState(30000);
    const [valueMethod, setValueMethod] = useState('default');
    const [isModalOpenModalUpdateInfo, setIsModalOpenModalUpdateInfo] =
        useState(false);
    const [stateUserInfoShipping, setStateUserInfoShipping] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
    });
    const [sdkReady, setSdkReady] = useState(false);

    const onChangeShipping = (e) => {
        setValueShipping(e.target.value);
    };
    const onChangeMethod = (e) => {
        setValueMethod(e.target.value);
    };
    //hàm lấy config payment
    const handleGetConfigPayment = async () => {
        const res = await PaymentService.getConfigPayment();
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://sandbox.paypal.com/sdk/js?client-id= ${res.data}`;
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
        return res.data;
    };
    useEffect(() => {
        if (!valueMethod === 'paypal') {
            handleGetConfigPayment();
        } else {
            setSdkReady(true);
        }
    }, []);
    // Hàm lấy thông tin user
    const handleGetDetailsUser = async (id, access_token) => {
        const res = await UserService.getDetailsUser(id, access_token);
        dispatch(updateUser({ ...res?.data, access_token: access_token }));
    };
    // Hàm cập nhật thông tin giao hàng cho nguời dùng
    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...rest } = data;
        const res = UserService.updateUser(id, token, rest);
        return res;
    });
    const {
        data: dataUpdate,
        isPending: isPendingUpdateMutation,
        isSuccess: isSuccessUpdate,
        isError: isErrorUpdate,
        failureReason: failureReasonUpdate,
        failureCount: failureCountUpdate,
    } = mutationUpdate;

    // Hàm tạo order mới
    const mutationAddOrder = useMutationHook((data) => {
        const { id, token, ...rest } = data;
        const res = OrderService.createOrder(id, token, rest);
        return res;
    });
    const {
        data: dataOrder,
        isPending: isPendingOrderMutation,
        isSuccess: isSuccessOrder,
        isError: isErrorOrder,
        failureReason: failureReasonOrder,
        failureCount: failureCountOrder,
    } = mutationAddOrder;

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
    const handleOnChangeInfoShipping = async (e) => {
        setStateUserInfoShipping({
            ...stateUserInfoShipping,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        setStateUserInfoShipping({
            name: user?.name,
            phone: user?.phone,
            address: user?.address,
            city: user?.city,
        });
    }, [orders, isModalOpenModalUpdateInfo]);

    useEffect(() => {
        formUpdate.setFieldsValue(stateUserInfoShipping);
    }, [formUpdate, stateUserInfoShipping]);

    //hàm thông báo khi thay đổi thông tin giao hàng thành công
    useEffect(() => {
        if (isSuccessUpdate) {
            success('Cập nhật thông tin giao hàng thành công');
            setIsModalOpenModalUpdateInfo(false);
        } else if (failureCountUpdate > 0) {
            error(failureReasonUpdate?.response?.data.message);
        }
    }, [isSuccessUpdate, isErrorUpdate]);

    //hàm thông báo khi đặt hàng thành công
    useEffect(() => {
        if (isSuccessOrder) {
            dispatch(removeOrderAfterPayment());
            success('Đặt hàng thành công');
            setTimeout(() => {
                navigate('/orderSuccess', {
                    state: {
                        shipping: valueShipping,
                        method: valueMethod,
                        order: orders?.orderItems,
                        total: sumtotal + valueShipping,
                        shipping: valueShipping,
                    },
                });
            }, 1000);
        } else if (failureCountOrder > 0) {
            error(failureReasonOrder?.response?.data.message);
        }
    }, [isSuccessOrder, isErrorOrder]);

    let sumtotal = 0;
    const data =
        orders?.orderItems?.length &&
        orders?.orderItems?.map((order) => {
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
    let totalPaypal = sumtotal + valueShipping;

    const handleChangeInfo = (action) => {
        if (action === 'changeInfo') {
            setIsModalOpenModalUpdateInfo(true);
        }
    };
    const handleAddOrder = () => {
        if (
            orders?.shippingAddress?.name !== user?.name ||
            !orders?.shippingAddress?.name
        ) {
            setIsModalOpenModalUpdateInfo(true);
        } else {
            mutationAddOrder.mutate({
                token: user?.access_token,
                shippingPrice: valueShipping,
                paymentMethod: valueMethod,
                orderItems: orders?.orderItems,
                name: orders?.shippingAddress?.name,
                address: orders?.shippingAddress?.address,
                city: orders?.shippingAddress?.city,
                phone: orders?.shippingAddress?.phone,
                totalPrice: sumtotal + valueShipping,
                user: user?.id,
                id: user?.id,
            });
        }
    };
    const handleCancelUpdateInfo = () => {
        setIsModalOpenModalUpdateInfo(false);
    };
    const handleOkUpdateInfo = () => {
        const { name, phone, address, city } = stateUserInfoShipping;
        if (name && phone && address && city) {
            mutationUpdate.mutate(
                {
                    id: user?.id,
                    token: user?.access_token,
                    ...stateUserInfoShipping,
                },
                {
                    onSuccess: () => {
                        handleGetDetailsUser(user?.id, user?.access_token);
                        dispatch(
                            addShippingAddress({
                                shippingAddress: stateUserInfoShipping,
                            })
                        );
                    },
                }
            );
        } else if (!orders?.orderItems?.length) {
            error('Vui lòng thêm sản phẩm vào giỏ hàng');
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
    const onSuccessPaypal = (details, data) => {
        mutationAddOrder.mutate({
            token: user?.access_token,
            shippingPrice: valueShipping,
            paymentMethod: valueMethod,
            orderItems: orders?.orderItems,
            name: user?.name,
            address: user?.address,
            city: user?.city,
            phone: user?.phone,
            totalPrice: sumtotal + valueShipping,
            user: user?.id,
            id: user?.id,
            ispaid: true,
        });
        // console.log('Transaction completed by ', details);
        // console.log('data', data);
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
                    <h3>Thanh toán</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperLeft>
                            <WrapperInfo>
                                <StepComponent items={items} current={2} />
                            </WrapperInfo>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <WrapperInfo>
                                    <h4>Chọn phương thức giao hàng</h4>
                                    <div
                                        style={{
                                            border: '1px solid rgb(194, 225, 255)',
                                            background: 'rgb(240, 248, 255)',
                                            width: '497px',
                                            padding: '16px',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        <Radio.Group
                                            onChange={onChangeShipping}
                                            value={valueShipping}
                                        >
                                            <Space direction='vertical'>
                                                <Radio value={30000}>
                                                    Giao hàng hoả tốc
                                                </Radio>
                                                <Radio value={15000}>
                                                    Giao hàng tiết kiệm
                                                </Radio>
                                            </Space>
                                        </Radio.Group>
                                    </div>
                                </WrapperInfo>
                                <WrapperInfo>
                                    <h4>Chọn phương thức thanh toán</h4>
                                    <div
                                        style={{
                                            border: '1px solid rgb(194, 225, 255)',
                                            background: 'rgb(240, 248, 255)',
                                            width: '497px',
                                            padding: '16px',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        <Radio.Group
                                            onChange={onChangeMethod}
                                            value={valueMethod}
                                        >
                                            <Space direction='vertical'>
                                                <Radio value={'default'}>
                                                    Thanh toán khi nhận hàng
                                                </Radio>
                                                <Radio value={'momo'}>
                                                    Thanh toán bằng Momo
                                                </Radio>
                                                <Radio value={'paypal'}>
                                                    Thanh toán bằng Paypal
                                                </Radio>
                                            </Space>
                                        </Radio.Group>
                                    </div>
                                </WrapperInfo>
                            </div>
                        </WrapperLeft>
                        <WrapperRight>
                            <div style={{ width: '100%' }}>
                                <WrapperInfo>
                                    <div
                                        style={{
                                            display: 'flex',
                                            fontSize: '1.4rem',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div>
                                            <span>
                                                Địa chỉ:
                                                <span
                                                    style={{
                                                        fontWeight: 'bolder',
                                                        marginLeft: '5px',
                                                    }}
                                                >{`${user?.city} - ${user?.address}`}</span>
                                            </span>
                                        </div>
                                        <span
                                            onClick={() =>
                                                handleChangeInfo('changeInfo')
                                            }
                                            style={{
                                                color: 'blue',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Thay đổi
                                        </span>
                                    </div>
                                </WrapperInfo>
                                <WrapperInfo>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            fontSize: '1.4rem',
                                        }}
                                    >
                                        <span>Tạm tính</span>
                                        <span
                                            style={{
                                                color: '#000',
                                                fontWeight: '400',
                                            }}
                                        >
                                            {sumtotal.toLocaleString()}đ
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            fontSize: '1.4rem',
                                        }}
                                    >
                                        <span>Phí giao hàng</span>
                                        <span
                                            style={{
                                                color: '#000',
                                                fontWeight: '400',
                                            }}
                                        >
                                            {valueShipping.toLocaleString()}đ
                                        </span>
                                    </div>
                                </WrapperInfo>
                                <WrapperTotal>
                                    <span style={{ fontSize: '1.4rem' }}>
                                        Tổng tiền
                                    </span>
                                    <span
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: 'rgb(254,56,52)',
                                                fontSize: '2.4rem',
                                            }}
                                        >
                                            {sumtotal
                                                ? (
                                                      sumtotal + valueShipping
                                                  ).toLocaleString()
                                                : 0}
                                            đ
                                        </span>
                                        <span
                                            style={{
                                                color: '#000',
                                                fontSize: '11px',
                                            }}
                                        >
                                            (đã bao gồm)
                                        </span>
                                    </span>
                                </WrapperTotal>
                            </div>
                            {valueMethod === 'paypal' && sdkReady ? (
                                <div style={{ height: '48px', width: '220px' }}>
                                    <PayPalButtons
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: totalPaypal.toString(),
                                                        },
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={onSuccessPaypal}
                                        onError={(err) => {
                                            alert('Thanh toán thất bại');
                                            console.error(err);
                                        }}
                                        style={{
                                            layout: 'vertical',
                                        }}
                                    />
                                </div>
                            ) : (
                                <LoadingComponent
                                    isPending={isPendingOrderMutation}
                                >
                                    <ButtonComponent
                                        onClick={() => handleAddOrder()}
                                        size={40}
                                        styleButton={{
                                            background: 'rgb(255,57,69)',
                                            height: '48px',
                                            width: '220px',
                                            border: 'none',
                                            borderRadius: '4px',
                                        }}
                                        textButton={'Đặt hàng'}
                                        styleTextButton={{
                                            color: '#fff',
                                            fontSize: '1.5rem',
                                            fontWeight: '400',
                                        }}
                                    ></ButtonComponent>
                                </LoadingComponent>
                            )}
                        </WrapperRight>
                    </div>
                </div>
                <ModalComponent
                    title='Cập nhật thông tin giao hàng'
                    open={isModalOpenModalUpdateInfo}
                    onCancel={handleCancelUpdateInfo}
                    onOk={handleOkUpdateInfo}
                >
                    <LoadingComponent isPending={isPendingUpdateMutation}>
                        <WrapperForm
                            form={formUpdate}
                            name='DetailsUser'
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            // onFinish={onUpdateUser}
                            autoComplete='off'
                        >
                            <WrapperForm.Item
                                label='Tên người dùng'
                                name='name'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhâp tên người dùng!',
                                    },
                                ]}
                            >
                                <InputForm
                                    disabled
                                    value={stateUserInfoShipping.name}
                                    onChange={handleOnChangeInfoShipping}
                                    name='name'
                                />
                            </WrapperForm.Item>
                            <WrapperForm.Item
                                label='Số điện thoại'
                                name='phone'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại!',
                                    },
                                ]}
                            >
                                <InputForm
                                    value={stateUserInfoShipping.phone}
                                    onChange={handleOnChangeInfoShipping}
                                    name='phone'
                                />
                            </WrapperForm.Item>
                            <WrapperForm.Item
                                label='Địa chỉ'
                                name='address'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập địa chỉ!',
                                    },
                                ]}
                            >
                                <InputForm
                                    value={stateUserInfoShipping.address}
                                    onChange={handleOnChangeInfoShipping}
                                    name='address'
                                />
                            </WrapperForm.Item>
                            <WrapperForm.Item
                                label='Thành phố'
                                name='city'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập thành phố!',
                                    },
                                ]}
                            >
                                <InputForm
                                    value={stateUserInfoShipping.city}
                                    onChange={handleOnChangeInfoShipping}
                                    name='city'
                                />
                            </WrapperForm.Item>
                        </WrapperForm>
                    </LoadingComponent>
                </ModalComponent>
            </div>
        </>
    );
};

export default PaymentPage;
