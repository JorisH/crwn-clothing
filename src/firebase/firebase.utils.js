import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyBnGpvcMqxG45Sj6UVaUcmP2Et77tdZdLg",
  authDomain: "crwn-db-48c97.firebaseapp.com",
  projectId: "crwn-db-48c97",
  storageBucket: "crwn-db-48c97.appspot.com",
  messagingSenderId: "67688869969",
  appId: "1:67688869969:web:5ce837edc589ef462f4870"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;