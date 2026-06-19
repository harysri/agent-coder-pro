import React from "react";
import { Sparkles, Heart, Github, Twitter, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative w-full z-40 border-t border-white/10 bg-black/10 backdrop-blur-md pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* MAIN CONTENT */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
          {/* Branding */}
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <div className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>

              <span className="text-xl font-bold tracking-tight flex items-start">
                <span className="text-white">Agent</span>
                <span className="mx-0.5 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Coder
                </span>
                <span className="-translate-y-2 text-[0.65rem] font-mono tracking-widest text-purple-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]">
                  PRO
                </span>
              </span>
            </div>

            <p className="text-gray-400 text-sm text-center lg:text-left max-w-md">
              Empowering developers with AI-driven code generation, fixing, and
              execution.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8">
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm tracking-wider text-center">
                QUICK LINKS
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 text-sm hover:text-purple-400 hover:translate-x-1 transition-all block"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Login"
                    className="text-gray-400 text-sm hover:text-purple-400 hover:translate-x-1 transition-all block"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="text-gray-400 text-sm hover:text-purple-400 hover:translate-x-1 transition-all block"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm tracking-wider text-center">
                RESOURCES
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/harysri//agent-coder-pro/blob/main/README.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 text-sm hover:text-purple-400 hover:translate-x-1 transition-all block"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/harysri/agent-coder-pro/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 text-sm hover:text-purple-400 hover:translate-x-1 transition-all block"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/harysri/agent-coder-pro/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 text-sm hover:text-purple-400 hover:translate-x-1 transition-all block"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-1">
            <a
              href="https://github.com/harysri/agent-coder-pro"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
            </a>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Agent Coder Pro · Built
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-1" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
