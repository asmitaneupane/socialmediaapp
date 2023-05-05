import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import material ui
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// import component files
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <Navbar />
      <Container maxWidth="md" className={classes.container}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/create-post" element={<CreatePost />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
