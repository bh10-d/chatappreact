import React from 'react';
import { Form, Input, Modal, Button, Checkbox } from 'antd';
import {addDocument} from '../../Firebase/services';
import {AppContext} from '../../Context/AppProvider';
import {AuthContext} from '../../Context/AuthProvider';
// import { Button } from 'antd/lib/radio';

export default function AddRoomModal(){

    const {isAddRoomVisible, setIsAddRoomVisible} = React.useContext(AppContext);
    const {user:{uid}} = React.useContext(AuthContext);
    const [form] = Form.useForm();
    const [isPrivate, setIsPrivate] = React.useState(false);

    const handleOk = ()=>{
        // console.log({ formData: form.getFieldsValue(), isPrivate});
        addDocument('rooms',{...form.getFieldsValue(), members:[uid], private:isPrivate});
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
                    <p>{(isPrivate)?"Phòng chat riêng tư":"Phòng chat công khai"}</p>
                </Form>
            </Modal>
        </div>
    )
}