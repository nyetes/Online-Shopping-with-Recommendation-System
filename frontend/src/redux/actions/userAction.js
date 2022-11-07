import axios from 'axios';
import * as userActionTypes from '../constants/userActionTypes';

//login
export const login = (email, password) => async (disptach) => {
    try {
        disptach({ type: userActionTypes.LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(
            `/api/v1/login`,
            { email, password },
            config
        );

        disptach({ type: userActionTypes.LOGIN_SUCCESS, payload: data.user });

    } catch (error) {
        disptach({
            type: userActionTypes.LOGIN_FAIL,
            payload: error.response.data.message,
        });
    }
};
//register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: userActionTypes.REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`/api/v1/register`, userData, config);

        dispatch({ type: userActionTypes.REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: userActionTypes.REGISTER_USER_FAIL,
            payload: error.response.data.message,
        })
    }
};
//load user 
export const loadUser = () => async (disptach) => {
    try {
        disptach({
            type: userActionTypes.LOAD_USER_REQUEST,
        });

        const { data } = await axios.get(`/api/v1/me`);
        disptach(
            {
                type: userActionTypes.LOAD_USER_SUCCESS,
                payload: data.user
            }
        );
    } catch (error) {
        disptach({
            type: userActionTypes.LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    };
};

//logout user

export const logout = () => async (disptach) => {
    try {
        await axios.get(`/api/v1/logout`);
        disptach({
            type: userActionTypes.LOGOUT_SUCCESS,
        });
    } catch (error) {
        disptach({
            type: userActionTypes.LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
};

//update user profile

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: userActionTypes.UPDATE_PROFILE_REQUEST
        });
        //coz we are send multi data with image so content type specify garnu ramro ho 
        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`/api/v1/me/update`, userData, config);

        dispatch({
            type: userActionTypes.UPDATE_PROFILE_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: userActionTypes.UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        })
    }
};

//update user password

export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({
            type: userActionTypes.UPDATE_PASSWORD_REQUEST,
        });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`/api/v1/password/update`, passwords, config);

        dispatch({
            type: userActionTypes.UPDATE_PASSWORD_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: userActionTypes.UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }
};

//forgot user password 

export const forgotPassword = (email) => async (dispatch) => {

    try {
        dispatch({
            type: userActionTypes.FORGOT_PASSWORD_REQUEST,
        })
        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`/api/v1/password/forgot`, email, config);

        dispatch({
            type: userActionTypes.FORGOT_PASSWORD_SUCCESS,
            payload: data.message,
        })

    } catch (error) {
        dispatch({
            type: userActionTypes.FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }

};
//reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({
            type: userActionTypes.RESET_PASSWORD_REQUEST,
        });
        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config);

        dispatch({
            type: userActionTypes.RESET_PASSWORD_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: userActionTypes.RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }
};

//get all users --admin
export const getAllUsers = () => async (disptach) => {
    try {
        disptach({
            type: userActionTypes.ALL_USER_REQUEST,
        });

        const { data } = await axios.get(`/api/v1/admin/users`);
        disptach(
            {
                type: userActionTypes.ALL_USER_SUCCESS,
                payload: data.users
            }
        );
    } catch (error) {
        disptach({
            type: userActionTypes.ALL_USER_FAIL,
            payload: error.response.data.message
        })
    };
};

//get user details --admin
export const getUserDetails = (id) => async (disptach) => {
    try {
        disptach({
            type: userActionTypes.USER_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
        disptach(
            {
                type: userActionTypes.USER_DETAILS_SUCCESS,
                payload: data.user
            }
        );
    } catch (error) {
        disptach({
            type: userActionTypes.USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    };
};


//update user --admin

export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({
            type: userActionTypes.UPDATE_USER_REQUEST,
        });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config);

        dispatch({
            type: userActionTypes.UPDATE_USER_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: userActionTypes.UPDATE_USER_FAIL,
            payload: error.response.data.message,
        })
    }
};

//delete user --admin

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: userActionTypes.DELETE_USER_REQUEST,
        });

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch({
            type: userActionTypes.DELETE_USER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: userActionTypes.DELETE_USER_FAIL,
            payload: error.response.data.message,
        })
    }
};



//clearing errors
export const clearErrors = () => (disptach) => {
    disptach({
        type: userActionTypes.CLEAR_ERRORS
    })
}