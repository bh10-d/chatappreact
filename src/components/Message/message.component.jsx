import React, {useEffect,useRef} from 'react';
import {formatRelative} from 'date-fns';
// import { AppContext } from '../../Context/AppProvider';
import { LinkPreview } from '@dhaiwat10/react-link-preview';

// style in chatstyles
const Message2 = ({
    createdAt = null,
    text = '',
    textimage = null,
    textfile = null,
    namefile = null,
    textvideo = null,
    displayName = '',
    photoURL = '',
    uid = '',
    uidcheck = '',
})=>{
    const messagesEndRef = useRef(null)
    
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    }

    useEffect(() => {
        scrollToBottom();
    },[uid])


    const File = (file) => {
        return <a href={file.file}><i className="fa-solid fa-download"></i>Download file</a>
    }

    const Video = (video) => {
        return (
            <video controls>
                <source src={video.video} type="video/mp4"></source>
            </video>
        )
    }

    return (
        <>
            {(uid !== uidcheck)? (
                <div className="user_1_container">
                    <div className="user_1">
                        {photoURL ? (
                            <img className="avatar" src={photoURL} alt={displayName} title={displayName}/>
                        ):null}
                        <div className="text-white">
                            <div className={`text ${((textimage != null)||(text.includes('https://')||text.includes('http://')))?"bg-transparent":"bg-[#4E4F50]"}`}>
                                {(textimage != null )?(<img src={textimage} alt="imga"/>):null}
                                <div className="" title={createdAt?.seconds ? `${formatRelative(new Date(createdAt.seconds * 1000),new Date())}`:null}>
                                    {/* {(isPrivate)? atob((text.includes('https://') || text.includes('http://'))?<a href={text}>{text}</a>:text):(text.includes('https://') || text.includes('http://'))?<a href={text}>{text}</a>:text} */}
                                    {/* {(text.includes('https://') || text.includes('http://'))?<a href={text}>{text}</a>:text} */}
                                    {/* {(text.includes('https://') || text.includes('http://'))?<a href={text}>{text}</a>:text} */}
                                    {(text.includes('https://') || text.includes('http://'))?<LinkPreview url={text} />:text}
                                    {(textfile == ''|| textfile == null)?"":<File file={textfile} />}
                                    {(textvideo == '' || textvideo == null)?"":<Video video={textvideo}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ):(
                <div className="user_2_container">
                    <div className="user_2_right">
                        <div className="user_2">
                            <div className="text-white">
                                <div className={`text ${((textimage != null)||(text.includes('https://')||text.includes('http://')))?"bg-transparent":"bg-[#0084FF]"}`}>
                                    {(textimage != null )?(<img src={textimage} alt="imga"/>):null}
                                    <div className="" title={createdAt?.seconds ? `${formatRelative(new Date(createdAt.seconds * 1000),new Date())}`:null}>
                                        {/* {(isPrivate)? atob(text):text} */}
                                        {/* {text} */}
                                        {/* {(isPrivate)? atob((text.includes('https://') || text.includes('http://'))?<a href={text}>{text}</a>:text):(text.includes('https://') || text.includes('http://'))?<a href={text}>{text}</a>:text} */}
                                        {(text.includes('https://') || text.includes('http://'))?<LinkPreview url={text} />:text}
                                        {(textfile == ''|| textfile == null)?"":<File file={textfile} />}
                                        {(textvideo == '' || textvideo == null)?"":<Video video={textvideo}/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} /> {/*auto scroll to bottom*/}
        </>
    );
};

export default Message2;