// import firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/firestore';
// import { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
// import HomePage from './page/homepage.component';
import Login from './components/Login/index';
// import Channel from './components/Channel/channel.component';
// import Sidebar from './components/Sidebar/sidebar.component';
// import Button from './components/Button/button.component';

import ChatRoom from './components/ChatRoom/index';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from '../src/components/Modals/AddRoomModal';
import InviteMemberModal from '../src/components/Modals/InviteMemberModal';
import './App.css';
// const firebaseConfig = {
//     apiKey: "AIzaSyDtnggnLxqL2ldriWE0N7SSPW9b--2qPWI",
//     authDomain: "chatapp-3714d.firebaseapp.com",
//     databaseURL: "https://chatapp-3714d-default-rtdb.firebaseio.com",
//     projectId: "chatapp-3714d",
//     storageBucket: "chatapp-3714d.appspot.com",
//     messagingSenderId: "50177120322",
//     appId: "1:50177120322:web:752636dd7a024911fef5db",
//     measurementId: "G-CYN4W9DCNS"
// };




// firebase.initializeApp({
//     apiKey: "AIzaSyDtnggnLxqL2ldriWE0N7SSPW9b--2qPWI",
//     authDomain: "chatapp-3714d.firebaseapp.com",
//     databaseURL: "https://chatapp-3714d-default-rtdb.firebaseio.com",
//     projectId: "chatapp-3714d",
//     storageBucket: "chatapp-3714d.appspot.com",
//     messagingSenderId: "50177120322",
//     appId: "1:50177120322:web:752636dd7a024911fef5db",
//     measurementId: "G-CYN4W9DCNS"
// })


// const auth = firebase.auth();
// const db = firebase.firestore();
// const storage = firebase.storage();


function App() {

  // const [user,setUser] = useState(()=>auth.currentUser);
  // const [initializing, setInitializing] = useState(true);

  // useEffect(()=>{
  //   const unsubcribe = auth.onAuthStateChanged(user=>{
  //     if (user){
  //       setUser(user);
  //     }else{
  //       setUser(null);
  //     }
  //     if(initializing){
  //       setInitializing(false);
  //     }
  //   });
  //   return unsubcribe;
  // },[]);

  // const signInwithGoogle = async()=>{
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   auth.useDeviceLanguage();
  //   try {
  //     await auth.signInWithPopup(provider);
  //   }catch(e) {
  //     console.error(e);
  //   }
  // };

  // const signOut = async()=>{
  //   try {
  //     await firebase.auth().signOut();
  //   }catch(e) {
  //     console.log(e.message);
  //   }
  // };

  // if(initializing)return "Loading...";

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/" element={<ChatRoom />}/>
          </Routes>
          <AddRoomModal/>
          <InviteMemberModal/>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

{/* <div className="App">
<HomePage/>
<h1>Welcome to my chat app</h1>
{user ? (
  <>
    <div className="flex justify-between items-center mt-3 mb-3">
      <div className="text-xl text-white ml-5 flex justify-center items-center"><img className="w-[40px] mr-2" src="./messicon.png"/>ChatApp</div>
      <Button onClick={signOut} cName="sign_out">Đăng xuất</Button>
    </div>
    <div className="flex">
      <Sidebar/>
      <Channel user={user} db={db}/>
    </div>
  </>  
) : (
  <div className="middle">
    <Button onClick={signInwithGoogle} cName="sign_in">Sign in with Google</Button>
  </div>
)}
<Login/>
</div> */}


export default App;


// import {useState} from 'react';
// import database from './firebase';
  
// function App() {
//   const [name , setName] = useState();
//   const [age , setAge] = useState();
      
//   // Push Function
//   const Push = () => {
//     database.ref("user").set({
//       name : name,
//       age : age,
//     }).catch(alert);
//   }
  
//   return (
//     <div className="App" style={{marginTop : 250}}>
//       <center>
//       <input placeholder="Enter your name" value={name} 
//       onChange={(e) => setName(e.target.value)}/>
//       <br/><br/>
//       <input placeholder="Enter your age" value={age} 
//       onChange={(e) => setAge(e.target.value)}/>
//       <br/><br/> 
//       <button onClick={Push}>PUSH</button>
//       </center>
//     </div>
//   );
// }
  
// export default App;