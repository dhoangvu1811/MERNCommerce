import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import React from 'react';
import img from '../../assets/images/bonusServiceCard.png';
import {
    WrapperBtnQualityProduct,
    WrapperCountOrder,
    WrapperInfo,
    WrapperInputNumber,
    WrapperItemOrder,
    WrapperLeft,
    WrapperListOrder,
    WrapperPriceDiscount,
    WrapperRight,
    WrapperStyleHeader,
    WrapperTotal,
} from './OrderPageStyle';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
    decreaseAmount,
    increaseAmount,
    removeOrderProduct,
} from '../../redux/slices/OrderSlice';
import TableOrderComponent from '../../components/TableOrderComponent/TableOrderComponent';

const OrderPage = () => {
    const orders = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const handleChangeCount = (type, idProduct) => {
        switch (type) {
            case 'increase':
                dispatch(increaseAmount({ idProduct: idProduct }));
                break;
            case 'decrease':
                dispatch(decreaseAmount({ idProduct: idProduct }));
                break;
            default:
                return;
        }
    };
    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ product: idProduct }));
    };
    const handleOnChangeCheckAll = (e) => {};
    const columns = [
        {
            title: `(Tất cả sản phẩm ${orders?.orderItems.length})`,
            dataIndex: 'name',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
        },
        {
            title: 'Xoá',
            dataIndex: 'delete',
        },
    ];
    const data =
        orders?.orderItems?.length &&
        orders?.orderItems?.map((order) => {
            let total = order?.price * order?.amount;
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
                amount: (
                    <WrapperCountOrder>
                        <WrapperBtnQualityProduct
                            onClick={() =>
                                handleChangeCount('decrease', order?.product)
                            }
                            icon={<MinusOutlined color='#000' />}
                        />
                        <WrapperInputNumber
                            defaultValue={order?.amount}
                            value={order?.amount}
                        ></WrapperInputNumber>
                        <WrapperBtnQualityProduct
                            onClick={() =>
                                handleChangeCount('increase', order?.product)
                            }
                            icon={<PlusOutlined color='#000' />}
                        />
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
                delete: (
                    <DeleteOutlined
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteOrder(order?.product)}
                    />
                ),
            };
        });
    return (
        <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <h3>Giỏ hàng</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperLeft>
                        <TableOrderComponent
                            dataTable={data}
                            columnsTable={columns}
                        />
                    </WrapperLeft>
                    <WrapperRight>
                        <div style={{ width: '100%' }}>
                            <WrapperInfo>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <span>Tạm tính</span>
                                    <span
                                        style={{
                                            color: '#000',
                                            fontSize: '1.4rem',
                                            fontWeight: '400',
                                        }}
                                    >
                                        0
                                    </span>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <span>Giảm giá</span>
                                    <span
                                        style={{
                                            color: '#000',
                                            fontSize: '1.4rem',
                                            fontWeight: '400',
                                        }}
                                    >
                                        0
                                    </span>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <span>Thuế</span>
                                    <span
                                        style={{
                                            color: '#000',
                                            fontSize: '1.4rem',
                                            fontWeight: '400',
                                        }}
                                    >
                                        0
                                    </span>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <span>Phí giao hàng</span>
                                    <span
                                        style={{
                                            color: '#000',
                                            fontSize: '1.4rem',
                                            fontWeight: '400',
                                        }}
                                    >
                                        0
                                    </span>
                                </div>
                            </WrapperInfo>
                            <WrapperTotal>
                                <span>Tổng tiền</span>
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
                                        1233455
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
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: 'rgb(255,57,69)',
                                height: '48px',
                                width: '220px',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                            textButton={'Mua hàng'}
                            styleTextButton={{
                                color: '#fff',
                                fontSize: '1.5rem',
                                fontWeight: '400',
                            }}
                        ></ButtonComponent>
                    </WrapperRight>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
