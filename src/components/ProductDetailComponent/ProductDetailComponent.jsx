import { Button, Col, Image, Rate, Row } from 'antd';
import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '../../redux/slices/OrderSlice';
import Swal from 'sweetalert2';
import LikeBtnComponent from '../LikeBtnComponent/LikeBtnComponent';
import CommentComponent from '../CommentComponent/CommentComponent';

const ProductDetailComponent = ({ idProduct }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
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
    const onChange = (e) => {
        setNumProduct(Number(e.target.value));
    };

    const handleChangeCount = (type) => {
        if (productDetail?.countInStock > 0) {
            switch (type) {
                case 'increase':
                    if (numProduct < productDetail.countInStock) {
                        setNumProduct(numProduct + 1);
                    }
                    break;
                case 'decrease':
                    if (numProduct > 1) {
                        setNumProduct(numProduct - 1);
                    }
                    break;
                default:
                    break;
            }
        }
    };

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname });
        } else if (productDetail?.countInStock === 0) {
            Swal.fire({
                title: 'Hết hàng!',
                text: 'Sản phẩm này hiện đang hết hàng.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
        } else {
            dispatch(
                addOrderProduct({
                    orderItem: {
                        name: productDetail?.name,
                        amount: numProduct,
                        image: productDetail?.image,
                        price: productDetail?.price,
                        product: productDetail?._id,
                        discount: productDetail?.discount,
                        countInStock: productDetail?.countInStock,
                    },
                })
            );
        }
    };
    const initFacebookSDK = () => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
        let locale = 'vi_VN';
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: process.env.REACT_APP_FB_ID, // You App ID
                cookie: true, // enable cookies to allow the server to access
                // the session
                xfbml: true, // parse social plugins on this page
                version: 'v2.1', // use version 2.1
            });
        };
        // Load the SDK asynchronously
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = `//connect.facebook.net/${locale}/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    };
    useEffect(() => {
        initFacebookSDK();
    }, []);
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
                        <LikeBtnComponent
                            dataHref={
                                'https://developers.facebook.com/docs/plugins/'
                            }
                        />
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
                                        disabled={numProduct === 1}
                                        icon={<MinusOutlined color='#000' />}
                                    />
                                    <WrapperInputNumber
                                        value={numProduct}
                                        onChange={onChange}
                                    />
                                    <WrapperBtnQualityProduct
                                        onClick={() =>
                                            handleChangeCount('increase')
                                        }
                                        disabled={
                                            productDetail?.countInStock === 0
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
                                    onClick={handleAddOrderProduct}
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
                <CommentComponent
                    dataHref={
                        'https://developers.facebook.com/docs/plugins/comments#configurator'
                    }
                    width='1270'
                />
            </Row>
        </LoadingComponent>
    );
};

export default ProductDetailComponent;
