//server/Routes/auth.js
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.js");
//import authenticate middleware
const authenticateUser = require("../middlewares/authenticate.js");
//import nodemailer for sending forgot password emails
const nodemailer = require("nodemailer");
dotenv.config();

//configure emailer transporter with gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_APP_PASSWORD, // Gmail App Password (NOT regular password)
  },
});

//user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //validation of email
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    //check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { _id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//user signup
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;
    //validation of all fields
    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Send welcome email
    try {
      // Welcome Email Template for Agent Coder Pro
      const welcomeMailOptions = {
        from: `"Agent Coder Pro" <${process.env.EMAIL_USER}>`,
        to: email,
        subject:
          "🚀 Welcome to Agent Coder Pro - Your AI Development Journey Starts Now",
        html: `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <title>Welcome to Agent Coder Pro</title>
      <style>
        /* Reset & Basics */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          margin: 0; 
          padding: 0; 
          background-color: #000000; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -webkit-text-size-adjust: 100%;
          width: 100% !important;
          min-height: 100vh;
        }
        table { 
          border-spacing: 0; 
          border-collapse: collapse; 
          width: 100%;
        }
        td { padding: 0; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; }
        
        /* Container */
        .wrapper { 
          width: 100%; 
          background: linear-gradient(180deg, #000000 0%, #0a0a0f 50%, #000000 100%);
          padding: 20px 0;
          position: relative;
        }
        
        .main-content { 
          background: linear-gradient(135deg, #0a0a14 0%, #14141f 100%);
          margin: 0 auto; 
          width: 94%; 
          max-width: 600px; 
          border: 1px solid #2d2d3d;
          border-radius: 16px; 
          overflow: hidden;
          box-shadow: 
            0 0 60px rgba(139, 92, 246, 0.25),
            0 0 120px rgba(168, 85, 247, 0.15),
            inset 0 0 80px rgba(139, 92, 246, 0.03);
          position: relative;
          z-index: 2;
        }

        /* Header with Starfield */
        .header {
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%);
          padding: 50px 20px;
          border-bottom: 2px solid #4c1d95;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background-image: 
            radial-gradient(2px 2px at 20% 30%, white, transparent),
            radial-gradient(2px 2px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(2px 2px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 90%, white, transparent);
          background-size: 200px 200px, 150px 150px, 250px 250px, 180px 180px, 220px 220px, 190px 190px, 210px 210px;
          background-position: 0 0, 40px 60px, 130px 270px, 70px 100px, 150px 50px, 90px 180px, 30px 220px;
          opacity: 0.4;
        }
        
        .header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #a855f7, transparent);
        }
        
        .logo-container {
          position: relative;
          z-index: 1;
        }
        
        .logo-text {
          color: #ffffff;
          font-family: 'Courier New', Consolas, monospace;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          text-shadow: 
            0 0 20px rgba(168, 85, 247, 0.8),
            0 0 40px rgba(168, 85, 247, 0.4);
          margin-bottom: 8px;
        }
        
        .logo-accent { 
          color: #c084fc;
          text-shadow: 
            0 0 20px rgba(192, 132, 252, 1),
            0 0 40px rgba(192, 132, 252, 0.6);
        }
        
        .logo-pro {
          font-size: 16px;
          color: #22d3ee;
          vertical-align: super;
          margin-left: 2px;
          font-weight: 700;
          text-shadow: 
            0 0 15px rgba(34, 211, 238, 0.8),
            0 0 30px rgba(34, 211, 238, 0.5);
        }
        
        .logo-subtitle {
          color: #a78bfa;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 600;
        }
        
        .welcome-badge {
          display: inline-block;
          background: rgba(168, 85, 247, 0.2);
          border: 1px solid #a855f7;
          border-radius: 25px;
          padding: 8px 20px;
          font-size: 11px;
          color: #e9d5ff;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 20px;
          font-weight: 600;
        }

        /* Body */
        .body-content { 
          padding: 35px 20px; 
          text-align: left;
          position: relative;
        }
        
        .greeting {
          color: #f1f5f9;
          font-size: 22px;
          margin-bottom: 25px;
          font-weight: 600;
        }
        
        .user-highlight { 
          color: #c084fc;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(192, 132, 252, 0.3);
        }
        
        .intro-text {
          color: #cbd5e1;
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 30px;
        }
        
        .highlight-text {
          color: #e9d5ff;
          font-weight: 600;
        }

        /* Feature Cards */
        .features-section {
          margin: 35px 0;
        }
        
        .section-title {
          color: #e9d5ff;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 20px;
          text-align: center;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        
        .feature-card {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
          border: 1px solid #3730a3;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 15px;
          position: relative;
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg, #a855f7, #6366f1);
          border-radius: 12px 0 0 12px;
        }
        
        .feature-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(168, 85, 247, 0.2);
          border: 1px solid #a855f7;
          border-radius: 10px;
          font-size: 20px;
          margin-bottom: 12px;
          line-height: 1;
        }
        
        .feature-title {
          color: #e2e8f0;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        .feature-desc {
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.6;
        }

        /* How It Works Steps */
        .steps-section {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
          border: 1px solid #3730a3;
          border-radius: 12px;
          padding: 25px 20px;
          margin: 30px 0;
        }
        
        .step-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        
        .step-item:last-child {
          margin-bottom: 0;
        }
        
        .step-number {
          min-width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #a855f7, #6366f1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Courier New', monospace;
          font-size: 18px;
          font-weight: 700;
          color: white;
          margin-right: 15px;
          flex-shrink: 0;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
        }
        
        .step-content {
          flex: 1;
          padding-top: 8px;
        }
        
        .step-title {
          color: #e2e8f0;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        
        .step-desc {
          color: #94a3b8;
          font-size: 13px;
          line-height: 1.5;
        }

        /* Language Support */
        .languages-section {
          background: rgba(34, 211, 238, 0.05);
          border: 1px solid rgba(34, 211, 238, 0.2);
          border-radius: 12px;
          padding: 20px;
          margin: 30px 0;
          text-align: center;
        }
        
        .language-tag {
          display: inline-block;
          background: rgba(34, 211, 238, 0.1);
          border: 1px solid #22d3ee;
          border-radius: 20px;
          padding: 6px 14px;
          margin: 5px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: #22d3ee;
          font-weight: 600;
        }

        /* Footer */
        .footer {
          background: linear-gradient(135deg, #0a0a14 0%, #14141f 100%);
          padding: 30px 20px;
          text-align: center;
          border-top: 2px solid #1e293b;
          position: relative;
        }
        
        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #4c1d95, transparent);
        }
        
        .footer-text { 
          color: #64748b; 
          font-size: 12px; 
          margin-bottom: 10px;
          line-height: 1.6;
        }
        
        .footer-link { 
          color: #a855f7; 
          text-decoration: none;
          font-weight: 600;
        }
        
        .social-links {
          margin-top: 15px;
        }
        
        .social-link {
          display: inline-block;
          margin: 0 8px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 12px;
          transition: color 0.3s;
        }
        
        .social-link:hover {
          color: #a855f7;
        }

        /* Mobile Responsive */
        @media only screen and (max-width: 600px) {
          .main-content { 
            width: 100% !important;
            border-radius: 0 !important;
            margin: 0 !important;
          }
          
          .header {
            padding: 40px 15px !important;
          }
          
          .logo-text {
            font-size: 24px !important;
            letter-spacing: 3px !important;
          }
          
          .logo-pro {
            font-size: 12px !important;
          }
          
          .logo-subtitle {
            font-size: 10px !important;
          }
          
          .welcome-badge {
            font-size: 10px !important;
            padding: 6px 15px !important;
          }
          
          .body-content {
            padding: 25px 15px !important;
          }
          
          .greeting {
            font-size: 20px !important;
          }
          
          .intro-text {
            font-size: 14px !important;
          }
          
          .section-title {
            font-size: 16px !important;
          }
          
          .feature-card {
            padding: 15px !important;
          }
          
          .feature-icon {
            width: 35px !important;
            height: 35px !important;
            font-size: 18px !important;
          }
          
          .steps-section {
            padding: 20px 15px !important;
          }
          
          .step-number {
            min-width: 40px !important;
            height: 40px !important;
            font-size: 16px !important;
            margin-right: 12px !important;
          }
          
          .step-content {
            padding-top: 6px !important;
          }
          
          .footer {
            padding: 25px 15px !important;
          }
          
          .language-tag {
            font-size: 11px !important;
            padding: 5px 12px !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="main-content">
          
          <!-- Header -->
          <div class="header">
            <div class="logo-container">
              <div class="logo-text">
                AGENT<span class="logo-accent">CODER</span><span class="logo-pro">PRO</span>
              </div>
              <div class="logo-subtitle">▸ AI POWERED CODE GENERATOR ◂</div>
              <div class="welcome-badge">🚀 WELCOME ABOARD v1.0</div>
            </div>
          </div>

          <!-- Body Content -->
          <div class="body-content">
            <div class="greeting">
              Welcome, <span class="user-highlight">${fullName}</span>! 👋
            </div>
            
            <p class="intro-text">
              You've just unlocked the power of <span class="highlight-text">AI-driven development</span>. 
              Agent Coder Pro is your intelligent coding companion that transforms natural language into 
              production-ready code in seconds.
            </p>
            
            <p class="intro-text">
              Whether you're learning a new programming language, debugging complex scripts, or building 
              your next big project, we've got you covered. Let's explore what you can do:
            </p>

            <!-- Features Section -->
            <div class="features-section">
              <h3 class="section-title">⚡ Powerful Features at Your Fingertips</h3>
              
              <div class="feature-card">
                <div class="feature-icon">💬</div>
                <div class="feature-title">Text to Code Generation</div>
                <div class="feature-desc">
                  Simply type "Create a calculator in Python" and watch the agent write clean, executable code instantly.
                </div>
              </div>
              
              <div class="feature-card">
                <div class="feature-icon">🔧</div>
                <div class="feature-title">Auto-Fix & Debug</div>
                <div class="feature-desc">
                  Paste broken code and let Agent Coder Pro identify errors, fix syntax, and optimize performance automatically.
                </div>
              </div>
              
              <div class="feature-card">
                <div class="feature-icon">▶️</div>
                <div class="feature-title">Live Code Execution</div>
                <div class="feature-desc">
                  Don't just read it—run it! Execute Python, JavaScript, C++, and C code directly in our secure browser sandbox.
                </div>
              </div>
            </div>

            <!-- How It Works -->
            <div class="steps-section">
              <h3 class="section-title" style="margin-bottom: 25px;">🎯 How It Works</h3>
              
              <div class="step-item">
                <div class="step-number">01</div>
                <div class="step-content">
                  <div class="step-title">Input Your Prompt</div>
                  <div class="step-desc">Describe what you want to build in plain English</div>
                </div>
              </div>
              
              <div class="step-item">
                <div class="step-number">02</div>
                <div class="step-content">
                  <div class="step-title">AI Processes & Generates</div>
                  <div class="step-desc">Our engine analyzes the logic and outputs clean, optimized code</div>
                </div>
              </div>
              
              <div class="step-item">
                <div class="step-number">03</div>
                <div class="step-content">
                  <div class="step-title">Run & Verify Results</div>
                  <div class="step-desc">Execute the code immediately and see the results in real-time</div>
                </div>
              </div>
            </div>

            <!-- Supported Languages -->
            <div class="languages-section">
              <p style="color: #94a3b8; font-size: 13px; margin-bottom: 12px; font-weight: 600;">
                SUPPORTED LANGUAGES
              </p>
              <div>
                <span class="language-tag">Python</span>
                <span class="language-tag">JavaScript</span>
                <span class="language-tag">C++</span>
                <span class="language-tag">C</span>
              </div>
            </div>

            <p class="intro-text" style="text-align: center; margin-top: 25px; margin-bottom: 0; font-size: 14px;">
              Ready to transform the way you code? Your journey starts now.
            </p>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p class="footer-text">
              &copy; ${new Date().getFullYear()} Agent Coder Pro. All rights reserved.<br>
              Questions? <a href="mailto:support@agentcoder.com" class="footer-link">Contact Support</a>
            </p>
          </div>

        </div>
      </div>
    </body>
  </html>`,
      };
      await transporter.sendMail(welcomeMailOptions);
      console.log("Welcome email sent successfully to:", email);
    } catch (emailError) {
      // Don't fail signup if email fails
      console.error("Failed to send welcome email:", emailError);
    }

    // Create token and return user + token to client
    const token = jwt.sign(
      {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      token,
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/profile", authenticateUser, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
});

