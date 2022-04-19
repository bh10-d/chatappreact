import {React, useState, useEffect, useRef} from "react";
import firebase from "firebase";
import 'firebase/storage';
// import Message from "../message/message.component";
// import Message2 from "../message/message2.component";
import Chat2 from "../chat/chatv2.component";
// import Input from '../input/input.component';
// import { storage } from "../../firebase";
// import {storage} from "../../firebase.js";

const Channel = ({ user = null, db = null }) =>{
    const storage = firebase.storage();

    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const focus = useRef();
    const {uid, displayName, photoURL} = user;
    const [image,setImage] = useState(null); 
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
                    // console.log(data);
                })
                return unsubcribe;
        }
    },[db]);

    const handleOnChange = e=>{
        setNewMessage(e.target.value);
        console.log(e.target);
    };

    const handleOnSubmit = e=>{
        e.preventDefault();
        if(db){
            db.collection('messages').add({
                text: newMessage,
                textimage: image,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
        }
        focus.current.focus();
        setNewMessage('');
    }

    

    const handleChangeUp = e=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            // console.log(e.target.files[0]);
        }
    }
    // console.log(image)
    const handleUpload = ()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot =>{},
            error =>{
                console.log(error);
            },
            ()=>{
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setImage(url)
                        console.log(url)
                    })
            }
        )
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
                     {/* <div>
                        test upload
                        <input type="file" onChange={handleChangeUp} />
                        <button onClick={handleUpload}>Upload</button>
                    </div> */}
                    <div className="input-file">
                        <input type="file" onChange={handleChangeUp} />
                        <button onClick={handleUpload}>Upload</button>
                    </div>
                    {/* <button type="submit" className="btn-send" disabled={!newMessage}>Send</button> */}
                    <button type="submit" className="btn-send" >Send</button>
                </div>
                {/* <div className="input_ucontainer">
                    test upload
                    <input type="file" onChange={handleChangeUp} />
                    <button onClick={handleUpload}>Upload</button>
                </div> */}
            </form>



        </>
    )
}

export default Channel;


