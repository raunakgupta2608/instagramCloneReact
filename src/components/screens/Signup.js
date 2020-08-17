import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Joi, { schema } from 'joi-browser';
import M from 'materialize-css';

const Signup = () => {
    const history = useHistory();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const schema = {
        name: Joi.string().required().min(3).max(25).label('Name'),
        email: Joi.string().required().min(3).max(25).label('Email'),
        password: Joi.string().required().min(3).max(25).label('Password'),
    }

    const validate = () => {
        const options = { abortEarly: false };
        const fields = { name, password, email};
        const { error } = Joi.validate(fields, schema, options);

        if(!error) return null;

        const errors = {};
        for(let item of error.details) errors[item.path[0]] = item.message;
        console.log(errors);
        return errors;
        
    };
    
    const PostData = async () => {
        // validate();
        const resp = await fetch("/auth/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });
        const data = await resp.json();
        if(data.err) M.toast({html: data.err, classes: "#c62828 red darken-3"});

        else {
            M.toast({html: data.message, classes: "#43a047 green darken-1"});
            history.push('/login');
        }
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="Name" 
                    value={name} onChange={(e) => setName(e.target.value)}
                />
                <input type="text" placeholder="Email" 
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" placeholder="Password" 
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2" 
                    type="submit" name="action" onClick={() => PostData()}>
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