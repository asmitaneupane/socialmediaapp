import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import component files

import Profile from "./components/profile/Profile";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostLists";

// firebase imports
import { auth, provider } from "./config/firebase";
import firebase from "firebase/compat/app";
import { signInWithPopup } from "firebase/auth";
import Login from "./pages/Login";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // subscribe to the Firebase auth state change event
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  // subscribe to the Firebase Firestore posts collection
  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(newPosts);
      });
    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  return (
    <div>
      <h1>Social Media App</h1>
      {currentUser ? (
        <div>
          <p>Welcome, {currentUser.displayName}!</p>
          <button onClick={handleSignOut}>Sign Out</button>
          <CreatePost currentUser={currentUser} />
          <PostList currentUser={currentUser} />
          <Profile currentUser={currentUser} />
        </div>
      ) : (
        <div>
          <p>Please sign in to continue.</p>
          <Login />
          <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
      )}
    </div>
  );
}
