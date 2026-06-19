// import React, { useState } from "react";
// import {
//   Code2,
//   Sparkles,
//   Send,
//   FileCode,
//   Bug,
//   Play,
//   Copy,
//   Check,
//   BookOpen,
// } from "lucide-react";
// import { Bookmark } from "lucide-react";
// import { formatResponse } from "../Utils/formatResponse";

// // Galaxy Component (simplified version - replace with your actual component)
// const Galaxy = ({ mouseRepulsion, density, glowIntensity, hueShift }) => {
//   return (
//     <div className="absolute inset-0">
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
//       {[...Array(150)].map((_, i) => (
//         <div
//           key={i}
//           className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             opacity: Math.random() * 0.7,
//             animationDelay: `${Math.random() * 3}s`,
//           }}
//         ></div>
//       ))}
//     </div>
//   );
// };

// const Codegenerator = () => {
//   const [prompt, setPrompt] = useState("");
//   const [generatedCode, setGeneratedCode] = useState("");
//   const [explanation, setExplanation] = useState("");
//   const [debugOutput, setDebugOutput] = useState("");
//   const [runOutput, setRunOutput] = useState("");
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isDebugging, setIsDebugging] = useState(false);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isExplaining, setIsExplaining] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [showExplanation, setShowExplanation] = useState(false);
//   const [showDebug, setShowDebug] = useState(false);
//   const [showRun, setShowRun] = useState(false);
//   const [isSavingCode, setIsSavingCode] = useState(false);
//   const [savedOnce, setSavedOnce] = useState(false);

//   const handleGenerate = async () => {
//     if (!prompt.trim()) return;

//     setIsGenerating(true);
//     setGeneratedCode("");
//     setExplanation("");
//     setDebugOutput("");
//     setRunOutput("");
//     setShowExplanation(false);
//     setShowDebug(false);
//     setShowRun(false);

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/generate/codegeneration",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             message: prompt,
//             model: "moonshotai/Kimi-K2-Thinking:together",
//           }),
//         },
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || "Failed to generate code");
//       }

//       const data = await response.json();

//       // Expecting AI-generated code in `response`
//       setGeneratedCode(data.response || "No code generated.");
//     } catch (error) {
//       console.error("Code generation error:", error);
//       setGeneratedCode("// ❌ Error generating code\n// " + error.message);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleExplain = async () => {
//     if (!generatedCode) return;

//     setIsExplaining(true);
//     setShowExplanation(false);

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/generate/explain",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             message: `Explain the following code step by step in simple terms:\n\n${generatedCode}`,
//           }),
//         },
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || "Failed to generate explanation");
//       }

//       const data = await response.json();

//       setExplanation(data.response || "No explanation generated.");
//       setShowExplanation(true);
//     } catch (error) {
//       console.error("Explanation error:", error);
//       setExplanation("❌ Failed to generate explanation.\n" + error.message);
//       setShowExplanation(true);
//     } finally {
//       setIsExplaining(false);
//     }
//   };

//   const handleDebug = async () => {
//     if (!generatedCode) return;

//     setIsDebugging(true);
//     setShowDebug(false);

//     try {
//       const response = await fetch("http://localhost:5000/api/generate/debug", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           message: `Analyze and debug the following code.
// Check syntax, logic, edge cases, performance, and provide suggestions.
// Do NOT execute the code. Static analysis only.

// ${generatedCode}`,
//         }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || "Failed to debug code");
//       }

//       const data = await response.json();

//       setDebugOutput(data.response || "No debug output generated.");
//       setShowDebug(true);
//     } catch (error) {
//       console.error("Debug error:", error);
//       setDebugOutput("❌ Debugging failed.\n" + error.message);
//       setShowDebug(true);
//     } finally {
//       setIsDebugging(false);
//     }
//   };

//   // const detectLanguage = (code) => {
//   //   const cleaned = code.trim();

