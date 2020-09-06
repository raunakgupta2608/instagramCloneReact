import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Signup = () => {
    const history = useHistory();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState(undefined);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        if(url) uploadFields();
    }, [url]);

    const uploadPic = async () => {
        setDisable(true);
        //fetching form data
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "instaclone")
        data.append("cloud_name", "raunakgupta")
        const resp = await fetch("https://api.cloudinary.com/v1_1/raunakgupta/image/upload", {
            method: "post",
            body: data
        });
        try {
            const data = await resp.json();
            setUrl(data.url);
            setDisable(false);
        } catch (error) {
            console.log(error);
            setDisable(false);
        }
    }

    const uploadFields = async () => {
        const resp = await fetch("/auth/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                profilePic: url
            })
        });
        const data = await resp.json();
        if(data.err) M.toast({html: data.err, classes: "#c62828 red darken-3"});

        else {
            M.toast({html: data.message, classes: "#43a047 green darken-1"});
            history.push('/login');
        }
    }

    const PostData = () => {
        if(image) {
            uploadPic();
        }
        else {
            uploadFields();
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
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-2 align-top">
                        <span>Upload Profile Pic</span>
                        <input type="file" onChange={(e) => {setImage(e.target.files[0])}} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div> 
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2" 
                    disabled={disable} type="submit" name="action" onClick={() => PostData()}>
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