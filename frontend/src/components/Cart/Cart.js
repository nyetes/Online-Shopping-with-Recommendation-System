import React from 'react'
import './cart.scss'
import CartItemCard from './CartItemCard/CartItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../redux/actions/cartAction';
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Link } from 'react-router-dom';

const Cart = ({ history }) => {

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }
    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }
    const deleteCartItem = (id) => {
        dispatch(removeItemsFromCart(id));
    }

    const checkoutHandler = () => {
        history.push("/login?redirect=shipping");
    }

    return (
        <React.Fragment>
            {cartItems.length === 0 ? (
                <div className='emptyCart'>
                    <RemoveShoppingCartIcon />
                    <Typography>"There is no items in this cart" </Typography>
                    <Link to='/products'>Continue Shopping</Link>
                </div>
            ) : (<React.Fragment>
                <div className="cartPage container">

                    <div className='cartHeader'>
                        <p>Product</p>
                        <p>Quantity</p>
                        <p>SubTotal</p>
                    </div>

                    {cartItems && cartItems.map((item) => (
                        <div className='cartContainer' key={item.product}>
                            <CartItemCard item={item} deleteCartItem={deleteCartItem} />
                            <div className='cartinput'>
                                <button className='signbutton' onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                <input type="number" value={item.quantity} readOnly />
                                <button className='signbutton' onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                            </div>
                            <p className='cartsubtotal'>{`रू${item.price * item.quantity}`}</p>
                        </div>
                    ))}

                    <div className='cartgrosstotal'>
                        <div></div>
                        <div className='cartgrosstotalbox'>
                            <p>Gross Total</p>
                            <p>
                                {`रू
                            ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}
                                `}
                            </p>
                        </div>
                        <div></div>
                        <div className='checkoutbutton'>
                            <button onClick={checkoutHandler} className="btn btn__cart">Check Out</button>
                        </div>
                    </div>

                </div>
            </React.Fragment>)}
        </React.Fragment>
    )
}

export default Cart