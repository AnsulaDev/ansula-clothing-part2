import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config =  {
    apiKey: "AIzaSyAaIHlgD17XWQppeinqK_kcADbKhSItYM0",
    authDomain: "ansula-db.firebaseapp.com",
    projectId: "ansula-db",
    storageBucket: "ansula-db.appspot.com",
    messagingSenderId: "264673237091",
    appId: "1:264673237091:web:28f69f87caac9f2efd8056",
    measurementId: "G-PHBR9GZMB6"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(! snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });

      }
      catch(error){
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;