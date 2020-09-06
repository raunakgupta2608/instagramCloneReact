import React, { useEffect, useState, useContext } from 'react';
import SpinnerComponent from './Spinner';
import { UserContext } from './../../App';
import { useParams } from 'react-router-dom';

const UserProfile = () => {

    const [userProfile, setProfile] = useState(null);
    const { state, dispatch } = useContext(UserContext);
    const { userId } = useParams();
    const [showFollow, setShowFollow] = useState(true);
    
    useEffect(() => {
        fetchData();
        async function fetchData() {
            try {
                const resp = await fetch(`/user/${userId}`, {
                    headers: {
                        'Authorization' : 'Bearer '+localStorage.getItem("jwt")
                    }
                });
                const res = await resp.json();
                setProfile(res);
                setShowFollow(res.user.following.some(item => state._id == item))
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    const followUser = async () => {
        const resp = await fetch('/user/follow', {
            method: "PUT",
            headers: {
                'Content-Type' : 'Application/json',
                'Authorization' : 'Bearer '+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: userId
            })
        });
        const result = await resp.json();
        console.log(result);
        dispatch({
            type: 'UPDATE', 
            payload: {
                following: result.following,
                followers: result.followers
            } 
        });
        localStorage.setItem('user', JSON.stringify(result));
        setProfile((prevState) => {
            return {
                ...prevState,
                user: {
                    ...prevState.user,
                    followers: [...prevState.user.followers, result._id]
                }
            }
        });
        setShowFollow(!showFollow);
    };

    const unfollowUser = async () => {
        const resp = await fetch('/user/unfollow', {
            method: "PUT",
            headers: {
                'Content-Type' : 'Application/json',
                'Authorization' : 'Bearer '+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unfollowId: userId
            })
        });
        const result = await resp.json();
        dispatch({
            type: 'UPDATE', 
            payload: {
                following: result.following,
                followers: result.followers
            } 
        });
        localStorage.setItem('user', JSON.stringify(result));
        setProfile((prevState) => {
            const newFollower = prevState.user.followers.filter(item => item !== result._id);
            return {
                ...prevState,
                user: {
                    ...prevState.user,
                    followers: newFollower
                }
            }
        });
        setShowFollow(!showFollow);
    };

    return (
        <>
        {userProfile ? 
            <div style={{maxWidth: "80%", margin: "0px auto"}}>
                <div style={{display: "flex", 
                        justifyContent: "space-around", 
                        margin:"18px 0px", paddingBottom: "20px",
                        borderBottom:"1px solid grey"}}>
                    <div>
                        <img style={{width:"160px", height:"160px", borderRadius: "80px"}} 
                        src={userProfile ? userProfile.profilePic : "loading" } alt="dp"/>
                    </div> 
                    <div>
                        <h4>{ userProfile.user.name }</h4>
                        <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                            <h6>{userProfile.posts.length} Posts</h6>
                            <h6>{userProfile.user.followers.length} Followers</h6>
                            <h6>{userProfile.user.following.length} Following</h6>
                        </div>
                        { showFollow ?
                        <button id="bt" className="btn waves-effect waves-light #64b5f6 blue darken-2" type="submit" name="action" onClick={() => followUser() }>
                        Follow
                        </button>
                        :
                        <button id="bt" className="btn waves-effect waves-light #64b5f6 blue darken-2" type="submit" name="action" onClick={() => unfollowUser() }>
                        UnFollow
                        </button>
                        }
                    </div>
                </div>
                <div className="gallery">
                    {
                        userProfile.posts.map(item => {
                            return <img key={item._id} className="item" src={item.photo} alt={item.title} />
                        })
                    }
                </div>
            </div>
            : <SpinnerComponent />
        }
        </>

    )
}

export default UserProfile;