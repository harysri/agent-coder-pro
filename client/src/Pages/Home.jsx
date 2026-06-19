import React from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Play,
  Wrench,
  Code2,
  Cpu,
  ChevronRight,
  Layers,
  Zap,
} from "lucide-react";
import GlassSurface from "../Components/GlassSurface";
import ASCIIText from "../Components/ASCIIText";
import SplashCursor from "../Components/SplashCursor";
import { Link } from "react-router-dom";
const Home = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

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

  // Add this array before the return statement in your Home component:
  const featureCards = [
    {
      icon: <Terminal className="w-10 h-10 text-blue-400" />,
      title: "Text to Code",
      description:
        "Simply type 'Create a calculator in Python' and watch the agent write clean, executable code instantly.",
      gradient: "from-blue-500/20 to-cyan-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      icon: <Wrench className="w-10 h-10 text-green-400" />,
      title: "Auto-Fix & Debug",
      description:
        "Paste broken code and let Agent Coder Pro identify errors, fix syntax, and optimize performance.",
      gradient: "from-green-500/20 to-emerald-500/10",
      borderColor: "border-green-500/30",
    },
    {
      icon: <Play className="w-10 h-10 text-red-400" />,
      title: "Live Execution",
      description:
        "Don't just read it—run it. Execute Python and JS code directly in the browser sandbox.",
      gradient: "from-red-500/20 to-pink-500/10",
      borderColor: "border-red-500/30",
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden selection:bg-purple-500 selection:text-white pt-16">
      <SplashCursor />
      {/* ---------------------------------------------------- */}
      {/* 1. BACKGROUND LAYER (Galaxy)                         */}
      {/* ---------------------------------------------------- */}
      {/* <div className="fixed inset-0 z-0">
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.6}
          saturation={0.8}
          hueShift={260} // Purple/Blue shift to match theme
        />
      </div> */}

      <div className="fixed inset-0 z-0">
        <Galaxy
          mouseRepulsion={false}
          density={1.2}
          glowIntensity={0.4}
          hueShift={270}
        />
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. SCROLLABLE CONTENT LAYER                          */}
      {/* ---------------------------------------------------- */}
      <main className="relative z-10 flex flex-col items-center w-full">
        {/* --- HERO SECTION --- */}
        <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl space-y-8"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="flex justify-center">
              <span className="px-5 py-2 rounded-full border border-purple-500/30 bg-purple-900/20 text-purple-300 text-sm font-medium backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                v1.0 • AI Powered Code Generator
              </span>
            </motion.div>

            {/* Title */}

            <motion.div
              variants={fadeInUp}
              className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
            >
              {/* AGENT */}
              <span className="text-6xl md:text-8xl font-black tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                AGENT
              </span>

              {/* CODER (gradient stays the same) */}
              <span className="text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                CODER
              </span>

              {/* PRO – BIG ASCII ONLY */}
              <div className="relative overflow-visible w-[420px] md:w-[650px] h-[200px] md:h-[280px]">
                <ASCIIText
                  text="PRO"
                  enableWaves={false}
                  asciiFontSize={window.innerWidth < 768 ? 7 : 10}
                  textFontSize={window.innerWidth < 768 ? 120 : 180}
                  planeBaseHeight={window.innerWidth < 768 ? 6 : 9}
                  textColor="#a855f7" // Purple color
                  strokeColor="#3b82f6" // Blue color
                  className="w-full h-full"
                />
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Transform prompt text into production-ready code. <br />
              <span className="text-white font-semibold">
                Generate. Explain. Fix. Run.
              </span>
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={fadeInUp} className="pt-8">
              <Link to="/login">
                <button className="group relative px-10 py-5 bg-white text-black font-bold rounded-full text-lg shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] hover:scale-105 transition-all duration-300">
                  <span className="flex items-center gap-2">
                    Starts Now{" "}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* --- FEATURES GRID --- */}
        <div className="w-full max-w-7xl px-6 py-24">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-5 py-2 rounded-full border border-purple-500/30 bg-purple-900/20 text-purple-300 text-sm font-medium backdrop-blur-md">
                POWERFUL FEATURES
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Everything You Need to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Code Faster
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-lg max-w-2xl mx-auto"
            >
              From idea to execution, Agent Coder Pro streamlines your entire
              development workflow
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassSurface
                  width="100%"
                  height="auto"
                  borderRadius={24}
                  opacity={0.9}
                  blur={12}
                  borderWidth={0.05}
                  className="hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] transition-all duration-300"
                >
                  <FeatureCard {...card} />
                </GlassSurface>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Supported Languages Icons */}
        <motion.div
          variants={fadeInUp}
          className="flex justify-center gap-6 pt-4"
        >
          {["Python", "JS", "C++", "C"].map((lang) => (
            <div
              key={lang}
              className="flex flex-col items-center gap-2 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                <Code2 className="w-6 h-6 text-purple-300" />
              </div>
              <span className="text-xs text-gray-400 font-mono">{lang}</span>
            </div>
          ))}
        </motion.div>

        {/* --- ABOUT SECTION (Using GlassSurface) --- */}
        {/* We use a container to center it, and set specific widths for the Glass effect */}
        <div className="w-full px-4 py-24 flex justify-center">
          <div className="relative w-full max-w-5xl">
            {/* Using GlassSurface as a container.
                  NOTE: width="100%" works if the component supports CSS strings.
                  If it strictly needs numbers, you might need to use a fixed number or a ref wrapper.
                  Assuming standard React Bits flexibility here:
                */}
            <GlassSurface
              borderRadius={30}
              opacity={0.6}
              width="100%"
              height="auto"
              className="overflow-hidden" // ensure content stays inside rounded corners
            >
              <div className="p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 text-left">
                <div className="flex-1 space-y-6">
                  <h2 className="text-4xl font-bold text-white flex items-center gap-3">
                    <Cpu className="w-10 h-10 text-purple-400" />
                    About The Platform
                  </h2>
                  <p className="text-gray-200 text-lg leading-relaxed">
                    Agent Coder Pro is a state-of-the-art AI development
                    environment designed to accelerate your coding workflow. By
                    combining advanced LLMs with a secure runtime environment,
                    we allow you to go from
                    <span className="text-purple-300 font-bold">
                      {" "}
                      natural language to working software{" "}
                    </span>
                    in seconds. Perfect for learning new languages like C++ or
                    debugging complex Python scripts.
                  </p>
                </div>

                {/* Visual Decoration inside Glass */}
                <div className="flex-1 flex justify-center items-center">
                  <div className="relative w-64 h-64 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full blur-[60px] opacity-60 animate-pulse"></div>
                  <Layers className="relative z-10 w-32 h-32 text-white/80 drop-shadow-2xl" />
                </div>
              </div>
            </GlassSurface>
          </div>
        </div>

        {/* --- HOW IT WORKS --- */}
        <div className="w-full max-w-6xl px-6 py-24 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent rounded-full"></div>

            <Step
              number="01"
              title="Input Prompt"
              desc="Describe what you want to build in plain English."
            />
            <Step
              number="02"
              title="AI Generation"
              desc="Our engine processes the logic and outputs clean code."
            />
            <Step
              number="03"
              title="Run & Verify"
              desc="Execute the code immediately and see the results."
            />
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Sub-Components for cleaner code ---

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-sm"
  >
    <div className="mb-6 p-4 rounded-2xl bg-black/40 w-fit border border-white/5">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

const Step = ({ number, title, desc }) => (
  <div className="relative z-10 flex flex-col items-center text-center">
    <div className="w-24 h-24 rounded-full bg-black border-4 border-gray-800 shadow-[0_0_30px_rgba(168,85,247,0.3)] flex items-center justify-center mb-6 group transition-colors hover:border-purple-500">
      <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 group-hover:from-purple-300 group-hover:to-blue-300">
        {number}
      </span>
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400 max-w-xs">{desc}</p>
  </div>
);

export default Home;
