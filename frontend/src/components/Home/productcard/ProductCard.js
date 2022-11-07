/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line
import React, { useState } from 'react'
import './productcard.scss';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { addItemsToCart } from '../../../redux/actions/cartAction';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
const Product = ({ product }) => {
    const options = {
        edit: false,
        color: 'rgba(20,20,20,0.1)',
        activeColor: "#ffd700",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    };
    const alert = useAlert();
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);
    //inc dec cart value  
    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };
    const increaseQuatity = () => {
        if (product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };
    const addToCartHandler = () => {
        dispatch(addItemsToCart(product._id, quantity));
        alert.success("Item added to Cart");
    }

    return (

        <React.Fragment>
            <div className='productsection__card'>
                <Link to={`/product/${product._id}`}>

                    <div className='imgcontainer'>
                        <img className="imgcontainer__image" src={product.images[0].url} alt={product.name} />
                    </div>
                    <div className='productsection__card__details'>
                        <p className='productsection__card__name'>{product.name}</p>
                        <div className='productsection__card__rating'>
                            <ReactStars {...options} /> <span>({product.numOfReviews})</span>
                        </div>
                        <p className='productsection__card__price'> रू{product.price}</p>
                    </div>

                </Link>
                <div className='productsection__card__cart'>
                    <div className='productsection__card__incdecbtn'>
                        <button className='signbutton' onClick={decreaseQuantity}>-</button>
                        <input type='number' readOnly value={quantity}></input>
                        <button className='signbutton' onClick={increaseQuatity}>+</button>
                    </div>
                    <div className='productsection__card__btn'>
                        <button onClick={addToCartHandler} className='cartbutton'>
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <span>Add To Cart</span>
                        </button>

                    </div>
                </div>
            </div>
        </React.Fragment>




    )
}

export default Product