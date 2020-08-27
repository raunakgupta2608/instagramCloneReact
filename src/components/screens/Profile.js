import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './../../App';

const Profile = () => {

    const [myPics, setPics] = useState([]);
    const { state, dispatch } = useContext(UserContext);

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
    }, []);

    const url = "https://images.unsplash.com/photo-1491609154219-ffd3ffafd992?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
    return (
        <div style={{maxWidth: "80%", margin: "0px auto"}}>
            <div style={{display: "flex", 
                    justifyContent: "space-around", 
                    margin:"18px 0px", paddingBottom: "20px",
                    borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius: "80px"}} src={url} alt="dp"/>
                </div>
                <div>
                    <h4>{ state ? state.name : "loading" }</h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h6>40 Posts</h6>
                        <h6>40 Followers</h6>
                        <h6>40 Following</h6>
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