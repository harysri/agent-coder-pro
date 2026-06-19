//server/Routes/viewcode.js

const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.js");
const authenticateUser = require("../middlewares/authenticate.js");

router.post("/save", authenticateUser, async (req, res) => {
  try {
    let { prompt, code, language } = req.body;

    if (!prompt || !code || !language) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Clean markdown (important)
    code = code
      .replace(/^```[a-zA-Z]*\n/, "")
      .replace(/```$/, "")
      .trim();

    const user = await UserModel.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.savedCodes.push({
      prompt,
      code,
      language,
    });

    await user.save();

    res.json({ message: "Code saved to profile ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save code" });
  }
});

router.get("/my-codes", authenticateUser, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("savedCodes");
    res.json(user.savedCodes.reverse());
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch saved codes" });
  }
});

router.delete("/:codeId", authenticateUser, async (req, res) => {
  try {
    const { codeId } = req.params;

    const user = await UserModel.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.savedCodes = user.savedCodes.filter(
      (code) => code._id.toString() !== codeId,
    );

    await user.save();

    res.json({ message: "Code deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete code" });
  }
});

router.get("/:codeId", authenticateUser, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("savedCodes");
    const code = user.savedCodes.id(req.params.codeId);
    if (!code) return res.status(404).json({ error: "Code not found" });
    res.json(code);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch code" });
  }
});

module.exports = router;
