import {React, useState, useEffect, useRef} from "react";
import firebase from "firebase";
import 'firebase/storage';
// import Message from "../message/message.component";
// import Message2 from "../message/message2.component";
import Chat2 from "../chat/chatv2.component";
import Sidebar from "../sidebar/sidebar.component";
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
                text: btoa(newMessage),
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
            // console.log(e.target.files[0].slice(1,1));
            // console.log(e.target.files[0]);
            console.log(e.target);
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
            <div className="basis-9/12">
                <Chat2 data={message} uid={uid}/>

                <form className="" onSubmit={handleOnSubmit}>
                    {/* <div className="input_container">
                        <input
                            className="input-text" 
                            type="text"
                            value={newMessage}
                            onChange={handleOnChange}
                            placeholder="Type your message here ..."
                            ref={focus}
                        />
                        <div className="input-file">
                            <input type="file" onChange={handleChangeUp}  />
                            <button onClick={handleUpload} disabled={!image}>Upload</button>
                            <p>{(image!=null)?"upload done":null}</p>
                            <button onClick={()=>{setImage(null)}}>Clear</button>
                        </div>
                        <button type="submit" className="btn-send" >Send</button>
                    </div> */
                    <div className="flex">
                        <div className="text-white text-xl pt-[6px] mr-2 flex">
                            <p className="hover:bg-sky-500 rounded-full pl-2 pr-2 cursor-pointer"><i className='bx bx-file-blank' ></i></p>
                            <p className="hover:bg-sky-500 rounded-full ml-1 pl-2 pr-2 cursor-pointer"><i className='bx bx-upload' ></i></p>
                        </div>
                        <input
                            className="w-full pt-2 pb-2 pl-4 rounded-full bg-zinc-600 text-white focus:outline-none" 
                            type="text"
                            value={newMessage}
                            onChange={handleOnChange}
                            placeholder="Type your message here ..."
                            ref={focus}
                        />
                        {/* <div className="">
                            <input type="file" onChange={handleChangeUp}  />
                            <button onClick={handleUpload} disabled={!image}>Upload</button>
                            <p>{(image!=null)?"upload done":null}</p>
                        </div> */}
                        <button className="bg-sky-500 rounded-full pl-3 pr-3 pt-1 ml-1" type="submit"  ><i className='bx bx-send' ></i></button>
                    </div>}
                </form>
            </div>



        </>
    )
}

export default Channel;


