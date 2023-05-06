import React from "react";

function LikeButton({ post, currentUser, firebase }) {
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

  return (
    <button onClick={() => handleLikeClick(post.id)}>
      {post.likes && post.likes[currentUser.uid] ? "Unlike" : "Like"}
    </button>
  );
}

export default LikeButton;
