import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  // your firebase configuration
  apiKey: process.env.firebase_react_api_Key,
  authDomain: process.env.firebase_react_auth_Domain,
  projectId: process.env.firebase_react_project_Id,
  storageBucket: process.env.firebase_react_storage_Bucket,
  messagingSenderId: process.env.firebase_react_messaging_Sender_Id,
  appId: process.env.firebase_react_app_Id,
  measurementId: process.env.firebase_react_measurement_Id,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
