import React, { useState } from "react";
import firebase from "../../config/firebase";

function EditProfile({ currentUser }) {
  const [displayName, setDisplayName] = useState(currentUser.displayName);

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handleProfileUpdate = (event) => {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: displayName,
    });
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleProfileUpdate}>
        <label>
          Display Name:
          <input type="text" value={displayName} onChange={handleDisplayNameChange} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditProfile;