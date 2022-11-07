// eslint-disable-next-line
import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'
// eslint-disable-next-line
import Loader from '../layout/Loader/loader';
// eslint-disable-next-line
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line
import { login, register, clearErrors } from '../../redux/actions/userAction';
import { useAlert } from 'react-alert';

import MetaData from '../layout/Metadata';


import './loginsignup.scss'

const LoginSignUp = ({ history, location }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = user;
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/Profile.png');

    //for password show and hide icon 
    const [ispasswordShow, setispasswordShow] = useState(false);
    const [issignUppasswordShow, setsignuppasswordShow] = useState(false);

    const toggleispasswordshow = () => {
        setispasswordShow(!ispasswordShow);

    }
    const toggleissignUppasswordShow = () => {
        setsignuppasswordShow(!issignUppasswordShow);
    };

    //if checkoutbutton clicked ifnotlogin go to /login otherwise go to /login/shipping

    const redirect = location.search ? location.search.split("=")[1] : "/account";

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            history.push(redirect);
        }
    }, [dispatch, error, alert, history, isAuthenticated, redirect]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add('shiftToNeutral');
            switcherTab.current.classList.remove('shiftToRight');

            registerTab.current.classList.remove('shiftToNeutralForm');
            loginTab.current.classList.remove('shiftToLeft');
        }
        if (tab === "register") {
            switcherTab.current.classList.add('shiftToRight');
            switcherTab.current.classList.remove('shiftToNeutral');

            registerTab.current.classList.add('shiftToNeutralForm');
            loginTab.current.classList.add('shiftToLeft')
        }
    };
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
        console.log("login form submitted");
    };
    const registerSubmit = (e) => {
        e.preventDefault();
        const myform = new FormData();

        myform.set('name', name);
        myform.set("email", email);
        myform.set('password', password);
        myform.set('avatar', avatar);
        dispatch(register(myform));
        console.log(" signup form submitted")
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    return (
        <React.Fragment>
            {loading ? <Loader /> : <React.Fragment>
                <MetaData title="Login/Register" />
                <div className='loginSignUpContainer'>
                    <div className='loginsignupbox'>
                        <div className='tabcontainer'>
                            <div className='login_signup_toggle'>
                                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                            </div>
                            <button className="borderbtn" ref={switcherTab}></button>
                        </div>
                        <form className='loginform' ref={loginTab} onSubmit={loginSubmit}>
                            <div className='loginEmail'>
                                <MailOutlineIcon className='lefticon' />
                                <input
                                    type="email"
                                    placeholder='Email'
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className='loginPassword'>
                                <LockOpenIcon className='lefticon' />
                                <input
                                    type={ispasswordShow ? "text" : "password"}
                                    placeholder="Password"
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                                {ispasswordShow ? <VisibilityOffOutlinedIcon className='righticon' onClick={toggleispasswordshow} /> : <VisibilityOutlinedIcon className='righticon' onClick={toggleispasswordshow} />}
                            </div>
                            <Link to="/password/forgot">Forgot Password?</Link>
                            <input type="submit" value="Login" className="btn btn__cart" />
                        </form>
                        <form className="signinform" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
                            <div className='signUpName'>
                                <FaceIcon className='lefticon' />
                                <input
                                    type="text"
                                    placeholder='Name'
                                    required
                                    name="name"
                                    value={name}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className='signUpEmail'>
                                <MailOutlineIcon className='lefticon' />
                                <input
                                    type="email"
                                    placeholder='Email'
                                    required
                                    name='email'
                                    value={email}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className='signUpPassword'>
                                <LockOpenIcon className='lefticon' />
                                <input
                                    type={issignUppasswordShow ? "text" : "password"}
                                    placeholder='Password'
                                    required
                                    name="password"
                                    value={password}
                                    onChange={registerDataChange}
                                />
                                {issignUppasswordShow ? <VisibilityOffOutlinedIcon className='righticon' onClick={toggleissignUppasswordShow} /> : <VisibilityOutlinedIcon className='righticon' onClick={toggleissignUppasswordShow} />}
                            </div>

                            <div id="registerImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={registerDataChange}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Register"
                                className='btn btn__cart'
                                disabled={loading ? true : false}
                            />
                        </form>
                    </div>
                </div>
            </React.Fragment>}
        </React.Fragment>
    )
}

export default LoginSignUp