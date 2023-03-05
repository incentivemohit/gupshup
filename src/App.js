import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useContext } from "react";
import { AuthContext } from "./components/Context/AuthContext";
import { ChatContextProvider } from "./components/Context/ChatContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <ChatContextProvider>
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ChatContextProvider>
  );
}

export default App;
