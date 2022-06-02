import React from 'react';
import { Form, Input, Modal, Button } from 'antd';
import {addDocument} from '../../Firebase/services';
import {AppContext} from '../../Context/AppProvider';
import {AuthContext} from '../../Context/AuthProvider';

export default function AddRoomModal(){

    const {isAddRoomVisible, setIsAddRoomVisible} = React.useContext(AppContext);
    const {user:{uid}} = React.useContext(AuthContext);
    const [form] = Form.useForm();
    const [isPrivate, setIsPrivate] = React.useState(false);

    const handleOk = ()=>{
        let turnInvite = (isPrivate)?1:0 
        addDocument('rooms',{...form.getFieldsValue(), members:[uid], private:isPrivate, turn: turnInvite});
        //reset form value
        form.resetFields();
        setIsPrivate(false);
        setIsAddRoomVisible(false);
    }

    const handleCancel = ()=>{
        form.resetFields();
        setIsPrivate(false);
        setIsAddRoomVisible(false);
    }

    const handlePrivateState = ()=>{
        setIsPrivate(!isPrivate);
    }

    return (
        <div>
            <Modal
                title="Tạo phòng"
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên phòng" name="name">
                        <Input placeholder="Nhập tên phòng"/>
                    </Form.Item>
                    <Button onClick={handlePrivateState}>
                        Loại phòng chat
                    </Button>
                    <span className="ml-3 text-sky-500">{(isPrivate)?"Phòng chat riêng tư":"Phòng chat công khai"}</span>
                    <p className="text-gray-400">Click vào nút để chọn trạng thái phòng chat</p>
                </Form>
            </Modal>
        </div>
    )
}