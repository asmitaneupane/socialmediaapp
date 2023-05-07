import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import component files
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CreatePost from "./components/CreatePost";

import { getDatabase, ref, set } from "firebase/database";
import { app } from "./config/firebase";

const db = getDatabase(app);

export default function App() {

  const putData = () => {
    set(ref(db, 'users/asmita', {
      id: 1,
      name: "Asmita",
      address: "Bharatpur"
    }))
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup onClick={putData} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}
