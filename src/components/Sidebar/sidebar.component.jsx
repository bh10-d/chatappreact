import React from 'react';
import {AppContext} from '../../Context/AppProvider';


const Sidebar = ()=>{
    const {mode, rooms, setIsAddRoomVisible, setSelectedRoomId, setIsPrivate, setTurnLeft, setIsChangeImageBackground} = React.useContext(AppContext);

    const handleAddRoom = ()=>{
        setIsAddRoomVisible(true);
    } 
    
    return (
        <div className="basis-2/12 sm:basis-3/12 md:basis-3/12 lg:basis-2/12 w-full relative shadow-md">
            <div>
                <div>
                    <button type='button' className='add-room bg-sky-600 w-full p-2' onClick={handleAddRoom}>
                        Thêm phòng
                    </button>
                </div>
            </div>
            <div className="overflow-y-scroll h-[calc(100vh-110px)]">
                {rooms.map(room=>
                    <div 
                        key={room.id} 
                        className={`w-full p-2 flex rounded-xl ${(mode==='dark')?"bg-[#282c34] hover:bg-gray-700":"hover:bg-slate-300"} cursor-pointer justify-center md:justify-start`}
                        onClick={()=>{
                            setSelectedRoomId(room.id) 
                            setIsPrivate(room.private)
                            setTurnLeft(room.turn)
                            setIsChangeImageBackground((room.imageBackground === '' || room.imageBackground === undefined)?"/avatar.jpg":room.imageBackground)
                        }}
                    >
                        <img className="rounded-full w-[30px] sm:w-[40px] md:w-[50px] h-[30px] sm:h-[40px] md:h-[50px]" src={(room.imageGroup === '' || room.imageGroup === undefined)?"/avatar.jpg":room.imageGroup} alt="asdnd" />
                        <div className={`ml-3 pt-1 w-full relative ${(mode==='dark')?"text-white":"text-black"} hidden md:block text-sm`}>
                            <p className="font-semibold">{room.name} </p>
                            <span className="mr-2">tin nhắn</span>
                            {/* <span>• thoi gian</span> */}
                            <div className={`${(mode==='dark')?"text-white":"text-black"} absolute right-5 top-5`}>
                                {(room.private)?<i className='bx bx-lock-alt'></i>:<i className='bx bx-lock-open-alt'></i>}
                                {/* <i className='bx bx-lock-open-alt'></i> */}
                            </div>
                        </div>
                    </div>
                )}
                <div className="absolute bottom-0">
                    <a className="hover:text-purple-400" href="https://moviehot.vercel.app/">༼ つ ◕_◕ ༽つ Copyright HieuBui</a>
                </div>
            </div>
        </div>
    )   
}

export default Sidebar;