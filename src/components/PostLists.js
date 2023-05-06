import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/firestore";

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

  //   this is to check whether user already like the post or not,
  //   if yes delete their likes, if not like the post.
  const handleLikeClick = async (postId) => {
    const postRef = firebase.firestore().collection("posts").doc(postId);
    const likedBy = postRef.collection("likes").doc(currentUser.uid);
    const snapshot = await likedBy.get();
    if (snapshot.exists) {
      await likedBy.delete();
    } else {
      await likedBy.set({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  // creates a new document as a comment to the post with comment text, author id, name, and timestamp.
  const handleCommentSubmit = async (event, postId, commentText) => {
    event.preventDefault();
    const postRef = firebase.firestore().collection("posts").doc(postId);
    await postRef.collection("comments").add({
      text: commentText,
      authorId: currentUser.uid,
      authorName: currentUser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

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
          <button onClick={() => handleLikeClick(post.id)}>
            {post.likes && post.likes[currentUser.uid] ? "Unlike" : "Like"}
          </button>
          {post.comments && (
            <div>
              {Object.keys(post.comments).map((commentId) => (
                <p key={commentId}>
                  <strong>{post.comments[commentId].authorName}</strong>:{" "}
                  {post.comments[commentId].text}
                </p>
              ))}
            </div>
          )}
          <form
            onSubmit={(event) =>
              handleCommentSubmit(
                event,
                post.id,
                event.target.commentText.value
              )
            }
          >
            <input type="text" name="commentText" placeholder="Add a comment" />
            <button type="submit">Post</button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default PostList;
