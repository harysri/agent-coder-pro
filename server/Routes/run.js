//updated run code with c added support

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const { v4: uuidv4 } = require("uuid");

const TMP_DIR = path.join(__dirname, "../tmp");
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR);

router.post("/run", async (req, res) => {
  let { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({ error: "Language and code are required" });
  }

  language = language.toLowerCase();

  // Remove markdown fences
  code = code
    .replace(/^```[a-zA-Z]*\n/, "")
    .replace(/```$/, "")
    .trim();

  const id = uuidv4();
  const start = Date.now();

  try {
    let command, args, filePath, exePath;

    /* ---------------- PYTHON ---------------- */
    if (language === "python" || language === "py") {
      filePath = path.join(TMP_DIR, `${id}.py`);
      fs.writeFileSync(filePath, code);
      command = process.platform === "win32" ? "python" : "python3";
      args = [filePath];
    } else if (language === "javascript" || language === "js") {
      /* ---------------- JAVASCRIPT ---------------- */
      filePath = path.join(TMP_DIR, `${id}.js`);
      fs.writeFileSync(filePath, code);
      command = "node";
      args = [filePath];
    } else if (language === "cpp" || language === "c++") {
      /* ---------------- C++ ---------------- */
      filePath = path.join(TMP_DIR, `${id}.cpp`);
      exePath = path.join(TMP_DIR, `${id}.out`);

      fs.writeFileSync(filePath, code);

      // Compile
      await execPromise("g++", [filePath, "-o", exePath]);

      // Run
      command = exePath;
      args = [];
    } else if (language === "c") {
      /* ---------------- C ---------------- */
      filePath = path.join(TMP_DIR, `${id}.c`);
      exePath = path.join(TMP_DIR, `${id}.out`);

      fs.writeFileSync(filePath, code);

      // Compile
      await execPromise("gcc", [filePath, "-o", exePath]);

      // Run
      command = exePath;
      args = [];
    } else {
      return res.status(400).json({
        error: `Unsupported language: ${language}`,
      });
    }

    const output = await execPromise(command, args);
    const time = Date.now() - start;

    res.json({
      output: output.trim(),
      executionTime: `${time} ms`,
      status: "Success ✓",
    });
  } catch (error) {
    res.json({
      output: error.toString(),
      status: "Error ❌",
    });
  } finally {
    cleanup(id);
  }
});

/* ---------- EXEC PROMISE ---------- */
function execPromise(command, args, timeout = 5000) {
  return new Promise((resolve, reject) => {
    execFile(command, args, { timeout }, (error, stdout, stderr) => {
      if (error) {
        return reject(stderr || error.message);
      }
      resolve(stdout || "⚠ Program ran but produced no output.");
    });
  });
}

/* ---------- CLEANUP ---------- */
function cleanup(id) {
  fs.readdirSync(TMP_DIR)
    .filter((f) => f.startsWith(id))
    .forEach((f) => fs.unlinkSync(path.join(TMP_DIR, f)));
}

module.exports = router;
