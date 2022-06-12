import React, {memo, useEffect,useRef} from 'react';
import {formatRelative} from 'date-fns';
import { AppContext } from '../../Context/AppProvider';
import { LinkPreview } from '@dhaiwat10/react-link-preview';

// style in chatstyles
const Message = ({
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
    const {isPrivate} = React.useContext(AppContext);
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    }
    

    useEffect(() => {
        scrollToBottom();
    },[uid])


    const File = ({file}) => {
        return <a href={file}><i className="fa-solid fa-download"></i>Download file</a>
    }

    const Video = ({video}) => {
        return (
            <video controls>
                <source src={video} type="video/mp4"></source>
            </video>
        )
    }

    // function utf8_to_b64( str ) {
    //     return window.btoa(unescape(encodeURIComponent( str )));
    // }
    function b64_to_utf8( str ) {
        return decodeURIComponent(unescape(window.atob( str )));
    }
    //unescape dung de giai ma escape
      
    // console.log(utf8_to_b64('✓ à la mode'))
    // console.log(b64_to_utf8('4pyTIMOgIGxhIG1vZGU='))

    const Child = ({text, textfile, textvideo})=>{
        // console.log(textfile);
        if(text.includes('https://') || text.includes('http://')){
            return <LinkPreview url={text} />
        }else if(textfile != '' || textfile.length > 0){
            return <File file={textfile} />
        }else if(textvideo != '' || textvideo.length > 0){
            return <Video video={textvideo}/>
        }else{
            if(isPrivate){
                return b64_to_utf8(text);
            }else{
                return text||'';
            }
        }
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
                                    {/* {(text.includes('https://') || text.includes('http://'))?<LinkPreview url={text} />:text}
                                    {(textfile == ''|| textfile == null)?"":<File file={textfile} />}
                                    {(textvideo == '' || textvideo == null)?"":<Video video={textvideo}/>} */}
                                    <Child text={text || ''} textfile={textfile || ''} textvideo={textvideo || ''}/>
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
                                        {/* {(text.includes('https://') || text.includes('http://'))?<LinkPreview url={text} />:text}
                                        {(textfile == ''|| textfile == null)?"":<File file={textfile} />}
                                        {(textvideo == '' || textvideo == null)?"":<Video video={textvideo}/>} */}
                                        <Child text={text || ''} textfile={textfile || ''} textvideo={textvideo || ''}/>
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

export default React.memo(Message);