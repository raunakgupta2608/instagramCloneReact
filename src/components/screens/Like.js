import React, { useState, useEffect } from 'react';

const Like = ({ state, item }) => {
    let like = "";
    const [color, setColor] = useState("");
    const [postObj, setPostObj] = useState(item);

    const postLikeOrUnlike = async () => {
        console.log('/post/'+like);
        const resp = await fetch('/post/'+like, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({ postId: postObj._id})
        });

        const result = await resp.json();
        console.log(result);
        if(result) setPostObj(result);
    }

    useEffect(() => {
        postObj.likes.includes(state._id) ? setColor("red") : setColor("yellow");
    }, [postObj]);

    const likeOrUnlike = () => {
        like = postObj.likes.includes(state._id) ? "unlike" : "like";
        postLikeOrUnlike();
    }

    const likes = () => {
        console.log(postObj);
        if(postObj.likes.length > 1) {
            return (
                `Liked by ${postObj.likes[0].name} and ${postObj.likes.length - 1}  others`
            )
        }
        else {
            return `${postObj.likes.length} Likes`
        }
    }

    return (
        <>
            <i className="material-icons" onClick={() => likeOrUnlike() }
            style={{ color: color, cursor: "pointer"}}
            >
            favorite
            </i>
            <h6>{ postObj.likes.length } Likes</h6>
        </>
    );
}
 
export default Like;