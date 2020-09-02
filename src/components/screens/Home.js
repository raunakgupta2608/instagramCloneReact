import React, { useState, useEffect, useContext } from 'react';
import '../../App.css';
import '../../Overlay.css';
import Like from './Like';
import { UserContext } from './../../App';
import { ListGroup, ListGroupItem } from 'reactstrap';

const Home = () => {
    const { state, dispatch } = useContext(UserContext);

    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

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

    const deletePost = async (postId) => {
        console.log(postId);
        try {
            const resp = await fetch(`/post/deletepost/${postId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer "+localStorage.getItem('jwt')
                }
            });
            const result = await resp.json();
            console.log(result);

            const newData = data.filter((item) => {
                return item._id !== result._id
            });
            setData(newData);

        } catch (error) {
            console.log(error);
        }
    }

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

    function on() {
        toggle();
        setTimeout(() => {
            document.getElementById("overlay").style.display = "block";
        }, 500); 
    }
      
    function off() {
        toggle();
        document.getElementById("overlay").style.display = "none";
    }

    return (
        <>
        <div className="home">
        {
            data.map((item) => {
                return (
                    <>
                    <div className="card home-card" key={item._id}>
                        <h5 className="p-3">{ item.postedBy.name }
                            {
                                state?
                                    item.postedBy._id === state._id ?
                                    <i className="material-icons float-right" style={{cursor: "pointer"}}
                                        onClick={() => {on()}}
                                    >more_vert
                                    </i>
                                    : ""
                                : ""
                            }
                            {
                                modal ? 
                                <div id="overlay" onClick={() => off()}>
                                    <div id="text">
                                    <ListGroup>
                                        <ListGroupItem onClick={() => { deletePost(item._id)}}>Delete</ListGroupItem>
                                        <ListGroupItem>Share</ListGroupItem>
                                    </ListGroup>
                                    </div>
                                </div>
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
                </>
                )
            })
        }
        </div>
        </>
    )
}

export default Home;
