import React from 'react'
import CheckoutSteps from '../Shipping/CheckoutSteps/CheckoutSteps'
import { useSelector } from 'react-redux'
import MetaData from '../../layout/Metadata'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import './confirmorder.scss'

const ConfirmOrder = () => {
    const history = useHistory();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price, 0
    );

    const shippingCharge = subtotal > 1000 ? 0 : 50;

    const tax = subtotal * 0.13;

    const totalPrice = subtotal + tax + shippingCharge;

    const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;

    const proccedToPayment = () => {
        const data = {
            subtotal,
            shippingCharge,
            tax,
            totalPrice,
        };
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        history.push('/process/payment');
    }


    return (
        <React.Fragment>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div className='confirmOrderpage container'>
                <div>
                    <div className='confirmshippingArea'>
                        <Typography>Shipping Info</Typography>
                        <div className='confirmshippingAreabox'>
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>

                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>

                            </div>
                        </div>
                    </div>
                    <div className='confirmCartItems'>
                        <Typography>Your Cart Item</Typography>
                        <div className='confirmCartItemContainer'>
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt={item.name} />
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        <span>
                                            {item.quantity} X रू{item.price} ={" "}
                                            <b>रू{item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                <div>
                    <div className='orderSummery'>
                        <Typography>Order Summary</Typography>
                        <div>
                            <div>
                                <p>Subtotal</p>
                                <span>रू{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charge</p>
                                <span>रू{shippingCharge}</span>
                            </div>
                            <div>
                                <p>GST</p>
                                <span>रू{tax}</span>
                            </div>
                        </div>

                        <div className='orderSummaryTotal'>
                            <p><b>Total</b></p>
                            <span>रू{totalPrice}</span>
                        </div>

                        <button onClick={proccedToPayment} className='proccedBtn'>Proceed To Payment</button>
                    </div>

                </div>
            </div>
        </React.Fragment>
    );
}

export default ConfirmOrder
