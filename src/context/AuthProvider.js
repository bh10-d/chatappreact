import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext();



export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{
        const unsubcribe = auth.onAuthStateChanged((user)=>{ // xem su thay doi cua user
            if(user){
                const { name, email, uid, photourl } = user;
                setUser({
                    name,
                    email,
                    uid,
                    photourl
                })
                setIsLoading(false);
                // history.pushState('/')
                return;
            }
            setUser({});
            setIsLoading(false);
            // history.push('/login');
        })

        //cleanup function

        return ()=>{
            unsubcribe();
        }
    },[caigido]);

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? "": children}
        </AuthContext.Provider>
    )
}