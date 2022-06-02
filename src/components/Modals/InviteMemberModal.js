import React,{ useState } from 'react';
// import {addDocument} from '../../Firebase/services';
import {db} from '../../Firebase/config';
import {AppContext} from '../../Context/AppProvider';
// import {AuthContext} from '../../Context/AuthProvider';
import { Form, Select, Modal, Spin, Avatar } from 'antd';
import { debounce } from 'lodash';



function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {

    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(()=>{
        const loadOptions = (value) =>{
            setOptions([]);
            setFetching(true);
            fetchOptions(value, props.curmembers).then(newOptions =>{
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions, debounceTimeout);
    },[debounceTimeout, fetchOptions]);
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={ fetching ? <Spin size="small"/> : null}
            {...props}
        >
            {options.map(opt=>(
                <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar size="small" src={opt.photoURL}>
                        {opt.photoURL ? '' : opt.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {`${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    )
}

async function fetchUserList(search, curMembers) {
    return db.collection('users')
    .where('keywords','array-contains',search)
    .orderBy('displayName')
    .limit(20)
    .get()
    .then(snapshot=>{return snapshot.docs.map(doc =>({
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL,
    })).filter(opt=>!curMembers.includes(opt.value))
})

}

export default function InviteMemberModal(){

    const {isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom, turnLeft} = React.useContext(AppContext);
    // const {user:{uid}} = React.useContext(AuthContext);
    const [value, setValue] = useState([]);
    const [form] = Form.useForm();

    const handleOk = ()=>{

        //update members in current room
        const roomRef = db.collection('rooms').doc(selectedRoomId);
        if(turnLeft === 0 || turnLeft === undefined){
            roomRef.update({ 
                members: [...selectedRoom.members, ...value.map(val=>val.value)],
            })
        }
        if(turnLeft === 1){
            roomRef.update({ 
                members: [...selectedRoom.members, ...value.map(val=>val.value)],
                turn: 0
            })
        }
        //reset form value
        form.resetFields();
        setIsInviteMemberVisible(false);
    }

    const handleCancel = ()=>{
        form.resetFields();
        setIsInviteMemberVisible(false);
    }

    // console.log({ value })

    return (
        <div>
            <Modal
                title="Mời thêm thành viên"
                visible={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <DebounceSelect
                        mode="multiple"
                        label="Tên các thành viên"
                        value={value}
                        placeholder="Nhập tên thành viên"
                        fetchOptions={fetchUserList}
                        curmembers={selectedRoom.members}
                        onChange={newValue => setValue(newValue)}
                        style={{width: '100%'}}
                    />
                </Form>
            </Modal>
        </div>
    )
}