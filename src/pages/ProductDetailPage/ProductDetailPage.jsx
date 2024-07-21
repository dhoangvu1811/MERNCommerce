import React from 'react';
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent';

const ProductDetailPage = () => {
    return (
        <div
            style={{
                padding: '0 120px',
                background: '#efefef',
                height: '1000px',
            }}
        >
            <h4 style={{ margin: '0' }}>Trang chủ</h4>
            <ProductDetailComponent />
        </div>
    );
};

export default ProductDetailPage;
