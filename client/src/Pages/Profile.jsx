// import React, { useState } from "react";
// import {
//   User,
//   Mail,
//   Code2,
//   Save,
//   FileCode,
//   MapPin,
//   Edit2,
//   Check,
//   X,
//   Bookmark,
//   Clock,
//   Eye,
//   Copy,
//   Trash2,
// } from "lucide-react";

// const Galaxy = () => (
//   <div className="absolute inset-0">
//     <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
//     {[...Array(150)].map((_, i) => (
//       <div
//         key={i}
//         className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
//         style={{
//           left: `${Math.random() * 100}%`,
//           top: `${Math.random() * 100}%`,
//           opacity: Math.random() * 0.7,
//           animationDelay: `${Math.random() * 3}s`,
//         }}
//       ></div>
//     ))}
//   </div>
// );

// const Profile = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [tempData, setTempData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await fetch("http://localhost:5000/api/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();

//         const mappedData = {
//           firstName: data.user.fullName,
//           username: data.user.username,
//           email: data.user.email,
//           bio: data.user.bio || "",
//           location: data.user.location || "",
//         };

//         setProfileData(mappedData);
//         setTempData(mappedData);

//         // 🔥 Keep navbar in sync
//         localStorage.setItem("user", JSON.stringify(data.user));
//       } catch (err) {
//         console.error("Profile fetch failed", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleSaveProfile = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     const res = await fetch("http://localhost:5000/api/profile", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         fullName: tempData.firstName,
//         username: tempData.username,
//         email: tempData.email,
//         bio: tempData.bio,
//         location: tempData.location,
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.message || "Update failed");
//       return;
//     }

//     const updatedProfile = {
//       firstName: data.user.fullName,
//       username: data.user.username,
//       email: data.user.email,
//       bio: data.user.bio || "",
//       location: data.user.location || "",
//     };

//     setProfileData(updatedProfile);
//     setTempData(updatedProfile);

//     // 🔥 Sync Navbar instantly
//     localStorage.setItem("user", JSON.stringify(data.user));

//     setSaved(true);
//     setTimeout(() => setSaved(false), 2000);
//     setIsEditing(false);
//   } catch (error) {
//     console.error("Profile update failed:", error);
//     alert("Something went wrong");
//   }
// };

//   // Sample saved codes data
//   const [savedCodes, setSavedCodes] = useState([
//     {
//       id: 1,
//       title: "Python Calculator",
//       language: "python",
//       code: 'print("Hello, World!")',
//       savedDate: "2 days ago",
//       views: 45,
//     },
//     {
//       id: 2,
//       title: "React Todo App",
//       language: "javascript",
//       code: "const [todos, setTodos] = useState([])",
//       savedDate: "1 week ago",
//       views: 89,
//     },
//     {
//       id: 3,
//       title: "C++ Sorting Algorithm",
//       language: "cpp",
//       code: "void bubbleSort(int arr[], int n)",
//       savedDate: "3 weeks ago",
//       views: 23,
//     },
//     {
//       id: 4,
//       title: "Data Visualization",
//       language: "python",
//       code: "import matplotlib.pyplot as plt",
//       savedDate: "1 month ago",
//       views: 67,
//     },
//   ]);

//   const handleCopyCode = (code) => {
//     navigator.clipboard.writeText(code);
//     // You can add a toast notification here
//     alert("Code copied to clipboard!");
//   };

//   const handleDeleteCode = (id) => {
//     setSavedCodes(savedCodes.filter((code) => code.id !== id));
//   };
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Loading profile...
//         <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden selection:bg-purple-500 selection:text-white p-16">
//           <div className="fixed inset-0 z-0">
//             <Galaxy />
//           </div>
//           <main className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//             <div className="max-w-6xl mx-auto">
//               {/* Header */}
//               <div className="text-center mb-8 sm:mb-12">
//                 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
//                   Your{" "}
//                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
//                     Profile
//                   </span>
//                 </h1>
//                 <p className="text-gray-400 text-sm sm:text-base">
//                   Manage your account and saved codes
//                 </p>
//               </div>

//               {/* Main Content Grid */}
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* Left Column - Profile Card */}
//                 <div className="lg:col-span-1">
//                   <div className="relative group">
//                     <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
//                     <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
//                       {/* Circular Avatar */}
//                       <div className="flex flex-col items-center mb-6">
//                         <div className="relative mb-4">
//                           <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-4xl font-bold shadow-lg shadow-purple-500/30">
//                             {profileData?.firstName?.charAt(0)}
//                           </div>
//                         </div>

//                         <h2 className="text-2xl font-bold mb-1">
//                           {profileData.firstName}
//                         </h2>
//                         <p className="text-purple-400 mb-4">
//                           @{profileData.username}
//                         </p>

//                         <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
//                           <MapPin className="w-4 h-4" />
//                           {profileData.location}
//                         </div>

//                         {!isEditing && (
//                           <button
//                             onClick={() => {
//                               setIsEditing(true);
//                               setTempData({ ...profileData });
//                             }}
//                             className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
//                           >
//                             <Edit2 className="w-4 h-4" />
//                             Edit Profile
//                           </button>
//                         )}
//                       </div>

//                       {/* Profile Details */}
//                       <div className="space-y-4">
//                         <div className="flex items-center gap-3 text-sm">
//                           <Mail className="w-4 h-4 text-gray-400" />
//                           <span className="text-gray-300">
//                             {profileData.email}
//                           </span>
//                         </div>

