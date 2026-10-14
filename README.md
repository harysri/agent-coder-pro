<div align="center">
  <img src="./assets/agent-coder-pro-banner.svg" alt="Agent Coder Pro" width="700" />
</div>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0-purple?style=for-the-badge&logo=github" alt="Version" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs" alt="Node" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="License" />
</p>

<br />

<p align="center">
  <strong>Transform natural language into production-ready code in seconds.</strong>
  <br />
  <em>Generate. Explain. Fix. Run.</em>
</p>

<br />

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#ai--apis">API</a> •
  <a href="#-contributing">Contribute</a>
</p>

<br />

---

## ✦ Overview

**Agent Coder Pro** is a state-of-the-art AI development environment that converts plain English prompts into clean, executable code. Powered by advanced LLMs (Gemini 3.5 Flash Lite + 2.5 Flash), it supports **Python, JavaScript, C++, and C** — all wrapped in an immersive cosmic-themed UI.

```
💬 "Create a calculator in Python"   →   🧠 AI Processing   →   ⚡ Executable Code
```

---

## ✦ Features

<div align="center">

|     | Feature              | What It Does                                                         |
| --- | -------------------- | -------------------------------------------------------------------- |
| 💬  | **Text to Code**     | Describe what you want in plain English — get working code instantly |
| 🔧  | **Fix & Debug**      | AI identifies errors, fixes syntax, and optimizes                    |
| ▶️  | **Live Execution**   | Run Python, JS, C++, and C directly in a secure browser sandbox      |
| 📖  | **Code Explanation** | Get step-by-step natural language breakdowns of genarated code       |
| ⚡  | **Streaming Output** | Watch AI responses appear character-by-character in real time        |
| 💾  | **Save & Manage**    | Persist generated code to your profile for later access              |
| 🔐  | **Auth System**      | JWT-based login/signup with OTP password recovery via email          |
| 🌌  | **Cosmic UI**        | Galaxy animations, glassmorphism, splash cursor, ASCII text effects  |

</div>

---

## ✦ Tech Stack

<div align="center">

### Frontend

|     | Technology          | Purpose                  |
| --- | ------------------- | ------------------------ |
| ⚛️  | **React 19**        | UI library               |
| ⚡  | **Vite**            | Build tool & dev server  |
| 🎨  | **Tailwind CSS 3**  | Utility-first styling    |
| 🌀  | **Framer Motion**   | Animations & transitions |
| 🧭  | **React Router v7** | Client-side routing      |
| 🎭  | **Lucide React**    | Icon library             |
| 🎬  | **GSAP**            | Advanced animations      |
| 🎲  | **Three.js**        | 3D rendering             |

### Backend & Database

|     | Technology             | Purpose              |
| --- | ---------------------- | -------------------- |
| 🟢  | **Node.js + Express**  | Server framework     |
| 🍃  | **MongoDB + Mongoose** | Database & ODM       |
| 🔑  | **JWT + bcrypt**       | Authentication       |
| 📧  | **Nodemailer**         | Email (OTP, welcome) |
| 🛡️  | **Helmet**             | Security headers     |
| ⏱️  | **express-rate-limit** | Rate limiting        |

### AI & APIs

|     | Service                          | Usage                        |
| --- | -------------------------------- | ---------------------------- |
| 🌟  | **Google Gemini 3.5 Flash Lite** | Code generation              |
| ✨  | **Google Gemini 3.1 Flash Lite** | Code explanation & debugging |

</div>

---

## ✦ Screenshots

<div align="center">
  <p>
    <strong>Home Page</strong><br />
    <img src="./screenshots/home.png" alt="Home Page" width="640" />
  </p>
  <p>
    <strong>Code Generator</strong><br />
    <img src="./screenshots/code-generator.png" alt="Code Generator" width="640" />
  </p>
  <p>
    <strong>Saved Code Detail</strong><br />
    <img src="./screenshots/saved-code-detail.png" alt="Saved Code Detail" width="640" />
  </p>
  <p>
    <strong>Home — Hero</strong><br />
    <img src="./screenshots/home-part1.png" alt="Home Hero" width="640" />
  </p>
  <p>
    <strong>Home — Features</strong><br />
    <img src="./screenshots/home-part2.png" alt="Home Features" width="640" />
  </p>
  <p>
    <strong>Signup</strong><br />
    <img src="./screenshots/signup.png" alt="Signup" width="640" />
  </p>
  <p>
    <strong>Login</strong><br />
    <img src="./screenshots/login.png" alt="Login" width="640" />
  </p>
  <p>
    <strong>Profile</strong><br />
    <img src="./screenshots/profile.png" alt="Profile" width="640" />
  </p>
</div>

---

