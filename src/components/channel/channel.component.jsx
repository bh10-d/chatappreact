import {React, useState, useEffect, useRef} from "react";
import firebase from "firebase";
import Message from "../message/message.component";
import Message2 from "../message/message2.component";
import Chat2 from "../chat/chatv2.component";

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
                    console.log(data);
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
            {/* <ul>
                {message.map(message =>(
                    // <li key={message.id}><Message2 {...message}/></li>
                    <Message2 {...message}/>
                ))}
            </ul> */}

            <Chat2 data={message} uid={uid}/>
            
            {/* <form onSubmit={handleOnSubmit}>
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
            </form> */}

            <form onSubmit={handleOnSubmit}>
                <div className="input_container">
                    <input
                        className="input-text" 
                        type="text"
                        value={newMessage}
                        onChange={handleOnChange}
                        placeholder="Type your message here ..."
                        ref={focus}
                    />
                    <button type="submit" className="btn-send" disabled={!newMessage}>Send</button>
                </div>
            </form>
        </>
    )
}

export default Channel;


