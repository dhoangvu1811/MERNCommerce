import { Button, Col, Image, Rate, Row } from 'antd';
import React, { useState } from 'react';
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
import { MinusOutlined, PlusOutlined, TruckOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { useSelector } from 'react-redux';

const ProductDetailComponent = ({ idProduct }) => {
    const user = useSelector((state) => state.user);
    const [numProduct, setNumProduct] = useState(1);
    const fetchDetailsProduct = async (id) => {
        if (id) {
            const res = await ProductService.getDetailsProduct(id);
            return res.data;
        }
    };
    const { data: productDetail, isLoading } = useQuery({
        queryKey: ['detailsProduct', idProduct],
        queryFn: () => fetchDetailsProduct(idProduct),
        enabled: !!idProduct,
    });

    console.log('productDetail', productDetail);
    const onChange = (e) => {
        setNumProduct(Number(e.target.value));
    };
    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct(numProduct + 1);
        } else if (type === 'decrease') {
            if (numProduct > 1) {
                setNumProduct(numProduct - 1);
            }
        }
    };
    return (
        <LoadingComponent isPending={isLoading}>
            <Row style={{ padding: '16px', background: '#fff' }}>
                <Col span={9}>
                    <Image
                        src={productDetail?.image}
                        alt='detailProduct'
                        preview={false}
                    />
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
                <WrapperDetailProduct span={15}>
                    <WrapperStyleNameProduct>
                        {productDetail?.name}
                        <div>
                            <Rate
                                allowHalf
                                disabled
                                defaultValue={productDetail?.rating}
                                value={productDetail?.rating}
                            />
                            <WrapperStyleTextSell>
                                | Đã bán 1000+
                            </WrapperStyleTextSell>
                        </div>
                    </WrapperStyleNameProduct>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>
                            <span>
                                {productDetail?.price.toLocaleString()}
                                <span style={{ textDecoration: 'underline' }}>
                                    đ
                                </span>
                            </span>
                            <WrapperQualityProduct>
                                <span className='quatityText'>Số lượng</span>
                                <WrapperQualityProduct>
                                    <WrapperBtnQualityProduct
                                        onClick={() =>
                                            handleChangeCount('decrease')
                                        }
                                        icon={<MinusOutlined color='#000' />}
                                    />
                                    <WrapperInputNumber
                                        min={1}
                                        max={10}
                                        value={numProduct}
                                        onChange={onChange}
                                    />
                                    <WrapperBtnQualityProduct
                                        onClick={() =>
                                            handleChangeCount('increase')
                                        }
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
                                    disabled={false}
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
                                    disabled={false}
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
                                    {user?.address || '(trống)'}
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
        </LoadingComponent>
    );
};

export default ProductDetailComponent;