## ✦ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  CLIENT (Vite + React)               │
│                                                      │
│  ┌───────────┐  ┌───────────┐  ┌────────────────┐   │
│  │   Pages   │  │Components │  │    Utils       │   │
│  │  Home     │  │  Navbar   │  │ formatResponse │   │
│  │  Codegen  │  │  Footer   │  └────────────────┘   │
│  │  Auth     │  │  Galaxy   │                        │
│  │  Profile  │  │  Glass    │                        │
│  └─────┬─────┘  └─────┬─────┘                        │
│        └────── HTTP ───┘                             │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│                  SERVER (Express.js)                  │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │   Auth   │  │ Generate │  │   Code Run       │   │
│  │  Routes  │  │  Routes  │  │   Routes         │   │
│  └──────────┘  └──────────┘  └──────────────────┘   │
│         │            │               │               │
│  ┌──────▼────────────▼───────────────▼────────────┐  │
│  │              MongoDB (Mongoose)                 │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

## ✦ Quick Start

### Prerequisites

```bash
node >= 18
npm >= 9
mongodb (local or Atlas)
python3         # for Python execution
g++ / gcc       # for C++ / C execution
```

### Installation

```bash
# Clone
git clone https://github.com/harysri/agent-coder-pro.git
cd agent-coder-pro

# Install dependencies
cd client && npm install
cd ../server && npm install
```

### Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/agentcoder
JWT_SECRET=your_super_secret_key
HF_API_KEY=hf_your_huggingface_key
GEMINI_API_KEY=your_gemini_key
EMAIL_USER=your@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password
```

### Run Development Servers

```bash
# Terminal 1 — Backend
cd server
npm start              # http://localhost:5000

# Terminal 2 — Frontend
cd client
npm run dev            # http://localhost:5173
```

### Production Build

```bash
cd client
npm run build          # Output: client/dist/
```

---

## ✦ Folder Structure

```
agent-coder-pro/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── GlassSurface.jsx
│   │   │   ├── SplashCursor.jsx
│   │   │   ├── ASCIIText.jsx
│   │   │   └── ScrollToTop.jsx
│   │   ├── Pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Codegenerator.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── Viewcodedetail.jsx
│   │   ├── Utils/
│   │   │   └── formatResponse.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/
│   ├── Routes/
│   │   ├── auth.js
│   │   ├── codegeneration.js
│   │   ├── run.js
│   │   └── viewcode.js
│   ├── models/
│   │   └── user.js
│   ├── middlewares/
│   │   └── authenticate.js
│   ├── tmp/
│   ├── index.js
│   └── package.json
│
├── screenshots/
├── README.md
└── .gitignore
```

---

## ✦ API Endpoints

### 🔐 Authentication

```http
POST  /api/auth/signup           # Register
POST  /api/auth/login            # Login
GET   /api/auth/profile          # Get profile  [JWT]
PUT   /api/auth/profile          # Update profile [JWT]
POST  /api/auth/send-otp         # Send reset OTP
POST  /api/auth/verify-otp       # Verify OTP
POST  /api/auth/reset-password   # Reset password
```

### 🤖 AI Code Generation

```http
POST  /api/generate/codegeneration   # Generate code from prompt
POST  /api/generate/explain          # Explain code
POST  /api/generate/debug            # Debug & analyze
```

### ⚡ Code Execution

```http
POST  /api/code/run                  # Run code (Python/JS/C++/C)
```

### 💾 Saved Codes

```http
POST   /api/viewcode/save            # Save code [JWT]
GET    /api/viewcode/my-codes        # List saved [JWT]
GET    /api/viewcode/:codeId         # Get by ID [JWT]
DELETE /api/viewcode/:codeId         # Delete [JWT]
```

---

## ✦ Usage Walkthrough

```
1️⃣  Navigate to Code Generator
2️⃣  Type a prompt (e.g. "Create a Fibonacci function in Python")
3️⃣  Press Ctrl+Enter or click Generate     → Code streams in real time
4️⃣  Click Explain Code                      → Step-by-step breakdown
5️⃣  Click Debug Code                        → Static analysis report
6️⃣  Click Run Code                          → Live execution output
7️⃣  Click Save                              → Persist to your profile
```

---

## ✦ Roadmap

- [ ] Multi-model AI provider selection (OpenAI, Claude, HF)
- [ ] Real-time collaborative editing
- [ ] Downloadable code files (`.py`, `.js`, `.cpp`, `.c`)
- [ ] AI-powered code refactoring
- [ ] Dark/light theme toggle
- [ ] Unit test generation
- [ ] WebSocket live execution logs
- [ ] Role-based access control

---

## ✦ Contributing

1. **Fork** the repo
2. Create a feature branch: `git checkout -b feat/amazing`
3. Commit: `git commit -m "feat: add amazing feature"`
4. Push: `git push origin feat/amazing`
5. Open a **Pull Request**

Please follow existing code conventions and lint rules.

---

## ✦ License

Distributed under the **MIT License**. See [LICENSE](./LICENSE) for details.

---

## ✦ Author

**Agent Coder Pro**

- GitHub: [@harysri](https://github.com/harysri)
- Project: [https://github.com/harysri/agent-coder-pro](https://github.com/harysri/agent-coder-pro)

---

<p align="center">
  <sub>Built with ❤️ using React, Express, MongoDB & AI</sub>
  <br />
  <sub>⭐ Star this repo if you find it useful!</sub>
</p>
