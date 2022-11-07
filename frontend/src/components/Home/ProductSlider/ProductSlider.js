/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './productslider.scss';
const ProductSlider = ({ product }) => {
    const settings = {
        dots: true,
        lazyload: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 10000,
        // pauseOnHover: true

    };
    return (
        <div className="productslider">
            <div className='productslider__container container'>
                <Slider {...settings} className='slider'>
                    {product.map((element, index) => {
                        return (
                            <div key={index} className='productslider__item'>
                                <div className='productslider__sectiondes'>
                                    <h3 className='productslider__title'>{element.title}</h3>
                                    <p className='productslider__description'>{element.description}</p>
                                    <a className="productslider__button" href='#'>Shop Now</a>
                                </div>
                                <div className='productslider__sectionimg'>
                                    <img className="productslider__image" src={element.image} alt="bannerimg"></img>
                                </div>



                            </div>


                        );

                    })}
                </Slider>


            </div>

        </div>
    )
}

export default ProductSlider