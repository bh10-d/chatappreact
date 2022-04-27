import { useState } from 'react';


const Sidebar = ()=>{
    const [click, setClick] = useState(false);

    const handleClick=()=>{
        if(click){
            setClick(false)
        }else{
            setClick(true);
        }
    }
    
    return (
        <div className="basis-3/12 w-full">
            <div>
                <input className="w-full h-10 rounded-lg pl-2 bg-slate-600 text-white outline-none" type="text" onClick={() => handleClick()} placeholder="search"/>
                <div className={`h-screen ${(click)?"":"hidden"} bg-slate-200`}>
                    <div className="w-full p-2 flex rounded-xl bg-[#282c34] hover:bg-slate-400 cursor-pointer">
                        <img className="rounded-full w-[15%]" src="/avatar.jpg" alt="asdnd" />
                        <div className="ml-3 pt-1 w-full relative text-white">
                            <p className="font-semibold">name (chat rieng)</p>
                            <span className="mr-2">tin nhan</span>
                            <span>• thoi gian</span>
                            <div className="text-slate-600 absolute right-5 top-5">
                                <i className='bx bx-lock-alt'></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full p-2 flex rounded-xl bg-[#282c34] hover:bg-slate-400 cursor-pointer">
                <img className="rounded-full w-[15%]" src="/avatar.jpg" alt="asdnd" />
                <div className="ml-3 pt-1 w-full relative text-white">
                    <p className="font-semibold">name (chat rieng)</p>
                    <span className="mr-2">tin nhan</span>
                    <span>• thoi gian</span>
                    <div className="text-slate-600 absolute right-5 top-5">
                        <i className='bx bx-lock-alt'></i>
                    </div>
                </div>
            </div>
            <div className="w-full p-2 flex rounded-xl bg-[#282c34] hover:bg-slate-400 cursor-pointer">
                <img className="rounded-full w-[15%]" src="/avatar.jpg" alt="asdnd" />
                <div className="ml-3 pt-1 w-full relative text-white">
                    <p className="font-semibold">name (chat nhom)</p>
                    <span className="mr-2">tin nhan</span>
                    <span>• thoi gian</span>
                    <div className="text-slate-600 absolute right-5 top-5">
                        <i className='bx bx-lock-open-alt'></i>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default Sidebar;