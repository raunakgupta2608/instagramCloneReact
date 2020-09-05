import React, { useEffect, useContext } from 'react';
import '../../Overlay.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { OverlayContext } from './Home';

const OverlayListGroup = (props) => {
    const { postId, data } = props;
    const { modal, dispatchModal } = useContext(OverlayContext);  

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
            props.callbackFromParent(newData);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        on();
    },[modal]);

    function on() {
        document.getElementById("overlay").style.display = "block";
    }
      
    function off() {
        dispatchModal({type: 'toggle'});
        document.getElementById("overlay").style.display = "none";
    }

    return (
        <div id="overlay" onClick={() => off()}>
            <div id="text">
            <ListGroup>
                <ListGroupItem onClick={() => { deletePost(postId) }}>Delete</ListGroupItem>
                <ListGroupItem>Share</ListGroupItem>
            </ListGroup>
            </div>
        </div>
    );
}
 
export default OverlayListGroup;