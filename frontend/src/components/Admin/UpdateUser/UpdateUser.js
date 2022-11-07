import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getUserDetails, updateUser } from '../../../redux/actions/userAction'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../../layout/Metadata'
import PersonIcon from '@material-ui/icons/Person'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import SideBar from '../Sidebar/Sidebar'
import * as useractionTypes from '../../../redux/constants/userActionTypes'
import Loader from '../../layout/Loader/loader'
import './updateuser.scss'

const UpdateUser = ({ history, match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const userId = match.params.id;

    useEffect(() => {

        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("User Updated Successfully");
            history.push('/admin/users');
            dispatch({
                type: useractionTypes.UPDATE_USER_RESET,
            });
        }
        // dispatch(getUserDetails(userId));

    }, [dispatch, alert, error, history, user, userId, isUpdated, updateError]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(userId, myForm));

    };

    return (
        <React.Fragment>
            <MetaData title="Update User --Admin" />
            <div className='dashboard'>
                <SideBar />
                <div className='newProductContainer'>

                    {loading ? (<Loader />) : (
                        <form className='updateuserform' onSubmit={updateUserSubmitHandler}>
                            <h1 className="updateUserHeading">Update User</h1>
                            <div>
                                <PersonIcon />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>


                            <div>
                                <VerifiedUserIcon />
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Choose Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>

                            </div>


                            <Button
                                id="creatProductBtn"
                                type="submit"
                                disabled={updateLoading ? true : false || role === "" ? true : false}
                            >
                                Update
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}



export default UpdateUser