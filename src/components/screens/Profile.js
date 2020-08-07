import React from 'react';

const Profile = () => {
    const url = "https://images.unsplash.com/photo-1491609154219-ffd3ffafd992?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
    return (
        <div style={{maxWidth: "80%", margin: "0px auto"}}>
            <div style={{display: "flex", 
                    justifyContent: "space-around", 
                    margin:"18px 0px", 
                    borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius: "80px"}} src={url} alt="dp"/>
                </div>
                <div>
                    <h4>Flying Hopes</h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h6>40 Posts</h6>
                        <h6>40 Followers</h6>
                        <h6>40 Following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                <img className="item" src={url} alt="post" />
                <img className="item" src={url} alt="post" />
                <img className="item" src={url} alt="post" />
                <img className="item" src={url} alt="post" />
                <img className="item" src={url} alt="post" />
                <img className="item" src={url} alt="post" />
            </div>
        </div>
    )
}

export default Profile;