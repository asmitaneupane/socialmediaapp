import React, { useState } from "react";
import firebase from 'firebase/compat/app'

export default function CreatePost({ currentUser }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    setMediaFile(event.target.files[0]);
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Upload media file to Firebase Storage (if present)
    if (mediaFile) {
      const storageRef = firebase
        .storage()
        .ref()
        .child(`posts/${mediaFile.name}`);
      await storageRef.put(mediaFile);
      const url = await storageRef.getDownloadURL();
      setMediaUrl(url);
    }

    // Add post to Firestore
    const postRef = firebase.firestore().collection("posts");
    const newPost = {
      title,
      content,
      mediaUrl,
      authorId: currentUser.uid,
      authorName: currentUser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await postRef.add(newPost);

    // Reset form
    setTitle("");
    setContent("");
    setMediaFile(null);
    setMediaUrl(null);
    setLoading(false);
  };

  return (
    <form onSubmit={handlePostSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="mediaFile">Media File</label>
        <input
          type="file"
          id="mediaFile"
          accept="image/*, video/*"
          onChange={handleFileUpload}
        />
      </div>
      {mediaUrl && (
        <div>
          <img src={mediaUrl} alt="Post Media" />
        </div>
      )}
      <button type="submit" disabled={loading}>
        Post
      </button>
    </form>
  );
}
