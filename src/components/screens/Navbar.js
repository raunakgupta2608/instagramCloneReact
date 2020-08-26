import React, { useContext } from 'react';
import {NavLink, useHistory } from 'react-router-dom'; 
import { UserContext } from './../../App';

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const renderList = () => {
        if(state) {
            return [
                <li><NavLink to="/profile">Profile</NavLink></li>,
                <li><NavLink to="/create">Create Post</NavLink></li>,
                <li>
                    <button className="btn #c62828 red darken-3"
                    onClick={() => {
                        localStorage.clear();
                        dispatch({type: "CLEAR"});
                        history.push('/login')
                    }}
                >
                    Logout
                    </button>
                </li>
            ]
        }
        else {
            return [
                <li><NavLink to="/login">Login</NavLink></li>,
                <li><NavLink to="/signup">Sign Up</NavLink></li>
            ]
        }
    }
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
};

export default Navbar;