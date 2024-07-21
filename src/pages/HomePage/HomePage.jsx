import React from 'react';
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
const HomePage = () => {
    const arr = ['TV', 'Tu Lanh', 'Laptop'];
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
                    <WrapperProducts>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </WrapperProducts>
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
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
