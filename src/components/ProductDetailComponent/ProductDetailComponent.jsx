import { Button, Col, Image, Row } from 'antd';
import React from 'react';
import detail from '../../assets/images/detail.png';
import detailsmall from '../../assets/images/detailsmall.png';
import bonusSerrvicePay from '../../assets/images/bonusSerrvicePay.png';
import bonusServiceCard from '../../assets/images/bonusServiceCard.png';
import {
    WrapperAdressProduct,
    WrapperBonus,
    WrapperBonusServices,
    WrapperBtnBuyAdd,
    WrapperBtnQualityProduct,
    WrapperContentBonus,
    WrapperDetailProduct,
    WrapperImgBonus,
    WrapperInformationShipping,
    WrapperInputNumber,
    WrapperPriceProduct,
    WrapperPriceTextProduct,
    WrapperQualityProduct,
    WrapperSignup,
    WrapperStyleColImage,
    WrapperStyleImageSmall,
    WrapperStyleNameProduct,
    WrapperStyleTextSell,
    WrapperTextLabel,
} from './ProductDetailStyle';
import {
    MinusOutlined,
    PlusOutlined,
    StarFilled,
    TruckOutlined,
} from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ProductDetailComponent = () => {
    return (
        <Row gutter={4} style={{ padding: '16px', background: '#fff' }}>
            <Col span={9}>
                <Image src={detail} alt='detailProduct' preview={false} />
                <Row
                    style={{
                        paddingTop: '10px',
                        justifyContent: 'space-between',
                    }}
                >
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall
                            src={detailsmall}
                            alt='detailProductsmall'
                            preview={false}
                        />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall
                            src={detailsmall}
                            alt='detailProductsmall'
                            preview={false}
                        />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall
                            src={detailsmall}
                            alt='detailProductsmall'
                            preview={false}
                        />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall
                            src={detailsmall}
                            alt='detailProductsmall'
                            preview={false}
                        />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall
                            src={detailsmall}
                            alt='detailProductsmall'
                            preview={false}
                        />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall
                            src={detailsmall}
                            alt='detailProductsmall'
                            preview={false}
                        />
                    </WrapperStyleColImage>
                </Row>
            </Col>
            <WrapperDetailProduct span={13}>
                <WrapperStyleNameProduct>
                    Gamepad Không dây Wireless X1X cho máy tính, laptop, máy
                    game XOne hàng nhập khẩu
                    <div>
                        <StarFilled
                            style={{
                                fontSize: '1.2rem',
                                color: 'rgb(253,216,54)',
                            }}
                        />
                        <StarFilled
                            style={{
                                fontSize: '1.2rem',
                                color: 'rgb(253,216,54)',
                            }}
                        />
                        <StarFilled
                            style={{
                                fontSize: '1.2rem',
                                color: 'rgb(253,216,54)',
                            }}
                        />
                        <StarFilled
                            style={{
                                fontSize: '1.2rem',
                                color: 'rgb(253,216,54)',
                            }}
                        />
                        <StarFilled
                            style={{
                                fontSize: '1.2rem',
                                color: 'rgb(253,216,54)',
                            }}
                        />
                        <WrapperStyleTextSell>
                            | Đã bán 1000+
                        </WrapperStyleTextSell>
                    </div>
                </WrapperStyleNameProduct>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>
                        <span>
                            200.000
                            <span style={{ textDecoration: 'underline' }}>
                                đ
                            </span>
                        </span>
                        <WrapperQualityProduct>
                            <span className='quatityText'>Số lượng</span>
                            <WrapperQualityProduct>
                                <WrapperBtnQualityProduct
                                    icon={<MinusOutlined color='#000' />}
                                />
                                <WrapperInputNumber
                                    min={1}
                                    max={10}
                                    defaultValue={3}
                                />
                                <WrapperBtnQualityProduct
                                    icon={<PlusOutlined color='#000' />}
                                />
                            </WrapperQualityProduct>
                        </WrapperQualityProduct>
                        <WrapperBtnBuyAdd>
                            <ButtonComponent
                                textButton={'Mua ngay'}
                                styleButton={{
                                    background: '#ff424e',
                                    height: '48px',
                                    width: '220px',
                                    border: 'none',
                                    color: '#fff',
                                }}
                            />
                            <ButtonComponent
                                textButton={'Thêm vào giỏ hàng'}
                                styleButton={{
                                    background: 'transparent',
                                    height: '48px',
                                    width: '220px',
                                    border: '1px solid #0a68ff',
                                    color: '#0a68ff',
                                }}
                            />
                        </WrapperBtnBuyAdd>
                    </WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAdressProduct>
                    <div>
                        <WrapperTextLabel>
                            Thông tin vận chuyển
                        </WrapperTextLabel>
                        <div>
                            <span>Giao đến </span>
                            <span className='address'>
                                Giao đến H. Krông A Na, Xã Dray Sáp, Đắk Lắk
                            </span>
                        </div>
                        <WrapperInformationShipping>
                            <span>
                                <TruckOutlined /> Giao Thứ Năm
                            </span>
                            <span>
                                Trước 19h, 25/07:
                                <span className='freeShip'> Miễn phí </span>
                                <span className='minusPrice'> 22.000₫</span>
                            </span>
                        </WrapperInformationShipping>
                    </div>
                    <div>
                        <Button className='btnChange' type='text'>
                            Đổi
                        </Button>
                    </div>
                </WrapperAdressProduct>
                <WrapperBonusServices>
                    <WrapperTextLabel>Dịch vụ bổ sung</WrapperTextLabel>
                    <WrapperBonus>
                        <WrapperImgBonus
                            src={bonusServiceCard}
                            alt='bonusCard'
                        />
                        <WrapperContentBonus>
                            <div>Ưu đãi đến 600k với thẻ TikiCard</div>
                            <WrapperSignup>Đăng ký</WrapperSignup>
                        </WrapperContentBonus>
                    </WrapperBonus>
                    <WrapperBonus>
                        <WrapperImgBonus
                            src={bonusSerrvicePay}
                            alt='bonusPay'
                        />
                        <WrapperContentBonus>
                            <div>Mua trước trả sau</div>
                            <WrapperSignup>Đăng ký</WrapperSignup>
                        </WrapperContentBonus>
                    </WrapperBonus>
                </WrapperBonusServices>
            </WrapperDetailProduct>
        </Row>
    );
};

export default ProductDetailComponent;
