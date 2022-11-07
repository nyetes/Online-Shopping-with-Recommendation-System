import React from 'react'
import { useSelector } from 'react-redux'
import MetaData from '../../layout/Metadata'
import Loader from '../../layout/Loader/loader'
import { Link } from 'react-router-dom'

import './profile.scss';

const Profile = () => {

    const { user, loading } = useSelector((state) => state.user);

    return (
        <React.Fragment>
            {loading ? (<Loader />) : (<React.Fragment>
                <MetaData title={`${user?.name}'s Profile`} />

                <div className='profileContainer'>
                    <div>
                        <h1>My Profile</h1>
                        <img src={user?.avatar?.url} alt={user?.name} />
                        <Link to='/me/update' className='btn'>Edit Profile</Link>
                    </div>

                    <div>
                        <div>
                            <h4>Full Name</h4>
                            <p>{user?.name}</p>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p>{user?.email}</p>
                        </div>
                        <div>
                            <h4>Joined On</h4>
                            <p>{String(user?.createdAt).substr(0, 10)}</p>
                        </div>
                        <div>
                            <Link to="/orders" className='btn'>My Orders</Link>
                            <Link to="/password/update" className='btn'>Change Password</Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>)
            }
        </React.Fragment>
    )
}

export default Profile