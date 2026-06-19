// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   Copy,
//   Play,
//   Trash2,
//   Check,
//   X,
//   Loader2,
//   Sparkles,
//   Clock,
//   Code2,
//   Terminal,
//   ChevronRight,
// } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// // ── Shared galaxy background ──────────────────────────────────────────────────
// const Galaxy = () => (
//   <div className="absolute inset-0">
//     <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
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
//       />
//     ))}
//   </div>
// );

// // ── Language detection (unchanged from original) ─────────────────────────────
// const detectLanguage = (code) => {
//   if (!code) return "python";
//   const cleaned = code
//     .replace(/^```[a-zA-Z]*\n/, "")
//     .replace(/```$/, "")
//     .trim();
//   if (
//     /#include\s*<iostream>/.test(cleaned) ||
//     /#include\s*<vector>/.test(cleaned) ||
//     /#include\s*<string>/.test(cleaned) ||
//     /\bstd::\w+/.test(cleaned) ||
//     /\busing\s+namespace\s+std\b/.test(cleaned) ||
//     /\bcout\s*<<|\bcin\s*>>/.test(cleaned)
//   )
//     return "cpp";
//   if (
//     /#include\s*<stdio\.h>/.test(cleaned) ||
//     /#include\s*<stdlib\.h>/.test(cleaned) ||
//     /\bprintf\s*\(/.test(cleaned) ||
//     /\bscanf\s*\(/.test(cleaned)
//   )
//     return "c";
//   if (
//     /^\s*def\s+\w+\s*\(/m.test(cleaned) ||
//     /^\s*print\s*\(/m.test(cleaned) ||
//     /^\s*import\s+\w+/m.test(cleaned) ||
//     /^\s*from\s+\w+\s+import\s+/m.test(cleaned)
//   )
//     return "python";
//   if (
//     /\bconsole\.log\s*\(/.test(cleaned) ||
//     /\bfunction\s+\w+\s*\(/.test(cleaned) ||
//     /\b(const|let|var)\s+\w+/.test(cleaned) ||
//     /=>\s*{/.test(cleaned)
//   )
//     return "javascript";
//   return "python";
// };

// function cleanCode(code) {
//   return code
//     .replace(/^```[a-zA-Z]*\n/, "")
//     .replace(/```$/, "")
//     .trim();
// }

// // ── Language badge colours ────────────────────────────────────────────────────
// const langColour = (lang = "") => {
//   const map = {
//     python:
//       "from-yellow-900/40 to-amber-900/40 text-yellow-300 border-yellow-500/30",
//     javascript:
//       "from-yellow-800/40 to-orange-900/40 text-orange-300 border-orange-500/30",
//     cpp: "from-blue-900/40 to-cyan-900/40 text-cyan-300 border-cyan-500/30",
//     c: "from-blue-900/40 to-indigo-900/40 text-indigo-300 border-indigo-500/30",
//   };
//   return (
//     map[lang?.toLowerCase()] ||
//     "from-purple-900/40 to-blue-900/40 text-purple-300 border-purple-500/30"
//   );
// };

// // ── Main component ────────────────────────────────────────────────────────────
// const ViewCodeDetail = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // expects /code/:id route

//   const [codeData, setCodeData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // run-code state
//   const [isRunning, setIsRunning] = useState(false);
//   const [runOutput, setRunOutput] = useState("");
//   const [showRun, setShowRun] = useState(false);

//   // copy state
//   const [copied, setCopied] = useState(false);

//   // delete state
//   const [isDeleting, setIsDeleting] = useState(false);

//   const [toastId, setToastId] = useState(null);

//   // ── Toast helper (same style as Profile) ──────────────────────────────────
//   const showToast = (type, message, description) => {
//     if (toastId) toast.dismiss(toastId);
//     const id = toast.custom(
//       (t) => (
//         <div
//           className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full ${
//             type === "success"
//               ? "bg-gradient-to-r from-emerald-900/95 to-green-900/95 border-emerald-500/40"
//               : "bg-gradient-to-r from-red-900/95 to-pink-900/95 border-red-500/40"
//           } backdrop-blur-xl border rounded-2xl pointer-events-auto flex items-center p-4 shadow-xl`}
//         >
//           <div className="flex-1 flex items-center">
//             <div
//               className={`flex-shrink-0 p-2 ${type === "success" ? "bg-emerald-500/20" : "bg-red-500/20"} rounded-lg`}
//             >
//               {type === "success" ? (
//                 <Check className="w-5 h-5 text-emerald-400" />
//               ) : (
//                 <X className="w-5 h-5 text-red-400" />
//               )}
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-semibold text-white">{message}</p>
//               <p className="mt-1 text-sm opacity-90 text-gray-300">
//                 {description}
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={() => toast.dismiss(t.id)}
//             className="ml-4 flex-shrink-0 text-gray-300 hover:text-white"
//           >
//             ✕
//           </button>
//         </div>
//       ),
//       { duration: 3000, position: "top-center" },
//     );
//     setToastId(id);
//   };

