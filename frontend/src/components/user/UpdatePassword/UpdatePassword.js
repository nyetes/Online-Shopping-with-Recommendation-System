import React, { useState, useEffect } from 'react'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MetaData from '../../layout/Metadata';
import Loader from '../../layout/Loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearErrors } from '../../../redux/actions/userAction';
import { useAlert } from 'react-alert';

import * as userActionTypes from '../../../redux/constants/userActionTypes';
import './updatepassword.scss'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'


const UpdatePassword = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { isAuthenticated } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");



    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myform = new FormData();

        myform.set('oldPassword', oldPassword);
        myform.set('newPassword', newPassword);
        myform.set('confirmPassword', confirmPassword);
        //disptach user action for update the profile
        dispatch(updatePassword(myform));
        console.log(" change password form submitted")
    };

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Password Updated Sucessfully");
            //after that basicaly navigate hunxa account route maa aka profile
            history.push('/account');
            //after update compeleted isUpdate false garnu ko lagi
            dispatch({
                type: userActionTypes.UPDATE_PASSWORD_RESET
            });
        }
    }, [dispatch, error, alert, history, isUpdated, isAuthenticated]);


    //for password show and hide icon (repeated code not good but fuck it)
    const [isoldpasswordShow, setisoldpasswordShow] = useState(false);
    const [isnewpasswordShow, setisnewpasswordShow] = useState(false);
    const [isconfirmpasswordShow, setisconfirmpasswordShow] = useState(false);

    const toggleisoldpasswordshow = () => {

        setisoldpasswordShow(!isoldpasswordShow);
    }
    const toggleisnewpasswordshow = () => {

        setisnewpasswordShow(!isnewpasswordShow);
    }
    const toggleisconfirmpasswordshow = () => {

        setisconfirmpasswordShow(!isconfirmpasswordShow);
    };

    return (
        <React.Fragment>
            {loading ? (<Loader />) : (<React.Fragment>
                <MetaData title="Change Password" />
                <div className='updatePasswordContainer' >
                    <div className='updatePasswordBox'>
                        <h2 className='updatePasswordHeading'>Update Profile</h2>
                        <form className="updatePasswordForm"
                            encType="multipart/form-data"
                            onSubmit={updatePasswordSubmit}
                        >

                            <div className='loginPassword'>
                                <VpnKeyIcon className='lefticon' />
                                <input
                                    type={isoldpasswordShow ? "text" : "password"}
                                    placeholder="Old Password"
                                    required
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                                {isoldpasswordShow ? <VisibilityOffOutlinedIcon className='righticon' onClick={toggleisoldpasswordshow} /> : <VisibilityOutlinedIcon className='righticon' onClick={toggleisoldpasswordshow} />}
                            </div>
                            <div className='loginPassword'>
                                <LockOpenIcon className='lefticon' />
                                <input
                                    type={isnewpasswordShow ? "text" : "password"}
                                    placeholder="New Password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                {isnewpasswordShow ? <VisibilityOffOutlinedIcon className='righticon' onClick={toggleisnewpasswordshow} /> : <VisibilityOutlinedIcon className='righticon' onClick={toggleisnewpasswordshow} />}
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
                                value="Change"
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

export default UpdatePassword