// Update user profile (protected)

router.put("/profile", authenticateUser, async (req, res) => {
  try {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({
        message: "Full name and email are required",
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          fullName,
          email,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error updating profile" });
  }
});

// ==========================================
// ROUTE 1: Send OTP to Email
// POST /api/auth/send-otp
// Body: { email }
// ==========================================
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No account found with this email" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set OTP and expiration (5 minutes from now)
    user.resetOTP = otp;
    user.resetOTPExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    // Email content with enhanced mobile responsiveness and starry theme
    const mailOptions = {
      from: `"Agent Coder Security" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 SECURITY ALERT: Verification Token Required",
      html: `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <title>Agent Coder Security Token</title>
    <style>
      /* Reset & Basics */
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        margin: 0; 
        padding: 0; 
        background-color: #000000; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        width: 100% !important;
        min-height: 100vh;
      }
      table { 
        border-spacing: 0; 
        border-collapse: collapse; 
        width: 100%;
      }
      td { padding: 0; }
      img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
      
      /* Container */
      .wrapper { 
        width: 100%; 
        background: linear-gradient(180deg, #000000 0%, #0a0a0f 50%, #000000 100%);
        padding: 20px 0;
        position: relative;
      }
      
      /* Animated Stars Background */
      .stars-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }
      
      .main-content { 
        background: linear-gradient(135deg, #0a0a14 0%, #14141f 100%);
        margin: 0 auto; 
        width: 94%; 
        max-width: 600px; 
        border: 1px solid #2d2d3d;
        border-radius: 16px; 
        overflow: hidden;
        box-shadow: 
          0 0 60px rgba(139, 92, 246, 0.25),
          0 0 120px rgba(168, 85, 247, 0.15),
          inset 0 0 80px rgba(139, 92, 246, 0.03);
        position: relative;
        z-index: 2;
      }

      /* Header with Starfield */
      .header {
        background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%);
        padding: 40px 20px;
        border-bottom: 2px solid #4c1d95;
        text-align: center;
        position: relative;
        overflow: hidden;
      }
      
      .header::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background-image: 
          radial-gradient(2px 2px at 20% 30%, white, transparent),
          radial-gradient(2px 2px at 60% 70%, white, transparent),
          radial-gradient(1px 1px at 50% 50%, white, transparent),
          radial-gradient(1px 1px at 80% 10%, white, transparent),
          radial-gradient(2px 2px at 90% 60%, white, transparent),
          radial-gradient(1px 1px at 33% 80%, white, transparent),
          radial-gradient(1px 1px at 15% 90%, white, transparent);
        background-size: 200px 200px, 150px 150px, 250px 250px, 180px 180px, 220px 220px, 190px 190px, 210px 210px;
        background-position: 0 0, 40px 60px, 130px 270px, 70px 100px, 150px 50px, 90px 180px, 30px 220px;
        opacity: 0.4;
      }
      
      .header::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, #a855f7, transparent);
      }
      
      .logo-container {
        position: relative;
        z-index: 1;
      }
      
      .logo-text {
        color: #ffffff;
        font-family: 'Courier New', Consolas, monospace;
        font-size: 28px;
        font-weight: 700;
        letter-spacing: 3px;
        text-transform: uppercase;
        text-shadow: 
          0 0 20px rgba(168, 85, 247, 0.8),
          0 0 40px rgba(168, 85, 247, 0.4);
        margin-bottom: 8px;
      }
      
      .logo-accent { 
        color: #c084fc;
        text-shadow: 
          0 0 20px rgba(192, 132, 252, 1),
          0 0 40px rgba(192, 132, 252, 0.6);
      }
      
      .logo-subtitle {
        color: #a78bfa;
        font-size: 11px;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-weight: 600;
      }

      /* Body */
      .body-content { 
        padding: 30px 20px; 
        text-align: left;
        position: relative;
      }
      
      .greeting {
        color: #f1f5f9;
        font-size: 20px;
        margin-bottom: 20px;
        font-weight: 600;
      }
      
      .user-highlight { 
        color: #c084fc;
        font-weight: 700;
        text-shadow: 0 0 10px rgba(192, 132, 252, 0.3);
      }
      
      .description {
        color: #cbd5e1;
        font-size: 15px;
        line-height: 1.7;
        margin-bottom: 25px;
      }

      /* The Token Box (Enhanced Terminal Style) */
      .token-container {
        background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
        border: 2px solid #3730a3;
        border-radius: 12px;
        padding: 30px 15px;
        text-align: center;
        margin: 30px 0;
        position: relative;
        box-shadow: 
          0 0 30px rgba(99, 102, 241, 0.3),
          inset 0 0 30px rgba(99, 102, 241, 0.05);
      }
      
      .token-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, #6366f1, transparent);
      }
      
      .token-container::after {
        content: '◢◤◢◤◢◤';
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        color: #3730a3;
        font-size: 8px;
        letter-spacing: 4px;
      }
      
      .token-label {
        font-family: 'Courier New', Consolas, monospace;
        color: #818cf8;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 15px;
        font-weight: 600;
      }
      
      .token-code {
        font-family: 'Courier New', Consolas, monospace;
        font-size: 42px;
        font-weight: 700;
        color: #22d3ee;
        letter-spacing: 10px;
        text-shadow: 
          0 0 20px rgba(34, 211, 238, 0.8),
          0 0 40px rgba(34, 211, 238, 0.4),
          0 0 60px rgba(34, 211, 238, 0.2);
        padding: 10px 0;
        word-break: break-all;
      }

      /* Info Items */
      .status-box {
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%);
        border-left: 4px solid #a855f7;
        border-radius: 8px;
        padding: 18px 15px;
        margin-bottom: 25px;
        position: relative;
      }
      
      .status-box::before {
        content: '⚠';
        position: absolute;
        left: 15px;
        top: 18px;
        font-size: 18px;
        color: #e9d5ff;
      }
      
      .status-text {
        color: #e9d5ff;
        font-size: 13px;
        margin: 0;
        padding-left: 30px;
        font-family: 'Courier New', Consolas, monospace;
        line-height: 1.6;
      }

      /* Footer */
      .footer {
        background: linear-gradient(135deg, #0a0a14 0%, #14141f 100%);
        padding: 30px 20px;
        text-align: center;
        border-top: 2px solid #1e293b;
        position: relative;
      }
      
      .footer::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, #4c1d95, transparent);
      }
      
      .footer-text { 
        color: #64748b; 
        font-size: 12px; 
        margin-bottom: 10px;
        line-height: 1.6;
      }
      
      .footer-link { 
        color: #a855f7; 
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s;
      }
      
      .footer-link:hover { 
        color: #c084fc;
      }
      
      .security-badge {
        display: inline-block;
        background: rgba(168, 85, 247, 0.1);
        border: 1px solid #a855f7;
        border-radius: 20px;
        padding: 5px 15px;
        font-size: 10px;
        color: #c084fc;
        letter-spacing: 1px;
        text-transform: uppercase;
        margin-top: 15px;
        font-weight: 600;
      }

      /* Mobile Responsive */
      @media only screen and (max-width: 600px) {
        .main-content { 
          width: 100% !important;
          border-radius: 0 !important;
          margin: 0 !important;
        }
        
        .header {
          padding: 30px 15px !important;
        }
        
        .logo-text {
          font-size: 22px !important;
          letter-spacing: 2px !important;
        }
        
        .logo-subtitle {
          font-size: 9px !important;
        }
        
        .body-content {
          padding: 25px 15px !important;
        }
        
        .greeting {
          font-size: 18px !important;
        }
        
        .description {
          font-size: 14px !important;
        }
        
        .token-container {
          padding: 25px 10px !important;
          margin: 20px 0 !important;
        }
        
        .token-code {
          font-size: 32px !important;
          letter-spacing: 6px !important;
          line-height: 1.3 !important;
        }
        
        .token-label {
          font-size: 10px !important;
        }
        
        .status-box {
          padding: 15px 12px !important;
        }
        
        .status-text {
          font-size: 12px !important;
          padding-left: 25px !important;
        }
        
        .footer {
          padding: 25px 15px !important;
        }
        
        .footer-text {
          font-size: 11px !important;
        }
      }

      /* Dark Mode Support */
      @media (prefers-color-scheme: dark) {
        .main-content {
          box-shadow: 
            0 0 80px rgba(139, 92, 246, 0.3),
            0 0 160px rgba(168, 85, 247, 0.2),
            inset 0 0 100px rgba(139, 92, 246, 0.05);
        }
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="main-content">
        
        <div class="header">
          <div class="logo-container">
            <div class="logo-text">
              AGENT<span class="logo-accent">CODER</span>
            </div>
            <div class="logo-subtitle">◢ Security Protocol ◣</div>
          </div>
        </div>

        <div class="body-content">
          <div class="greeting">
            Hello <span class="user-highlight">${user.fullName}</span>,
          </div>
          
          <p class="description">
            A password reset sequence was initiated for your account. To authenticate this request and restore access, please input the following security token into the verification terminal.
          </p>

          <div class="token-container">
            <div class="token-label">▸ Secure Access Token</div>
            <div class="token-code">${otp}</div>
          </div>

          <div class="status-box">
            <p class="status-text">
              [!] SECURITY NOTE: This token is valid for 5 minutes.<br>
              If you did not initiate this request, secure your account immediately.
            </p>
          </div>

          <p class="description" style="margin-bottom: 0;">
            Return to the interface and enter this code to proceed with your password reset.
          </p>
        </div>

        <div class="footer">
          <div class="security-badge">🔒 Encrypted Communication</div>
          <p class="footer-text">
            System generated message. Do not reply directly to this thread.
          </p>
          <p class="footer-text">
            &copy; ${new Date().getFullYear()} Agent Coder Pro Systems.<br>
            <a href="mailto:support@agentcoder.com" class="footer-link">Contact Support</a>
          </p>
        </div>

      </div>
    </div>
  </body>
  </html>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "OTP sent successfully to your email",
      email: email,
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ message: "Failed to send OTP. Please try again." });
  }
});

