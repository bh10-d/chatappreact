import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../src/Firebase/config';
import { Spin } from 'antd';


export const AuthContext = React.createContext();

const AuthProvider = ({ children }) =>{
    const history = useNavigate();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubcribed = auth.onAuthStateChanged((user)=>{
            // console.log({user});
            if(user){
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName,
                    email,
                    uid,
                    photoURL
                })
                setIsLoading(false);
                history('/')
                return;
            }
            setIsLoading(false);
            history('/login')
        })
        return ()=>{
            unsubcribed();
        }
    },[history])
    // console.log({user});
    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading? <Spin/> : children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;