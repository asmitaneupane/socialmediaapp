import React, { useEffect, useState } from "react";
import firebase from "../config/firebase";
import LikeButton from "./LikeButton";
import CommentForm from "./CommentForm";

function PostList({ currentUser }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postRef = firebase.firestore().collection("posts");
    postRef.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(newPosts);
    });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {post.mediaUrl && (
            <div>
              <img src={post.mediaUrl} alt="Post Media" />
            </div>
          )}
          <p>
            Posted by {post.authorName} on{" "}
            {new Date(post.timestamp.toDate()).toLocaleString()}
          </p>
          <LikeButton
            post={post}
            currentUser={currentUser}
            firebase={firebase}
          />
          <CommentForm
            post={post}
            currentUser={currentUser}
            firebase={firebase}
          />
        </div>
      ))}
    </div>
  );
}

export default PostList;
