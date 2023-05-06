// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { Firestore } from "firebase/firestore";
// import { getStorage, ref } from "firebase/storage";

import firebaseApp from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpsknKHf_iFP5SLq7DptgdUxQv5jRdx6A",
  authDomain: "social-media-app-1f6e1.firebaseapp.com",
  projectId: "social-media-app-1f6e1",
  storageBucket: "social-media-app-1f6e1.appspot.com",
  messagingSenderId: "357477250609",
  appId: "1:357477250609:web:904749e66016eba3124710",
  measurementId: "G-BP5Z7EK3KY",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

firebaseApp.initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
// export const fireStorage = new Firestore(app);
// export const storage = getStorage(app);
// export const pathReference = ref();

const auth = firebaseApp.auth();
const firebase = { app: firebaseApp };

export { auth, firebase };