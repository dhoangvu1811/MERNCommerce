import React from 'react';
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent';
import { CaretRightOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
    const { id } = useParams();
    return (
        <div
            style={{
                padding: '0 120px',
                background: '#efefef',
                height: '1000px',
            }}
        >
            <h4 style={{ margin: '0', fontSize: '1.3rem', padding: '10px 0' }}>
                Trang chủ
                <CaretRightOutlined />
                Chi tiết sản phẩm
            </h4>
            <ProductDetailComponent idProduct={id} />
        </div>
    );
};

export default ProductDetailPage;
