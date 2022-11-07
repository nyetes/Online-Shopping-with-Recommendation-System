// import { configureStore } from '@reduxjs/toolkit';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer, productDetailReducer, newReviewReducer, newProductReducer, productsReducer, productReivewReducer, reviewReducer, } from './reducers/productreducer';
import { allUsersReducer, forgotPaswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailReducer, orderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    products: productsReducer,
    productDetail: productDetailReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPaswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReivewReducer,
    review: reviewReducer,
});


let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems")) : [],

        shippingInfo: localStorage.getItem("shippingInfo") ?
            JSON.parse(localStorage.getItem('shippingInfo')) : [],
    },
};


const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;