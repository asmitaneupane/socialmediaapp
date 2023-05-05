import React, { useState } from "react";

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
