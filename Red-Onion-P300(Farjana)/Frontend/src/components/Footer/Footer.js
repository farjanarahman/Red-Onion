import React from 'react';
import './Footer.css';
import logo from '../../logo.png';

const Footer = () => {
    return (
       <div className="container-fluid">
            <div className="footerArea">
            <div className="d-flex justify-content-between">
                <div className="footerLogo">
                    <img src={logo} alt="" />
                </div>
                <div className="d-flex  otherInfo">
                    <ul>
                        <li><a href="#"> About online food</a></li>
                        <li><a href="#">Read our blog</a></li>
                        <li><a href="#">Sign up to deliver</a></li>
                        <li><a href="#">Add your restaurant</a></li>
                    </ul>
                    <ul>
                        <li><a href="#">Get help</a> </li>
                        <li><a href="#">Read FAQs</a> </li>
                        <li><a href="#">View all cities</a> </li>
                        <li><a href="#">Restaurant near me</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-white">
                <p>Copyright © { new Date().getFullYear() } Online Food.</p>
            </div>
        </div>
       </div>
    );
};

export default Footer;