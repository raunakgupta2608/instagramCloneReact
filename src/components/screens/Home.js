import React, { useState, useEffect, useContext, useReducer, createContext } from 'react';
import '../../App.css';
import Like from './Like';
import { UserContext } from './../../App';
import OverlayListGroup from './OverlayListGroup';
import { overlayReducer, initialState } from '../../reducer/overlayReducer';
export const OverlayContext = createContext();

const Home = () => {
    const { state, dispatch } = useContext(UserContext);

    const [modal, dispatchModal] = useReducer(overlayReducer, initialState);

    const [data, setData] = useState([]);

    async function fetchPosts() {
        const resp = await fetch('/post/allpost', {
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

    return (
        <>
        <div className="home">
        {
            data.map((item) => {
                return (
                    <>
                    <OverlayContext.Provider value={{modal, dispatchModal}}>
                    <div className="card home-card" key={item._id}>
                        <h5 className="p-3"> { item.postedBy.name }
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
                                    <OverlayListGroup postId={item._id}/>
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
                                        <div key={record._id} className="d-flex align-item-center">
                                            <span style={{fontWeight: "500"}} className="pr-2">
                                                {record.postedBy[0].name}
                                            </span>
                                            <p>{record.text}</p>
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
        </>
    )
}

export default Home;
