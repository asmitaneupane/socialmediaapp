import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

function Profile({ currentUser }) {
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [bio, setBio] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const handleSaveProfile = async () => {
    const db = firebase.firestore();
    const userRef = db.collection("users").doc(currentUser.uid);
    await userRef.update({
      displayName,
      bio,
      profileImageUrl,
    });
    currentUser.updateProfile({
      displayName,
      photoURL: profileImageUrl,
    });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(
      `profile-images/${currentUser.uid}/${file.name}`
    );
    await fileRef.put(file);
    const profileImageUrl = await fileRef.getDownloadURL();
    setProfileImageUrl(profileImageUrl);
  };

  return (
    <div>
      <h2>Profile</h2>
      <form>
        <div>
          <label>Display Name:</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <div>
          <label>Profile Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
          />
        </div>
        <button type="button" onClick={handleSaveProfile}>
          Save
        </button>
      </form>
    </div>
  );
}

export default Profile;
