import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MetaData from '../../layout/Metadata'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import SideBar from '../Sidebar/Sidebar'
import { clearErrors, getOrderDetails, updateOrder } from '../../../redux/actions/orderAction.js'
import { useAlert } from "react-alert"
import Loader from '../../layout/Loader/loader'
import './processOrder.scss'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import { Button } from '@material-ui/core';
import * as orderactionTypes from "../../../redux/constants/orderactiontype.js"
const ProcessOrder = ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const [status, setStatus] = useState("");

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(match.params.id, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Order Updated Successfully")
            dispatch({
                type: orderactionTypes.UPDATE_ORDER_RESET,
            })
        }

        dispatch(getOrderDetails(match.params.id));
    }, [dispatch, error, alert, match.params.id, isUpdated, updateError]);

    return (
        <React.Fragment>
            <MetaData title="Process Order" />
            <div className='dashboard'>
                <SideBar />
                <div className='processOrderContainer'>
                    {loading ? (<Loader />) : (
                        <div className='processOrderPage container'
                            style={{
                                display:
                                    order.orderStatus === "Delivered" ? "block" : "grid",
                            }}
                        >
                            <div>
                                <div className='confirmshippingArea'>
                                    <Typography>Shipping Info</Typography>
                                    <div className='orderDetailsContainerBox'>
                                        <div>
                                            <p>Name:</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>

                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>{order.shippingInfo &&
                                                `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`
                                            }</span>

                                        </div>
                                    </div>

                                    <Typography>Payment</Typography>
                                    <div className='orderDetailsContainerBox'>
                                        <div>
                                            <p className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>
                                                {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                                            </p>
                                        </div>

                                        <div>
                                            <p>Amount:</p>
                                            <span>रू{order.totalPrice && order.totalPrice}</span>
                                        </div>
                                    </div>

                                    <Typography>Order Status</Typography>

                                    <div className='orderDetailsContainerBox'>

                                        <div>
                                            <p
                                                className={
                                                    order.orderStatus && order.orderStatus === "Delivered"
                                                        ? "greenColor" : "redColor"
                                                }
                                            >
                                                {order.orderStatus && order.orderStatus}
                                            </p>
                                        </div>

                                    </div>

                                </div>
                                <div className='confirmCartItems'>
                                    <Typography>Order Item</Typography>
                                    <div className='confirmCartItemContainer'>
                                        {order.orderItems &&
                                            order.orderItems.map((item) => (
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

                            <div style={{
                                display:
                                    order.orderStatus === "Delivered" ? "none" : "block",
                            }}>

                                <form className='processOrderForm' encType='multipart/form-data' onSubmit={updateOrderSubmitHandler}>
                                    <h1>Process Order</h1>
                                    <div>
                                        <AccountTreeIcon />
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Category</option>
                                            {order.orderStatus === "Processing" && (
                                                <option value="Shipped">Shipped</option>
                                            )}
                                            {order.orderStatus === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )}

                                        </select>

                                    </div>


                                    <Button
                                        id="creatProductBtn"
                                        type="submit"
                                        disabled={loading ? true : false || status === "" ? true : false}
                                    >
                                        Process
                                    </Button>
                                </form>

                            </div>
                        </div>
                    )}

                </div>
            </div>
        </React.Fragment>





    );
}


export default ProcessOrder