//                         <div className="pt-4 border-t border-white/10">
//                           <p className="text-gray-300 text-sm leading-relaxed">
//                             {profileData.bio}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Column - Personal Details & Saved Codes */}
//                 <div className="lg:col-span-2 space-y-8">
//                   {/* Personal Details Section */}
//                   <div className="relative group">
//                     <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20"></div>
//                     <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
//                       <div className="flex items-center justify-between mb-6">
//                         <h3 className="text-xl font-semibold flex items-center gap-2">
//                           <User className="w-5 h-5 text-purple-400" />
//                           Personal Information
//                         </h3>
//                         {isEditing && (
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => {
//                                 setTempData({ ...profileData });
//                                 setIsEditing(false);
//                               }}
//                               className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium text-sm transition-all flex items-center gap-2"
//                             >
//                               <X className="w-4 h-4" />
//                               Cancel
//                             </button>
//                             <button
//                               onClick={() => {
//                                 setProfileData({ ...tempData });
//                                 setIsEditing(false);
//                                 setSaved(true);
//                                 setTimeout(() => setSaved(false), 2000);
//                               }}
//                               className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium text-sm shadow-lg shadow-purple-500/30 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
//                             >
//                               {saved ? (
//                                 <>
//                                   <Check className="w-4 h-4" />
//                                   Saved!
//                                 </>
//                               ) : (
//                                 <>
//                                   <Save className="w-4 h-4" />
//                                   Save Changes
//                                 </>
//                               )}
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       <div className="space-y-5">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                           <InputField
//                             label="First Name"
//                             value={
//                               isEditing
//                                 ? tempData.firstName
//                                 : profileData.firstName
//                             }
//                             onChange={(e) =>
//                               setTempData((prev) => ({
//                                 ...prev,
//                                 firstName: e.target.value,
//                               }))
//                             }
//                             disabled={!isEditing}
//                             icon={<User className="w-4 h-4" />}
//                           />
//                           <InputField
//                             label="Username"
//                             value={
//                               isEditing
//                                 ? tempData.username
//                                 : profileData.username
//                             }
//                             onChange={(e) =>
//                               setTempData((prev) => ({
//                                 ...prev,
//                                 username: e.target.value,
//                               }))
//                             }
//                             disabled={!isEditing}
//                             icon={<Code2 className="w-4 h-4" />}
//                           />
//                         </div>
//                         <InputField
//                           label="Email"
//                           value={isEditing ? tempData.email : profileData.email}
//                           onChange={(e) =>
//                             setTempData((prev) => ({
//                               ...prev,
//                               email: e.target.value,
//                             }))
//                           }
//                           disabled={!isEditing}
//                           icon={<Mail className="w-4 h-4" />}
//                         />
//                         <InputField
//                           label="Location"
//                           value={
//                             isEditing ? tempData.location : profileData.location
//                           }
//                           onChange={(e) =>
//                             setTempData((prev) => ({
//                               ...prev,
//                               location: e.target.value,
//                             }))
//                           }
//                           disabled={!isEditing}
//                           icon={<MapPin className="w-4 h-4" />}
//                         />
//                         <div>
//                           <label className="block text-sm font-medium text-gray-300 mb-2">
//                             Bio
//                           </label>
//                           <textarea
//                             value={isEditing ? tempData.bio : profileData.bio}
//                             onChange={(e) =>
//                               setTempData((prev) => ({
//                                 ...prev,
//                                 bio: e.target.value,
//                               }))
//                             }
//                             disabled={!isEditing}
//                             className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none h-32 disabled:opacity-50"
//                             placeholder="Tell us about yourself..."
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Saved Codes Section */}
//                   <div className="relative group">
//                     <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20"></div>
//                     <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
//                       <div className="flex items-center justify-between mb-6">
//                         <h3 className="text-xl font-semibold flex items-center gap-2">
//                           <Bookmark className="w-5 h-5 text-purple-400" />
//                           Saved Codes
//                         </h3>
//                         <span className="text-sm text-gray-400">
//                           {savedCodes.length} saved
//                         </span>
//                       </div>

//                       {savedCodes.length === 0 ? (
//                         <div className="text-center py-12">
//                           <FileCode className="w-16 h-16 text-gray-600 mx-auto mb-4" />
//                           <p className="text-gray-400 mb-2">
//                             No saved codes yet
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             Save your favorite codes to access them here
//                           </p>
//                         </div>
//                       ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           {savedCodes.map((code) => (
//                             <div
//                               key={code.id}
//                               className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all group/card"
//                             >
//                               <div className="flex items-start justify-between mb-3">
//                                 <div>
//                                   <h4 className="font-medium text-white mb-1">
//                                     {code.title}
//                                   </h4>
//                                   <span className="text-xs px-2 py-1 rounded-full bg-purple-900/30 text-purple-300 border border-purple-500/30">
//                                     {code.language}
//                                   </span>
//                                 </div>
//                                 <div className="flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
//                                   <button
//                                     onClick={() => handleCopyCode(code.code)}
//                                     className="p-1.5 hover:bg-white/10 rounded transition-colors"
//                                     title="Copy code"
//                                   >
//                                     <Copy className="w-4 h-4" />
//                                   </button>
//                                   <button
//                                     onClick={() => handleDeleteCode(code.id)}
//                                     className="p-1.5 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded transition-colors"
//                                     title="Delete"
//                                   >
//                                     <Trash2 className="w-4 h-4" />
//                                   </button>
//                                 </div>
//                               </div>

//                               <pre className="text-xs text-gray-400 bg-black/30 p-3 rounded-lg mb-3 font-mono overflow-x-auto whitespace-pre-wrap">
//                                 {code.code}
//                               </pre>

//                               <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/10">
//                                 <div className="flex items-center gap-4">
//                                   <span className="flex items-center gap-1">
//                                     <Clock className="w-3 h-3" />
//                                     {code.savedDate}
//                                   </span>
//                                   <span className="flex items-center gap-1">
//                                     <Eye className="w-3 h-3" />
//                                     {code.views} views
//                                   </span>
//                                 </div>
//                                 <button className="text-purple-400 hover:text-purple-300 text-xs font-medium transition-colors">
//                                   View Details →
//                                 </button>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       )}

//                       {savedCodes.length > 0 && (
//                         <div className="mt-6 pt-6 border-t border-white/10">
//                           <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
//                             <FileCode className="w-4 h-4" />
//                             View All Saved Codes
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }
// };

// const InputField = ({ label, value, onChange, disabled, icon }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-300 mb-2">
//       {label}
//     </label>
//     <div className="relative">
//       <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
//         {icon}
//       </div>
//       <input
//         type="text"
//         value={value}
//         onChange={onChange}
//         disabled={disabled}
//         className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all disabled:opacity-50"
//       />
//     </div>
//   </div>
// );

// export default Profile;

// import React, { useState, useEffect } from "react";
// import {
//   User,
//   Mail,
//   Code2,
//   Save,
//   FileCode,
//   MapPin,
//   Edit2,
//   Check,
//   X,
//   Bookmark,
//   Clock,
//   Eye,
//   Copy,
//   Trash2,
//   Loader2,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// const Galaxy = () => (
//   <div className="absolute inset-0">
//     <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
//     {[...Array(150)].map((_, i) => (
//       <div
//         key={i}
//         className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
//         style={{
//           left: `${Math.random() * 100}%`,
//           top: `${Math.random() * 100}%`,
//           opacity: Math.random() * 0.7,
//           animationDelay: `${Math.random() * 3}s`,
//         }}
//       ></div>
//     ))}
//   </div>
// );

// const Profile = () => {
//   const navigate = useNavigate();
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     email: "",
//   });
//   const [tempData, setTempData] = useState({ ...profileData });
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [saved, setSaved] = useState(false);

//   // Fetch profile data
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           toast.error("Please login to view profile");
//           navigate("/login");
//           return;
//         }

//         const res = await fetch("http://localhost:5000/api/auth/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           if (res.status === 401) {
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");
//             toast.error("Session expired. Please login again.");
//             navigate("/login");
//             return;
//           }
//           throw new Error("Failed to fetch profile");
//         }

//         const data = await res.json();

//         const mappedData = {
//           firstName: data.user.fullName || "",
//           email: data.user.email || "",
//         };

//         setProfileData(mappedData);
//         setTempData(mappedData);

//         // Sync with navbar
//         localStorage.setItem("user", JSON.stringify(data.user));

//         toast.success("Profile loaded successfully!");
//       } catch (err) {
//         console.error("Profile fetch failed", err);
//         toast.error("Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   const handleSaveProfile = async () => {
//     if (!tempData.firstName.trim()) {
//       toast.error("First name is required");
//       return;
//     }

//     setIsSaving(true);

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         toast.error("Please login to continue");
//         navigate("/login");
//         return;
//       }

//       const res = await fetch("http://localhost:5000/api/auth/profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           fullName: tempData.firstName,
//           email: tempData.email,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Update failed");
//       }

//       const updatedProfile = {
//         firstName: data.user.fullName || tempData.firstName,
//         email: data.user.email || tempData.email,
//       };

//       setProfileData(updatedProfile);
//       setTempData(updatedProfile);

//       // Sync Navbar instantly
//       localStorage.setItem("user", JSON.stringify(data.user));

//       setSaved(true);
//       setIsEditing(false);

//       // Show success toast
//       toast.custom(
//         (t) => (
//           <div
//             className={`${
//               t.visible ? "animate-enter" : "animate-leave"
//             } max-w-md w-full bg-gradient-to-r from-emerald-900/90 to-green-900/90 backdrop-blur-xl border border-emerald-500/30 shadow-lg shadow-emerald-500/30 rounded-2xl pointer-events-auto flex items-center p-4`}
//           >
//             <div className="flex-1 flex items-center">
//               <div className="flex-shrink-0 p-2 bg-emerald-500/20 rounded-lg">
//                 <Check className="w-5 h-5 text-emerald-400" />
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm font-semibold text-white">
//                   Profile Updated! ✅
//                 </p>
//                 <p className="mt-1 text-sm text-emerald-200">
//                   Changes saved successfully
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => toast.dismiss(t.id)}
//               className="ml-4 flex-shrink-0 text-gray-300 hover:text-white"
//             >
//               ✕
//             </button>
//           </div>
//         ),
//         {
//           duration: 3000,
//           position: "top-center",
//         }
//       );

//       setTimeout(() => setSaved(false), 2000);
//     } catch (error) {
//       console.error("Profile update failed:", error);

