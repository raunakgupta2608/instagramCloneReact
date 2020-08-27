import React, { useContext, useState } from 'react';
import {NavLink, useHistory } from 'react-router-dom'; 
import { UserContext } from './../../App';
import SpinnerComponent from './Spinner';

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();

    const [loading, setLoading] = useState(false);

    const logout = (e) => {
        setLoading(true);
        setTimeout(() => {
            localStorage.clear();
            dispatch({type: "CLEAR"});
            e.preventDefault();
            history.push('/login');
            setLoading(false);
        },2000)
    }

    const renderList = () => {
        if(state) {
            return [
                <li><NavLink to="/profile">Profile</NavLink></li>,
                <li><NavLink to="/create">Create Post</NavLink></li>,
                <li><NavLink to="" onClick={(e) => {logout(e)}}>Logout</NavLink></li>
            ]
        }
        else {
            return [
                <li><NavLink to="/login">Login</NavLink></li>,
                <li><NavLink to="/signup">Sign Up</NavLink></li>
            ]
        }
    }
    if(!loading) {
        return (
            <nav>
                <div className="nav-wrapper white">
                <NavLink to={ state? "/" : "/login" } className="brand-logo left">Instagram</NavLink>
                <ul id="nav-mobile" className="right">
                { renderList() }
                </ul>
                </div>
            </nav>
        )
    }
    else {
        return (
            <SpinnerComponent />
        )
    }
};

export default Navbar;