//   // ── Fetch single code ──────────────────────────────────────────────────────
//   useEffect(() => {
//     const fetchCode = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           navigate("/login");
//           return;
//         }

//         const res = await fetch(`http://localhost:5000/api/viewcode/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error("Failed to fetch code");

//         const data = await res.json();
//         setCodeData({
//           id: data._id,
//           title: data.prompt,
//           language: data.language || detectLanguage(data.code),
//           code: data.code,
//           savedDate: new Date(data.createdAt).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//           savedTime: new Date(data.createdAt).toLocaleTimeString("en-US", {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         });
//       } catch (err) {
//         console.error(err);
//         showToast("error", "Error", "Could not load code details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCode();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   // ── Run code ───────────────────────────────────────────────────────────────
//   const handleRun = async () => {
//     if (!codeData?.code) return;
//     setIsRunning(true);
//     setShowRun(false);

//     const language = detectLanguage(codeData.code);
//     const cleanedCode = cleanCode(codeData.code);

//     try {
//       const res = await fetch("http://localhost:5000/api/code/run", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ language, code: cleanedCode }),
//       });
//       const data = await res.json();
//       setRunOutput(
//         `Executing ${language.toUpperCase()} code...\n━━━━━━━━━━━━━━━━━━━━━━\n${data.output}\n━━━━━━━━━━━━━━━━━━━━━━\nExecution time: ${data.executionTime || "N/A"}\nStatus: ${data.status}`,
//       );
//       setShowRun(true);
//     } catch {
//       setRunOutput("❌ Execution failed");
//       setShowRun(true);
//     } finally {
//       setIsRunning(false);
//     }
//   };

//   // ── Copy ───────────────────────────────────────────────────────────────────
//   const handleCopy = () => {
//     if (!codeData?.code) return;
//     navigator.clipboard.writeText(codeData.code);
//     setCopied(true);
//     showToast("success", "Copied!", "Code copied to clipboard");
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // ── Delete ─────────────────────────────────────────────────────────────────
//   const handleDelete = async () => {
//     if (
//       !window.confirm("Delete this saved code? This action cannot be undone.")
//     )
//       return;
//     setIsDeleting(true);
//     try {
//       const token = localStorage.getItem("token");
//       await fetch(`http://localhost:5000/api/viewcode/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       showToast("success", "Deleted", "Code removed successfully");
//       setTimeout(() => navigate("/profile"), 1200);
//     } catch {
//       showToast("error", "Error", "Failed to delete code");
//       setIsDeleting(false);
//     }
//   };

//   // ── Loading state ──────────────────────────────────────────────────────────
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
//           <p className="text-white text-lg">Loading code details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!codeData) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-center">
//           <Code2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
//           <p className="text-white text-xl font-semibold mb-2">
//             Code not found
//           </p>
//           <button
//             onClick={() => navigate("/profile")}
//             className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:opacity-90 transition"
//           >
//             Back to Profile
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const detectedLang = detectLanguage(codeData.code);

//   // ── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden selection:bg-purple-500 selection:text-white">
//       <Toaster />

//       {/* Background */}
//       <div className="fixed inset-0 z-0">
//         <Galaxy />
//       </div>

//       <main className="relative z-10 min-h-screen">
//         {/* ── Header ──────────────────────────────────────────────────────── */}
//         <div className="relative pt-28 pb-8 px-4">
//           <div className="max-w-5xl mx-auto">
//             {/* Breadcrumb */}
//             <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
//               <button
//                 onClick={() => navigate("/profile")}
//                 className="flex items-center gap-1.5 hover:text-purple-400 transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Profile
//               </button>
//               <ChevronRight className="w-4 h-4 opacity-40" />
//               <span className="text-gray-300">Saved Codes</span>
//               <ChevronRight className="w-4 h-4 opacity-40" />
//               <span className="text-white truncate max-w-xs">
//                 {codeData.title}
//               </span>
//             </nav>

