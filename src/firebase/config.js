import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


var firebaseConfig = {
    apiKey: "AIzaSyDtnggnLxqL2ldriWE0N7SSPW9b--2qPWI",
    authDomain: "chatapp-3714d.firebaseapp.com",
    databaseURL: "https://chatapp-3714d-default-rtdb.firebaseio.com",
    projectId: "chatapp-3714d",
    storageBucket: "chatapp-3714d.appspot.com",
    messagingSenderId: "50177120322",
    appId: "1:50177120322:web:752636dd7a024911fef5db",
    measurementId: "G-CYN4W9DCNS"
}

firebase.initializeApp(firebaseConfig);
firebase.analytics();


const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { db, auth, storage };
export default firebase;