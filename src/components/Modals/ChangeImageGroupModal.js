import React, {useEffect, useRef} from 'react';
import {AppContext} from '../../Context/AppProvider';
import { Form, Input, Modal, Button, Checkbox } from 'antd';
import {storage, db} from '../../Firebase/config';

export default function ChangeImageGroupModal() {
    const {isChangeImageGroup, setIsChangeImageGroup, selectedRoomId} = React.useContext(AppContext);
    const [isChange, setIsChange] = React.useState('')
    const focusImage = useRef();
    const handleOk = ()=>{
        const roomImage = db.collection('rooms').doc(selectedRoomId);
        const uploadTask = storage.ref(`imageGroups/${focusImage.current.files[0].name}`).put(focusImage.current.files[0]);
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


    return (
        <div>
            <Modal
                    title="Thay đổi ảnh nhóm"
                    visible={isChangeImageGroup}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    {/* <Form form={form} layout="vertical">
                        <Form.Item label="Tên phòng" name="name">
                            <Input placeholder="Nhập tên phòng"/>
                        </Form.Item>
                        <Button onClick={handlePrivateState}>
                            Loại phòng chat
                        </Button>
                        <span className="ml-3 text-sky-500">{(isPrivate)?"Phòng chat riêng tư":"Phòng chat công khai"}</span>
                        <p className="text-gray-400">Click vào nút để chọn trạng thái phòng chat</p>
                    </Form> */}
                    <div>
                        <img src={isChange.preview}/>
                    </div>
                    <input onChange={handleChange} ref={focusImage} type="file" placeholder="tai anh len" />
                </Modal>
        </div>
    )
}
