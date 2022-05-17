import React from 'react';
import Sidebar from '../Sidebar/sidebar.component';
import Channel from '../Channel/channel.component';
// import Button from '../Button/button.component';
import {auth} from '../../Firebase/config';

export default function ChatRoom(){

    return (
        <>
            <div className="flex justify-between items-center mt-3 mb-3">
                <div className="text-xl text-white ml-5 flex justify-center items-center"><img className="w-[40px] mr-2" src="./messicon.png"/>ChatApp</div>
                {/* <Button cName="sign_out" onClick={()=> auth.signOut() }>Đăng xuất</Button> */}
                <button className="bg-sky-500 rounded-full w-10 h-10" onClick={()=> auth.signOut() }><i className='bx bx-log-out-circle' ></i></button>
            </div>
            <div className="flex">
                <Sidebar/>
                <Channel/>
            </div>
        </>
    )

}