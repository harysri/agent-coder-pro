import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import Home from "./Pages/Home.jsx";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import Codegenerator from "./Pages/Codegenerator.jsx";
import Profile from "./Pages/Profile.jsx";
import Viewcodedetail from "./Pages/Viewcodedetail.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
// import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />

        <div className="App">
          {/* <Toaster position="top-center" /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/codegenerator" element={<Codegenerator />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/code/:id" element={<Viewcodedetail />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
