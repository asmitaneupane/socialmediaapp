import React, { useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
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
        </div>
      ))}
    </div>
  );
}
