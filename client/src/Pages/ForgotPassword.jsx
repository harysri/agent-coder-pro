import React, { useState, useEffect } from "react";
import {
  Mail,
  ArrowLeft,
  Sparkles,
  Send,
  Key,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  Terminal,
  Cpu,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Step states: 'email' -> 'otp' -> 'password' -> 'success'
  const [step, setStep] = useState("email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } },
  };

  // --- LOGIC STARTS HERE (Unchanged) ---

  // Step 1: Send OTP to email
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep("otp");
        startTimer();
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const otpCode = otp.join("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp: otpCode }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStep("password");
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: otp.join(""),
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStep("success");
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        toast.success(
          "Password reset successful!\nPlease welcome back to login 😊."
        );
      } else {
        setError(data.message || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (timer > 0) return;

    setError("");
    setIsLoading(true);
    setOtp(["", "", "", "", "", ""]);

    try {
      const response = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        startTimer();
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Timer for resend OTP
  const startTimer = () => {
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle OTP input change
  const handleOTPChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  // Handle OTP paste
  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("").concat(Array(6).fill("")).slice(0, 6);
    setOtp(newOtp);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length - 1, 5);
    document.getElementById(`otp-${lastIndex}`)?.focus();
  };

  // Handle backspace
  const handleOTPKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans selection:bg-purple-500 selection:text-white flex flex-col">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0">
        <Galaxy density={1} glowIntensity={0.5} />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Back Link */}
        <div className="w-full max-w-md mb-8">
          <Link
            to="/login"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 group font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300 text-purple-400" />
            cd /login
          </Link>
        </div>

        {/* Main Card Container */}
        <div className="w-full max-w-md relative">
          {/* Glass Background */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] z-0" />

          {/* Content Wrapper */}
          <div className="relative z-10 overflow-hidden rounded-3xl min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              {/* STEP 1: Email Input */}
              {step === "email" && (
                <motion.div
                  key="step1"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex-1 flex flex-col"
                >
                  <div className="p-8 pb-6 border-b border-white/5 bg-black/20">
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <Mail className="w-8 h-8 text-purple-300" />
                      </div>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">
                      Reset Password
                    </h1>
                    <p className="text-gray-400 text-center text-sm">
                      Enter your email to receive a recovery code.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSendOTP}
                    className="p-8 flex-1 flex flex-col justify-center"
                  >
                    <div className="mb-6 space-y-2">
                      <label className="flex items-center text-xs font-mono text-purple-300 uppercase tracking-wider">
                        <Terminal className="w-3 h-3 mr-2" />
                        User Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="dev@example.com"
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono"
                      />
                    </div>

                    {error && (
                      <div className="mb-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <p className="text-red-300 text-xs font-mono">
                          {error}
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full group relative px-6 py-4 bg-white text-black font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Initializing...
                          </>
                        ) : (
                          <>
                            Send Verification Code
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </motion.div>
              )}

              {/* STEP 2: OTP Verification */}
              {step === "otp" && (
                <motion.div
                  key="step2"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex-1 flex flex-col"
                >
                  <div className="p-8 pb-6 border-b border-white/5 bg-black/20">
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <Key className="w-8 h-8 text-blue-300" />
                      </div>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">
                      Authentication
                    </h1>
                    <p className="text-gray-400 text-center text-sm">
                      Enter the 6-digit code sent to <br />
                      <span className="text-purple-300 font-mono bg-purple-500/10 px-2 py-0.5 rounded">
                        {email}
                      </span>
                    </p>
                  </div>

                  <form
                    onSubmit={handleVerifyOTP}
                    className="p-8 flex-1 flex flex-col justify-center"
                  >
                    <div className="mb-8">
                      <label className="block text-xs font-mono text-center text-blue-300 uppercase tracking-widest mb-4">
                        Input Security Token
                      </label>
                      <div className="flex justify-center gap-2 mb-4">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) =>
                              handleOTPChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleOTPKeyDown(index, e)}
                            onPaste={index === 0 ? handleOTPPaste : undefined}
                            className="w-10 h-12 md:w-12 md:h-14 text-center text-2xl font-bold font-mono bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/10 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"
                          />
                        ))}
                      </div>
                      <div className="text-center">
                        {timer > 0 ? (
                          <p className="text-gray-500 text-xs font-mono">
                            Resend available in{" "}
                            <span className="text-white">{timer}s</span>
                          </p>
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendOTP}
                            disabled={isLoading}
                            className="text-blue-400 hover:text-blue-300 text-xs font-mono border-b border-blue-400/30 hover:border-blue-300 transition-colors"
                          >
                            [ Resend Token ]
                          </button>
                        )}
                      </div>
                    </div>

                    {error && (
                      <div className="mb-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-center">
                        <p className="text-red-300 text-xs font-mono">
                          {error}
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading || otp.some((d) => !d)}
                      className="w-full group relative px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isLoading ? "Verifying..." : "Verify & Continue"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep("email")}
                      className="w-full mt-4 text-gray-500 hover:text-gray-300 text-xs transition-colors"
                    >
                      Change email address
                    </button>
                  </form>
                </motion.div>
              )}

              {/* STEP 3: New Password */}
              {step === "password" && (
                <motion.div
                  key="step3"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex-1 flex flex-col"
                >
                  <div className="p-8 pb-6 border-b border-white/5 bg-black/20">
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <Lock className="w-8 h-8 text-green-300" />
                      </div>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">
                      Secure Access
                    </h1>
                    <p className="text-gray-400 text-center text-sm">
                      Create a new strong password.
                    </p>
                  </div>

                  <form
                    onSubmit={handleResetPassword}
                    className="p-8 flex-1 flex flex-col justify-center"
                  >
                    <div className="mb-6 space-y-2">
                      <label className="flex items-center text-xs font-mono text-green-400 uppercase tracking-wider">
                        <Cpu className="w-3 h-3 mr-2" />
                        New Password
                      </label>
                      <div className="relative group">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Min 8 chars"
                          required
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mb-6 space-y-2">
                      <label className="flex items-center text-xs font-mono text-green-400 uppercase tracking-wider">
                        <Cpu className="w-3 h-3 mr-2" />
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Repeat password"
                          required
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all font-mono"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <div className="mb-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                        <p className="text-red-300 text-xs font-mono">
                          {error}
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full group relative px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-green-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isLoading ? (
                          "Updating System..."
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Update Password
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </motion.div>
              )}

              {/* STEP 4: Success */}
              {step === "success" && (
                <motion.div
                  key="success"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex-1 flex flex-col justify-center p-8 text-center"
                >
                  <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.5)] animate-pulse">
                      <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Access Restored
                  </h2>
                  <p className="text-gray-400 mb-8">
                    Your security credentials have been successfully updated in
                    the system.
                  </p>

                  <div className="bg-white/5 rounded-xl p-4 mb-8 border border-white/10">
                    <p className="text-purple-300 text-sm font-mono flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Redirecting to login portal...
                    </p>
                  </div>

                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center w-full px-8 py-4 font-bold text-black bg-white rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Return to Login
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Help */}
        <div className="mt-8 text-center relative z-10">
          <p className="text-gray-600 text-xs">
            System Issues?{" "}
            <a
              href="mailto:support@agentcoder.com"
              className="text-purple-500 hover:text-purple-400 underline transition-colors"
            >
              Contact Admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
