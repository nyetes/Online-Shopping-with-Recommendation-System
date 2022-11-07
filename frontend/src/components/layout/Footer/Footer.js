/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line
import React from 'react'
import './footer.scss'
import footerlogo from '../../../assets/images/logo4.png';
// import 'boxicons';
const Footer = () => {
    return (
        <footer className='footer section'>
            <div className='footer__container container '>
                <div className='footer__content'>
                    <a href='#' className='footer__logo'><img alt="footerlog" src={footerlogo}></img></a>
                    <p className="footer__description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>

                </div>

                <div className='footer__content'>
                    <h3 className='footer__title'>About us</h3>
                    <ul className='footer__links'>
                        <li><a href='#' className='footer__link'>Careers</a></li>
                        <li><a href='#' className='footer__link'>Our Stores</a></li>
                        <li><a href='#' className='footer__link'> Our Cares </a></li>
                        <li><a href='#' className='footer__link'> Privacy Policy</a></li>
                    </ul>
                </div>
                <div className='footer__content'>
                    <h3 className='footer__title'>Customer Care </h3>
                    <ul className='footer__links'>
                        <li><a href='#' className='footer__link'>Help Center</a></li>
                        <li><a href='#' className='footer__link'>How to Buy</a></li>
                        <li><a href='#' className='footer__link'>How to Bid</a></li>
                        <li><a href='#' className='footer__link'>Return &amp; refund</a></li>
                    </ul>
                </div>

                <div className='footer__content'>
                    <h3 className='footer__title'> Contact Us</h3>
                    <ul className='footer__links'>
                        <li><a href='#' className='footer__link'>Balkumari Rd, Lalitpur 44600</a></li>
                        <li><a href='#' className='footer__link'>Email:ekinbechshop@gmail.com</a></li>
                        <li><a href='#' className='footer__link'>Phone:+977 123456789</a></li>

                    </ul>
                    <div className="footer__social">
                        <a href="https://www.github.com/" className="footer__social-link"> <box-icon name='github' type='logo' color='#ffffff' ></box-icon></a>
                        <a href="https://www.linkedin.com" className='footer__social-link'><box-icon type='logo' name='linkedin-square' color='#ffffff'></box-icon></a>
                        <a href="https://www.facebook.com/" className="footer__social-link"><box-icon type='logo' name='facebook-circle' color='#ffffff'></box-icon></a>
                        <a href="https://www.instagram.com/" className="footer__social-link"> <box-icon type='logo' name='instagram-alt' color='#ffffff'></box-icon> </a>

                    </div>
                </div>

            </div>
            <p className="footer__copy">&#169; Ecommerce by Anup Maharjan Ashim Kharel Nitesh Maharjan Rohit Khatri . All right reserved</p>
        </footer>
    )
}

export default Footer