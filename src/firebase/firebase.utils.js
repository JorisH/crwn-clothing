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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // user signed out

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('createUserProfile in firestore errored', error.message);
    }
  }

  return userRef;
}

// utility function to populate firebase
export const addCollectionAndItems = async (collectionKey, itemsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  itemsToAdd.forEach(item => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, item);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections => {
  // add routename, which is not stored in firebase
  const transformedCollections = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  // convert array to hashmap
  return transformedCollections.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// function to check if user is persisted in the session
export const retrieveUserFromSession = () => {
  return new Promise((resolve, reject) => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(firebaseUser => {
      unsubscribeFromAuth();
      resolve(firebaseUser);
    }, reject);
  })
};

export default firebase;