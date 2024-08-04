import React from 'react';
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent';
import { CaretRightOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <div style={{ height: '100vh', width: '100%', background: '#efefef' }}>
            <div
                style={{
                    width: '1270px',
                    height: '100%',
                    margin: '0 auto',
                }}
            >
                <h4
                    style={{
                        margin: '0',
                        fontSize: '1.3rem',
                        padding: '10px 0',
                    }}
                >
                    <span
                        onClick={() => navigate('/')}
                        style={{ cursor: 'pointer' }}
                    >
                        Trang chủ
                    </span>
                    <CaretRightOutlined />
                    Chi tiết sản phẩm
                </h4>
                <ProductDetailComponent idProduct={id} />
            </div>
        </div>
    );
};

export default ProductDetailPage;