//   //   // C++
//   //   if (
//   //     /#include\s*<.*>/.test(cleaned) ||
//   //     /\busing\s+namespace\s+std\b/.test(cleaned) ||
//   //     /\bint\s+main\s*\(/.test(cleaned)
//   //   ) {
//   //     return "cpp";
//   //   }

//   //   // Python
//   //   if (
//   //     /\bdef\s+\w+\s*\(/.test(cleaned) ||
//   //     /\bprint\s*\(/.test(cleaned) ||
//   //     /\bimport\s+\w+/.test(cleaned)
//   //   ) {
//   //     return "python";
//   //   }

//   //   // JavaScript
//   //   if (
//   //     /\bconsole\.log\s*\(/.test(cleaned) ||
//   //     /\bfunction\s+\w+\s*\(/.test(cleaned) ||
//   //     /\b(const|let|var)\s+\w+/.test(cleaned)
//   //   ) {
//   //     return "javascript";
//   //   }

//   //   // Default fallback
//   //   return "python";
//   // };
//   //updated detectLanguage function

//   const detectLanguage = (code) => {
//     if (!code) return "python";

//     // Remove markdown fences if present
//     const cleaned = code
//       .replace(/^```[a-zA-Z]*\n/, "")
//       .replace(/```$/, "")
//       .trim();

//     /* ---------------- C++ ---------------- */
//     if (
//       /#include\s*<iostream>/.test(cleaned) ||
//       /#include\s*<vector>/.test(cleaned) ||
//       /#include\s*<string>/.test(cleaned) ||
//       /\bstd::\w+/.test(cleaned) ||
//       /\busing\s+namespace\s+std\b/.test(cleaned) ||
//       /\bcout\s*<<|\bcin\s*>>/.test(cleaned)
//     ) {
//       return "cpp";
//     }

//     /* ---------------- C ---------------- */
//     if (
//       /#include\s*<stdio\.h>/.test(cleaned) ||
//       /#include\s*<stdlib\.h>/.test(cleaned) ||
//       /\bprintf\s*\(/.test(cleaned) ||
//       /\bscanf\s*\(/.test(cleaned)
//     ) {
//       return "c";
//     }

//     /* ---------------- Python ---------------- */
//     if (
//       /^\s*def\s+\w+\s*\(/m.test(cleaned) ||
//       /^\s*print\s*\(/m.test(cleaned) ||
//       /^\s*import\s+\w+/m.test(cleaned) ||
//       /^\s*from\s+\w+\s+import\s+/m.test(cleaned)
//     ) {
//       return "python";
//     }

//     /* ---------------- JavaScript ---------------- */
//     if (
//       /\bconsole\.log\s*\(/.test(cleaned) ||
//       /\bfunction\s+\w+\s*\(/.test(cleaned) ||
//       /\b(const|let|var)\s+\w+/.test(cleaned) ||
//       /=>\s*{/.test(cleaned)
//     ) {
//       return "javascript";
//     }

//     /* ---------------- Fallback ---------------- */
//     return "python";
//   };

//   function cleanCode(code) {
//     return code
//       .replace(/^```[a-zA-Z]*\n/, "")
//       .replace(/```$/, "")
//       .trim();
//   }

//   const handleRun = async () => {
//     if (!generatedCode) return;

//     setIsRunning(true);
//     setShowRun(false);

//     const language = detectLanguage(generatedCode);
//     const cleanedCode = cleanCode(generatedCode);

//     try {
//       const res = await fetch("http://localhost:5000/api/code/run", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           language,
//           code: cleanedCode,
//         }),
//       });

//       const data = await res.json();

//       setRunOutput(
//         `Executing ${language.toUpperCase()} code...
// ━━━━━━━━━━━━━━━━━━━━━━
// ${data.output}
// ━━━━━━━━━━━━━━━━━━━━━━
// Execution time: ${data.executionTime || "N/A"}
// Status: ${data.status}`,
//       );

