import React from 'react';
import Sidebar from '../Sidebar/sidebar.component';
import Channel from '../Channel/channel.component';
// import Button from '../Button/button.component';
import {auth} from '../../Firebase/config';
import { AppContext } from '../../Context/AppProvider';

export default function ChatRoom(){

    const {mode,setMode} = React.useContext(AppContext);

    const handleMode = ()=>{
        if(mode === 'light'){
            document.body.style.backgroundColor = "#282c34";
            setMode('dark')
        }else{
            document.body.style.backgroundColor = "white";
            setMode('light')
        }
    }

    return (
        <>
            <div className="flex justify-between items-center mt-3 mb-3">
                <div className={`text-xl ${(mode==="dark")?"text-white":"text-black"} ml-5 flex justify-center items-center`}><img className="w-[40px] mr-2" src="./messicon.png"/>ChatApp</div>
                {/* <Button cName="sign_out" onClick={()=> auth.signOut() }>Đăng xuất</Button> */}
                <div className="flex justify-center items-center">
                    <button className="mr-3" id="mode" onClick={handleMode}>Mode</button>
                    <button className="bg-sky-500 rounded-full w-10 h-10" onClick={()=> auth.signOut() }><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                </div>
            </div>
            <div className="flex">
                <Sidebar/>
                <Channel/>
            </div>
        </>
    )

}