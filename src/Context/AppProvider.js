import React,{ useState } from 'react';
import {AuthContext} from '../Context/AuthProvider';
import useFirestore from '../Hooks/useFirestore';


export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [mode,setMode] = useState('light');
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [isChangeImageGroup, setIsChangeImageGroup] = useState(false);
    const [isChangeImageBackground, setIsChangeImageBackground] = useState('');
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [turnLeft, setTurnLeft] = useState(1);
    const [isChooseImage, setIsChooseimage] = useState(false);
    /**
        name: 'room name',
        description: 'mo ta',
        members: [uid1, uid2,...]
    
    **/
   const {user:{uid}} = React.useContext(AuthContext);
   const roomsCondition = React.useMemo(()=>{
       return {
           fieldName: 'members',
           operator: 'array-contains',
           compareValue: uid
        }
    }, [uid]);
    const rooms = useFirestore('rooms',roomsCondition);
    const selectedRoom = React.useMemo(() => rooms.find((room)=>room.id === selectedRoomId) || {},[rooms,selectedRoomId]);


    const userCondition = React.useMemo(()=>{
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members
         }
     }, [selectedRoom.members]);

    const members = useFirestore('users',userCondition);
    // console.log({rooms, members, selectedRoom: selectedRoom.members});




    return (
        <AppContext.Provider value={{
            mode,
            setMode,
            rooms, 
            members,  
            isAddRoomVisible, 
            setIsAddRoomVisible, 
            selectedRoomId, 
            setSelectedRoomId, 
            selectedRoom,
            isInviteMemberVisible, 
            setIsInviteMemberVisible,
            isChangeImageGroup,
            setIsChangeImageGroup,
            isChangeImageBackground,
            setIsChangeImageBackground,
            isPrivate,
            setIsPrivate,
            isChooseImage,
            setIsChooseimage,
            turnLeft,
            setTurnLeft
            }}>
            {children}
        </AppContext.Provider>
    )
}