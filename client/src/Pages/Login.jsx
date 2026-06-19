import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  Key,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Galaxy Component
const Galaxy = ({ mouseRepulsion, density, glowIntensity, hueShift }) => {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7,
            animationDelay: `${Math.random() * 3}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user data
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

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
                  Welcome back! 🎉
                </p>
                <p className="mt-1 text-sm text-green-200">
                  Login successful. Redirecting...
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
        }
      );

      // Store login state to trigger navbar refresh
      localStorage.setItem("justLoggedIn", "true");

      // Wait a moment before redirecting
      setTimeout(() => {
        // Force reload to update navbar
        window.location.href = "/codegenerator";
        // Alternative: Use navigate with state
        // navigate("/", { state: { refreshNavbar: true } });
      }, 1500);
    } catch (error) {
      // Error toast
      const errorToast = toast.custom(
        (t) => (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-gradient-to-r from-red-900/90 to-pink-900/90 backdrop-blur-xl border border-red-500/30 shadow-lg shadow-red-500/30 rounded-2xl pointer-events-auto flex items-center p-4`}
          >
            <div className="flex-1 flex items-center">
              <div className="flex-shrink-0 p-2 bg-red-500/20 rounded-lg">
                <Lock className="w-5 h-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-white">Login Failed</p>
                <p className="mt-1 text-sm text-red-200">
                  {error.message || "Invalid credentials"}
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
          duration: 4000,
          position: "top-center",
        }
      );

      setErrors({
        submit: error.message || "Invalid credentials. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isSubmitting) {
      handleSubmit();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden selection:bg-purple-500 selection:text-white px-4 sm:px-8 md:px-16 pb-4 sm:pb-8 md:pb-16 pt-24">
      {/* Toaster for notifications */}
      <Toaster
        toastOptions={{
          className: "",
          style: {
            background: "transparent",
            color: "#fff",
          },
        }}
      />

      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <Galaxy
          mouseRepulsion={false}
          density={1.2}
          glowIntensity={0.4}
          hueShift={270}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center">
        {/* Decorative glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px] -z-10"></div>

        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md sm:max-w-lg lg:max-w-xl p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl sm:rounded-[40px] bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.2)] relative overflow-hidden"
        >
          {/* Card Header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-2xl shadow-lg shadow-purple-500/20 animate-pulse">
                <Key className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Login
              </span>
            </h2>
            <p className="text-gray-400 text-sm">
              Continue your AI-augmented coding journey
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-5 sm:space-y-6" onKeyPress={handleKeyPress}>
            <InputGroup
              label="Email Address"
              type="email"
              placeholder="developer@example.com"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              onChange={handleChange("email")}
              error={errors.email}
            />

            {/* <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange("password")}
                  className={`w-full bg-white/5 border rounded-xl py-3.5 pl-12 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 ${
                    errors ? "border-red-500/50" : "border-white/10"
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs ml-1 mt-1">
                  {errors.password}
                </p>
              )}
            </div> */}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 ml-1">
                Password
              </label>

              <div className="relative group">
                {/* Lock Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange("password")}
                  autoComplete="new-password"
                  className={`w-full bg-white/5 border rounded-xl py-3.5 pl-12 pr-12 text-white placeholder:text-gray-600
        outline-none ring-0 appearance-none
        focus:border-purple-500/50 focus:bg-white/10
        focus:shadow-[0_0_20px_rgba(168,85,247,0.15)]
        transition-all duration-300
        autofill:bg-white/5 autofill:text-white
        ${
          errors.password
            ? "border-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.25)]"
            : "border-white/10"
        }`}
                />

                {/* Eye Toggle */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  tabIndex={-1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-400 text-xs ml-1 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="remember"
                  checked={formData.rememberMe}
                  onChange={handleChange("rememberMe")}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500 accent-purple-500 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-400 select-none cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* General submit error */}
            {errors.submit && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Login Button */}
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              whileHover={
                !isSubmitting
                  ? {
                      scale: 1.02,
                      shadow: "0 0 30px rgba(168,85,247,0.5)",
                    }
                  : {}
              }
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              className="group w-full py-3.5 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-purple-500/30 transition-all relative overflow-hidden flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-6 sm:mt-8 space-y-4">
            <div className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
              >
                Sign Up Now
              </Link>
            </div>

            <div className="text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Bottom decorative gradient border */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-blue-500/0"></div>
        </motion.div>
      </main>
    </div>
  );
};

// Updated InputGroup Component with proper error handling
const InputGroup = ({
  label,
  type,
  placeholder,
  icon,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300 ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full bg-white/5 border rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 ${
            error ? "border-red-500/50" : "border-white/10"
          }`}
        />
      </div>
      {error && <p className="text-red-400 text-xs ml-1 mt-1">{error}</p>}
    </div>
  );
};

export default Login;
