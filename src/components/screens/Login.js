import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2" type="submit" name="action">
                    Login
                </button>
                <h5>
                    <span>Don't have an account?</span><Link to="/signup"> Sign Up</Link>
                </h5>
            </div>
        </div>
    )
}

export default Login;