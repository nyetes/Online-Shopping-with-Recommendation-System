import * as cartactionTypes from '../constants/cartactiontype';
import axios from 'axios';

// add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getstate) => {

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch(
        {
            type: cartactionTypes.ADD_TO_CART,
            payload: {
                //just product means productid 
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity,
            }
        }
    );

    localStorage.setItem("cartItems", JSON.stringify(getstate().cart.cartItems));

};
//remove from cart

export const removeItemsFromCart = (id) => async (dispatch, getstate) => {

    dispatch({
        type: cartactionTypes.REMOVE_CART_ITEM,
        payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getstate().cart.cartItems));
};

//save shipping info 

export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: cartactionTypes.SAVE_SHIPPING_INFO,
        payload: data,
    })
    localStorage.setItem("shippingInfo", JSON.stringify(data));
};