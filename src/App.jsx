import Home from "./components/home/home";
import Login from "./components/login/Login";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Profile from "./components/profile";
import Body from "./body";
import Connection from "./components/connections";
import Requests from "./components/requests";
import Signup from "./components/signup";
import Chat from "./components/chat/chat";

function App() {
  return (
    <BrowserRouter>
      {/* ✅ inside Router */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        {/* ✅ Protected wrapper */}
        <Route element={<Body />}>
          <Route path="/feed" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connection />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/chat/:targetId" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>

    // </Router>
  );
}

export default App;
