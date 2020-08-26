import React, { useState, useEffect } from 'react';
import '../../App.css';

const Home = () => {
    const [data, setData] = useState([]);

    async function fetchPosts() {
        const resp = await fetch('/post/allpost', {
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem('jwt')
            }
        })
        const result = await resp.json();
        console.log(result.posts);
        setData(result.posts);
    }

    useEffect(() => {
        fetchPosts()
    }, [])
    
    const url = "https://images.unsplash.com/photo-1461301214746-1e109215d6d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
    return (
        <>
        <div className="home">
        {
            data.map((item) => {
                return (
                    <div className="card home-card" key={item.id}>
                        <h5>{ item.postedBy.name }</h5>
                        <div className="card-image">
                            <img src={ item.photo } alt="post" />
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{color: "red"}}>favorite</i>
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