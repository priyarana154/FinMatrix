const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
const Chat = require("../models/chat.model");
const Goal = require("../models/goal.model");
const authMiddleware = require("../middleware/auth.middleware");
require("dotenv").config();

const ai = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
router.post("/chat", authMiddleware, async (req, res) => {
  try {
const userId = req.user.id;
const { message } = req.body;
    if (!userId || !message) {
      return res.status(400).json({ error: "UserId and message are required" });
    }

    const userGoals = await Goal.find({ userId: userId });
     const oldChats = await Chat.find({ userId })
      .sort({ createdAt: -1 })
      .limit(6);
    const formattedHistory = oldChats
      .reverse()
      .map((c) => `${c.sender === "user" ? "User" : "Model"}: ${c.message}`)
      .join("\n");

    
    const goalsContext = userGoals
      .map(
        (g) =>
          `- Title: ${g.title || g.name}, Target: ₹${g.targetAmount}, Saved: ₹${g.savedAmount || 0}, Deadline: ${g.deadline || g.targetDate}`,
      )
      .join("\n");

    const systemPrompt = `
You are FinMatrix AI, an expert conversational financial advisor. You are helping a user manage their money.
Here is the real-time financial data of the user fetched from the database:
[ACTIVE GOALS]
${goalsContext || "No active goals set yet."}

[CHAT HISTORY]
${formattedHistory}

Strict Instructions:
- Answer the user's current question based directly on their goals and financial context.
- Keep answers concise, actionable, and engaging.
- Use English naturally since the user is from India and prefers comfortable conversational language.
- Never give generic answers like "Save money". Give specific numbers based on their goals.
`;

    const fullPrompt = `${systemPrompt}

User Question: ${message}

FinMatrix AI:`;

    const completion = await ai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: fullPrompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponseText =
      completion.choices[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";
    await Chat.create({ userId, sender: "user", message });
    const savedAiChat = await Chat.create({
      userId,
      sender: "ai",
      message: aiResponseText,
    });

    res.status(200).json({ success: true, data: savedAiChat });
  } catch (error) {
    console.error("AI Route Error:", error);

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        error: "AI quota exceeded. Please try later.",
      });
    }

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({ userId }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, chats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
