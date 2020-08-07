import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" type="submit" name="action">
                    Sign Up
                </button>
                <h5>
                    <span>Already have an account?</span><Link to="/login"> Login</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup;