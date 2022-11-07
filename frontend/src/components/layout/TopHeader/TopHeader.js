/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./topheader.scss";
// import 'boxicons';
const TopHeader = () => {
    const [Header, setHeader] = useState(false);

    const topheaderhandler = () => {
        if (window.scrollY >= 80) {
            setHeader(true);
        }
        else {
            setHeader(false);
        }
    }
    window.addEventListener('scroll', topheaderhandler);
    return (
        <div className={Header ? `topheader-scroll` : `topheader`} >

            <ul className="topheader_lists">
                <li>
                    <box-icon name='phone' type='solid' color='#ffffff' ></box-icon>

                    <a>+977 123456789</a>

                </li>
                <li >
                    <box-icon name='envelope' type='solid' color='#ffffff' ></box-icon>
                    <a href="/#">ekinbechshop@gmail.com</a>
                </li>
            </ul>


            <ul className="topheader_lists">
                <li><a className="colorlist" href="/#">FQA's</a></li>
                <li><a className="colorlist" href="/#">Help?</a></li>
            </ul>

        </div>
    )
}

export default TopHeader;