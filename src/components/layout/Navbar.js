import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
        <Link to="/">Home</Link>
        </li>
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/create-post">Create Post</Link>
            </li>
            <li>
              {/* <a href="#" onClick={() => firebase.auth().signOut()}> */}
                Sign Out
            </li>
          </>
        
          <>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        
      </ul>
    </nav>
  )
}

export default Navbar
