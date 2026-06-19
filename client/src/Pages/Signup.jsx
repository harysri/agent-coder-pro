// import React from "react";
// import { motion } from "framer-motion";
// import { Code2, Mail, Lock, User, Sparkles, ArrowRight } from "lucide-react";
// // import Galaxy from "../Components/Galaxy";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

// const Signup = () => {
//   const [formData, setFormData] = React.useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     termsAccepted: false,
//   });
//   const [errors, setErrors] = React.useState({});
//   const [isSubmitting, setIsSubmitting] = React.useState(false);

//   // Animation variants
//   const formVariants = {
//     hidden: { opacity: 0, y: 30, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   };

//   // Galaxy Component (simplified for this example - replace with your actual component)
//   const Galaxy = ({ mouseRepulsion, density, glowIntensity, hueShift }) => {
//     return (
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
//         {[...Array(100)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               opacity: Math.random() * 0.7,
//               animationDelay: `${Math.random() * 3}s`,
//             }}
//           ></div>
//         ))}
//       </div>
//     );
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullName.trim()) {
//       newErrors.fullName = "Full name is required";
//     } else if (formData.fullName.trim().length < 2) {
//       newErrors.fullName = "Name must be at least 2 characters";
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Please enter a valid email";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Please confirm your password";
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     if (!formData.termsAccepted) {
//       newErrors.terms = "You must accept the terms and privacy policy";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // const handleSubmit = async () => {
//   //   if (!validateForm()) {
//   //     return;
//   //   }

//   //   setIsSubmitting(true);

//   //   try {
//   //     // Simulate API call
//   //     await new Promise((resolve) => setTimeout(resolve, 1500));
//   //     console.log("Form submitted:", formData);
//   //     alert("Account created successfully!");
//   //     // Handle successful submission (redirect, show success message, etc.)
//   //   } catch (error) {
//   //     setErrors({ submit: "Something went wrong. Please try again." });
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           fullName: formData.fullName,
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Signup failed");
//       }

//       // Success toast
//       toast.success("Account created successfully! Please log in.", {
//         duration: 4000,
//         position: "top-center",
//         style: {
//           background: "#10b981",
//           color: "#fff",
//           fontWeight: "600",
//         },
//       });

//       // Redirect to login
//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);
//     } catch (error) {
//       // Error toast
//       toast.error(error.message || "Something went wrong. Please try again.", {
//         duration: 4000,
//         position: "top-center",
//         style: {
//           background: "#ef4444",
//           color: "#fff",
//           fontWeight: "600",
//         },
//       });
//       setErrors({ submit: error.message });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (field) => (e) => {
//     const value =
//       e.target.type === "checkbox" ? e.target.checked : e.target.value;
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     // Clear error for this field when user starts typing
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: "" }));
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !isSubmitting) {
//       handleSubmit();
//     }
//   };

//   return (
//     <div className="relative w-full min-h-screen bg-black text-white overflow-hidden selection:bg-purple-500 selection:text-white p-16">
//       {/* 1. FIXED BACKGROUND LAYER */}

//       <div className="fixed inset-0 z-0">
//         <Galaxy
//           mouseRepulsion={false}
//           density={1.2}
//           glowIntensity={0.4}
//           hueShift={270}
//         />
//       </div>

//       {/* 2. MAIN CONTENT LAYER */}
//       <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
//         {/* Decorative glowing orb behind card */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-purple-600/30 rounded-full blur-[120px] -z-10"></div>

//         <motion.div
//           variants={formVariants}
//           initial="hidden"
//           animate="visible"
//           className="w-full max-w-md sm:max-w-lg lg:max-w-xl p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl sm:rounded-[40px] bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.2)] relative overflow-hidden"
//         >
//           {/* Card Header */}
//           <div className="text-center mb-8 sm:mb-10">
//             <div className="flex justify-center mb-4">
//               <div className="p-3 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-2xl shadow-lg shadow-purple-500/20">
//                 <Sparkles className="w-5 h-5 text-white" />
//               </div>
//             </div>
//             <h2 className="text-2xl sm:text-3xl font-bold mb-2">
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
//                 Sign Up
//               </span>
//             </h2>
//             <p className="text-gray-400 text-sm">
//               Begin your AI-augmented coding journey.
//             </p>
//           </div>

//           {/* Signup Form */}
//           <div className="space-y-5 sm:space-y-6" onKeyPress={handleKeyPress}>
//             <InputGroup
//               label="Full Name"
//               type="text"
//               placeholder="John Doe"
//               icon={<User className="w-5 h-5" />}
//               value={formData.fullName}
//               onChange={handleChange("fullName")}
//               error={errors.fullName}
//             />

//             <InputGroup
//               label="Email Address"
//               type="email"
//               placeholder="john@example.com"
//               icon={<Mail className="w-5 h-5" />}
//               value={formData.email}
//               onChange={handleChange("email")}
//               error={errors.email}
//             />

//             <InputGroup
//               label="Password"
//               type="password"
//               placeholder="••••••••"
//               icon={<Lock className="w-5 h-5" />}
//               value={formData.password}
//               onChange={handleChange("password")}
//               error={errors.password}
//             />

//             <InputGroup
//               label="Confirm Password"
//               type="password"
//               placeholder="••••••••"
//               icon={<Lock className="w-5 h-5" />}
//               value={formData.confirmPassword}
//               onChange={handleChange("confirmPassword")}
//               error={errors.confirmPassword}
//             />

//             {/* Terms Checkbox */}
//             <div className="pt-2">
//               <div className="flex items-start gap-3">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   checked={formData.termsAccepted}
//                   onChange={handleChange("termsAccepted")}
//                   className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500 accent-purple-500 cursor-pointer"
//                 />
//                 <label
//                   htmlFor="terms"
//                   className="text-sm text-gray-400 select-none leading-relaxed cursor-pointer"
//                 >
//                   I agree to the{" "}
//                   <a href="#" className="text-purple-400 hover:underline">
//                     Terms
//                   </a>{" "}
//                   and{" "}
//                   <a href="#" className="text-purple-400 hover:underline">
//                     Privacy Policy
//                   </a>
//                   .
//                 </label>
//               </div>
//               {errors.terms && (
//                 <p className="text-red-400 text-xs mt-2 ml-7">{errors.terms}</p>
//               )}
//             </div>

//             {/* General submit error */}
//             {errors.submit && (
//               <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
//                 <p className="text-red-400 text-sm">{errors.submit}</p>
//               </div>
//             )}

//             {/* Submit Button */}
//             <motion.button
//               type="button"
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//               whileHover={
//                 !isSubmitting
//                   ? {
//                       scale: 1.02,
//                       shadow: "0 0 30px rgba(168,85,247,0.5)",
//                     }
//                   : {}
//               }
//               whileTap={!isSubmitting ? { scale: 0.98 } : {}}
//               className="group w-full py-3.5 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-purple-500/30 transition-all relative overflow-hidden flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                   Creating Account...
//                 </>
//               ) : (
//                 <>
//                   <Sparkles className="w-5 h-5" />
//                   Create Account
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </>
//               )}
//             </motion.button>
//           </div>

//           {/* Footer Link */}
//           <div className="text-center mt-6 sm:mt-8 text-sm text-gray-400">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
//             >
//               Log In
//             </Link>
//           </div>

//           {/* Bottom decorative gradient border */}
//           <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-blue-500/0"></div>
//         </motion.div>
//       </main>
//     </div>
//   );
// };

// // --- REUSABLE INPUT GROUP COMPONENT ---
// const InputGroup = ({
//   label,
//   type,
//   placeholder,
//   icon,
//   value,
//   onChange,
//   error,
// }) => {
//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-300 ml-1">
//         {label}
//       </label>
//       <div className="relative group">
//         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
//           {icon}
//         </div>
//         <input
//           type={type}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           className={`w-full bg-white/5 border rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 ${
//             error ? "border-red-500/50" : "border-white/10"
//           }`}
//         />
//       </div>
//       {error && <p className="text-red-400 text-xs ml-1 mt-1">{error}</p>}
//     </div>
//   );
// };

// export default Signup;

// import React from "react";
// import { motion } from "framer-motion";
// import { Code2, Mail, Lock, User, Sparkles, ArrowRight } from "lucide-react";
// // import Galaxy from "../Components/Galaxy";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = React.useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     termsAccepted: false,
//   });
//   const [errors, setErrors] = React.useState({});
//   const [isSubmitting, setIsSubmitting] = React.useState(false);

//   // Animation variants
//   const formVariants = {
//     hidden: { opacity: 0, y: 30, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   };

//   // Galaxy Component (simplified for this example - replace with your actual component)
//   const Galaxy = ({ mouseRepulsion, density, glowIntensity, hueShift }) => {
//     return (
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
//         {[...Array(100)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               opacity: Math.random() * 0.7,
//               animationDelay: `${Math.random() * 3}s`,
//             }}
//           ></div>
//         ))}
//       </div>
//     );
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullName.trim()) {
//       newErrors.fullName = "Full name is required";
//     } else if (formData.fullName.trim().length < 2) {
//       newErrors.fullName = "Name must be at least 2 characters";
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Please enter a valid email";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Please confirm your password";
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     if (!formData.termsAccepted) {
//       newErrors.terms = "You must accept the terms and privacy policy";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           fullName: formData.fullName,
//           email: formData.email,
//           password: formData.password,
//           confirmPassword: formData.confirmPassword,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         // Handle API errors
//         throw new Error(data.message || "Signup failed");
//       }

//       // Success - show toast and redirect
//       toast.success("Account created successfully! Please log in.", {
//         duration: 4000,
//         position: "top-center",
//         style: {
//           background: "#10b981",
//           color: "#fff",
//           fontWeight: "600",
//         },
//       });

//       // Redirect to login page after a short delay
//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);
//     } catch (error) {
//       // Show error toast
//       toast.error(error.message || "Something went wrong. Please try again.", {
//         duration: 4000,
//         position: "top-center",
//         style: {
//           background: "#ef4444",
//           color: "#fff",
//           fontWeight: "600",
//         },
//       });
//       setErrors({
//         submit: error.message || "Something went wrong. Please try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (field) => (e) => {
//     const value =
//       e.target.type === "checkbox" ? e.target.checked : e.target.value;
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     // Clear error for this field when user starts typing
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: "" }));
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !isSubmitting) {
//       handleSubmit();
//     }
//   };

//   return (
//     <div className="relative w-full min-h-screen bg-black text-white overflow-hidden selection:bg-purple-500 selection:text-white p-16">
//       {/* 1. FIXED BACKGROUND LAYER */}

//       <div className="fixed inset-0 z-0">
//         <Galaxy
//           mouseRepulsion={false}
//           density={1.2}
//           glowIntensity={0.4}
//           hueShift={270}
//         />
//       </div>

//       {/* 2. MAIN CONTENT LAYER */}
//       <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
//         {/* Decorative glowing orb behind card */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-purple-600/30 rounded-full blur-[120px] -z-10"></div>

//         <motion.div
//           variants={formVariants}
//           initial="hidden"
//           animate="visible"
//           className="w-full max-w-md sm:max-w-lg lg:max-w-xl p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl sm:rounded-[40px] bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.2)] relative overflow-hidden"
//         >
//           {/* Card Header */}
//           <div className="text-center mb-8 sm:mb-10">
//             <div className="flex justify-center mb-4">
//               <div className="p-3 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-2xl shadow-lg shadow-purple-500/20">
//                 <Sparkles className="w-5 h-5 text-white" />
//               </div>
//             </div>
//             <h2 className="text-2xl sm:text-3xl font-bold mb-2">
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
//                 Sign Up
//               </span>
//             </h2>
//             <p className="text-gray-400 text-sm">
//               Begin your AI-augmented coding journey.
//             </p>
//           </div>

//           {/* Signup Form */}
//           <div className="space-y-5 sm:space-y-6" onKeyPress={handleKeyPress}>
//             <InputGroup
//               label="Full Name"
//               type="text"
//               placeholder="John Doe"
//               icon={<User className="w-5 h-5" />}
//               value={formData.fullName}
//               onChange={handleChange("fullName")}
//               error={errors.fullName}
//             />

//             <InputGroup
//               label="Email Address"
//               type="email"
//               placeholder="john@example.com"
//               icon={<Mail className="w-5 h-5" />}
//               value={formData.email}
//               onChange={handleChange("email")}
//               error={errors.email}
//             />

//             <InputGroup
//               label="Password"
//               type="password"
//               placeholder="••••••••"
//               icon={<Lock className="w-5 h-5" />}
//               value={formData.password}
//               onChange={handleChange("password")}
//               error={errors.password}
//             />

//             <InputGroup
//               label="Confirm Password"
//               type="password"
//               placeholder="••••••••"
//               icon={<Lock className="w-5 h-5" />}
//               value={formData.confirmPassword}
//               onChange={handleChange("confirmPassword")}
//               error={errors.confirmPassword}
//             />

//             {/* Terms Checkbox */}
//             <div className="pt-2">
//               <div className="flex items-start gap-3">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   checked={formData.termsAccepted}
//                   onChange={handleChange("termsAccepted")}
//                   className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500 accent-purple-500 cursor-pointer"
//                 />
//                 <label
//                   htmlFor="terms"
//                   className="text-sm text-gray-400 select-none leading-relaxed cursor-pointer"
//                 >
//                   I agree to the{" "}
//                   <a href="#" className="text-purple-400 hover:underline">
//                     Terms
//                   </a>{" "}
//                   and{" "}
//                   <a href="#" className="text-purple-400 hover:underline">
//                     Privacy Policy
//                   </a>
//                   .
//                 </label>
//               </div>
//               {errors.terms && (
//                 <p className="text-red-400 text-xs mt-2 ml-7">{errors.terms}</p>
//               )}
//             </div>

//             {/* General submit error */}
//             {errors.submit && (
//               <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
//                 <p className="text-red-400 text-sm">{errors.submit}</p>
//               </div>
//             )}

//             {/* Submit Button */}
//             <motion.button
//               type="button"
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//               whileHover={
//                 !isSubmitting
//                   ? {
//                       scale: 1.02,
//                       shadow: "0 0 30px rgba(168,85,247,0.5)",
//                     }
//                   : {}
//               }
//               whileTap={!isSubmitting ? { scale: 0.98 } : {}}
//               className="group w-full py-3.5 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-purple-500/30 transition-all relative overflow-hidden flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                   Creating Account...
//                 </>
//               ) : (
//                 <>
//                   <Sparkles className="w-5 h-5" />
//                   Create Account
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </>
//               )}
//             </motion.button>
//           </div>

//           {/* Footer Link */}
//           <div className="text-center mt-6 sm:mt-8 text-sm text-gray-400">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
//             >
//               Log In
//             </Link>
//           </div>

//           {/* Bottom decorative gradient border */}
//           <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-blue-500/0"></div>
//         </motion.div>
//       </main>
//     </div>
//   );
// };

// // --- REUSABLE INPUT GROUP COMPONENT ---
// const InputGroup = ({
//   label,
//   type,
//   placeholder,
//   icon,
//   value,
//   onChange,
//   error,
// }) => {
//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-300 ml-1">
//         {label}
//       </label>
//       <div className="relative group">
//         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
//           {icon}
//         </div>
//         <input
//           type={type}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           className={`w-full bg-white/5 border rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 ${
//             error ? "border-red-500/50" : "border-white/10"
//           }`}
//         />
//       </div>
//       {error && <p className="text-red-400 text-xs ml-1 mt-1">{error}</p>}
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Include uppercase, lowercase, and numbers";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.termsAccepted) {
      newErrors.terms = "You must accept the terms and privacy policy";
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
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
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
            } max-w-md w-full bg-gradient-to-r from-emerald-900/90 to-green-900/90 backdrop-blur-xl border border-emerald-500/30 shadow-lg shadow-emerald-500/30 rounded-2xl pointer-events-auto flex items-center p-4`}
          >
            <div className="flex-1 flex items-center">
              <div className="flex-shrink-0 p-2 bg-emerald-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-white">
                  Account Created! 🎉
                </p>
                <p className="mt-1 text-sm text-emerald-200">
                  Welcome {formData.fullName}! Redirecting to login...
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
          duration: 3500,
          position: "top-center",
        },
      );

      // Wait a moment before redirecting
      setTimeout(() => {
        navigate("/login");
      }, 2000);
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
                <Sparkles className="w-5 h-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-white">
                  Signup Failed
                </p>
                <p className="mt-1 text-sm text-red-200">
                  {error.message || "Please try again"}
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
        },
      );

      setErrors({
        submit: error.message || "Something went wrong. Please try again.",
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, color: "gray", text: "" };

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const strengthMap = [
      { color: "bg-red-500", text: "Very Weak" },
      { color: "bg-orange-500", text: "Weak" },
      { color: "bg-yellow-500", text: "Fair" },
      { color: "bg-blue-500", text: "Good" },
      { color: "bg-emerald-500", text: "Strong" },
      { color: "bg-green-600", text: "Very Strong" },
    ];

    return strengthMap[Math.min(strength, 5)];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden selection:bg-purple-500 selection:text-white p-4 sm:p-8 md:p-16">
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
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-4 py-4 sm:py-20">
        {/* Decorative glowing orb behind card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-purple-600/30 rounded-full blur-[120px] -z-10"></div>

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
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Sign Up
              </span>
            </h2>
            <p className="text-gray-400 text-sm">
              Begin your AI-augmented coding journey.
            </p>
          </div>

          {/* Signup Form */}
          <div className="space-y-5 sm:space-y-6" onKeyPress={handleKeyPress}>
            <InputGroup
              label="Full Name"
              type="text"
              placeholder="David Smith"
              icon={<User className="w-5 h-5" />}
              value={formData.fullName}
              onChange={handleChange("fullName")}
              error={errors.fullName}
            />

            <InputGroup
              label="Email Address"
              type="email"
              placeholder="david@example.com"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              onChange={handleChange("email")}
              error={errors.email}
            />

            <div className="space-y-2">
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
                    errors.password ? "border-red-500/50" : "border-white/10"
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

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      Password strength
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: passwordStrength.color }}
                    >
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{
                        width: `${(passwordStrength.strength / 5) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    • 8+ characters • Upper & lowercase • Numbers
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="text-red-400 text-xs ml-1 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 ml-1">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  className={`w-full bg-white/5 border rounded-xl py-3.5 pl-12 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 ${
                    errors.confirmPassword
                      ? "border-red-500/50"
                      : "border-white/10"
                  }`}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs ml-1 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="pt-2">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.termsAccepted}
                  onChange={handleChange("termsAccepted")}
                  className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500 accent-purple-500 cursor-pointer"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-400 select-none leading-relaxed cursor-pointer"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-400 text-xs mt-2 ml-7">{errors.terms}</p>
              )}
            </div>

            {/* General submit error */}
            {errors.submit && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
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
                  Creating Account...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </div>

          {/* Footer Link */}
          <div className="text-center mt-6 sm:mt-8 text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
            >
              Log In
            </Link>
          </div>

          {/* Bottom decorative gradient border */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-blue-500/0"></div>
        </motion.div>
      </main>
    </div>
  );
};

// InputGroup Component
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

export default Signup;
