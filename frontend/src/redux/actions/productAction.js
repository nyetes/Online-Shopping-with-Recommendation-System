import axios from 'axios';

import * as productactionTypes from '../constants/productactiontypes';

//get all products
export const getProduct = (keyword = "", currentPage, price = [0, 25000], category, ratings = 0) => async (dispatch) => {

    try {
        dispatch({
            type: productactionTypes.ALL_PRODUCT_REQUEST
        });

        let link = `/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if (category) {
            link = `/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        const { data } = await axios.get(link);

        dispatch({
            type: productactionTypes.ALL_PRODUCT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: productactionTypes.ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }

};

//get all produts from admin

export const getAdminProduct = () => async (dispatch) => {

    try {
        dispatch({
            type: productactionTypes.ADMIN_PRODUCT_REQUEST,
        })
        const { data } = await axios.get(`/api/v1/admin/products`);
        dispatch({
            type: productactionTypes.ADMIN_PRODUCT_SUCCESS,
            payload: data.products,
        })

    } catch (error) {
        dispatch({
            type: productactionTypes.ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
}

//get product details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: productactionTypes.PRODUCT_DETAILS_REQUEST
        });

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: productactionTypes.PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });

    } catch (error) {
        dispatch({
            type: productactionTypes.PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
};

//new review 

export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({
            type: productactionTypes.NEW_REVIEW_REQUEST,
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(`/api/v1/review`, reviewData, config);

        dispatch({
            type: productactionTypes.NEW_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: productactionTypes.NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

//create product --admin

export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({
            type: productactionTypes.NEW_PRODUCT_REQUEST,
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config);

        dispatch({
            type: productactionTypes.NEW_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: productactionTypes.NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

//update product 
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({
            type: productactionTypes.UPDATE_PRODUCT_REQUEST,
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config);

        dispatch({
            type: productactionTypes.UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: productactionTypes.UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};


//delete product 
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: productactionTypes.DELETE_PRODUCT_REQUEST,
        });

        const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

        dispatch({
            type: productactionTypes.DELETE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: productactionTypes.DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

//get all reviews of a product
//id product ko
export const getAllReview = (id) => async (dispatch) => {
    try {
        dispatch({
            type: productactionTypes.ALL_REVIEW_REQUEST,
        });

        const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

        dispatch({
            type: productactionTypes.ALL_REVIEW_SUCCESS,
            payload: data.reviews,
        });
    } catch (error) {
        dispatch({
            type: productactionTypes.ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

// delete review of product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({
            type: productactionTypes.DELETE_REVIEW_REQUEST,
        });

        const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);

        dispatch({
            type: productactionTypes.DELETE_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: productactionTypes.DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};




//clearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: productactionTypes.CLEAR_ERRORS
    });
}


