import React from 'react';
import logo from '../../images/logo.png';
import './Header.css'
const Header = () => {
    return (
        <div className="fixed sticky-top">
            <div className="image bg-primary ">
            <img src={logo} alt="" srcset=""/>
            </div> 
            <div className="bg-dark p-2 d-flex justify-content-center ">
                <nav className="text-white  nav ">
                    <a className="text-white me-3 p-1" href="/shop">Shop</a>
                    <a className="text-white me-3 p-1" href="/review">Review</a>
                    <a className="text-white me-3 p-1" href="/manage">Manage</a>
                </nav>
               
            </div>
        </div>
    );
};

export default Header;