import React, { useState, useEffect } from 'react'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import MetaData from '../../layout/Metadata';
import Loader from '../../layout/Loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../../redux/actions/userAction';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import * as userActionTypes from '../../../redux/constants/userActionTypes';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'
import './resetpassword.scss'


const ResetPassword = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { token } = useParams();
    const { error, success, loading } = useSelector((state) => state.forgotPassword);


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");



    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myform = new FormData();

        myform.set('password', password);
        myform.set('confirmPassword', confirmPassword);
        //disptach user action for update the profile
        dispatch(resetPassword(token, myform));
        console.log(" change password form submitted")
    };

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated Sucessfully");
            //after that basicaly navigate hunxa account route maa aka profile
            history.push('/login');
            //after update compeleted isUpdate false garnu ko lagi
            dispatch({
                type: userActionTypes.UPDATE_PASSWORD_RESET
            });
        }
    }, [dispatch, error, alert, history, success,]);


    //for password show and hide icon (repeated code not good but fuck it)

    const [ispasswordShow, setispasswordShow] = useState(false);
    const [isconfirmpasswordShow, setisconfirmpasswordShow] = useState(false);

    const toggleispasswordShow = () => {

        setispasswordShow(!ispasswordShow);
    }
    const toggleisconfirmpasswordshow = () => {

        setisconfirmpasswordShow(!isconfirmpasswordShow);
    };

    return (
        <React.Fragment>
            {loading ? (<Loader />) : (<React.Fragment>
                <MetaData title="Reset Password" />
                <div className='resetPasswordContainer' >
                    <div className='resetPasswordBox'>
                        <h2 className='resetPasswordHeading'>Update Profile</h2>
                        <form className="resetPasswordForm"
                            encType="multipart/form-data"
                            onSubmit={resetPasswordSubmit}
                        >

                            <div className='loginPassword'>
                                <LockOpenIcon className='lefticon' />
                                <input
                                    type={ispasswordShow ? "text" : "password"}
                                    placeholder="New Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {ispasswordShow ? <VisibilityOffOutlinedIcon className='righticon' onClick={toggleispasswordShow} /> : <VisibilityOutlinedIcon className='righticon' onClick={toggleispasswordShow} />}
                            </div>

                            <div className='loginPassword'>
                                <LockIcon className='lefticon' />
                                <input
                                    type={isconfirmpasswordShow ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {isconfirmpasswordShow ? <VisibilityOffOutlinedIcon className='righticon' onClick={toggleisconfirmpasswordshow} /> : <VisibilityOutlinedIcon className='righticon' onClick={toggleisconfirmpasswordshow} />}
                            </div>

                            <input
                                type="submit"
                                value="Update"
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

export default ResetPassword