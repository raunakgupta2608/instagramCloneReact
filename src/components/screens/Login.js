import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Login = () => {
    const history = useHistory();

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const PostData = async () => {
        const resp = await fetch("/auth/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        try {
            const data = await resp.json(); console.log(data);
            if(data.err) M.toast({html: data.err, classes: "#c62828 red darken-3"});
    
            else {
                M.toast({html: "Login Successful", classes: "#43a047 green darken-1"});
                history.push('/');
            }
        } catch (error) {
            console.log(error);
        }   
    }
    
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="Email" 
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" placeholder="Password" 
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2" type="submit" name="action"
                    onClick={() => PostData() }>
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