import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import React from 'react';
import img from '../../assets/images/bonusServiceCard.png';
import {
    WrapperCountOrder,
    WrapperInfo,
    WrapperItemOrder,
    WrapperLeft,
    WrapperListOrder,
    WrapperPriceDiscount,
    WrapperRight,
    WrapperStyleHeader,
    WrapperTotal,
} from './OrderPageStyle';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

const OrderPage = ({ count = 1 }) => {
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const handleChangeCount = () => {};
    const handleOnChangeCheckAll = (e) => {};
    return (
        <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <h3>Giỏ hàng</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperLeft>
                        <WrapperStyleHeader>
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: '390px',
                                }}
                            >
                                <Checkbox
                                    onChange={handleOnChangeCheckAll}
                                ></Checkbox>
                                <span>Tất cả ({count} sản phẩm)</span>
                            </span>
                            <div
                                style={{
                                    flex: '1',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <DeleteOutlined style={{ cursor: 'pointer' }} />
                            </div>
                        </WrapperStyleHeader>
                        <WrapperListOrder>
                            <WrapperItemOrder>
                                <div
                                    style={{
                                        width: '390px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Checkbox onChange={onChange}></Checkbox>
                                    <img
                                        alt='img'
                                        src={img}
                                        style={{
                                            width: '77px',
                                            height: '79px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <div>Tên sản phẩm</div>
                                </div>
                                <div
                                    style={{
                                        flex: '1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <span>
                                        <span
                                            style={{
                                                fontSize: '1.3rem',
                                                color: '#242424',
                                            }}
                                        >
                                            211
                                        </span>
                                        <WrapperPriceDiscount>
                                            230
                                        </WrapperPriceDiscount>
                                    </span>
                                    <WrapperCountOrder>
                                        <button
                                            style={{
                                                border: 'none',
                                                background: 'transparent',
                                            }}
                                        >
                                            <MinusOutlined
                                                style={{
                                                    color: '#000',
                                                    fontSize: '1rem',
                                                }}
                                            />
                                        </button>
                                        {/* <WrapperInputNumber
                                            onChange={onChange}
                                            defaultValue={1}
                                        ></WrapperInputNumber> */}
                                        <button
                                            style={{
                                                border: 'none',
                                                background: 'transparent',
                                            }}
                                        >
                                            <PlusOutlined
                                                style={{
                                                    color: '#000',
                                                    fontSize: '1rem',
                                                }}
                                            />
                                        </button>
                                    </WrapperCountOrder>
                                    <span
                                        style={{
                                            color: 'rgb(255,66,78)',
                                            fontSize: '1.3rem',
                                        }}
                                    >
                                        123
                                    </span>
                                    <DeleteOutlined
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </WrapperItemOrder>
                        </WrapperListOrder>
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
