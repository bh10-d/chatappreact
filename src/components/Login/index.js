import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, {auth} from '../../Firebase/config';
import { addDocument, generateKeywords } from '../../Firebase/services';
// import { useNavigate } from 'react-router-dom';

const {Title} = Typography;
const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();

export default function Login(){
    const handleFbLogin = ()=>{
        auth.signInWithPopup(fbProvider);
    }
    
    const handleGgLogin = async()=>{
        const { additionalUserInfo, user } = await auth.signInWithPopup(ggProvider);
            console.log(additionalUserInfo);
        if(additionalUserInfo?.isNewUser){
            addDocument('users',{
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            })
        }
    }
    
    return (
        <div>
            <Row justify="center" style={{height: 800}}>
                <Col span={8}>
                    <Title style={{textAlign: 'center'}} level={3}>
                        Chat App
                    </Title>
                    <Button 
                        style={{width:'100%', marginBottom: 5}}
                        onClick={handleGgLogin}  
                    >Đăng nhập bằng Google</Button>
                    <Button 
                        style={{width:'100%'}}
                        onClick={handleFbLogin}
                    >Đăng nhập bằng Facebook</Button>
                </Col>
            </Row>
        </div>
    )
}