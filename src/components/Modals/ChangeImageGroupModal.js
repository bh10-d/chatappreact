import React, {useEffect, useRef} from 'react';
import {AppContext} from '../../Context/AppProvider';
import {  Modal } from 'antd';
import {storage, db} from '../../Firebase/config';

export default function ChangeImageGroupModal() {
    const {isChangeImageGroup, setIsChangeImageGroup, selectedRoomId} = React.useContext(AppContext);
    const [isChange, setIsChange] = React.useState('')
    const [typeFunction, setTypeFunction] = React.useState('avatargroup');
    const focusImage = useRef();
    const handleOk = ()=>{
        const roomImage = db.collection('rooms').doc(selectedRoomId);
        const uploadTask = storage.ref(`imageGroups/${focusImage.current.files[0].name}`).put(focusImage.current.files[0]);

        switch(typeFunction) {
            case 'avatargroup':
                uploadTask.on(
                    "state_changed",
                    snapshot =>{},
                    error =>{
                        console.log(error);
                    },
                    ()=>{
                        storage
                            .ref("imageGroups")
                            .child(focusImage.current.files[0].name)
                            .getDownloadURL()
                            .then(url => {
                                roomImage.update({
                                    imageGroup: url
                                })
                                // console.log(url)
                                focusImage.current.value= '';
                            })
                    }
                )
                break;
            case 'imagebackground':
                uploadTask.on(
                    "state_changed",
                    snapshot =>{},
                    error =>{
                        console.log(error);
                    },
                    ()=>{
                        storage
                            .ref("imageGroups")
                            .child(focusImage.current.files[0].name)
                            .getDownloadURL()
                            .then(url => {
                                roomImage.update({
                                    imageBackground: url
                                })
                                console.log(url)
                                focusImage.current.value= '';
                            })
                    }
                )
                break;
        }
        
        console.log(focusImage.current.files[0].name)
        console.log(selectedRoomId)
        setIsChangeImageGroup(false);
        setIsChange('')
    }

    const handleCancel = ()=>{
        setIsChangeImageGroup(false);
        focusImage.current.value= '';
        setIsChange('')
    }


    useEffect(() =>{
        //CleanUp
        return()=>{
            isChange && URL.revokeObjectURL(isChange.preview)
        }
    },[isChange])

    const handleChange = (e)=>{
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setIsChange(file)
        // console.log(URL.createObjectURL(file))
    }

    // const handleChooseBackground = ()=>{
    //     if(typeFunction == 'avatargroup'){
    //         setTypeFunction('imagebackground')
    //     }else{
    //         setTypeFunction('avatargroup')
    //     }
    
    // }

    return (
        <div>
            <Modal
                    title="Thay ?????i th??ng tin nh??m"
                    visible={isChangeImageGroup}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    {/* <Form form={form} layout="vertical">
                        <Form.Item label="T??n ph??ng" name="name">
                            <Input placeholder="Nh???p t??n ph??ng"/>
                        </Form.Item>
                        <Button onClick={handlePrivateState}>
                            Lo???i ph??ng chat
                        </Button>
                        <span className="ml-3 text-sky-500">{(isPrivate)?"Ph??ng chat ri??ng t??":"Ph??ng chat c??ng khai"}</span>
                        <p className="text-gray-400">Click v??o n??t ????? ch???n tr???ng th??i ph??ng chat</p>
                    </Form> */}
                    <div className="mb-2 text-white">
                        <button onClick={()=>{setTypeFunction('avatargroup')}} className={`${(typeFunction==='avatargroup')?"bg-purple-500":"bg-purple-300"} rounded-md p-2 mr-2`}>Thay ?????i ???nh ?????i di???n nh??m</button>
                        <button onClick={()=>{setTypeFunction('imagebackground')}} className={`${(typeFunction==='imagebackground')?"bg-purple-500":"bg-purple-300"} rounded-md p-2`}>Thay ?????i ???nh n???n nh??m</button>
                        <div className="text-black">
                            {(typeFunction==='avatargroup')?"thay ?????i ???nh ?????i di???n nh??m":"thay ?????i ???nh n???n nh??m"}
                        </div>
                    </div>
                    <div>
                        <img src={isChange.preview}/>
                    </div>
                    <input onChange={handleChange} ref={focusImage} type="file" placeholder="tai anh len" />
                </Modal>
        </div>
    )
}
