import Home from "./components/home/home";
import Login from "./components/login/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Profile from "./components/profile";
import Body from "./body";
import Connection from "./components/connections";
import Requests from "./components/Requests";
import Signup from "./components/signup";

function App() {
  return (
    <BrowserRouter>
      {/* ✅ inside Router */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Protected wrapper */}
        <Route element={<Body />}>
          <Route path="/feed" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connection />} />
          <Route path="/requests" element={<Requests />} />
        </Route>
      </Routes>
    </BrowserRouter>

    // </Router>
  );
}

export default App;
