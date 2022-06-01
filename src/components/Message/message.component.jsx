import React, {useEffect,useRef} from 'react';
import {formatRelative} from 'date-fns';
import { AppContext } from '../../Context/AppProvider';

// style in chatstyles
const Message2 = ({
    createdAt = null,
    text = '',
    textimage = null,
    displayName = '',
    photoURL = '',
    uid = '',
    uidcheck = '',
})=>{
    const {isPrivate} = React.useContext(AppContext)
    const [ hiddenbg, setHiddenbg ] = React.useState(false)
    const messagesEndRef = useRef(null)
    
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    }

    useEffect(() => {
        scrollToBottom();
    },[uid])

    return (
        <>
            {(uid !== uidcheck)? (
                <div className="user_1_container">
                    <div className="user_1">
                        {photoURL ? (
                            <img className="avatar" src={photoURL} alt={displayName} title={displayName}/>
                        ):null}
                        <div className="text-white">
                            <div className={`text ${(textimage != null)?"bg-transparent":"bg-[#4E4F50]"}`}>
                                {(textimage != null )?(<img src={textimage} alt="imga"/>):null}
                                <div className="" title={createdAt?.seconds ? `${formatRelative(new Date(createdAt.seconds * 1000),new Date())}`:null}>
                                    {/* {(isPrivate)? atob((text.includes('https://') || text.includes('http://'))?<a href={text}>{text}</a>:text):(text.includes('https://') || text.includes('http://'))?<a href={text}>{text}</a>:text} */}
                                    {/* {(text.includes('https://') || text.includes('http://'))?<a href={text}>{text}</a>:text} */}
                                    {(text.includes('https://') || text.includes('http://'))?<a href={text}>{text}</a>:text}
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
                                <div className={`text ${(textimage != null)?"bg-transparent":"bg-[#0084FF]"}`}>
                                    {(textimage != null )?(<img src={textimage} alt="imga"/>):null}
                                    <div className="" title={createdAt?.seconds ? `${formatRelative(new Date(createdAt.seconds * 1000),new Date())}`:null}>
                                        {/* {(isPrivate)? atob(text):text} */}
                                        {/* {text} */}
                                        {/* {(isPrivate)? atob((text.includes('https://') || text.includes('http://'))?<a href={text}>{text}</a>:text):(text.includes('https://') || text.includes('http://'))?<a href={text}>{text}</a>:text} */}
                                        {(text.includes('https://') || text.includes('http://'))?<a href={text}>{text}</a>:text}
                                    </div>
                                </div>
                            </div>
                            {/* {photoURL ? (
                                <img className="avatar" src={photoURL} alt={displayName} title={displayName}/>
                            ):null} */}
                        </div>
                    </div>
                </div>
            )}
            {/* <div className="user_1_container">
                <div className="user_1">
                    {photoURL ? (
                        <img className="avatar" src={photoURL} alt={displayName}/>
                    ):null}
                    <div>
                        <div className="text">
                            {(textimage != null )?(<img src={textimage} alt="imga"/>):null}
                            <div className="" title={createdAt?.seconds ? `${formatRelative(new Date(createdAt.seconds * 1000),new Date())}`:null}>
                                {text}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user_2_container text-red-600">
                    <div className="user_2_right">
                        <div className="user_2">
                            <div className="text-white">
                                <div className="text">
                                    {(textimage != null )?(<img src={textimage} alt="imga"/>):null}
                                    <div className="" title={createdAt?.seconds ? `${formatRelative(new Date(createdAt.seconds * 1000),new Date())}`:null}>
                                        {text}
                                    </div>
                                </div>
                            </div>
                            {photoURL ? (
                                <img className="avatar" src={photoURL} alt={displayName} title={displayName}/>
                            ):null}
                        </div>
                    </div>
                </div> */}
            <div ref={messagesEndRef} /> {/*auto scroll to bottom*/}
        </>
    );
};

export default Message2;