//       setShowRun(true);
//     } catch (err) {
//       setRunOutput("❌ Execution failed");
//       setShowRun(true);
//     } finally {
//       setIsRunning(false);
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(generatedCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleSaveCode = async () => {
//     if (!generatedCode || !prompt) return;

//     setIsSavingCode(true);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("Please login to save code");
//         return;
//       }

//       const language = detectLanguage(generatedCode);
//       const cleanedCode = cleanCode(generatedCode);

//       const res = await fetch("http://localhost:5000/api/viewcode/save", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           prompt,
//           language,
//           code: cleanedCode,
//         }),
//       });

//       if (!res.ok) throw new Error("Save failed");

//       setSavedOnce(true);
//       setTimeout(() => setSavedOnce(false), 2000);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save code");
//     } finally {
//       setIsSavingCode(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && e.ctrlKey && !isGenerating) {
//       handleGenerate();
//     }
//   };

//   return (
//     <div className="relative w-full min-h-screen bg-black text-white overflow-hidden selection:bg-purple-500 selection:text-white p-16">
//       {/* Fixed Background */}
//       <div className="fixed inset-0 z-0">
//         <Galaxy
//           mouseRepulsion={false}
//           density={1.2}
//           glowIntensity={0.4}
//           hueShift={270}
//         />
//       </div>

//       {/* Main Content */}
//       <main className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-8 sm:mb-12 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
//             <div className="flex justify-center mb-4">
//               <div className="p-4 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-3xl shadow-lg shadow-purple-500/30">
//                 <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
//               </div>
//             </div>
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
//               AI{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
//                 Code Generator
//               </span>
//             </h1>
//             <p className="text-gray-400 text-sm sm:text-base">
//               Describe your code, and let AI bring it to life
//             </p>
//           </div>

//           {/* Input Section */}
//           <div className="mb-6 sm:mb-8 opacity-0 animate-[fadeIn_0.6s_ease-out_0.1s_forwards]">
//             <div className="relative group">
//               <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
//               <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
//                 <label className="block text-sm font-medium text-gray-300 mb-3">
//                   <FileCode className="w-4 h-4 inline mr-2" />
//                   Describe Your Code
//                 </label>
//                 <textarea
//                   value={prompt}
//                   onChange={(e) => setPrompt(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="E.g., Create a function that generates Fibonacci sequence..."
//                   className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 resize-none h-32 sm:h-40"
//                 />
//                 <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
//                   <p className="text-xs text-gray-500">
//                     Press Ctrl + Enter to generate
//                   </p>
//                   <button
//                     onClick={handleGenerate}
//                     disabled={!prompt.trim() || isGenerating}
//                     className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold shadow-lg shadow-purple-500/30 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
//                   >
//                     {isGenerating ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                         Generating...
//                       </>
//                     ) : (
//                       <>
//                         <Sparkles className="w-4 h-4" />
//                         Generate Code
//                         <Send className="w-4 h-4" />
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Generated Code Section */}
//           {generatedCode && (
//             <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
//               {/* Code Display */}
//               <div className="relative group">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
//                 <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-semibold text-purple-300 flex items-center gap-2">
//                       <Code2 className="w-5 h-5" />
//                       Generated Code
//                     </h3>

//                     <div className="flex gap-2">
//                       <button
//                         onClick={handleSaveCode}
//                         disabled={isSavingCode}
//                         className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all flex items-center gap-2 text-sm hover:scale-105 active:scale-95 disabled:opacity-50"
//                       >
//                         {savedOnce ? (
//                           <>
//                             <Check className="w-4 h-4 text-green-400" />
//                             Saved
//                           </>
//                         ) : (
//                           <>
//                             <Bookmark className="w-4 h-4" />
//                             Save
//                           </>
//                         )}
//                       </button>

//                       <button
//                         onClick={handleCopy}
//                         className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all flex items-center gap-2 text-sm hover:scale-105 active:scale-95"
//                       >
//                         {copied ? (
//                           <>
//                             <Check className="w-4 h-4 text-green-400" />
//                             Copied!
//                           </>
//                         ) : (
//                           <>
//                             <Copy className="w-4 h-4" />
//                             Copy
//                           </>
//                         )}
//                       </button>
//                     </div>

//                     {/* <button
//                       onClick={handleCopy}
//                       className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all flex items-center gap-2 text-sm hover:scale-105 active:scale-95"
//                     >
//                       {copied ? (
//                         <>
//                           <Check className="w-4 h-4 text-green-400" />
//                           Copied!
//                         </>
//                       ) : (
//                         <>
//                           <Copy className="w-4 h-4" />
//                           Copy
//                         </>
//                       )}
//                     </button> */}
//                   </div>
//                   <pre className="bg-black/50 rounded-xl p-4 overflow-x-auto border border-white/5">
//                     <code className="text-sm text-gray-300 font-mono">
//                       {generatedCode}
//                     </code>
//                   </pre>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <button
//                   onClick={handleExplain}
//                   disabled={isExplaining}
//                   className="group px-6 py-4 bg-gradient-to-br from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/30 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105 active:scale-95"
//                 >
//                   {isExplaining ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       Explaining...
//                     </>
//                   ) : (
//                     <>
//                       <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
//                       Explain Code
//                     </>
//                   )}
//                 </button>

//                 <button
//                   onClick={handleDebug}
//                   disabled={isDebugging}
//                   className="group px-6 py-4 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 hover:from-yellow-600/30 hover:to-orange-600/30 border border-yellow-500/30 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105 active:scale-95"
//                 >
//                   {isDebugging ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       Debugging...
//                     </>
//                   ) : (
//                     <>
//                       <Bug className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                       Debug Code
//                     </>
//                   )}
//                 </button>

//                 <button
//                   onClick={handleRun}
//                   disabled={isRunning}
//                   className="group px-6 py-4 bg-gradient-to-br from-green-600/20 to-emerald-600/20 hover:from-green-600/30 hover:to-emerald-600/30 border border-green-500/30 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105 active:scale-95"
//                 >
//                   {isRunning ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       Running...
//                     </>
//                   ) : (
//                     <>
//                       <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                       Run Code
//                     </>
//                   )}
//                 </button>
//               </div>

//               {/* Explanation Output */}
//               {showExplanation && explanation && (
//                 <div className="relative group animate-[slideDown_0.4s_ease-out]">
//                   <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20"></div>
//                   <div className="relative bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-4 sm:p-6">
//                     <h3 className="text-lg font-semibold text-blue-300 flex items-center gap-2 mb-3">
//                       <BookOpen className="w-5 h-5" />
//                       Code Explanation
//                     </h3>
//                     {/* <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line bg-black/30 rounded-xl p-4 border border-white/5">
//                       {explanation}
//                     </div> */}
//                     <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line bg-black/30 rounded-xl p-4 border border-white/5">
//                       {formatResponse(explanation)}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Debug Output */}
//               {showDebug && debugOutput && (
//                 <div className="relative group animate-[slideDown_0.4s_ease-out]">
//                   <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl blur opacity-20"></div>
//                   <div className="relative bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-4 sm:p-6">
//                     <h3 className="text-lg font-semibold text-yellow-300 flex items-center gap-2 mb-3">
//                       <Bug className="w-5 h-5" />
//                       Debug Analysis
//                     </h3>
//                     {/* <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line font-mono bg-black/30 rounded-xl p-4 border border-white/5">
//                       {debugOutput}
//                     </div> */}
//                     <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line font-mono bg-black/30 rounded-xl p-4 border border-white/5">
//                       {formatResponse(debugOutput)}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Run Output */}
//               {showRun && runOutput && (
//                 <div className="relative group animate-[slideDown_0.4s_ease-out]">
//                   <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-20"></div>
//                   <div className="relative bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-4 sm:p-6">
//                     <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2 mb-3">
//                       <Play className="w-5 h-5" />
//                       Execution Output
//                     </h3>
//                     <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line font-mono bg-black/30 rounded-xl p-4 border border-white/5">
//                       {runOutput}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </main>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             max-height: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             max-height: 1000px;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Codegenerator;

//new with streaming response

import React, { useState, useEffect, useRef } from "react";
import {
  Code2,
  Sparkles,
  Send,
  FileCode,
  Bug,
  Play,
  Copy,
  Check,
  BookOpen,
} from "lucide-react";
import { Bookmark } from "lucide-react";
import { formatResponse } from "../Utils/formatResponse";

// Galaxy Component (simplified version - replace with your actual component)
const Galaxy = ({ mouseRepulsion, density, glowIntensity, hueShift }) => {
  return (
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
};

// Custom hook for streaming text animation
const useStreamingText = (text, speed = 8, isActive = true) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const textRef = useRef(text);

  useEffect(() => {
    textRef.current = text;
    if (!isActive || !text) {
      setDisplayedText(text || "");
      setIsComplete(true);
      return;
    }

    setIsComplete(false);
    indexRef.current = 0;
    setDisplayedText("");

    const streamText = () => {
      if (indexRef.current < textRef.current.length) {
        const nextChar = textRef.current[indexRef.current];
        setDisplayedText((prev) => prev + nextChar);
        indexRef.current++;

        // Variable typing speed for natural feel
        const variableSpeed = speed + (Math.random() * 10 - 5);
        setTimeout(streamText, Math.max(1, variableSpeed));
      } else {
        setIsComplete(true);
      }
    };

    const timeoutId = setTimeout(streamText, 100);
    return () => clearTimeout(timeoutId);
  }, [text, speed, isActive]);

  return { displayedText, isComplete };
};

// Streaming cursor component with cosmic glow
const StreamingCursor = ({ color = "purple" }) => {
  const colorClasses = {
    purple: "bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]",
    blue: "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]",
    yellow: "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]",
    green: "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]",
  };

  return (
    <span
      className={`inline-block w-2 h-5 ml-1 ${colorClasses[color]} animate-pulse rounded-sm`}
    />
  );
};

const Codegenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [debugOutput, setDebugOutput] = useState("");
  const [runOutput, setRunOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDebugging, setIsDebugging] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [showRun, setShowRun] = useState(false);
  const [isSavingCode, setIsSavingCode] = useState(false);
  const [savedOnce, setSavedOnce] = useState(false);

  // Streaming states
  const [streamCode, setStreamCode] = useState("");
  const [streamExplanation, setStreamExplanation] = useState("");
  const [streamDebug, setStreamDebug] = useState("");
  const [isStreamingCode, setIsStreamingCode] = useState(false);
  const [isStreamingExplanation, setIsStreamingExplanation] = useState(false);
  const [isStreamingDebug, setIsStreamingDebug] = useState(false);

  // Refs for streaming control
  const abortControllerRef = useRef(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedCode("");
    setStreamCode("");
    setExplanation("");
    setStreamExplanation("");
    setDebugOutput("");
    setStreamDebug("");
    setRunOutput("");
    setShowExplanation(false);
    setShowDebug(false);
    setShowRun(false);
    setIsStreamingCode(true);

    // Cancel any existing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(
        "http://localhost:5000/api/generate/codegeneration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: prompt,
            model: "moonshotai/Kimi-K2-Thinking:novita",
          }),
          signal: abortControllerRef.current.signal,
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to generate code");
      }

      const data = await response.json();
      const fullCode = data.response || "No code generated.";

      // Stream the code character by character
      let currentIndex = 0;
      const streamInterval = setInterval(() => {
        if (currentIndex < fullCode.length) {
          const chunkSize = Math.floor(Math.random() * 3) + 1; // 1-3 characters per frame
          const nextChunk = fullCode.slice(
            currentIndex,
            currentIndex + chunkSize,
          );
          setStreamCode((prev) => prev + nextChunk);
          currentIndex += chunkSize;
        } else {
          clearInterval(streamInterval);
          setGeneratedCode(fullCode);
          setIsStreamingCode(false);
          setIsGenerating(false);
        }
      }, 15); // Base speed for code generation
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error("Code generation error:", error);
      const errorMsg = "// ❌ Error generating code\n// " + error.message;
      setStreamCode(errorMsg);
      setGeneratedCode(errorMsg);
      setIsStreamingCode(false);
      setIsGenerating(false);
    }
  };

  const handleExplain = async () => {
    if (!generatedCode) return;

    setIsExplaining(true);
    setShowExplanation(true);
    setStreamExplanation("");
    setIsStreamingExplanation(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/generate/explain",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Explain the following code step by step in simple terms:\n\n${generatedCode}`,
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to generate explanation");
      }

      const data = await response.json();
      const fullExplanation = data.response || "No explanation generated.";

      // Stream explanation with natural typing speed
      let currentIndex = 0;
      const streamInterval = setInterval(() => {
        if (currentIndex < fullExplanation.length) {
          // Variable chunk size for natural reading pace
          const chunkSize = Math.random() > 0.7 ? 2 : 1;
          const nextChunk = fullExplanation.slice(
            currentIndex,
            currentIndex + chunkSize,
          );
          setStreamExplanation((prev) => prev + nextChunk);
          currentIndex += chunkSize;
        } else {
          clearInterval(streamInterval);
          setExplanation(fullExplanation);
          setIsStreamingExplanation(false);
          setIsExplaining(false);
        }
      }, 25); // Slower speed for readable explanation
    } catch (error) {
      console.error("Explanation error:", error);
      const errorMsg = "❌ Failed to generate explanation.\n" + error.message;
      setStreamExplanation(errorMsg);
      setExplanation(errorMsg);
      setIsStreamingExplanation(false);
      setIsExplaining(false);
    }
  };

  const handleDebug = async () => {
    if (!generatedCode) return;

    setIsDebugging(true);
    setShowDebug(true);
    setStreamDebug("");
    setIsStreamingDebug(true);

    try {
      const response = await fetch("http://localhost:5000/api/generate/debug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Analyze and debug the following code.
Check syntax, logic, edge cases, performance, and provide suggestions.
Do NOT execute the code. Static analysis only.

${generatedCode}`,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to debug code");
      }

      const data = await response.json();
      const fullDebug = data.response || "No debug output generated.";

      // Stream debug output with technical pacing
      let currentIndex = 0;
      const streamInterval = setInterval(() => {
        if (currentIndex < fullDebug.length) {
          const chunkSize = Math.floor(Math.random() * 2) + 1;
          const nextChunk = fullDebug.slice(
            currentIndex,
            currentIndex + chunkSize,
          );
          setStreamDebug((prev) => prev + nextChunk);
          currentIndex += chunkSize;
        } else {
          clearInterval(streamInterval);
          setDebugOutput(fullDebug);
          setIsStreamingDebug(false);
          setIsDebugging(false);
        }
      }, 20); // Medium speed for technical content
    } catch (error) {
      console.error("Debug error:", error);
      const errorMsg = "❌ Debugging failed.\n" + error.message;
      setStreamDebug(errorMsg);
      setDebugOutput(errorMsg);
      setIsStreamingDebug(false);
      setIsDebugging(false);
    }
  };

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
    ) {
      return "cpp";
    }

    if (
      /#include\s*<stdio\.h>/.test(cleaned) ||
      /#include\s*<stdlib\.h>/.test(cleaned) ||
      /\bprintf\s*\(/.test(cleaned) ||
      /\bscanf\s*\(/.test(cleaned)
    ) {
      return "c";
    }

    if (
      /^\s*def\s+\w+\s*\(/m.test(cleaned) ||
      /^\s*print\s*\(/m.test(cleaned) ||
      /^\s*import\s+\w+/m.test(cleaned) ||
      /^\s*from\s+\w+\s+import\s+/m.test(cleaned)
    ) {
      return "python";
    }

    if (
      /\bconsole\.log\s*\(/.test(cleaned) ||
      /\bfunction\s+\w+\s*\(/.test(cleaned) ||
      /\b(const|let|var)\s+\w+/.test(cleaned) ||
      /=>\s*{/.test(cleaned)
    ) {
      return "javascript";
    }

    return "python";
  };

  function cleanCode(code) {
    return code
      .replace(/^```[a-zA-Z]*\n/, "")
      .replace(/```$/, "")
      .trim();
  }

  const handleRun = async () => {
    if (!generatedCode) return;

    setIsRunning(true);
    setShowRun(false);

    const language = detectLanguage(generatedCode);
    const cleanedCode = cleanCode(generatedCode);

    try {
      const res = await fetch("http://localhost:5000/api/code/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          code: cleanedCode,
        }),
      });

      const data = await res.json();

      setRunOutput(
        `Executing ${language.toUpperCase()} code...
━━━━━━━━━━━━━━━━━━━━━━
${data.output}
━━━━━━━━━━━━━━━━━━━━━━
Execution time: ${data.executionTime || "N/A"}
Status: ${data.status}`,
      );

      setShowRun(true);
    } catch (err) {
      setRunOutput("❌ Execution failed");
      setShowRun(true);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode || streamCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveCode = async () => {
    const codeToSave = generatedCode || streamCode;
    if (!codeToSave || !prompt) return;

    setIsSavingCode(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to save code");
        return;
      }

      const language = detectLanguage(codeToSave);
      const cleanedCode = cleanCode(codeToSave);

      const res = await fetch("http://localhost:5000/api/viewcode/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt,
          language,
          code: cleanedCode,
        }),
      });

      if (!res.ok) throw new Error("Save failed");

      setSavedOnce(true);
      setTimeout(() => setSavedOnce(false), 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to save code");
    } finally {
      setIsSavingCode(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey && !isGenerating) {
      handleGenerate();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden selection:bg-purple-500 selection:text-white p-16">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0">
        <Galaxy
          mouseRepulsion={false}
          density={1.2}
          glowIntensity={0.4}
          hueShift={270}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-3xl shadow-lg shadow-purple-500/30">
                <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              AI{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Code Generator
              </span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Describe your code, and let AI bring it to life
            </p>
          </div>

          {/* Input Section */}
          <div className="mb-6 sm:mb-8 opacity-0 animate-[fadeIn_0.6s_ease-out_0.1s_forwards]">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  <FileCode className="w-4 h-4 inline mr-2" />
                  Describe Your Code
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="E.g., Create a function that generates Fibonacci sequence..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 resize-none h-32 sm:h-40"
                />
                <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                  <p className="text-xs text-gray-500">
                    Press Ctrl + Enter to generate
                  </p>
                  <button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold shadow-lg shadow-purple-500/30 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Code
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Generated Code Section */}
          {(generatedCode || streamCode || isStreamingCode) && (
            <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
              {/* Code Display */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-purple-300 flex items-center gap-2">
                      <Code2 className="w-5 h-5" />
                      Generated Code
                      {isStreamingCode && (
                        <span className="text-xs px-2 py-1 bg-purple-500/20 rounded-full text-purple-300 animate-pulse">
                          Streaming...
                        </span>
                      )}
                    </h3>

                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveCode}
                        disabled={
                          isSavingCode || (!generatedCode && !streamCode)
                        }
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all flex items-center gap-2 text-sm hover:scale-105 active:scale-95 disabled:opacity-50"
                      >
                        {savedOnce ? (
                          <>
                            <Check className="w-4 h-4 text-green-400" />
                            Saved
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-4 h-4" />
                            Save
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleCopy}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all flex items-center gap-2 text-sm hover:scale-105 active:scale-95"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-green-400" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="bg-black/50 rounded-xl p-4 overflow-x-auto border border-white/5 relative">
                    <code className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
                      {streamCode || generatedCode}
                      {isStreamingCode && <StreamingCursor color="purple" />}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={handleExplain}
                  disabled={
                    isExplaining ||
                    (!generatedCode && !streamCode) ||
                    isStreamingCode
                  }
                  className="group px-6 py-4 bg-gradient-to-br from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/30 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105 active:scale-95"
                >
                  {isExplaining ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Explaining...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      Explain Code
                    </>
                  )}
                </button>

                <button
                  onClick={handleDebug}
                  disabled={
                    isDebugging ||
                    (!generatedCode && !streamCode) ||
                    isStreamingCode
                  }
                  className="group px-6 py-4 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 hover:from-yellow-600/30 hover:to-orange-600/30 border border-yellow-500/30 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105 active:scale-95"
                >
                  {isDebugging ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Debugging...
                    </>
                  ) : (
                    <>
                      <Bug className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Debug Code
                    </>
                  )}
                </button>

                <button
                  onClick={handleRun}
                  disabled={
                    isRunning ||
                    (!generatedCode && !streamCode) ||
                    isStreamingCode
                  }
                  className="group px-6 py-4 bg-gradient-to-br from-green-600/20 to-emerald-600/20 hover:from-green-600/30 hover:to-emerald-600/30 border border-green-500/30 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105 active:scale-95"
                >
                  {isRunning ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      Run Code
                    </>
                  )}
                </button>
              </div>

              {/* Explanation Output */}
              {showExplanation && (explanation || streamExplanation) && (
                <div className="relative group animate-[slideDown_0.4s_ease-out]">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20"></div>
                  <div className="relative bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-blue-300 flex items-center gap-2 mb-3">
                      <BookOpen className="w-5 h-5" />
                      Code Explanation
                      {isStreamingExplanation && (
                        <span className="text-xs px-2 py-1 bg-blue-500/20 rounded-full text-blue-300 animate-pulse">
                          Typing...
                        </span>
                      )}
                    </h3>
                    <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line bg-black/30 rounded-xl p-4 border border-white/5 min-h-[100px]">
                      {formatResponse(streamExplanation || explanation)}
                      {isStreamingExplanation && (
                        <StreamingCursor color="blue" />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Debug Output */}
              {showDebug && (debugOutput || streamDebug) && (
                <div className="relative group animate-[slideDown_0.4s_ease-out]">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl blur opacity-20"></div>
                  <div className="relative bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-yellow-300 flex items-center gap-2 mb-3">
                      <Bug className="w-5 h-5" />
                      Debug Analysis
                      {isStreamingDebug && (
                        <span className="text-xs px-2 py-1 bg-yellow-500/20 rounded-full text-yellow-300 animate-pulse">
                          Analyzing...
                        </span>
                      )}
                    </h3>
                    <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line font-mono bg-black/30 rounded-xl p-4 border border-white/5 min-h-[100px]">
                      {formatResponse(streamDebug || debugOutput)}
                      {isStreamingDebug && <StreamingCursor color="yellow" />}
                    </div>
                  </div>
                </div>
              )}

              {/* Run Output */}
              {showRun && runOutput && (
                <div className="relative group animate-[slideDown_0.4s_ease-out]">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-20"></div>
                  <div className="relative bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2 mb-3">
                      <Play className="w-5 h-5" />
                      Execution Output
                    </h3>
                    <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line font-mono bg-black/30 rounded-xl p-4 border border-white/5">
                      {runOutput}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 1000px;
            transform: translateY(0);
          }
        }
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Codegenerator;
