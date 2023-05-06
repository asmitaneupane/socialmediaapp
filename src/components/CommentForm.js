import React from "react";

export default function CommentForm({ post, currentUser, firebase }) {
    
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
          handleCommentSubmit(event, post.id, event.target.commentText.value)
        }
      >
        <input type="text" name="commentText" placeholder="Add a comment" />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}