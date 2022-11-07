import React, { useState, useEffect } from 'react'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import MetaData from '../../layout/Metadata';
import Loader from '../../layout/Loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../../../redux/actions/userAction';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import './forgotpassword.scss'

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState('');
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myform = new FormData();

        myform.set("email", email);

        dispatch(forgotPassword(myform));
        console.log(" update profile form submitted")
    };

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
        }

    }, [dispatch, error, alert, history, message]);


    return (
        <React.Fragment>
            {loading ? (<Loader />) : (<React.Fragment>
                <MetaData title="Forgot Password" />
                <div className='forgotPasswordContainer' >
                    <div className='forgotPasswordBox'>
                        <h2 className='forgotPasswordHeading'>Forgot Password</h2>
                        <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>

                            <div className='forgotPasswordEmail'>
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder='Email'
                                    required
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Send"
                                className='btn btn__cart'
                                disabled={loading ? true : false}
                            />
                        </form>
                    </div>
                </div>
            </React.Fragment>)}
        </React.Fragment>
    )
}

export default ForgotPassword