//             {/* Title row */}
//             <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
//               <div className="flex items-start gap-4">
//                 <div className="p-3 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-2xl shadow-lg shadow-purple-500/30 mt-1 flex-shrink-0">
//                   <Sparkles className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
//                     {codeData.title}
//                   </h1>
//                   <div className="flex flex-wrap items-center gap-3 mt-3">
//                     <span
//                       className={`text-xs px-3 py-1.5 rounded-full bg-gradient-to-r border font-medium ${langColour(detectedLang)}`}
//                     >
//                       {detectedLang.toUpperCase()}
//                     </span>
//                     <span className="flex items-center gap-1.5 text-xs text-gray-400">
//                       <Clock className="w-3.5 h-3.5" />
//                       {codeData.savedDate} · {codeData.savedTime}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Action buttons */}
//               <div className="flex items-center gap-2 flex-shrink-0">
//                 <button
//                   onClick={handleCopy}
//                   className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-purple-500/40 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
//                 >
//                   {copied ? (
//                     <Check className="w-4 h-4 text-emerald-400" />
//                   ) : (
//                     <Copy className="w-4 h-4" />
//                   )}
//                   {copied ? "Copied!" : "Copy"}
//                 </button>

//                 <button
//                   onClick={handleRun}
//                   disabled={isRunning}
//                   className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-xl text-sm font-semibold shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isRunning ? (
//                     <>
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       Running...
//                     </>
//                   ) : (
//                     <>
//                       <Play className="w-4 h-4" />
//                       Run Code
//                     </>
//                   )}
//                 </button>

//                 <button
//                   onClick={handleDelete}
//                   disabled={isDeleting}
//                   className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isDeleting ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <Trash2 className="w-4 h-4" />
//                   )}
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Content ─────────────────────────────────────────────────────── */}
//         <div className="px-4 sm:px-6 lg:px-8 pb-20">
//           <div className="max-w-5xl mx-auto space-y-6">
//             {/* Code block card */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
//               <div className="relative bg-gradient-to-br from-black/60 to-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
//                 {/* Card header */}
//                 <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
//                   <div className="flex items-center gap-3">
//                     <div className="p-1.5 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/20">
//                       <Code2 className="w-4 h-4 text-purple-400" />
//                     </div>
//                     <span className="text-sm font-semibold text-gray-200">
//                       Source Code
//                     </span>
//                   </div>
//                   {/* Traffic-light dots for "terminal" feel */}
//                   <div className="flex items-center gap-1.5">
//                     <div className="w-3 h-3 rounded-full bg-red-500/60" />
//                     <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
//                     <div className="w-3 h-3 rounded-full bg-green-500/60" />
//                   </div>
//                 </div>

//                 {/* Code */}
//                 <div className="relative">
//                   <pre className="text-sm text-gray-200 font-mono p-6 overflow-x-auto leading-relaxed whitespace-pre">
//                     {cleanCode(codeData.code)}
//                   </pre>
//                 </div>
//               </div>
//             </div>

//             {/* Run Output — same design as the provided snippet */}
//             {showRun && runOutput && (
//               <div
//                 className="relative group"
//                 style={{ animation: "slideDown 0.4s ease-out" }}
//               >
//                 <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-20" />
//                 <div className="relative bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-4 sm:p-6">
//                   <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2 mb-3">
//                     <Terminal className="w-5 h-5" />
//                     Execution Output
//                   </h3>
//                   <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line font-mono bg-black/30 rounded-xl p-4 border border-white/5">
//                     {runOutput}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Running indicator (while waiting) */}
//             {isRunning && (
//               <div className="relative">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-10" />
//                 <div className="relative bg-black/40 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 flex items-center gap-4">
//                   <Loader2 className="w-6 h-6 text-green-400 animate-spin flex-shrink-0" />
//                   <div>
//                     <p className="text-green-300 font-semibold">
//                       Executing code...
//                     </p>
//                     <p className="text-gray-400 text-sm mt-0.5">
//                       Running {detectedLang.toUpperCase()} in a secure sandbox
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       {/* slideDown keyframe */}
//       <style>{`
//         @keyframes slideDown {
//           from { opacity: 0; transform: translateY(-12px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ViewCodeDetail;

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Copy,
  Play,
  Trash2,
  Check,
  X,
  Loader2,
  Sparkles,
  Clock,
  Code2,
  Terminal,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// ── Shared galaxy background ──────────────────────────────────────────────────
