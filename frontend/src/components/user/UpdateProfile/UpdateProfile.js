import React, { useState, useEffect } from 'react'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from '@material-ui/icons/Face';
import MetaData from '../../layout/Metadata';
import Loader from '../../layout/Loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, clearErrors, loadUser } from '../../../redux/actions/userAction';
import { useAlert } from 'react-alert';
import * as userActionTypes from '../../../redux/constants/userActionTypes';
import './updateprofile.scss'

const UpdateProfile = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/Profile.png');

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myform = new FormData();

        myform.set('name', name);
        myform.set("email", email);
        myform.set('avatar', avatar);
        //disptach user action for update the profile
        dispatch(updateProfile(myform));
        console.log(" update profile form submitted")
    };

    const updateProfileDataChange = (e) => {

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);

    };
    useEffect(() => {
        if (user) {
            setName(user?.name);
            setEmail(user?.email);
            setAvatarPreview(user?.avatar?.url);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile Updated Sucessfully");
            //new updata data load garna ko lagi
            dispatch(loadUser());
            //after that basicaly navigate hunxa account route maa aka profile
            history.push('/account');
            //after update compeleted isUpdate false garnu ko lagi
            dispatch({
                type: userActionTypes.UPDATE_PROFILE_RESET
            })
        }

    }, [dispatch, error, alert, history, user, isUpdated, isAuthenticated]);


    return (
        <React.Fragment>
            {loading ? (<Loader />) : (<React.Fragment>
                <MetaData title="Update Profile" />
                <div className='updateProfileContainer' >
                    <div className='updateProfileBox'>
                        <h2 className='updateProfileHeading'>Update Profile</h2>
                        <form className="updateProfileForm" encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                            <div className='updateProfileName'>
                                <FaceIcon />
                                <input
                                    type="text"
                                    placeholder='Name'
                                    required
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className='updateProfileEmail'>
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

                            <div id="updateProfileImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={updateProfileDataChange}
                                />
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

export default UpdateProfile