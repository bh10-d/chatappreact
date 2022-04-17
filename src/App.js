import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { useEffect, useState } from 'react';
// import HomePage from './page/homepage.component';
import Channel from '../src/components/channel/channel.component';
import Button from '../src/components/button/button.component';
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




firebase.initializeApp({
    apiKey: "AIzaSyDtnggnLxqL2ldriWE0N7SSPW9b--2qPWI",
    authDomain: "chatapp-3714d.firebaseapp.com",
    databaseURL: "https://chatapp-3714d-default-rtdb.firebaseio.com",
    projectId: "chatapp-3714d",
    storageBucket: "chatapp-3714d.appspot.com",
    messagingSenderId: "50177120322",
    appId: "1:50177120322:web:752636dd7a024911fef5db",
    measurementId: "G-CYN4W9DCNS"
})


const auth = firebase.auth();
const db = firebase.firestore();


function App() {

  const [user,setUser] = useState(()=>auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(()=>{
    const unsubcribe = auth.onAuthStateChanged(user=>{
      if (user){
        setUser(user);
      }else{
        setUser(null);
      }
      if(initializing){
        setInitializing(false);
      }
    });
    return unsubcribe;
  },[]);

  const signInwithGoogle = async()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    }catch(e) {
      console.error(e);
    }
  };

  const signOut = async()=>{
    try {
      await firebase.auth().signOut();
    }catch(e) {
      console.log(e.message);
    }
  };

  if(initializing)return "Loading...";

  return (
    <div className="App">
      {/* <HomePage/> */}
      {/* <h1>Welcome to my chat app</h1> */}
      {user ? (
        <>
          <div className="right">
            <Button onClick={signOut} cName="sign_out">Sign out</Button>
          </div>
          {/* <p>Welcome to the chat</p> */}
          <Channel user={user} db={db}/>
        </>  
      ) : (
        <div className="middle">
          <Button onClick={signInwithGoogle} cName="sign_in">Sign in with Google</Button>
        </div>
      )}
    </div>
  );
}

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