// ==========================================
// ROUTE 2: Verify OTP
// POST /api/auth/verify-otp
// Body: { email, otp }
// ==========================================
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Find user
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP exists
    if (!user.resetOTP) {
      return res
        .status(400)
        .json({ message: "No OTP found. Please request a new one." });
    }

    // Check if OTP has expired
    if (Date.now() > user.resetOTPExpires) {
      // Clear expired OTP
      user.resetOTP = null;
      user.resetOTPExpires = null;
      await user.save();
      return res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one." });
    }

    // Verify OTP matches
    if (user.resetOTP !== otp) {
      return res
        .status(400)
        .json({ message: "Invalid OTP. Please try again." });
    }

    res.status(200).json({
      message: "OTP verified successfully",
      valid: true,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res
      .status(500)
      .json({ message: "Failed to verify OTP. Please try again." });
  }
});

// ==========================================
// ROUTE 3: Reset Password
// POST /api/auth/reset-password
// Body: { email, otp, newPassword }
// ==========================================
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate input
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate password length
    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Find user
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify OTP one final time
    if (!user.resetOTP || user.resetOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (Date.now() > user.resetOTPExpires) {
      user.resetOTP = null;
      user.resetOTPExpires = null;
      await user.save();
      return res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one." });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear OTP fields
    user.password = hashedPassword;
    user.resetOTP = null;
    user.resetOTPExpires = null;
    await user.save();

    res.status(200).json({
      message:
        "Password reset successful. You can now login with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res
      .status(500)
      .json({ message: "Failed to reset password. Please try again." });
  }
});

module.exports = router;
