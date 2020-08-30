import React, { useState, useEffect, useContext } from 'react';
import '../../App.css';
import Like from './Like';
import { UserContext } from './../../App';

const Home = () => {
    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(UserContext);

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
    }, []);

    const handleLike = (result) => {
        const copydata = data;
        var index = -1;
        const copyresult = copydata.filter((i, ind) => {
            if(i._id === result._id) {
                index = ind;
                return i;
            }
        });
        console.log(index);
        if(index === -1 ) {
            copydata[index] = copyresult;
        }
        else {
            copyresult[0].likes = result.likes;
            copydata[index] = copyresult;
        }
        setData(copydata);
    } 

    return (
        <>
        <div className="home">
        {
            data.map((item) => {
                return (
                    <div className="card home-card" key={item._id}>
                        <h5>{ item.postedBy.name }</h5>
                        <div className="card-image">
                            <img src={ item.photo } alt="post" />
                        </div>
                        <div className="card-content">
                            <Like item={item} state={state} handleLike={(result) => handleLike(result)} />
                            {/* <i className="material-icons pl-2">thumb_up</i>
                            <i className="material-icons pl-2">thumb_down</i> */}
                            <h6>{ item.title }</h6>
                            <p>{ item.body }</p>
                            <input type="text" placeholder="Add a Comment"/>
                        </div>
                    </div>
                )
            })
        }
        </div>
        </>
    )
}

export default Home;
