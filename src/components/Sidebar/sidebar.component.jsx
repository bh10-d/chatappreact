import React,{ useState } from 'react';
import {AppContext} from '../../Context/AppProvider';


const Sidebar = ()=>{
    const [click, setClick] = useState(false);

    const {mode, rooms, setIsAddRoomVisible, setSelectedRoomId, setIsPrivate, setTurnLeft} = React.useContext(AppContext);

    const handleAddRoom = ()=>{

        setIsAddRoomVisible(true);
    } 

    const handleClick=()=>{
        if(click){
            setClick(false)
        }else{
            setClick(true);
        }
    }
    
    return (
        <div className="basis-2/12 sm:basis-3/12 md:basis-3/12 lg:basis-2/12 w-full relative shadow-md">
            <div>
                {/* <input className="w-full h-10 rounded-lg pl-2 bg-slate-600 text-white outline-none" type="text" onClick={() => handleClick()} placeholder="search"/> */}
                <div>
                    <button type='button' className='add-room bg-sky-600 w-full p-2' onClick={handleAddRoom}>
                        Thêm phòng
                    </button>
                </div>
                <div className={`h-[calc(100vh-150px)] ${(click)?"":"hidden"} bg-black absolute z-50`}>
                    <div className="w-full p-2 flex rounded-xl bg-[#282c34] hover:bg-gray-700 cursor-pointer">
                        <img className="rounded-full w-[70%] sm:w-[50%] md:w-[15%]" src="/avatar.jpg" alt="asdnd" />
                        <div className="ml-3 pt-1 w-full relative text-white hidden md:block text-sm">
                            <p className="font-semibold">name</p>
                            {/* <span className="mr-2">tin nhan</span>
                            <span>• thoi gian</span>
                            <div className="text-slate-600 absolute right-5 top-5">
                                <i className='bx bx-lock-alt'></i>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="w-full p-2 flex rounded-xl bg-[#282c34] hover:bg-gray-700 cursor-pointer justify-center md:justify-start">
                <img className="rounded-full w-[70%] sm:w-[50%] md:w-[15%]" src="/avatar.jpg" alt="asdnd" />
                <div className="ml-3 pt-1 w-full relative text-white hidden md:block text-sm">
                    <p className="font-semibold">tên (chat riêng)</p>
                    <span className="mr-2">tin nhắn</span>
                    <span>• thoi gian</span>
                    <div className="text-white absolute right-5 top-5">
                        <i className='bx bx-lock-alt'></i>
                    </div>
                </div>
            </div>
            <div className="w-full p-2 flex rounded-xl bg-[#282c34] hover:bg-gray-700 cursor-pointer justify-center md:justify-start">
                <img className="rounded-full w-[70%] sm:w-[50%] md:w-[15%]" src="/avatar.jpg" alt="asdnd" />
                <div className="ml-3 pt-1 w-full relative text-white hidden md:block text-sm">
                    <p className="font-semibold">tên (chat nhóm)</p>
                    <span className="mr-2">tin nhắn</span>
                    <span>• thoi gian</span>
                    <div className="text-white absolute right-5 top-5">
                        <i className='bx bx-lock-open-alt'></i>
                    </div>
                </div>
            </div> */}
            <div className="overflow-y-scroll h-[calc(100vh-110px)]">
                {rooms.map(room=>
                    <div 
                        key={room.id} 
                        className={`w-full p-2 flex rounded-xl ${(mode=='dark')?"bg-[#282c34] hover:bg-gray-700":"hover:bg-slate-300"} cursor-pointer justify-center md:justify-start`}
                        onClick={()=>{
                            setSelectedRoomId(room.id) 
                            setIsPrivate(room.private)
                            setTurnLeft(room.turn)
                        }}
                    >
                        <img className="rounded-full w-[30px] sm:w-[40px] md:w-[50px] h-[30px] sm:h-[40px] md:h-[50px]" src={(room.imageGroup == '' || room.imageGroup == undefined)?"/avatar.jpg":room.imageGroup} alt="asdnd" />
                        <div className={`ml-3 pt-1 w-full relative ${(mode=='dark')?"text-white":"text-black"} hidden md:block text-sm`}>
                            <p className="font-semibold">{room.name} </p>
                            {/* {(room.private)?"(chat riêng)":"(chat nhóm)"} */}
                            <span className="mr-2">tin nhắn</span>
                            {/* <span>• thoi gian</span> */}
                            <div className={`${(mode=='dark')?"text-white":"text-black"} absolute right-5 top-5`}>
                                {(room.private)?<i className='bx bx-lock-alt'></i>:<i className='bx bx-lock-open-alt'></i>}
                                {/* <i className='bx bx-lock-open-alt'></i> */}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* <div>
                <button type='text' className='add-room' onClick={handleAddRoom}>
                    Thêm phòng
                </button>
            </div> */}
        </div>
    )   
}

export default Sidebar;