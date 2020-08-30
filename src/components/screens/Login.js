import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import M from 'materialize-css';
import SpinnerComponent from './Spinner';

const Login = () => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [btndisable, setBtndisable] = useState(false);
    const [loading, setLoading] = useState(false);

    const PostData = async () => {
        setLoading(true);
        setBtndisable(true);
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
            const data = await resp.json();
            setLoading(false);

            if(data.message) {
                setBtndisable(false);
                return M.toast({html: data.message, classes: "#c62828 red darken-3"});
            }
            else {
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                dispatch({type: "USER", payload: data.user})
                M.toast({html: "Login Successful", classes: "#43a047 green darken-1"});
                history.push('/');
            }
        } catch (error) {
            console.log(error);
        }   
    }

    const Enter = (e) => {
        if(e.key == "Enter") document.getElementById("bt").click()
    }

    if(!loading) {
        return (
            <div className="mycard">
                <div className="card auth-card input-field">
                    <h2>Instagram</h2>
                    <input type="text" placeholder="Email" 
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder="Password" onKeyUp={(e) => Enter(e)}
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <button id="bt" className="btn waves-effect waves-light #64b5f6 blue darken-2" type="submit" name="action"
                        disabled={btndisable} onClick={() => PostData() }>
                        Login
                    </button>
                    <h5>
                        <span>Don't have an account?</span><Link to="/signup"> Sign Up</Link>
                    </h5>
                </div>
            </div>
        )
    }
    else {
        return (
            <SpinnerComponent />
        )
    }
}

export default Login;