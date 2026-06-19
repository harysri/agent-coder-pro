import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sparkles,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Check if user is logged in
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const userData = localStorage.getItem("user");

  //   if (token && userData) {
  //     try {
  //       setUser(JSON.parse(userData));
  //     } catch (error) {
  //       console.error("Error parsing user data:", error);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Check if user just logged in and clear the flag
    if (localStorage.getItem("justLoggedIn") === "true") {
      localStorage.removeItem("justLoggedIn");
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsProfileOpen(false);
    navigate("/login");

    // Success toast
    const successToast = toast.custom(
      (t) => (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-xl border border-purple-500/30 shadow-lg shadow-purple-500/30 rounded-2xl pointer-events-auto flex items-center p-4`}
        >
          <div className="flex-1 flex items-center">
            <div className="flex-shrink-0 p-2 bg-green-500/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-white">
                Succesfully Logged out 🎉
              </p>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="ml-4 flex-shrink-0 text-gray-300 hover:text-white"
          >
            ✕
          </button>
        </motion.div>
      ),
      {
        duration: 3000,
        position: "top-center",
      },
    );
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/10 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="p-2 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-lg group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.6)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            <span className="text-xl font-bold tracking-tight flex items-center">
              <span className="text-white group-hover:text-purple-200 transition-colors">
                Agent
              </span>
              <span className="mx-0.5 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Coder
              </span>
              <span className="ml-1 -translate-y-2 text-[0.65rem] leading-none font-mono tracking-widest text-purple-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]">
                PRO
              </span>
            </span>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/">
            <button className="text-gray-300 hover:text-white font-medium px-4 py-2 transition-colors ">
              Home
            </button>
          </Link>

          {user && (
            <Link to="/codegenerator">
              <button className="text-gray-300 hover:text-white font-medium px-4 py-2 transition-colors">
                AI Code Generator
              </button>
            </Link>
          )}
        </div>

        {/* AUTH BUTTONS OR PROFILE */}
        {user ? (
          <div className="hidden md:flex items-center gap-4" ref={profileRef}>
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all group"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {getInitials(user.fullName || user.name)}
                </div>

                {/* User Name */}
                <span className="text-white font-medium text-sm">
                  {user.fullName || user.name || "User"}
                </span>

                {/* Chevron Icon */}
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-white font-semibold text-sm truncate">
                        {user.fullName || user.name}
                      </p>
                      <p className="text-gray-400 text-xs truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link to="/profile">
                        <button
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full px-4 py-2.5 flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span className="text-sm font-medium">Profile</span>
                        </button>
                      </Link>

                      <div className="my-1 border-t border-white/10"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2.5 flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Log Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <button className="text-gray-300 hover:text-white font-medium px-4 py-2 transition-colors">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-bold rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Sign Up
              </motion.button>
            </Link>
          </div>
        )}

        {/* MOBILE MENU TOGGLE */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-purple-400 transition-colors"
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              <Link to="/" onClick={() => setIsOpen(false)}>
                <MobileLink>Home</MobileLink>
              </Link>

              {user ? (
                <>
                  <Link to="/codegenerator" onClick={() => setIsOpen(false)}>
                    <MobileLink>AI Code Generator</MobileLink>
                  </Link>

                  {/* Mobile User Info */}
                  <div className="w-full px-8 py-4 border-t border-b border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
                        {getInitials(user.fullName || user.name)}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {user.fullName || user.name}
                        </p>
                        <p className="text-gray-400 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <Link to="/profile" onClick={() => setIsOpen(false)}>
                    <MobileLink>Profile</MobileLink>
                  </Link>

                  <Link to="/settings" onClick={() => setIsOpen(false)}>
                    <MobileLink>Settings</MobileLink>
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-64 py-3 bg-red-600 rounded-full font-bold text-white shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <MobileLink>Login</MobileLink>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <button className="w-64 py-3 bg-purple-600 rounded-full font-bold text-white shadow-lg shadow-purple-500/30">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Helper Components ---
const MobileLink = ({ children }) => (
  <span className="text-lg font-medium text-gray-200 hover:text-purple-400 cursor-pointer">
    {children}
  </span>
);

export default Navbar;
