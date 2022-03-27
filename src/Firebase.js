import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD1oXGPELVQeFiyXSRAD4o_vjdr4RYVXzk",
    authDomain: "chat-app-35db6.firebaseapp.com",
    projectId: "chat-app-35db6",
    storageBucket: "chat-app-35db6.appspot.com",
    messagingSenderId: "194631148282",
    appId: "1:194631148282:web:749c5c701476cdea269f43"
  };


  const firebaseApp =  firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider()

  export { auth , provider}
  export default db;