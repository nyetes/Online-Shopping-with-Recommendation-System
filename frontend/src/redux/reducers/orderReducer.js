import * as orderactiontypes from '../constants/orderactiontype';

export const newOrderReducer = (state = {}, action) => {

    switch (action.type) {

        case orderactiontypes.CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case orderactiontypes.CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };
        case orderactiontypes.CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case orderactiontypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }

};

export const myOrdersReducer = (state = { orders: [] }, action) => {

    switch (action.type) {

        case orderactiontypes.MY_ORDERS_REQUEST:
            return {
                loading: true,
            };

        case orderactiontypes.MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        case orderactiontypes.MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case orderactiontypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }

};

export const orderDetailReducer = (state = { order: {} }, action) => {

    switch (action.type) {

        case orderactiontypes.ORDER_DETAILS_REQUEST:
            return {
                loading: true,
            };

        case orderactiontypes.ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };
        case orderactiontypes.ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case orderactiontypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }

};

export const allOrdersReducer = (state = { orders: [] }, action) => {

    switch (action.type) {

        case orderactiontypes.ALL_ORDER_REQUEST:
            return {
                loading: true,
            };

        case orderactiontypes.ALL_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        case orderactiontypes.ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case orderactiontypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }

};
export const orderReducer = (state = {}, action) => {

    switch (action.type) {

        case orderactiontypes.UPDATE_ORDER_REQUEST:
        case orderactiontypes.DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case orderactiontypes.UPDATE_ORDER_SUCCESS:

            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case orderactiontypes.DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        case orderactiontypes.UPDATE_ORDER_FAIL:
        case orderactiontypes.DELETE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case orderactiontypes.UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case orderactiontypes.DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false,
            }

        case orderactiontypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }

};