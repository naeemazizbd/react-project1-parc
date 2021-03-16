import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css'
const Header = () => {
    const [loginUser, setLoginUser]= useContext(UserContext);
    return (
        <div className="fixed sticky-top">
            <div className="image bg-primary ">
            <img src={logo} alt="" srcset=""/>
            </div> 
            <div className="bg-dark p-2 d-flex justify-content-center ">
                <nav className="text-white  nav ">
                    <Link className="text-white me-3 p-1" to="/shop">Shop</Link>
                    <Link className="text-white me-3 p-1" to="/review">Review</Link>
                    <Link className="text-white me-3 p-1" to="/manage">Manage</Link>
                    <button onClick={()=> setLoginUser({})} className="btn btn-primary" >Log Out</button>
                </nav>
               
            </div>
        </div>
    );
};

export default Header;