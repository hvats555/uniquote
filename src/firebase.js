import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDiQWmDOgdzteH9LyUU3cM7PkW0M0zEtY4",
    authDomain: "uniquote-d48ca.firebaseapp.com",
    projectId: "uniquote-d48ca",
    storageBucket: "uniquote-d48ca.appspot.com",
    messagingSenderId: "28639651332",
    appId: "1:28639651332:web:0d3c5c84f32d633b24b751",
    measurementId: "G-G30ZYHV97S"
});

const db = firebaseApp.firestore();

export default db;