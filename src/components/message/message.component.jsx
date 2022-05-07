import {React,useEffect,useRef} from 'react';
import {formatRelative} from 'date-fns';

const Message2 = ({
    createdAt = null,
    text = '',
    textimage = null,
    displayName = '',
    photoURL = '',
    uid = '',
    uidcheck = '',
})=>{

    // console.log(uid, uidcheck);






    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [uid]);
  






    return (
        // <div>
        //     {photoURL ? (
        //         <img src={photoURL} alt="Avatar" width="45" height="45"/>
        //     ): null}
        //     {displayName ? <p>{displayName}</p> : null}
        //     {createdAt?.seconds ? (
        //         <span>
        //             {formatRelative(new Date(createdAt.seconds * 1000),new Date())}
        //         </span>
        //     ) : null}
        //     <p>{text}</p>
        // </div>
        <>
            {(uid !== uidcheck)? (
                <div className="user_1_container">
                    <div className="user_1">
                        {photoURL ? (
                            <img className="avatar" src={photoURL} alt={displayName} title={displayName}/>
                        ):null}
                        <div className="text-white">
                            {/* <span className="text-white">{displayName}</span> */}
                            <div className="text">
                                {(textimage != null )?(<img src={textimage} alt="imga"/>):null}
                                <div className="" title={createdAt?.seconds ? `${formatRelative(new Date(createdAt.seconds * 1000),new Date())}`:null}>
                                    {(text != '')? atob(text):null}

                                </div>
                            </div>
                            {/* {createdAt?.seconds ? (
                                <span className="time text-white">
                                    {formatRelative(new Date(createdAt.seconds * 1000),new Date())}
                                </span>
                            ) : null} */}
                        </div>
                    </div>
                </div>
            ):(
                <div className="user_2_container">
                    <div className="user_2_right">
                        <div className="user_2">
                            <div className="text-white">
                                {/* <span className="text-white">{displayName}</span> */}
                                <div className="text">
                                    {(textimage != null )?(<img src={textimage} alt="imga"/>):null}
                                    <div className="" title={createdAt?.seconds ? `${formatRelative(new Date(createdAt.seconds * 1000),new Date())}`:null}>
                                        {(text != '')? atob(text):null}
                                    </div>
                                </div>
                                {/* {createdAt?.seconds ? (
                                    <span className="time text-white">
                                        {formatRelative(new Date(createdAt.seconds * 1000),new Date())}
                                    </span>
                                ) : null} */}
                            </div>
                            {photoURL ? (
                                <img className="avatar" src={photoURL} alt={displayName} title={displayName}/>
                            ):null}
                        </div>
                    </div>
                </div>
            )}
            {/* <div className="user_1_container">
                <div className="user_1">
                    {photoURL ? (
                        <img src={photoURL} alt={displayName}/>
                    ):null}
                    <div>
                        <span>{displayName}</span>
                        <div className="text">
                            {text}
                        </div>
                        {createdAt?.seconds ? (
                            <span className="time">
                                {formatRelative(new Date(createdAt.seconds * 1000),new Date())}
                            </span>
                        ) : null}
                    </div>
                </div>
            </div> */}
            <div ref={messagesEndRef} /> {/*auto scroll to bottom*/}
        </>
    );
};

export default Message2;