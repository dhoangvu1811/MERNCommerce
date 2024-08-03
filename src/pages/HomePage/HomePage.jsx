import React, { useEffect, useRef, useState } from 'react';
import TypeProductComponent from '../../components/TypeProductComponent/TypeProductComponent';
import {
    WrapperButtonMore,
    WrapperProducts,
    WrapperTypeProduct,
} from './HomePageStyles';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import hinh1 from '../../assets/images/hinh1.png';
import hinh2 from '../../assets/images/hinh2.png';
import hinh3 from '../../assets/images/hinh3.png';
import hinh4 from '../../assets/images/hinh4.png';
import CardComponent from '../../components/CardComponent/CardComponent';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService.js';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce.js';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent.jsx';
const HomePage = () => {
    const searchProduct = useSelector((state) => state.product.search);
    const [stateProduct, setStateProduct] = useState([]);
    const searchDebounce = useDebounce(searchProduct, 500);
    const [limit, setLimit] = useState(6);
    const arr = ['TV', 'Tu Lanh', 'Laptop'];

    //hàm fetchProductAll sẽ gọi api lấy dữ liệu sản phẩm từ server
    const fetchProductAll = async (context) => {
        const search = context.queryKey && context.queryKey[1];
        const limit = context.queryKey && context.queryKey[2];
        const res = await ProductService.getAllProduct(search, limit);
        return res;
    };
    //dùng useQuery để gọi hàm fetchProductAll và lấy dữ liệu sản phẩm
    const {
        data: products,
        isLoading,
        isPreviousData,
    } = useQuery({
        queryKey: ['products', searchDebounce, limit],
        queryFn: (context) => fetchProductAll(context),
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true,
    });
    useEffect(() => {
        if (products?.data?.length > 0) {
            setStateProduct(products?.data);
        }
    }, [products]);
    return (
        <>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {arr.map((item, index) => {
                        return <TypeProductComponent key={index} name={item} />;
                    })}
                </WrapperTypeProduct>
            </div>
            <div
                className='body'
                style={{ width: '100%', background: '#efefef' }}
            >
                <div
                    id='container'
                    style={{
                        height: '1000px',
                        width: '1270px',
                        margin: '0 auto',
                    }}
                >
                    <SliderComponent arrImages={[hinh1, hinh2, hinh3, hinh4]} />
                    <LoadingComponent isPending={isLoading}>
                        <WrapperProducts>
                            {stateProduct?.map((product) => {
                                return (
                                    <CardComponent
                                        key={product._id}
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
                    </LoadingComponent>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '10px',
                        }}
                    >
                        <WrapperButtonMore
                            textButton='Xem thêm'
                            styleButton={{
                                border: '1px solid rgb(11,116,229)',
                                color: 'rgb(11,116,229)',
                                width: '240px',
                                height: '38px',
                            }}
                            styleTextButton={{ fontWeight: 500 }}
                            onClick={() => setLimit((prev) => prev + 6)}
                            disabled={
                                products?.total === products?.data?.length ||
                                products?.totalPage === 1
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
