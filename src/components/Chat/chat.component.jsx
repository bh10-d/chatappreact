import React from "react";
import Message from "../Message/message.component";
import {AppContext} from '../../Context/AppProvider';
import './chat.styles.css';


const Chat = ({data, uidcheck}) =>{
    const {isChangeImageBackground} = React.useContext(AppContext);

    let styleBackground = {
        backgroundImage: (isChangeImageBackground === '/avatar.jpg')?``:`url(${isChangeImageBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }

    return (
        <>
            {/* <div className="chat-container"> */}
            <div className="w-full h-[calc(100vh-150px)] overflow-y-scroll" style={styleBackground}>
                {data.map(message=>(
                    <Message key={message.createdAt} {...message} uidcheck={uidcheck}/>
                ))}
            </div>
        </>
    )
}

export default Chat;