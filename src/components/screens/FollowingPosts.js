import React, { useState, useEffect, useContext, useReducer, createContext } from 'react';
import '../../App.css';
import Like from './Like';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import OverlayListGroup from './OverlayListGroup';
import { overlayReducer, initialState } from '../../reducer/overlayReducer';
export const OverlayContext = createContext();

const FollowingPosts = () => {
    const { state, dispatch } = useContext(UserContext);

    const [modal, dispatchModal] = useReducer(overlayReducer, initialState);

    const [data, setData] = useState([]);

    async function fetchPosts() {
        const resp = await fetch('/post/getfollowingpost', {
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem('jwt')
            }
        });
        const result = await resp.json();
        setData(result.posts);
    }

    useEffect(() => {
        fetchPosts()
    }, [data]);


    const makeComment = async (text, postId) => {
        try {
            const resp = await fetch('/post/comment', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    postId,
                    text
                })
            });
            const result = await resp.json();
            const newData = data.map((item) => { return item._id == result._id ? result : item});
            setData(newData);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteComment = async (post, commentId) => {
        const newComments = post.comments.filter((c) => {
            return c._id !== commentId;
        }); 
        const postId = post._id;
        try {
            const resp = await fetch('/post/comment', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    postId,
                    newComments
                })
            });
            const result = await resp.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        {
        state ? 
        <div className="home">
        {
            data.map((item) => {
                return (
                    <>
                    <OverlayContext.Provider value={{modal, dispatchModal}}>
                    <div className="card home-card" key={item._id}>
                        <h5 className="p-3">
                            <Link to={item.postedBy._id !== state._id ? 
                                    `/profile/${item.postedBy._id}` : 
                                    `/profile`}>
                                { item.postedBy.name }
                            </Link>
                            {
                                state?
                                    item.postedBy._id === state._id ?
                                    <i className="material-icons float-right" style={{cursor: "pointer"}}
                                        onClick={() => {dispatchModal({type: 'toggle'});}}
                                    >more_vert
                                    </i>
                                    : ""
                                : ""
                            }
                            {
                                modal ? 
                                    <OverlayListGroup postId={item._id} data={data} 
                                        callbackFromParent={(d) => setData(d)} />
                                : ""
                            }
                        </h5>
                        <div className="card-image">
                            <img src={ item.photo } alt="post" />
                        </div>
                        <div className="card-content">
                            <Like item={item} state={state}/>
                            {/* <h6>{ item.title }</h6>
                            <p>{ item.body }</p> */}
                            {
                                item.comments.map((record, index) => {
                                    return (
                                        <div key={record._id + index} className="d-flex align-item-center">
                                            <span style={{fontWeight: "500"}} className="pr-2">
                                                {record.postedBy[0].name}
                                            </span>
                                            <p>{record.text}</p>
                                            {
                                                state ?
                                                state._id === record.postedBy[0]._id ?
                                                <i className="material-icons ml-auto" style={{cursor: "pointer"}}
                                                onClick={() => deleteComment(item, record._id)}>delete</i> 
                                                : "" : ""
                                            }
                                        </div>

                                    )
                                })
                            }
                            <form onSubmit = {(e) => {
                                e.preventDefault();
                                makeComment(e.target[0].value, item._id);
                                e.target[0].value = "";
                            }}>
                                <input type="text" placeholder="Add a Comment"/>
                            </form>
                        </div>
                    </div>
                    </OverlayContext.Provider>
                </>
                )
            })
        }
        </div>
        : ""
        }
        
        </>
    )
}

export default FollowingPosts;
