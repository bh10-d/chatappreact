import {React, useState, useEffect, useRef} from "react";
import firebase from "firebase";


const Channel = ({ user = null, db = null }) =>{

    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const focus = useRef();

    const {uid, displayName, photoURL} = user;

    useEffect(() =>{
        if(db){
            const unsubcribe = db
                .collection('messages')
                .orderBy('createdAt')
                .limit(100)
                .onSnapshot(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id
                    }));
                    setMessage(data);
                })
                return unsubcribe;
        }
    },[db]);

    const handleOnChange = e=>{
        setNewMessage(e.target.value);
    };

    const handleOnSubmit = e=>{
        e.preventDefault();
        if(db){
            db.collection('messages').add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
        }
        focus.current.focus();
        setNewMessage('');
    }

    return (
        <>
            <ul>
                {message.map(message =>(
                    <li key={message.id}>{message.text}</li>
                ))}
            </ul>
            <form onSubmit={handleOnSubmit}>
                <input 
                    type="text"
                    value={newMessage}
                    onChange={handleOnChange}
                    placeholder="Type your message here ..."
                    ref={focus}
                />
                <button type="submit" disabled={!newMessage}>
                    Send
                </button>
            </form>
        </>
    )
}

export default Channel;


