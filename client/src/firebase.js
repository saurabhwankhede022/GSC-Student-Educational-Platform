import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

//STORED THE FIREBASE DETAILS IN .env.local FILE

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {
    apiKey: "AIzaSyBfezuLfX-7qnsbNZ2WxDzHrKkvtXSdHrY",
    authDomain: "saw-fy-project-23-24.firebaseapp.com",
    projectId: "saw-fy-project-23-24",
    storageBucket: "saw-fy-project-23-24.appspot.com",
    messagingSenderId: "302995486145",
    appId: "1:302995486145:web:0c1028cb51120984e5eb40",
    measurementId: "G-60K3KE8NG5"
  };

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBfezuLfX-7qnsbNZ2WxDzHrKkvtXSdHrY",
//   authDomain: "saw-fy-project-23-24.firebaseapp.com",
//   projectId: "saw-fy-project-23-24",
//   storageBucket: "saw-fy-project-23-24.appspot.com",
//   messagingSenderId: "302995486145",
//   appId: "1:302995486145:web:0c1028cb51120984e5eb40",
//   measurementId: "G-60K3KE8NG5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);