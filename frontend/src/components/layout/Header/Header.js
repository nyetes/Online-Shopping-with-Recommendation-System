/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import './header.scss';
import logo from '../../../assets/images/logo3.png';
import loginicon from '../../../assets/images/icon-person.png';
import carticon from '../../../assets/images/icon-shopping.png';
import { NavLink } from 'react-router-dom';
import Search from '../../Search/Search';
import UserOptions from "./useroption/UserOptions";
import { useSelector } from 'react-redux';


const Header = () => {

    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { cartItems } = useSelector((state) => state.cart);
    const [Header, setHeader] = useState(false);

    const handleHeader = () => {
        if (window.scrollY >= 80) {
            setHeader(true);
        }
        else {
            setHeader(false);
        }
    }
    window.addEventListener('scroll', handleHeader);

    return (
        <header className={Header ? `header scroll-header` : `header`}>
            <nav className="nav ">
                <NavLink to="/" className="nav__logo"><img alt="logo" src={logo} /></NavLink>
                < Search />
                <div className="nav__menu">
                    <ul className="nav__menu__list">
                        <NavLink className="nav__items" to='/' activeClassName="active" >Home</NavLink>
                        <NavLink className="nav__items" to='/products' activeClassName="active">All Products</NavLink>
                    </ul>
                </div>
                <div className="nav__icons">
                    <NavLink to='/cart' className="icon__btn">
                        <span>
                            <img className="iconimg" alt="iconimg" src={carticon}></img>

                        </span>
                        <span className="cartnumber" style={{ background: cartItems.length > 0 ? `var(--button-color)` : "unset" }} >{cartItems.length}</span>

                    </NavLink>

                    {isAuthenticated ? (<div> {isAuthenticated && <UserOptions user={user} />}</div>) : (<NavLink to='/login' className="icon__btn">
                        <span>
                            <img className="iconimg" alt="iconimg" src={loginicon}></img>
                        </span>

                    </NavLink>)}


                </div>

            </nav>
        </header>



    )

}


export default Header;