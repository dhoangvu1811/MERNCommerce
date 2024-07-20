import { Image } from 'antd';
import React from 'react';
import Slider from 'react-slick';

const SliderComponent = ({ arrImages }) => {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    return (
        <Slider {...settings}>
            {arrImages.map((image, index) => {
                return (
                    <Image
                        key={index}
                        src={image}
                        alt='slider'
                        preview={false}
                        width='100%'
                        height='274px'
                    />
                );
            })}
        </Slider>
    );
};

export default SliderComponent;