const Galaxy = () => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
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
      />
    ))}
  </div>
);

// ── Language detection ───────────────────────────────────────────────────────
const detectLanguage = (code) => {
  if (!code) return "python";
  const cleaned = code
    .replace(/^```[a-zA-Z]*\n/, "")
    .replace(/```$/, "")
    .trim();
  if (
    /#include\s*<iostream>/.test(cleaned) ||
    /#include\s*<vector>/.test(cleaned) ||
    /#include\s*<string>/.test(cleaned) ||
    /\bstd::\w+/.test(cleaned) ||
    /\busing\s+namespace\s+std\b/.test(cleaned) ||
    /\bcout\s*<<|\bcin\s*>>/.test(cleaned)
  )
    return "cpp";
  if (
    /#include\s*<stdio\.h>/.test(cleaned) ||
    /#include\s*<stdlib\.h>/.test(cleaned) ||
    /\bprintf\s*\(/.test(cleaned) ||
    /\bscanf\s*\(/.test(cleaned)
  )
    return "c";
  if (
    /^\s*def\s+\w+\s*\(/m.test(cleaned) ||
    /^\s*print\s*\(/m.test(cleaned) ||
    /^\s*import\s+\w+/m.test(cleaned) ||
    /^\s*from\s+\w+\s+import\s+/m.test(cleaned)
  )
    return "python";
  if (
    /\bconsole\.log\s*\(/.test(cleaned) ||
    /\bfunction\s+\w+\s*\(/.test(cleaned) ||
    /\b(const|let|var)\s+\w+/.test(cleaned) ||
    /=>\s*{/.test(cleaned)
  )
    return "javascript";
  return "python";
};

function cleanCode(code) {
  return code
    .replace(/^```[a-zA-Z]*\n/, "")
    .replace(/```$/, "")
    .trim();
}

// ── Language badge colours ────────────────────────────────────────────────────
const langColour = (lang = "") => {
  const map = {
    python: "bg-yellow-900/20 text-yellow-400 border-yellow-500/30",
    javascript: "bg-orange-900/20 text-orange-400 border-orange-500/30",
    cpp: "bg-cyan-900/20 text-cyan-400 border-cyan-500/30",
    c: "bg-indigo-900/20 text-indigo-400 border-indigo-500/30",
  };
  return (
    map[lang?.toLowerCase()] ||
    "bg-purple-900/20 text-purple-400 border-purple-500/30"
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const ViewCodeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [codeData, setCodeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isRunning, setIsRunning] = useState(false);
  const [runOutput, setRunOutput] = useState("");
  const [showRun, setShowRun] = useState(false);

  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastId, setToastId] = useState(null);

  // ── Toast helper ───────────────────────────────────────────────────────────
  const showToast = (type, message, description) => {
    if (toastId) toast.dismiss(toastId);
    const id = toast.custom(
      (t) => (
        <div
          className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full ${
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
              <p className="mt-1 text-sm opacity-90 text-gray-300">
                {description}
              </p>
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
      { duration: 3000, position: "top-center" },
    );
    setToastId(id);
  };

  // ── Fetch single code ──────────────────────────────────────────────────────
  useEffect(() => {
    const fetchCode = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(`http://localhost:5000/api/viewcode/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch code");

        const data = await res.json();
        setCodeData({
          id: data._id,
          title: data.prompt,
          language: data.language || detectLanguage(data.code),
          code: data.code,
          savedDate: new Date(data.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          savedTime: new Date(data.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      } catch (err) {
        console.error(err);
        showToast("error", "Error", "Could not load code details");
      } finally {
        setLoading(false);
      }
    };
    fetchCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ── Run code ───────────────────────────────────────────────────────────────
  const handleRun = async () => {
    if (!codeData?.code) return;
    setIsRunning(true);
    setShowRun(false);

    const language = detectLanguage(codeData.code);
    const cleanedCode = cleanCode(codeData.code);

    try {
      const res = await fetch("http://localhost:5000/api/code/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code: cleanedCode }),
      });
      const data = await res.json();
      setRunOutput(
        `Executing ${language.toUpperCase()} code...\n━━━━━━━━━━━━━━━━━━━━━━\n${
          data.output
        }\n━━━━━━━━━━━━━━━━━━━━━━\nExecution time: ${
          data.executionTime || "N/A"
        }\nStatus: ${data.status}`,
      );
      setShowRun(true);
    } catch {
      setRunOutput("❌ Execution failed");
      setShowRun(true);
    } finally {
      setIsRunning(false);
    }
  };

  // ── Copy ───────────────────────────────────────────────────────────────────
  const handleCopy = () => {
    if (!codeData?.code) return;
    navigator.clipboard.writeText(codeData.code);
    setCopied(true);
    showToast("success", "Copied!", "Code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (
      !window.confirm("Delete this saved code? This action cannot be undone.")
    )
      return;
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/viewcode/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("success", "Deleted", "Code removed successfully");
      setTimeout(() => navigate("/profile"), 1200);
    } catch {
      showToast("error", "Error", "Failed to delete code");
      setIsDeleting(false);
    }
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading code details...</p>
        </div>
      </div>
    );
  }

  if (!codeData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Code2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-white text-xl font-semibold mb-2">
            Code not found
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:opacity-90 transition"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  const detectedLang = detectLanguage(codeData.code);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden selection:bg-purple-500 selection:text-white">
      <Toaster />

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Galaxy />
      </div>

      <main className="relative z-10 min-h-screen py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Breadcrumb Pill ────────────────────────────────────────────── */}
          <div className="mb-8">
            <nav className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm text-gray-400 shadow-lg">
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-1.5 hover:text-white transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Profile
              </button>
              <ChevronRight className="w-4 h-4 opacity-40" />
              <span className="text-gray-300">Saved Codes</span>
              <ChevronRight className="w-4 h-4 opacity-40" />
              <span className="text-purple-300 font-medium truncate max-w-[120px] sm:max-w-xs">
                {codeData.title}
              </span>
            </nav>
          </div>

          {/* ── Header Area: Title & Actions ─────────────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            {/* Title & Metadata */}
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl mt-1.5 flex-shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                  <Sparkles className="w-7 h-7 text-purple-400" />
                </div>
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white drop-shadow-lg tracking-tight">
                    {codeData.title}
                  </h1>

                  {/* Metadata row */}
                  <div className="flex flex-wrap items-center gap-4">
                    <span
                      className={`text-xs px-3 py-1.5 rounded-lg border font-semibold tracking-wider ${langColour(
                        detectedLang,
                      )}`}
                    >
                      {detectedLang.toUpperCase()}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-gray-600" />
                    <span className="flex items-center gap-1.5 text-sm font-medium text-gray-400">
                      <Clock className="w-4 h-4" />
                      {codeData.savedDate} at {codeData.savedTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Group */}
            <div className="flex flex-wrap items-center gap-3 lg:flex-shrink-0 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 px-5 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>

              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl text-white text-sm font-bold shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    Run Code
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ── Content Area: Source Code & Output ────────────────────────── */}
          <div className="space-y-8">
            {/* Code block card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
              <div className="relative bg-[#0d0d12]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Code Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <Code2 className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-300">
                      Source Code
                    </span>
                  </div>
                  {/* MacOS style dots */}
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                  </div>
                </div>

                {/* Code Body */}
                <div className="relative">
                  <pre className="text-[15px] text-gray-300 font-mono p-6 sm:p-8 overflow-x-auto leading-relaxed whitespace-pre">
                    {cleanCode(codeData.code)}
                  </pre>
                </div>
              </div>
            </div>

            {/* Run Output */}
            {showRun && runOutput && (
              <div
                className="relative group"
                style={{ animation: "slideDown 0.4s ease-out" }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-20" />
                <div className="relative bg-[#0d0d12]/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Output Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-500/20 bg-emerald-500/[0.02]">
                    <h3 className="text-[15px] font-semibold text-emerald-400 flex items-center gap-2">
                      <Terminal className="w-5 h-5" />
                      Execution Output
                    </h3>
                  </div>

                  {/* Output Body */}
                  <div className="p-6 sm:p-8">
                    <div className="text-gray-300 text-[15px] leading-relaxed whitespace-pre-line font-mono bg-black/50 rounded-xl p-6 border border-white/5">
                      {runOutput}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Running indicator (while waiting) */}
            {isRunning && (
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-15" />
                <div className="relative bg-[#0d0d12]/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-8 flex items-center gap-5 shadow-2xl">
                  <div className="p-3 bg-emerald-500/10 rounded-full">
                    <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                  </div>
                  <div>
                    <p className="text-lg text-emerald-400 font-bold mb-1">
                      Executing in sandbox...
                    </p>
                    <p className="text-gray-400 text-sm font-medium">
                      Running {detectedLang.toUpperCase()} environment
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* slideDown keyframe */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ViewCodeDetail;