//       // Show error toast
//       toast.custom(
//         (t) => (
//           <div
//             className={`${
//               t.visible ? "animate-enter" : "animate-leave"
//             } max-w-md w-full bg-gradient-to-r from-red-900/90 to-pink-900/90 backdrop-blur-xl border border-red-500/30 shadow-lg shadow-red-500/30 rounded-2xl pointer-events-auto flex items-center p-4`}
//           >
//             <div className="flex-1 flex items-center">
//               <div className="flex-shrink-0 p-2 bg-red-500/20 rounded-lg">
//                 <X className="w-5 h-5 text-red-400" />
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm font-semibold text-white">
//                   Update Failed
//                 </p>
//                 <p className="mt-1 text-sm text-red-200">{error.message}</p>
//               </div>
//             </div>
//             <button
//               onClick={() => toast.dismiss(t.id)}
//               className="ml-4 flex-shrink-0 text-gray-300 hover:text-white"
//             >
//               ✕
//             </button>
//           </div>
//         ),
//         {
//           duration: 4000,
//           position: "top-center",
//         }
//       );
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancelEdit = () => {
//     setTempData({ ...profileData });
//     setIsEditing(false);
//   };

//   const handleEditClick = () => {
//     setTempData({ ...profileData });
//     setIsEditing(true);
//   };

//   // Sample saved codes data
//   const [savedCodes, setSavedCodes] = useState([
//     {
//       id: 1,
//       title: "Python Calculator",
//       language: "python",
//       code: 'print("Hello, World!")',
//       savedDate: "2 days ago",
//       views: 45,
//     },
//     {
//       id: 2,
//       title: "React Todo App",
//       language: "javascript",
//       code: "const [todos, setTodos] = useState([])",
//       savedDate: "1 week ago",
//       views: 89,
//     },
//     {
//       id: 3,
//       title: "C++ Sorting Algorithm",
//       language: "cpp",
//       code: "void bubbleSort(int arr[], int n)",
//       savedDate: "3 weeks ago",
//       views: 23,
//     },
//     {
//       id: 4,
//       title: "Data Visualization",
//       language: "python",
//       code: "import matplotlib.pyplot as plt",
//       savedDate: "1 month ago",
//       views: 67,
//     },
//   ]);

//   const handleCopyCode = (code) => {
//     navigator.clipboard.writeText(code);
//     toast.success("Code copied to clipboard!");
//   };

//   const handleDeleteCode = (id) => {
//     setSavedCodes(savedCodes.filter((code) => code.id !== id));
//     toast.success("Code deleted successfully!");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
//           <p className="text-white text-lg">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden selection:bg-purple-500 selection:text-white p-4 sm:p-8 md:p-16">
//       <Toaster />

//       {/* Background */}
//       <div className="fixed inset-0 z-0">
//         <Galaxy />
//       </div>

//       <main className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-8 sm:mb-12">
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
//               Your{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
//                 Profile
//               </span>
//             </h1>
//             <p className="text-gray-400 text-sm sm:text-base">
//               Manage your account and saved codes
//             </p>
//           </div>

//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
//             {/* Left Column - Profile Card */}
//             <div className="lg:col-span-1">
//               <div className="relative group">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
//                 <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
//                   {/* Circular Avatar */}
//                   <div className="flex flex-col items-center mb-6">
//                     <div className="relative mb-4">
//                       <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-lg shadow-purple-500/30">
//                         {profileData.firstName
//                           ? profileData.firstName.split(" ").length > 1
//                             ? `${profileData.firstName.split(" ")[0][0]}${
//                                 profileData.firstName.split(" ")[1][0]
//                               }`.toUpperCase()
//                             : profileData.firstName.charAt(0).toUpperCase()
//                           : "U"}
//                       </div>
//                     </div>

//                     <h2 className="text-xl sm:text-2xl font-bold mb-1">
//                       {profileData.firstName || "User"}
//                     </h2>

//                     {!isEditing && (
//                       <button
//                         onClick={handleEditClick}
//                         className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50"
//                       >
//                         <Edit2 className="w-4 h-4" />
//                         Edit Profile
//                       </button>
//                     )}
//                   </div>

//                   {/* Profile Details */}
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-3 text-sm">
//                       <Mail className="w-4 h-4 text-gray-400" />
//                       <span className="text-gray-300 truncate">
//                         {profileData.email}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Personal Details & Saved Codes */}
//             <div className="lg:col-span-2 space-y-6 sm:space-y-8">
//               {/* Personal Details Section */}
//               <div className="relative group">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20"></div>
//                 <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8">
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
//                     <h3 className="text-xl font-semibold flex items-center gap-2">
//                       <User className="w-5 h-5 text-purple-400" />
//                       Personal Information
//                     </h3>
//                     {isEditing && (
//                       <div className="flex gap-2">
//                         <button
//                           onClick={handleCancelEdit}
//                           className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium text-sm transition-all flex items-center gap-2"
//                         >
//                           <X className="w-4 h-4" />
//                           Cancel
//                         </button>
//                         <button
//                           onClick={handleSaveProfile}
//                           disabled={isSaving}
//                           className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium text-sm shadow-lg shadow-purple-500/30 transition-all flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50"
//                         >
//                           {isSaving ? (
//                             <>
//                               <Loader2 className="w-4 h-4 animate-spin" />
//                               Saving...
//                             </>
//                           ) : saved ? (
//                             <>
//                               <Check className="w-4 h-4" />
//                               Saved!
//                             </>
//                           ) : (
//                             <>
//                               <Save className="w-4 h-4" />
//                               Save Changes
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   <div className="space-y-5">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                       <InputField
//                         label="First Name"
//                         value={
//                           isEditing ? tempData.firstName : profileData.firstName
//                         }
//                         onChange={(e) =>
//                           setTempData((prev) => ({
//                             ...prev,
//                             firstName: e.target.value,
//                           }))
//                         }
//                         disabled={!isEditing}
//                         icon={<User className="w-4 h-4" />}
//                       />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                       <InputField
//                         label="Email"
//                         value={isEditing ? tempData.email : profileData.email}
//                         onChange={(e) =>
//                           setTempData((prev) => ({
//                             ...prev,
//                             email: e.target.value,
//                           }))
//                         }
//                         disabled={!isEditing}
//                         icon={<Mail className="w-4 h-4" />}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* Saved Codes Section */}
//               <div className="relative group">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20"></div>
//                 <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8">
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
//                     <h3 className="text-xl font-semibold flex items-center gap-2">
//                       <Bookmark className="w-5 h-5 text-purple-400" />
//                       Saved Codes
//                     </h3>
//                     <span className="text-sm text-gray-400">
//                       {savedCodes.length} saved
//                     </span>
//                   </div>

//                   {savedCodes.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <FileCode className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-4" />
//                       <p className="text-gray-400 mb-2">No saved codes yet</p>
//                       <p className="text-sm text-gray-500">
//                         Save your favorite codes to access them here
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {savedCodes.map((code) => (
//                         <div
//                           key={code.id}
//                           className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all group/card"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div>
//                               <h4 className="font-medium text-white mb-1">
//                                 {code.title}
//                               </h4>
//                               <span className="text-xs px-2 py-1 rounded-full bg-purple-900/30 text-purple-300 border border-purple-500/30">
//                                 {code.language}
//                               </span>
//                             </div>
//                             <div className="flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
//                               <button
//                                 onClick={() => handleCopyCode(code.code)}
//                                 className="p-1.5 hover:bg-white/10 rounded transition-colors"
//                                 title="Copy code"
//                               >
//                                 <Copy className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteCode(code.id)}
//                                 className="p-1.5 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded transition-colors"
//                                 title="Delete"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>

//                           <pre className="text-xs text-gray-400 bg-black/30 p-3 rounded-lg mb-3 font-mono overflow-x-auto whitespace-pre-wrap">
//                             {code.code}
//                           </pre>

//                           <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/10">
//                             <div className="flex items-center gap-4">
//                               <span className="flex items-center gap-1">
//                                 <Clock className="w-3 h-3" />
//                                 {code.savedDate}
//                               </span>
//                               <span className="flex items-center gap-1">
//                                 <Eye className="w-3 h-3" />
//                                 {code.views} views
//                               </span>
//                             </div>
//                             <button className="text-purple-400 hover:text-purple-300 text-xs font-medium transition-colors">
//                               View Details →
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {savedCodes.length > 0 && (
//                     <div className="mt-6 pt-6 border-t border-white/10">
//                       <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
//                         <FileCode className="w-4 h-4" />
//                         View All Saved Codes
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// const InputField = ({ label, value, onChange, disabled, icon }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-300 mb-2">
//       {label}
//     </label>
//     <div className="relative">
//       <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
//         {icon}
//       </div>
//       <input
//         type="text"
//         value={value || ""}
//         onChange={onChange}
//         disabled={disabled}
//         className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all disabled:opacity-50"
//       />
//     </div>
//   </div>
// );

// export default Profile;

// import React, { useState, useEffect } from "react";
// import {
//   User,
//   Mail,
//   Save,
//   FileCode,
//   Edit2,
//   Check,
//   X,
//   Bookmark,
//   Clock,
//   Eye,
//   Copy,
//   Trash2,
//   Loader2,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// const Galaxy = () => (
//   <div className="absolute inset-0">
//     <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
//     {[...Array(150)].map((_, i) => (
//       <div
//         key={i}
//         className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
//         style={{
//           left: `${Math.random() * 100}%`,
//           top: `${Math.random() * 100}%`,
//           opacity: Math.random() * 0.7,
//           animationDelay: `${Math.random() * 3}s`,
//         }}
//       ></div>
//     ))}
//   </div>
// );

// const Profile = () => {
//   const navigate = useNavigate();
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     email: "",
//   });
//   const [tempData, setTempData] = useState({ ...profileData });
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [saved, setSaved] = useState(false);

//   // Fetch profile data
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           toast.error("Please login to view profile");
//           navigate("/login");
//           return;
//         }

//         const res = await fetch("http://localhost:5000/api/auth/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           if (res.status === 401) {
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");
//             toast.error("Session expired. Please login again.");
//             navigate("/login");
//             return;
//           }
//           throw new Error("Failed to fetch profile");
//         }

//         const data = await res.json();

//         const mappedData = {
//           firstName: data.user.fullName || "",
//           email: data.user.email || "",
//         };

//         setProfileData(mappedData);
//         setTempData(mappedData);

//         // Sync with navbar
//         localStorage.setItem("user", JSON.stringify(data.user));

//         toast.success("Profile loaded successfully!");
//       } catch (err) {
//         console.error("Profile fetch failed", err);
//         toast.error("Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   const handleSaveProfile = async () => {
//     if (!tempData.firstName.trim()) {
//       toast.error("First name is required");
//       return;
//     }

//     setIsSaving(true);

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         toast.error("Please login to continue");
//         navigate("/login");
//         return;
//       }

//       const res = await fetch("http://localhost:5000/api/auth/profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           fullName: tempData.firstName,
//           email: tempData.email,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Update failed");
//       }

//       const updatedProfile = {
//         firstName: data.user.fullName || tempData.firstName,
//         email: data.user.email || tempData.email,
//       };

//       setProfileData(updatedProfile);
//       setTempData(updatedProfile);

//       // Sync Navbar instantly
//       localStorage.setItem("user", JSON.stringify(data.user));

//       setSaved(true);
//       setIsEditing(false);

//       // Show success toast
//       toast.custom(
//         (t) => (
//           <div
//             className={`${
//               t.visible ? "animate-enter" : "animate-leave"
//             } max-w-md w-full bg-gradient-to-r from-emerald-900/90 to-green-900/90 backdrop-blur-xl border border-emerald-500/30 shadow-lg shadow-emerald-500/30 rounded-2xl pointer-events-auto flex items-center p-4`}
//           >
//             <div className="flex-1 flex items-center">
//               <div className="flex-shrink-0 p-2 bg-emerald-500/20 rounded-lg">
//                 <Check className="w-5 h-5 text-emerald-400" />
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm font-semibold text-white">
//                   Profile Updated! ✅
//                 </p>
//                 <p className="mt-1 text-sm text-emerald-200">
//                   Changes saved successfully
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => toast.dismiss(t.id)}
//               className="ml-4 flex-shrink-0 text-gray-300 hover:text-white"
//             >
//               ✕
//             </button>
//           </div>
//         ),
//         {
//           duration: 3000,
//           position: "top-center",
//         }
//       );

//       setTimeout(() => setSaved(false), 2000);
//     } catch (error) {
//       console.error("Profile update failed:", error);

//       // Show error toast
//       toast.custom(
//         (t) => (
//           <div
//             className={`${
//               t.visible ? "animate-enter" : "animate-leave"
//             } max-w-md w-full bg-gradient-to-r from-red-900/90 to-pink-900/90 backdrop-blur-xl border border-red-500/30 shadow-lg shadow-red-500/30 rounded-2xl pointer-events-auto flex items-center p-4`}
//           >
//             <div className="flex-1 flex items-center">
//               <div className="flex-shrink-0 p-2 bg-red-500/20 rounded-lg">
//                 <X className="w-5 h-5 text-red-400" />
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm font-semibold text-white">
//                   Update Failed
//                 </p>
//                 <p className="mt-1 text-sm text-red-200">{error.message}</p>
//               </div>
//             </div>
//             <button
//               onClick={() => toast.dismiss(t.id)}
//               className="ml-4 flex-shrink-0 text-gray-300 hover:text-white"
//             >
//               ✕
//             </button>
//           </div>
//         ),
//         {
//           duration: 4000,
//           position: "top-center",
//         }
//       );
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancelEdit = () => {
//     setTempData({ ...profileData });
//     setIsEditing(false);
//   };

//   const handleEditClick = () => {
//     setTempData({ ...profileData });
//     setIsEditing(true);
//   };

//   // Sample saved codes data
//   const [savedCodes, setSavedCodes] = useState([
//     {
//       id: 1,
//       title: "Python Calculator",
//       language: "python",
//       code: 'print("Hello, World!")',
//       savedDate: "2 days ago",
//       views: 45,
//     },
//     {
//       id: 2,
//       title: "React Todo App",
//       language: "javascript",
//       code: "const [todos, setTodos] = useState([])",
//       savedDate: "1 week ago",
//       views: 89,
//     },
//     {
//       id: 3,
//       title: "C++ Sorting Algorithm",
//       language: "cpp",
//       code: "void bubbleSort(int arr[], int n)",
//       savedDate: "3 weeks ago",
//       views: 23,
//     },
//     {
//       id: 4,
//       title: "Data Visualization",
//       language: "python",
//       code: "import matplotlib.pyplot as plt",
//       savedDate: "1 month ago",
//       views: 67,
//     },
//   ]);

//   const handleCopyCode = (code) => {
//     navigator.clipboard.writeText(code);
//     toast.success("Code copied to clipboard!");
//   };

//   const handleDeleteCode = (id) => {
//     setSavedCodes(savedCodes.filter((code) => code.id !== id));
//     toast.success("Code deleted successfully!");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
//           <p className="text-white text-lg">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden selection:bg-purple-500 selection:text-white p-4 sm:p-6 md:p-8 lg:p-24">
//       <Toaster />

//       {/* Background */}
//       <div className="fixed inset-0 z-0">
//         <Galaxy />
//       </div>

//       <main className="relative z-10">
//         {/* Header Section */}
//         <div className="mb-8 md:mb-12">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
//                 Your{" "}
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
//                   Profile
//                 </span>
//               </h1>
//               <p className="text-gray-400 text-sm sm:text-base">
//                 Manage your account and saved codes
//               </p>
//             </div>
//             <div className="flex items-center space-x-2 text-sm text-gray-400">
//               <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                 <span>Active</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
//           {/* Left Column - Profile Card (3 columns) */}
//           <div className="lg:col-span-4">
//             <div className="sticky top-6">
//               <div className="relative group">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
//                 <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
//                   {/* Profile Avatar */}
//                   <div className="flex flex-col items-center mb-6">
//                     <div className="relative mb-5">
//                       <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-lg shadow-purple-500/30">
//                         {profileData.firstName
//                           ? profileData.firstName.split(" ").length > 1
//                             ? `${profileData.firstName.split(" ")[0][0]}${
//                                 profileData.firstName.split(" ")[1][0]
//                               }`.toUpperCase()
//                             : profileData.firstName.charAt(0).toUpperCase()
//                           : "U"}
//                       </div>
//                       <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full border-4 border-black flex items-center justify-center">
//                         <Check className="w-3 h-3 text-white" />
//                       </div>
//                     </div>

//                     <h2 className="text-xl sm:text-2xl font-bold mb-1 text-center">
//                       {profileData.firstName || "User"}
//                     </h2>
//                     <p className="text-gray-400 text-sm mb-6 text-center">
//                       {profileData.email}
//                     </p>

//                     {!isEditing && (
//                       <button
//                         onClick={handleEditClick}
//                         className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50"
//                       >
//                         <Edit2 className="w-4 h-4" />
//                         Edit Profile
//                       </button>
//                     )}
//                   </div>

//                   {/* Quick Stats */}
//                   <div className="border-t border-white/10 pt-6">
//                     <h3 className="text-sm font-semibold text-gray-300 mb-4">
//                       Quick Stats
//                     </h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="bg-white/5 rounded-xl p-4 text-center">
//                         <div className="text-2xl font-bold text-purple-400">
//                           {savedCodes.length}
//                         </div>
//                         <div className="text-xs text-gray-400 mt-1">
//                           Saved Codes
//                         </div>
//                       </div>
//                       <div className="bg-white/5 rounded-xl p-4 text-center">
//                         <div className="text-2xl font-bold text-blue-400">
//                           {savedCodes.reduce(
//                             (acc, code) => acc + code.views,
//                             0
//                           )}
//                         </div>
//                         <div className="text-xs text-gray-400 mt-1">
//                           Total Views
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Details & Codes (8 columns) */}
//           <div className="lg:col-span-8 space-y-6">
//             {/* Personal Information Section */}
//             <div className="relative group">
//               <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20"></div>
//               <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
//                 {/* Section Header */}
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
//                   <div className="flex items-center gap-3 mb-4 sm:mb-0">
//                     <div className="p-2 bg-purple-500/20 rounded-lg">
//                       <User className="w-5 h-5 text-purple-400" />
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-semibold">
//                         Personal Information
//                       </h3>
//                       <p className="text-sm text-gray-400">
//                         Update your profile details
//                       </p>
//                     </div>
//                   </div>
//                   {isEditing && (
//                     <div className="flex gap-3">
//                       <button
//                         onClick={handleCancelEdit}
//                         className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium text-sm transition-all flex items-center gap-2"
//                       >
//                         <X className="w-4 h-4" />
//                         Cancel
//                       </button>
//                       <button
//                         onClick={handleSaveProfile}
//                         disabled={isSaving}
//                         className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-medium text-sm shadow-lg shadow-purple-500/30 transition-all flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50"
//                       >
//                         {isSaving ? (
//                           <>
//                             <Loader2 className="w-4 h-4 animate-spin" />
//                             Saving...
//                           </>
//                         ) : saved ? (
//                           <>
//                             <Check className="w-4 h-4" />
//                             Saved!
//                           </>
//                         ) : (
//                           <>
//                             <Save className="w-4 h-4" />
//                             Save Changes
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Form Fields */}
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <label className="block text-sm font-medium text-gray-300">
//                         Full Name
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
//                           <User className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="text"
//                           value={
//                             isEditing
//                               ? tempData.firstName
//                               : profileData.firstName
//                           }
//                           onChange={(e) =>
//                             setTempData((prev) => ({
//                               ...prev,
//                               firstName: e.target.value,
//                             }))
//                           }
//                           disabled={!isEditing}
//                           className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all disabled:opacity-50"
//                           placeholder="Enter your full name"
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <label className="block text-sm font-medium text-gray-300">
//                         Email Address
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
//                           <Mail className="w-4 h-4" />
//                         </div>
//                         <input
//                           type="email"
//                           value={isEditing ? tempData.email : profileData.email}
//                           onChange={(e) =>
//                             setTempData((prev) => ({
//                               ...prev,
//                               email: e.target.value,
//                             }))
//                           }
//                           disabled={!isEditing}
//                           className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all disabled:opacity-50"
//                           placeholder="Enter your email"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Account Info */}
//                   <div className="border-t border-white/10 pt-6">
//                     <h4 className="text-sm font-semibold text-gray-300 mb-3">
//                       Account Information
//                     </h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="bg-white/5 rounded-xl p-4">
//                         <div className="text-xs text-gray-400 mb-1">
//                           Member Since
//                         </div>
//                         <div className="text-sm font-medium">Recent</div>
//                       </div>
//                       <div className="bg-white/5 rounded-xl p-4">
//                         <div className="text-xs text-gray-400 mb-1">
//                           Account Status
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
//                           <span className="text-sm font-medium">Active</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Saved Codes Section */}
//             <div className="relative group">
//               <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20"></div>
//               <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
//                 {/* Section Header */}
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
//                   <div className="flex items-center gap-3 mb-4 sm:mb-0">
//                     <div className="p-2 bg-purple-500/20 rounded-lg">
//                       <Bookmark className="w-5 h-5 text-purple-400" />
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-semibold">Saved Codes</h3>
//                       <p className="text-sm text-gray-400">
//                         Your collection of saved code snippets
//                       </p>
//                     </div>
//                   </div>
//                   <span className="text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-full">
//                     {savedCodes.length} items
//                   </span>
//                 </div>

//                 {/* Codes Grid */}
//                 {savedCodes.length === 0 ? (
//                   <div className="text-center py-12">
//                     <FileCode className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-4" />
//                     <p className="text-gray-400 mb-2">No saved codes yet</p>
//                     <p className="text-sm text-gray-500 max-w-md mx-auto">
//                       Save your favorite code snippets and they will appear here
//                       for easy access
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {savedCodes.map((code) => (
//                       <div
//                         key={code.id}
//                         className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all group/card"
//                       >
//                         <div className="flex items-start justify-between mb-3">
//                           <div>
//                             <h4 className="font-medium text-white mb-2 line-clamp-1">
//                               {code.title}
//                             </h4>
//                             <div className="flex items-center gap-2">
//                               <span className="text-xs px-2 py-1 rounded-full bg-purple-900/30 text-purple-300 border border-purple-500/30">
//                                 {code.language}
//                               </span>
//                               <span className="text-xs text-gray-500">
//                                 {code.savedDate}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
//                             <button
//                               onClick={() => handleCopyCode(code.code)}
//                               className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
//                               title="Copy code"
//                             >
//                               <Copy className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteCode(code.id)}
//                               className="p-1.5 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg transition-colors"
//                               title="Delete"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>

//                         <pre className="text-xs text-gray-400 bg-black/30 p-3 rounded-lg mb-3 font-mono overflow-x-auto whitespace-pre-wrap max-h-32">
//                           {code.code}
//                         </pre>

//                         <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/10">
//                           <div className="flex items-center gap-4">
//                             <span className="flex items-center gap-1.5">
//                               <Eye className="w-3.5 h-3.5" />
//                               {code.views} views
//                             </span>
//                             <span className="flex items-center gap-1.5">
//                               <Clock className="w-3.5 h-3.5" />
//                               {code.savedDate}
//                             </span>
//                           </div>
//                           <button className="text-purple-400 hover:text-purple-300 text-xs font-medium transition-colors flex items-center gap-1">
//                             View Details
//                             <svg
//                               className="w-3 h-3"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M9 5l7 7-7 7"
//                               />
//                             </svg>
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {savedCodes.length > 0 && (
//                   <div className="mt-8 pt-6 border-t border-white/10">
//                     <button className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all flex items-center justify-center gap-2 group">
//                       <FileCode className="w-4 h-4" />
//                       View All Saved Codes
//                       <svg
//                         className="w-4 h-4 group-hover:translate-x-1 transition-transform"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M9 5l7 7-7 7"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Save,
  FileCode,
  Edit2,
  Check,
  X,
  Bookmark,
  Clock,
  Eye,
  Copy,
  Trash2,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Galaxy = () => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
    {[...Array(150)].map((_, i) => (
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

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    firstName: "",
    email: "",
  });
  const [tempData, setTempData] = useState({ ...profileData });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toastId, setToastId] = useState(null);
  const [savedCodes, setSavedCodes] = useState([]);
  const [codesLoading, setCodesLoading] = useState(true);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
            return;
          }
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();

        const mappedData = {
          firstName: data.user.fullName || "",
          email: data.user.email || "",
        };

        setProfileData(mappedData);
        setTempData(mappedData);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (err) {
        console.error("Profile fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    const fetchSavedCodes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:5000/api/viewcode/my-codes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load saved codes");

        const data = await res.json();

        // Map backend data to UI format
        const formatted = data.map((item) => ({
          id: item._id,
          title: item.prompt,
          language: item.language,
          code: item.code,
          savedDate: new Date(item.createdAt).toLocaleDateString(),
          views: Math.floor(Math.random() * 100), // optional
        }));

        setSavedCodes(formatted);
      } catch (err) {
        console.error(err);
        showToast("error", "Failed", "Could not load saved codes");
      } finally {
        setCodesLoading(false);
      }
    };

    fetchSavedCodes();
  }, []);

  const showToast = (type, message, description) => {
    // Dismiss previous toast if exists
    if (toastId) {
      toast.dismiss(toastId);
    }

    const id = toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full ${
            type === "success"
              ? "bg-gradient-to-r from-emerald-900/95 to-green-900/95 border-emerald-500/40"
              : "bg-gradient-to-r from-red-900/95 to-pink-900/95 border-red-500/40"
          } backdrop-blur-xl border rounded-2xl pointer-events-auto flex items-center p-4 shadow-xl`}
        >
          <div className="flex-1 flex items-center">
            <div
              className={`flex-shrink-0 p-2 ${
                type === "success" ? "bg-emerald-500/20" : "bg-red-500/20"
              } rounded-lg`}
            >
              {type === "success" ? (
                <Check className="w-5 h-5 text-emerald-400" />
              ) : (
                <X className="w-5 h-5 text-red-400" />
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-white">{message}</p>
              <p className="mt-1 text-sm opacity-90">{description}</p>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="ml-4 flex-shrink-0 text-gray-300 hover:text-white"
          >
            ✕
          </button>
        </div>
      ),
      {
        duration: 3000,
        position: "top-center",
      },
    );

    setToastId(id);
  };

  const handleSaveProfile = async () => {
    if (!tempData.firstName.trim()) {
      showToast("error", "Validation Error", "First name is required");
      return;
    }

    setIsSaving(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showToast(
          "error",
          "Authentication Required",
          "Please login to continue",
        );
        navigate("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: tempData.firstName,
          email: tempData.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      const updatedProfile = {
        firstName: data.user.fullName || tempData.firstName,
        email: data.user.email || tempData.email,
      };

      setProfileData(updatedProfile);
      setTempData(updatedProfile);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSaved(true);
      setIsEditing(false);

      showToast(
        "success",
        "Profile Updated Successfully",
        "Your changes have been saved",
      );

      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Profile update failed:", error);
      showToast("error", "Update Failed", error.message || "Please try again");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setTempData({ ...profileData });
    setIsEditing(true);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    showToast("success", "Copied to Clipboard", "Code copied successfully");
  };
  const handleDeleteCode = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/viewcode/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSavedCodes((prev) => prev.filter((c) => c.id !== id));
      showToast("success", "Deleted", "Code removed successfully");
    } catch {
      showToast("error", "Error", "Failed to delete code");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden selection:bg-purple-500 selection:text-white">
      <Toaster />

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Galaxy />
      </div>

      <main className="relative z-10 min-h-screen">
        {/* Header Section */}
        <div className="relative pt-24 pb-12 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-2xl shadow-lg shadow-purple-500/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400">
                Profile
              </span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Manage your account and saved codes
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Profile Card */}
              <div className="lg:col-span-1">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative bg-gradient-to-br from-black/50 to-gray-900/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center mb-8">
                      <div className="relative mb-6">
                        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 flex items-center justify-center text-4xl font-bold shadow-2xl shadow-purple-500/40 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                          {profileData.firstName
                            ? profileData.firstName.split(" ").length > 1
                              ? `${profileData.firstName.split(" ")[0][0]}${
                                  profileData.firstName.split(" ")[1][0]
                                }`.toUpperCase()
                              : profileData.firstName.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold mb-2 text-white">
                        {profileData.firstName || "User"}
                      </h2>
                      <p className="text-gray-400 text-sm mb-6">
                        {profileData.email}
                      </p>

                      {!isEditing && (
                        <button
                          onClick={handleEditClick}
                          className="w-full px-6 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl font-semibold shadow-lg shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95"
                        >
                          <Edit2 className="w-5 h-5" />
                          Edit Profile
                        </button>
                      )}
                    </div>

                    {/* Stats Section */}
                    <div className="pt-6 border-t border-white/10">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                          <div className="text-2xl font-bold text-white mb-1">
                            {savedCodes.length}
                          </div>
                          <div className="text-xs text-gray-400">
                            Saved Codes
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Details & Codes */}
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Information Card */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative bg-gradient-to-br from-black/50 to-gray-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/20">
                          <User className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                          Personal Information
                        </h3>
                      </div>
                      {isEditing && (
                        <div className="flex gap-3">
                          <button
                            onClick={handleCancelEdit}
                            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveProfile}
                            disabled={isSaving}
                            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl font-medium text-sm shadow-lg shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSaving ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                              </>
                            ) : saved ? (
                              <>
                                <Check className="w-4 h-4" />
                                Saved!
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                Save Changes
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Full Name
                          </label>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                              <User className="w-5 h-5" />
                            </div>
                            <input
                              type="text"
                              value={
                                isEditing
                                  ? tempData.firstName
                                  : profileData.firstName
                              }
                              onChange={(e) =>
                                setTempData((prev) => ({
                                  ...prev,
                                  firstName: e.target.value,
                                }))
                              }
                              disabled={!isEditing}
                              className="w-full bg-white/5 border border-white/20 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300 disabled:opacity-50"
                              placeholder="Enter your full name"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Email Address
                          </label>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                              <Mail className="w-5 h-5" />
                            </div>
                            <input
                              type="email"
                              value={
                                isEditing ? tempData.email : profileData.email
                              }
                              onChange={(e) =>
                                setTempData((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                              disabled={!isEditing}
                              className="w-full bg-white/5 border border-white/20 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300 disabled:opacity-50"
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Saved Codes Card */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative bg-gradient-to-br from-black/50 to-gray-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/20">
                          <Bookmark className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                          Saved Codes
                        </h3>
                      </div>
                      <span className="text-sm font-medium text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                        {savedCodes.length} Total
                      </span>
                    </div>

                    {codesLoading ? (
                      <div className="text-center py-12">
                        <Loader2 className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-4" />
                        <p className="text-gray-400">Loading saved codes...</p>
                      </div>
                    ) : savedCodes.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-white/10 mb-6">
                          <FileCode className="w-10 h-10 text-gray-600" />
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-2">
                          No Saved Codes Yet
                        </h4>
                        <p className="text-gray-400 max-w-md mx-auto">
                          Save your favorite codes from the AI Code Generator to
                          access them here
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                          {savedCodes.map((code) => (
                            <div
                              key={code.id}
                              className="group/card bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-xl p-5 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h4 className="font-semibold text-white mb-2">
                                    {code.title}
                                  </h4>
                                  <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-900/40 to-blue-900/40 text-purple-300 border border-purple-500/30">
                                    {code.language}
                                  </span>
                                </div>
                                <div className="flex gap-1.5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                  <button
                                    onClick={() => handleCopyCode(code.code)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    title="Copy code"
                                  >
                                    <Copy className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCode(code.id)}
                                    className="p-2 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              <pre className="text-xs text-gray-300 bg-black/40 p-4 rounded-lg mb-4 font-mono overflow-x-auto whitespace-pre-wrap border border-white/5">
                                {code.code}
                              </pre>

                              <div className="flex items-center justify-between text-xs pt-4 border-t border-white/10">
                                <div className="flex items-center gap-4">
                                  <span className="flex items-center gap-1.5 text-gray-400">
                                    <Clock className="w-3.5 h-3.5" />
                                    {code.savedDate}
                                  </span>
                                </div>
                                <button
                                  onClick={() => navigate(`/code/${code.id}`)}
                                  className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors flex items-center gap-1"
                                >
                                  View Details
                                  <span className="text-lg">→</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10">
                          <button className="w-full py-3.5 bg-gradient-to-r from-white/5 to-white/2 hover:from-white/10 hover:to-white/5 border border-white/10 hover:border-purple-500/30 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 group/btn">
                            <FileCode className="w-5 h-5" />
                            View All Saved Codes
                            <span className="text-lg group-hover/btn:translate-x-1 transition-transform">
                              →
                            </span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
