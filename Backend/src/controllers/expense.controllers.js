const Expense = require("../models/expense.model");
const Bank = require("../models/bank.model"); 
exports.addExpense = async (req, res) => {
  try {
    const { title, category, magnitude, date, bankId } = req.body;

    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "User authentication failed on server" });
    }

    const incomeCategories = [
      "Salary / Stipend",
      "Freelance Gig",
      "Investments Profit",
      "Business Revenue",
      "Rental Yield",
      "Grants / Rewards",
      "Other",
    ];

    const isIncome = incomeCategories.includes(category);
    const balanceChange = isIncome ? Number(magnitude) : -Number(magnitude);

    const newExpense = new Expense({
      userId: req.user.id,
      title,
      category,
      magnitude: Number(magnitude),
      date,
      bankId: bankId && bankId !== "cash" ? bankId : null, 
    });

    const savedExpense = await newExpense.save();

    if (bankId && bankId !== "cash") {
      await Bank.findOneAndUpdate(
        { _id: bankId, userId: req.user.id }, 
        { $inc: { balance: balanceChange } }, 
        { new: true },
      );
    }

    res.status(201).json(savedExpense);
  } catch (error) {
    console.error("Backend Error in addExpense:", error);
    res.status(500).json({
      message: "Server error while saving expense",
      error: error.message,
    });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "User authentication failed on server" });
    }

    const expenses = await Expense.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Backend Error in getExpenses:", error);
    res.status(500).json({
      message: "Server error while fetching expenses",
      error: error.message,
    });
  }
};
