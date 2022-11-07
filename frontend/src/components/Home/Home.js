import React, { useEffect } from "react";
import './home.scss';
import ProductSlider from "./ProductSlider/ProductSlider";
import sliderimg from '../../assets/images/shoe1.png';
import ProductCard from '../Home/productcard/ProductCard';
import Metadata from '../layout/Metadata';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../redux/actions/productAction';
import flashicon from '../../assets/images/flash1.png'
import Loader from '../layout/Loader/loader';
import { useAlert } from 'react-alert'
const productslider = [
    {
        title: "50% Off For Your First Shopping",
        description: "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.",
        image: sliderimg,
        _id: '1'
    },
    {
        title: "50% Off For Your First Shopping",
        description: "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.",
        image: sliderimg,
        _id: '2'
    }
];


const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products)
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct())
    }, [dispatch, error, alert]);

    return (
        <React.Fragment>

            {loading ? (<Loader />) : (<React.Fragment>
                <Metadata title='E-KinBech' />
                <ProductSlider product={productslider} />

                <div className='productsection container'>
                    <div className='productsection__title'>
                        <img src={flashicon} alt='icon'></img>
                        <h1 className='productsection__title__text'>Flash Products</h1>
                    </div>
                    <div className="productsection__container">
                        {products && products.map((product, index) =>
                            <ProductCard key={index} product={product} />
                        )}
                    </div>
                </div>



            </React.Fragment>)
            }

        </React.Fragment>

    )
}

export default Home