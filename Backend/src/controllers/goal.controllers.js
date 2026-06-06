const Goal = require("../models/goal.model");
const Expense = require("../models/expense.model");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.createGoal = async (req, res) => {
  try {
    const { goalName, targetAmount, targetDate } = req.body;
    const userId = req.user.id;

    if (!goalName || !targetAmount || !targetDate) {
      return res
        .status(400)
        .json({ success: false, message: "Kripya saari fields fill karein." });
    }

    const pastExpenses = await Expense.find({ userId });
    const totalExpenses = pastExpenses.reduce(
      (sum, exp) => sum + exp.amount,
      0,
    );
    const expenseContext =
      totalExpenses > 0
        ? `User spent ₹${totalExpenses} last month.`
        : `No expense history available.`;

    const prompt = `
    You are a financial advisor for FinMatrix. 
    Analyze this user goal: Name: ${goalName}, Amount: ₹${targetAmount}, Date: ${targetDate}. 
    ${expenseContext}
    Provide 1 line of short, actionable advice in Hinglish (WhatsApp text style). No markdown tags, no stars.
    `;

    let aiResponseText =
      "Goal set ho gaya hai! FinMatrix AI aapki bachat ko jald hi analyze karega.";

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const result = await model.generateContent(prompt);
      aiResponseText = result.response.text();
    } catch (aiError) {
      console.error("FULL GEMINI ERROR:");
      console.error(aiError);
    }
    const newGoal = new Goal({
      userId,
      goalName,
      targetAmount,
      targetDate,
      aiInsight: aiResponseText,
    });

    await newGoal.save();
    return res.status(201).json({ success: true, data: newGoal });
  } catch (error) {
    console.error("Main Controller Failure:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllGoals = async (req, res) => {
  try {
    const userId = req.user.id;
    const goals = await Goal.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: goals });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateGoalProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { amountToAdd } = req.body;

    const goal = await Goal.findById(id);

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    goal.currentAmount += Number(amountToAdd);

    await goal.save();

    return res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};