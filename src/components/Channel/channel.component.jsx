import React,{ useState, useEffect, useRef} from "react";
import {storage} from '../../Firebase/config';
import Chat from "../Chat/chat.component";
import { Avatar, Button, Tooltip, Alert } from "antd";
import { UserAddOutlined }from '@ant-design/icons';
import {AppContext} from '../../Context/AppProvider';
import {AuthContext} from '../../Context/AuthProvider';
import {addDocument} from '../../Firebase/services';
import useFirestore from '../../Hooks/useFirestore';

const Channel = () =>{
    const { mode, selectedRoom, members, setIsInviteMemberVisible, isPrivate, isChooseImage, setIsChooseimage, turnLeft, setIsChangeImageGroup } = React.useContext(AppContext);
    const {user:{
        uid,
        photoURL,
        displayName,
    }} = React.useContext(AuthContext);

    const [newMessage, setNewMessage] = useState('');
    const focus = useRef();
    const focusImage = useRef();
    // const [image,setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState()

    // console.log('asd');

    function utf8_to_b64( str ) {
        return window.btoa(unescape(encodeURIComponent( str )));
    }

    const handleOnChange = e=>{
        setNewMessage(e.target.value);
    };
    const handleOnSubmit = e=>{
        let testing = '';
        let formatText = '';
        
        if(isPrivate){
            formatText = utf8_to_b64(newMessage);
        }else{
            formatText = newMessage;
        }

        if(focusImage.current.files[0] !== undefined){
            let file = focusImage.current.files[0];
            if(file.type.includes('image')){
                const uploadTask = storage.ref(`images/${file.name}`).put(file);
                // console.log(File(focusImage.current.files[0].name, focusImage.current.files[0],{text: newMessage, uid, photoURL, roomId: selectedRoom.id, displayName})); 
                // File(focusImage.current.files[0],{text: newMessage, uid, photoURL, roomId: selectedRoom.id, displayName})
                uploadTask.on(
                    "state_changed",
                    snapshot =>{
                        console.log(snapshot)
                    },
                    error =>{
                        console.log(error);
                    },
                    ()=>{
                        storage
                        .ref("images")
                        .child(file.name)
                        .getDownloadURL()
                        .then(url => {
                            testing = url
                            // setImage(url)
                            console.log(url)
                            addDocument('messages',{
                                text: formatText,
                                textimage: testing,
                                uid,
                                photoURL,
                                roomId: selectedRoom.id,
                                displayName,
                            })
                            console.log('bo may chay truoc nha')
                            focus.current.focus();
                            deleteImage();
                        })
                    }
                    )
                }
                if(file.type.includes('doc')||file.type.includes('excel')||file.type.includes('pdf')){
                    const uploadTask = storage.ref(`files/${file.name}`).put(file);
                    uploadTask.on(
                        "state_changed",
                        snapshot =>{
                            console.log(snapshot)
                        },
                        error =>{
                            console.log(error);
                        },
                        ()=>{
                            storage
                            .ref("files")
                            .child(file.name)
                            .getDownloadURL()
                            .then(url => {
                                testing = url
                                // setImage(url)
                                console.log(url)
                                addDocument('messages',{
                                    text: formatText,
                                    textfile: testing,
                                    namefile: file.name,
                                    uid,
                                    photoURL,
                                    roomId: selectedRoom.id,
                                    displayName,
                                })
                                console.log('bo may chay truoc nha')
                                focus.current.focus();
                                deleteImage();
                            })
                        }
                    )
                }
                if(file.type.includes('video')){
                    const uploadTask = storage.ref(`videos/${file.name}`).put(file);
                    uploadTask.on(
                        "state_changed",
                        snapshot =>{
                            console.log(snapshot)
                        },
                        error =>{
                            console.log(error);
                        },
                        ()=>{
                            storage
                            .ref("videos")
                            .child(file.name)
                            .getDownloadURL()
                            .then(url => {
                                testing = url
                                // setImage(url)
                                console.log(url)
                                addDocument('messages',{
                                    text: formatText,
                                    textvideo: testing,
                                    namevideo: file.name,
                                    uid,
                                    photoURL,
                                    roomId: selectedRoom.id,
                                    displayName,
                                })
                                console.log('bo may chay truoc nha')
                                focus.current.focus();
                                deleteImage();
                            })
                        }
                    )
                }
                e.preventDefault();
            }else{
                e.preventDefault();
                if(newMessage !== ''){
                    addDocument('messages',{
                        text: formatText,
                        uid,
                        photoURL,
                        roomId: selectedRoom.id,
                        displayName,
                    })
                    focus.current.focus();
                }
                focus.current.focus();
            }
        testing = null; 
        setNewMessage('');
        // deleteImage();
        setIsChooseimage(false)
    }

    const handlePressEnter = (e)=>{
        handleOnSubmit();
    }
    
    const condition = React.useMemo(()=>({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id
    }),[selectedRoom.id])
    
    const messages = useFirestore('messages', condition)
    useEffect(() =>{
        //CleanUp
        return()=>{
            previewImage && URL.revokeObjectURL(previewImage.preview)
        }
    },[previewImage])

    const handleChangeInput = (e)=>{
        setIsChooseimage(true);
        // console.log(focusImage.current.files[0].name)
        // console.log(e.target.files[0])
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setPreviewImage(file)
        // console.log(e.target.files[0]);
        focus.current.focus();
    }

    const deleteImage = ()=>{
        // console.log(focus.current.files)
        focusImage.current.value= '';
        setIsChooseimage(false)
    }

    const ButtonInite = ()=>{
        //true => private
        //fasle => non private
    
        if(isPrivate === false && (turnLeft === 0 || turnLeft === undefined)){
            return (<Button icon={<UserAddOutlined />} className="text-sky-600 hover:text-pink-500 text-[16px]" type="text" onClick={()=>setIsInviteMemberVisible(true)}>Mời</Button>)
        }
        if(isPrivate === true && turnLeft === 1){
            return (<Button icon={<UserAddOutlined />} className="text-sky-600 hover:text-pink-500 text-[16px]" type="text" onClick={()=>setIsInviteMemberVisible(true)}>Mời</Button>)
        }
        if(isPrivate === true && turnLeft === 0){
            return ''
        }
    }

    const handleChangeAvaGr = () => {
        setIsChangeImageGroup(true)
        console.log("click")
    }

    return (
        <>
            <div className="basis-10/12 relative">
                { selectedRoom.id ? (
                    <>
                        <div className="h-10 flex justify-between items-center shadow-md">
                            <p className={`text-xl ml-4 ${(mode==="dark")?"text-white":"text-black"}`}>{selectedRoom.name}</p>
                            <div className="flex justify-center items-center">
                                {/* {(isPrivate)?'':(<Button icon={<UserAddOutlined />} className="text-sky-600 hover:text-pink-500 text-[16px]" type="text" onClick={()=>setIsInviteMemberVisible(true)}>Mời</Button>)} */}
                                <ButtonInite />
                                <Avatar.Group size="small" maxCount={2}>
                                    {members.map((member=>
                                        <Tooltip title={member.displayName} key={member.id}>
                                            <Avatar src={member.photoURL}>{member.photoURL ? '': member.displayName?.charAt(0)?.toUpperCase()}</Avatar>
                                        </Tooltip>
                                    ))}
                                </Avatar.Group>
                                <div className={`ml-1 mr-2 ${(mode==="dark")?"text-white":"text-black"}`} onClick={handleChangeAvaGr}>
                                    {/* <i className="fa-solid fa-circle-plus"></i> */}
                                    {/* <i className="fa-solid fa-info"></i> */}
                                    <i className="fa-solid fa-circle-info"></i>
                                </div>
                            </div>
                            {/* <button className="mr-3 text-2xl text-white"><i className='bx bx-info-circle' ></i></button> */}
                        </div>
                        <div className={`h-40 w-full bg-slate-700 absolute bottom-10 ${isChooseImage?'block':'hidden'}`}>
                            <div className="w-24 h-[80%] ml-4 mt-4 relative">
                                <button className="absolute right-2 text-white" onClick={deleteImage}><i className="fa-solid fa-trash-can"></i></button>
                                {/* <img className="w-full" src="/avatar.jpg" alt="img-preview" /> */}
                                {previewImage && (
                                    <img className="w-full h-full" src={previewImage.preview} alt="lag r" />
                                )}
                            </div>
                        </div>
                        <Chat data={messages} uidcheck={uid}/>
                        <form className="" onSubmit={handleOnSubmit}>
                            <div className="flex">
                                <div className={`${(mode==="dark")?"text-white":"text-black"} text-xl pt-[6px] mr-2 flex`}>
                                    <div className="ml-3">
                                        <input className="custom_input-file" ref={focusImage} onChange={handleChangeInput} type="file"/>
                                    </div>
                                </div>
                                <input
                                    className={`w-full pt-2 pb-2 pl-4 rounded-full ${(mode==="dark")?"bg-zinc-600 text-white":"bg-slate-200 text-black"}   focus:outline-none`} 
                                    type="text"
                                    value={newMessage}
                                    onChange={handleOnChange}
                                    placeholder="Type your message here ..."
                                    ref={focus}
                                />
                                <button className="bg-sky-500 rounded-full pl-3 pr-3 pt-1 ml-1" type="submit" onKeyPress={handlePressEnter} ><i className='bx bx-send' ></i></button>
                            </div>
                        </form>
                        {/* <CustomForm handleOnSubmit={handleOnSubmit} mode={mode} handleChangeInput={handleChangeInput} focusImage={focusImage} focus={focus} handleOnChange={handleOnChange} newMessage={newMessage} /> */}
                    </>
                ) :  <Alert message="Hãy chọn phòng" type="info" showIcon style={{ margin: 5 }} closable/>}
            </div>
        </>
    )
}

// const CustomForm = (props)=>{
//     console.log(props)
//     return (
//         <form className="" onSubmit={props.handleOnSubmit}>
//             <div className="flex">
//                 <div className={`${(props.mode==="dark")?"text-white":"text-black"} text-xl pt-[6px] mr-2 flex`}>
//                     <div className="ml-3">
//                         <input className="custom_input-file" ref={props.focusImage} onChange={props.handleChangeInput} type="file"/>
//                     </div>
//                 </div>
//                 <input
//                     className={`w-full pt-2 pb-2 pl-4 rounded-full ${(props.mode==="dark")?"bg-zinc-600 text-white":"bg-slate-200 text-black"}   focus:outline-none`} 
//                     type="text"
//                     value={props.newMessage}
//                     onChange={props.handleOnChange}
//                     placeholder="Type your message here ..."
//                     ref={props.focus}
//                 />
//                 <button className="bg-sky-500 rounded-full pl-3 pr-3 pt-1 ml-1" type="submit" onKeyPress={props.handlePressEnter} ><i className='bx bx-send' ></i></button>
//             </div>
//         </form>
//     )
// }


export default Channel;


