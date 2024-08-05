import React, { useEffect, useState } from 'react';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Col, Pagination, Row } from 'antd';
import { Wrappernavbar, WrapperProducts } from './TypeProductsStyle';
import { useLocation } from 'react-router-dom';
import * as ProductService from '../../services/ProductService';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { current } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';

const TypeProductPage = () => {
    const { state } = useLocation();
    const keySearch = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(keySearch, 500);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        totalPage: 1,
    });

    const fetchProductType = async (type, page, limit) => {
        setIsLoading(true);
        const res = await ProductService.getProductType(type, page, limit);
        if (res?.status === 'success') {
            setIsLoading(false);
            setProducts(res?.data);
            setPanigate({ ...panigate, totalPage: res?.totalPage });
        } else {
            setIsLoading(false);
        }
        return res;
    };

    //useEffect search product theo tên
    useEffect(() => {
        let newProduct = [];
        if (searchDebounce) {
            newProduct = products?.filter((product) =>
                product.name
                    .toLowerCase()
                    .includes(searchDebounce.toLowerCase())
            );
            setProducts(newProduct);
        } else {
            fetchProductType(state.name, panigate.page, panigate.limit);
        }
    }, [searchDebounce]);

    //useEffect lấy dữ liệu product theo type và phân trang theo page và limit
    useEffect(() => {
        if (state) {
            fetchProductType(state.name, panigate.page, panigate.limit);
        }
    }, [state, panigate.limit, panigate.page]);

    const onChangePage = (current, pagesize) => {
        setPanigate({ ...panigate, page: current - 1, limit: pagesize });
    };
    return (
        <LoadingComponent isPending={isLoading}>
            <div
                style={{
                    width: '100%',
                    background: '#efefef',
                    height: 'calc(100vh - 64px)',
                }}
            >
                <div style={{ width: '1270px', margin: '0 auto' }}>
                    <Row
                        style={{
                            flexWrap: 'nowrap',
                            paddingTop: '10px',
                        }}
                    >
                        <Wrappernavbar span={4}>
                            <NavbarComponent />
                        </Wrappernavbar>
                        <Col
                            span={20}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: 'calc(100vh - 80px)',
                            }}
                        >
                            <WrapperProducts span={20}>
                                {products?.map((product) => {
                                    return (
                                        <CardComponent
                                            key={product._id}
                                            id={product._id}
                                            countInStock={product.countInStock}
                                            description={product.description}
                                            image={product.image}
                                            name={product.name}
                                            price={product.price}
                                            rating={product.rating}
                                            type={product.type}
                                            selled={product.selled}
                                            discount={product.discount}
                                        />
                                    );
                                })}
                            </WrapperProducts>
                            <Pagination
                                defaultCurrent={panigate?.page + 1}
                                total={panigate?.totalPage}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '15px',
                                }}
                                onChange={onChangePage}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </LoadingComponent>
    );
};

export default TypeProductPage;
