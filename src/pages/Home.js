import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import PostList from "../components/PostLists";

export default function Home() {
  const [posts, setPosts] = useState([]);

  //orderBy function is to sort the posts by timestamp in descending order
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(newPosts);
      });

    return unsubscribe;
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {post.mediaUrl && <img src={post.mediaUrl} alt="Post" />}
          <p>
            Posted by {post.authorName} on{" "}
            {new Date(post.timestamp.seconds * 1000).toLocaleString()}
          </p>
          <PostList />
        </div>
      ))}
    </div>
  );
}