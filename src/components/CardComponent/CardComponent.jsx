import { Card } from 'antd';
import React from 'react';
import {
    StyleNameProduct,
    WrapperDiscountText,
    WrapperPriceText,
    WrapperReportText,
    WrapperStyleTextSell,
} from './CardStyle';
import { StarFilled } from '@ant-design/icons';
import chinhhang from '../../assets/images/chinhhang.png';
import productimg from '../../assets/images/productimg.png';

const CardComponent = () => {
    return (
        <Card
            hoverable
            style={{ width: 200 }}
            styles={{
                body: { padding: '10px' },
                cover: { position: 'relative' },
            }}
            cover={
                <img
                    style={{ width: '200px', height: '200px' }}
                    alt='example'
                    src={productimg}
                />
            }
        >
            <img
                alt='chinhhang'
                src={chinhhang}
                style={{
                    width: '68px',
                    height: '14px',
                    position: 'absolute',
                    top: -1,
                    left: -1,
                }}
            />
            <StyleNameProduct>Iphone</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>4.5</span>{' '}
                    <StarFilled style={{ fontSize: '11px', color: 'yellow' }} />
                </span>
                <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                1.000.000 <span style={{ textDecoration: 'underline' }}>đ</span>
                <WrapperDiscountText> -5%</WrapperDiscountText>
            </WrapperPriceText>
        </Card>
    );
};

export default CardComponent;
