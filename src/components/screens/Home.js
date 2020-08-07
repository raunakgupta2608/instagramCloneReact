import React from 'react';
import '../../App.css';

const Home = () => {
    const url = "https://images.unsplash.com/photo-1461301214746-1e109215d6d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
    return (
        <>
        <div className="home">
            <div className="card home-card">
                <h5>Flying Hopes</h5>
                <div className="card-image">
                    <img src={url} alt="post" />
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color: "red"}}>favorite</i>
                    <h6>Title</h6>
                    <p>This is an amazing post</p>
                    <input type="text" placeholder="Add a Comment"/>
                </div>
            </div>
        </div>
        <div className="home">
            <div className="card home-card">
                <h5>Flying Hopes</h5>
                <div className="card-image">
                    <img src={url} alt="post" />
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color: "red"}}>favorite</i>
                    <h6>Title</h6>
                    <p>This is an amazing post</p>
                    <input type="text" placeholder="Add a Comment"/>
                </div>
            </div>
        </div>
        <div className="home">
            <div className="card home-card">
                <h5>Flying Hopes</h5>
                <div className="card-image">
                    <img src={url} alt="post" />
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color: "red"}}>favorite</i>
                    <h6>Title</h6>
                    <p>This is an amazing post</p>
                    <input type="text" placeholder="Add a Comment"/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;