import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';

const CreatePost = () => {
    const history = useHistory();
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        //posting form data 
        async function postFormData() {
            try {
                const res = await fetch("/post/createpost", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer "+localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({
                        title,
                        body,
                        photo: url
                    })
                });
                const data = await res.json(); 
                console.log(data);
                if(data.err) return M.toast({html: data.err, classes: "#c62828 red darken-3"});
        
                else {
                    M.toast({html: "Posted Successfully", classes: "#43a047 green darken-1"});
                    history.push('/');
                }
            } catch (error) {
                console.log(error);
            }
        } 
        if(url) {
            postFormData();
        }
    }, [url]);

    const postDetails = async () => {
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

    return (
        <div className="card input-filled" 
            style={{margin: "30px auto", maxWidth: "500px", padding: "20px", textAlign: "center"}}>
            <input type="text" placeholder="Title" value={title}
                onChange={(e) => setTitle(e.target.value)}
            /> 
            <input type="text" placeholder="Body" value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-2">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e) => {setImage(e.target.files[0])}} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div> 
            <button className="btn waves-effect waves-light #64b5f6 blue darken-2" disabled={disable}
                type="submit" name="action" onClick={() => postDetails()}
            >
                Submit Post
            </button>
        </div>
    )
};

export default CreatePost;