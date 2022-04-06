import {React, useState, useEffect} from "react";
import '../chat/chat.styles.css';


const Chat = ()=>{

    return (
        <div>
            <div className="chat-container">
                {/* <textarea name="chat" id="only" cols="30" rows="10" style={{backgroundColor:"pink", resize:"none"}} disabled>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo doloribus ducimus architecto dolore placeat vel earum delectus eos animi sapiente suscipit molestiae quasi facilis non, unde, nisi repudiandae, totam sit!
                </textarea> */}
                <div className="user_1_container">
                    <div className="user_1">
                        <img src="logo192.png" alt="avatar" />
                        <div className="text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ipsam commodi at facilis reprehenderit suscipit quae cumque quis perspiciatis modi minus esse, molestiae eius hic distinctio quisquam officiis possimus. Eaque!
                        </div>
                    </div>
                </div>
                <div className="user_2_container">
                    <div className="user_2_right">
                        <div className="user_2">
                            <div className="text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ipsam commodi at facilis reprehenderit suscipit quae cumque quis perspiciatis modi minus esse, molestiae eius hic distinctio quisquam officiis possimus. Eaque!
                            </div>
                            <img src="logo192.png" alt="avatar" />
                        </div>
                    </div>
                </div>
                <div className="user_1_container">
                    <div className="user_1">
                        <img src="logo192.png" alt="avatar" />
                        <div className="text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ipsam commodi at facilis reprehenderit suscipit quae cumque quis perspiciatis modi minus esse, molestiae eius hic distinctio quisquam officiis possimus. Eaque!
                        </div>
                    </div>
                </div>
                <div className="user_2_container">
                    <div className="user_2_right">
                        <div className="user_2">
                            <div className="text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ipsam commodi at facilis reprehenderit suscipit quae cumque quis perspiciatis modi minus esse, molestiae eius hic distinctio quisquam officiis possimus. Eaque!
                            </div>
                            <img src="logo192.png" alt="avatar" />
                        </div>
                    </div>
                </div>
                <div className="user_2_container">
                    <div className="user_2_right">
                        <div className="user_2">
                            <div className="text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ipsam commodi at facilis reprehenderit suscipit quae cumque quis perspiciatis modi minus esse, molestiae eius hic distinctio quisquam officiis possimus. Eaque!
                            </div>
                            <img src="logo192.png" alt="avatar" />
                        </div>
                    </div>
                </div>
                <div className="user_2_container">
                    <div className="user_2_right">
                        <div className="user_2">
                            <div className="text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ipsam commodi at facilis reprehenderit suscipit quae cumque quis perspiciatis modi minus esse, molestiae eius hic distinctio quisquam officiis possimus. Eaque!
                            </div>
                            <img src="logo192.png" alt="avatar" />
                        </div>
                    </div>
                </div>
                <div className="user_2_container">
                    <div className="user_2_right">
                        <div className="user_2">
                            <div className="text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ipsam commodi at facilis reprehenderit suscipit quae cumque quis perspiciatis modi minus esse, molestiae eius hic distinctio quisquam officiis possimus. Eaque!
                            </div>
                            <img src="logo192.png" alt="avatar" />
                        </div>
                    </div>
                </div>
                <div className="user_1_container">
                    <div className="user_1">
                        <img src="logo192.png" alt="avatar" />
                        <div className="text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ipsam commodi at facilis reprehenderit suscipit quae cumque quis perspiciatis modi minus esse, molestiae eius hic distinctio quisquam officiis possimus. Eaque!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione quisquam est officiis libero nesciunt, quae sed rem dolorum iusto recusandae, corrupti fugiat nobis. Ducimus omnis aut tempora, labore ratione cupiditate!
                        </div>
                    </div>
                </div>
            </div>
            <div className="input_container">
                <input className="input-text" type="text" placeholder="Enter your text" />
                <button className="btn-send">Send</button>
            </div>
        </div>
    )
}


export default Chat;