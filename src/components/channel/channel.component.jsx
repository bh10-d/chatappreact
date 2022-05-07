import {React, useState, useEffect, useRef} from "react";
import firebase from "firebase";
import 'firebase/storage';
import Chat from "../chat/chat.component";

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
                })
                return unsubcribe;
        }
    },[db]);

    const handleOnChange = e=>{
        setNewMessage(e.target.value);
        // console.log(e.target);
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

    const handlePressEnter = (e)=>{
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
            console.log(e.target);
        }
    }

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
            <div className="basis-10/12">
                <div className="h-10 flex justify-between items-center">
                    <p className="text-xl ml-4 text-white">tên nhóm</p>
                    <button className="mr-3 text-2xl text-white"><i className='bx bx-info-circle' ></i></button>
                </div>
                <Chat data={message} uid={uid}/>

                <form className="" onSubmit={handleOnSubmit}>
                    {/* <div className="input_container">
                        <div className="input-file">
                            <input type="file" onChange={handleChangeUp}  />
                            <button onClick={handleUpload} disabled={!image}>Upload</button>
                            <p>{(image!=null)?"upload done":null}</p>
                            <button onClick={()=>{setImage(null)}}>Clear</button>
                        </div>
                    </div> */}
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
                        <button className="bg-sky-500 rounded-full pl-3 pr-3 pt-1 ml-1" type="submit" onKeyPress={handlePressEnter}  ><i className='bx bx-send' ></i></button>
                    </div>
                </form>
            </div>



        </>
    )
}

export default Channel;


