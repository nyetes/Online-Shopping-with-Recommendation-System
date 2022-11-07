import * as productactionTypes from '../constants/productactiontypes';

// const initialState = {
//     products: []
// }

export const productsReducer = (state = { products: [] }, action) => {

    switch (action.type) {
        case productactionTypes.ALL_PRODUCT_REQUEST:
        case productactionTypes.ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case productactionTypes.ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
            }
        case productactionTypes.ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }

        case productactionTypes.ALL_PRODUCT_FAIL:
        case productactionTypes.ADMIN_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case productactionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }

};

export const productDetailReducer = (state = { product: {} }, action) => {

    switch (action.type) {
        case productactionTypes.PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case productactionTypes.PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            };

        case productactionTypes.PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case productactionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

export const newReviewReducer = (state = {}, action) => {

    switch (action.type) {
        case productactionTypes.NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case productactionTypes.NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            };
        case productactionTypes.NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case productactionTypes.NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
            };
        case productactionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};
export const newProductReducer = (state = { product: {} }, action) => {

    switch (action.type) {
        case productactionTypes.NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case productactionTypes.NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product,
            };
        case productactionTypes.NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case productactionTypes.NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            };
        case productactionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

export const productReducer = (state = {}, action) => {

    switch (action.type) {
        case productactionTypes.DELETE_PRODUCT_REQUEST:
        case productactionTypes.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case productactionTypes.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case productactionTypes.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case productactionTypes.DELETE_PRODUCT_FAIL:
        case productactionTypes.UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case productactionTypes.DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case productactionTypes.UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        case productactionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

export const productReivewReducer = (state = { reviews: [] }, action) => {

    switch (action.type) {
        case productactionTypes.ALL_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case productactionTypes.ALL_REVIEW_SUCCESS:
            return {
                loading: false,
                reviews: action.payload,
            };

        case productactionTypes.ALL_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case productactionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

export const reviewReducer = (state = {}, action) => {

    switch (action.type) {
        case productactionTypes.DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case productactionTypes.DELETE_REVIEW_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload,
            };
        case productactionTypes.DELETE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case productactionTypes.DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case productactionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

