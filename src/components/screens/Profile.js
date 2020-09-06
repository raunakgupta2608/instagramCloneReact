import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './../../App';

const Profile = () => {

    const [myPics, setPics] = useState([]);
    const { state, dispatch } = useContext(UserContext);
    const [disable, setDisable] = useState(false);
    const [image, setImage] = useState("");
    // const [url, setUrl] = useState(undefined);

    useEffect(() => {
        fetchData();
        async function fetchData() {
            const resp = await fetch('/post/myposts', {
                headers: {
                    'Authorization' : 'Bearer '+localStorage.getItem("jwt")
                }
            });
            try {
                const res = await resp.json();
                setPics(res.posts);
            } catch (error) {
                console.log(error);
            }
        }
        if(image) uploadPic();

    }, [image]);

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
            try {
                const resp = await fetch('/user/updateprofilepic', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+localStorage.getItem('jwt')
                    },
                    body: JSON.stringify({
                        profilePic: data.url
                    })
                });
                const result = await resp.json();
                console.log(result);
                localStorage.setItem('user', JSON.stringify({...state, profilePic: result.profilePic}));
                dispatch({type: 'UPDATEPROFILEPIC', payload: result.profilePic});
            } catch (error) {
                console.log(error);
            }

            setDisable(false);
        } catch (error) {
            console.log(error);
            setDisable(false);
        }
    }

    return (
        <div style={{maxWidth: "80%", margin: "0px auto"}}>
            <div style={{display: "flex", 
                    justifyContent: "space-around", 
                    margin:"18px 0px", paddingBottom: "20px",
                    borderBottom:"1px solid grey"}}>
                <div className="d-flex flex-column">
                    <img style={{width:"160px", height:"160px", borderRadius: "80px"}} 
                        src={state ? state.profilePic : "loading"} alt="dp"/>
                    {/* <button id="bt" className="btn waves-effect waves-light #64b5f6 blue darken-2"  type="submit" name="action" onClick={uploadPic} disabled={disable}>
                        Update Profile Pic
                    </button> */}
                    <div className="file-field input-field">
                        <div className="btn #64b5f6 blue darken-2">
                            <span>Update Profile Pic</span>
                            <input type="file" onChange={(e) => {setImage(e.target.files[0])}} />
                        </div>
                        {/* <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div> */}
                    </div> 
                </div>
                <div>
                    <h4>{ state ? state.name : "loading" }</h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h6>{myPics.length} Posts</h6>
                        <h6>{state ? state.followers.length : "loading"} Followers</h6>
                        <h6>{state ? state.following.length : "loading"} Following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    myPics.map(item => {
                        return <img key={item._id} className="item" src={item.photo} alt={item.title} />
                    })
                }
            </div>
        </div>
    )
}

export default Profile;