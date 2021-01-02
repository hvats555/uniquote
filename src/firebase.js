import firebase from 'firebase';
import 'firebase/auth';



const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

const db = firebaseApp.firestore();

// db.useEmulator("localhost", 8080);
// firebaseApp.functions().useEmulator("localhost", 5001);



export const storage = firebaseApp.storage();
export const auth = firebaseApp.auth()
export default db