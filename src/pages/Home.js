import React, { useState, useEffect } from "react";
import PostList from "../components/PostLists";

// firebase imports
import firebase, { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import CreatePost from "../components/CreatePost";
import Profile from "../components/profile/Profile";
import Nav from "../components/layout/Nav";
import Login from "./Login";

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // subscribe to the Firebase auth state change event
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  // subscribe to the Firebase Firestore posts collection &&
  //orderBy function is to sort the posts by timestamp in descending order
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

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  return (
    <div className="container">
      {currentUser ? (
        <div>
          <Nav firebase={firebase} currentUser={currentUser} />
          <CreatePost currentUser={currentUser} />
          <PostList currentUser={currentUser} />
          <Profile currentUser={currentUser} />
        </div>
      ) : (
        <div>
          <p
            style={{
              textAlign: "center",
              fontSize: "22px",
              textTransform: "capitalize",
            }}
          >
            Please sign in to continue.
          </p>
          <Login />
          <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
      )}
    </div>
  );
}
