import React from 'react';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Col, Pagination, Row } from 'antd';
import { Wrappernavbar, WrapperProducts } from './TypeProductsStyle';

const TypeProductPage = () => {
    return (
        <div style={{ padding: '0 120px', background: '#efefef' }}>
            <Row
                style={{
                    flexWrap: 'nowrap',
                    paddingTop: '10px',
                }}
            >
                <Wrappernavbar span={4}>
                    <NavbarComponent />
                </Wrappernavbar>
                <Col span={20}>
                    <WrapperProducts span={20}>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </WrapperProducts>
                    <Pagination
                        defaultCurrent={2}
                        total={100}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '15px',
                        }}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default TypeProductPage;
