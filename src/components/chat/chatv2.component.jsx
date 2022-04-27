import {React} from "react";
import Message2 from "../message/message2.component";
import '../chat/chat.styles.css';


const Chat2 = ({data, uid}) =>{
    return (
        <>
            {/* <div className="chat-container"> */}
            <div className="w-full h-[89vh] overflow-y-scroll border border-zinc-800">
                {/* <div className="user_1_container">
                    <div className="user_1">
                        {photoURL ? (
                            <img src={photoURL} alt={photoURL}/>
                        ):null}
                        <div className="text">
                            {text}
                        </div>
                    </div>
                </div> */}
                {data.map(message=>(
                    <Message2 key={message.createdAt} {...message} uidcheck={uid}/>
                ))}

                {/* <div className="user_1_container">
                    <div className="user_1">
                        <img src="logo192.png" alt="avatar" />
                        <div className="text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ipsam commodi at facilis reprehenderit suscipit quae cumque quis perspiciatis modi minus esse, molestiae eius hic distinctio quisquam officiis possimus. Eaque!
                        </div>
                    </div>
                </div>
                <div className="user_1_container">
                    <div className="user_1">
                        <img src="logo192.png" alt="avatar" />
                        <div>
                            <span>name</span>
                            <div className="text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ipsam commodi at facilis reprehenderit suscipit quae cumque quis perspiciatis modi minus esse, molestiae eius hic distinctio quisquam officiis possimus. Eaque!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione quisquam est officiis libero nesciunt, quae sed rem dolorum iusto recusandae, corrupti fugiat nobis. Ducimus omnis aut tempora, labore ratione cupiditate!
                            </div>
                            <span>times</span>
                        </div>
                    </div>
                </div> */}
            </div>
            {/* <div className="input_container">
                <input className="input-text" type="text" placeholder="Enter your text" />
                <button type="submit" className="btn-send">Send</button>
            </div> */}
        </>
    )
}


export default Chat2;