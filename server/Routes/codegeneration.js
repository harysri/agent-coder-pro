const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
const fetch = require("node-fetch");
const { GoogleGenAI } = require("@google/genai");
dotenv.config();

router.post("/codegeneration", async (req, res) => {
  try {
    const { message, model = "moonshotai/Kimi-K2-Thinking:novita" } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Message is required and must be a non-empty string",
      });
    }

    if (!process.env.HF_API_KEY) {
      return res.status(500).json({
        error: "API configuration error",
      });
    }

    const aiResponse = await query({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are an expert programming assistant. Provide clean, correct,exicutable and well-structured code. Do not want any kind of explanations",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 2000,
      temperature: 0.7,
      top_p: 0.9,
    });

    const rawContent =
      aiResponse.choices?.[0]?.message?.content ||
      aiResponse.generated_text ||
      "No response generated.";

    res.json({
      response: rawContent,
      usage: aiResponse.usage || null,
      model,
    });
  } catch (error) {
    console.error("Code generation error:", error);

    res.status(500).json({
      error: "Code generation failed",
      details: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

async function query(data) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HF Error ${response.status}: ${errorText}`);
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error("Request timeout");
    }
    throw error;
  }
}

module.exports = router;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/explain", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a senior software engineer.
Explain the following code clearly and simply using steps.

${message}`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.6,
      },
    });

    let responseText = "Sorry, I couldn't generate a response.";

    if (result?.candidates?.[0]?.content?.parts?.length) {
      responseText = result.candidates[0].content.parts
        .map((p) => p.text || "")
        .join("");
    }

    res.json({
      response: responseText,
      usage: result.usageMetadata || null,
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    res.status(500).json({
      error: "Chat processing failed",
      details: error.message,
    });
  }
});

module.exports = router;

router.post("/debug", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Message is required for debugging",
      });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a senior software engineer and code reviewer.

Perform a static analysis of the given code and return results in this format:

✓ Syntax Analysis
✓ Logic Check
✓ Edge Cases
✓ Performance
✓ Memory

⚠ Suggestions
Status

Do NOT execute the code.

${message}`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 900,
        temperature: 0.5,
      },
    });

    let responseText = "Sorry, I couldn't analyze the code.";

    if (result?.candidates?.[0]?.content?.parts?.length) {
      responseText = result.candidates[0].content.parts
        .map((p) => p.text || "")
        .join("");
    }

    res.json({
      response: responseText,
      usage: result.usageMetadata || null,
    });
  } catch (error) {
    console.error("Error in debug route:", error);
    res.status(500).json({
      error: "Debugging failed",
      details: error.message,
    });
  }
});

module.exports = router;
