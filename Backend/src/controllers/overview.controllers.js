const mongoose = require("mongoose");
const Expense = require("../models/expense.model");
const Goal = require("../models/goal.model");
const BankAccount = require("../models/bank.model");

exports.getDashboardOverview = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id || req.user._id);

    const { timeframe = "month" } = req.query;

    const [allTransactions, goals, accounts] = await Promise.all([
      Expense.find({ userId }).lean(),
      Goal.find({ userId }).lean(),
      BankAccount.find({ userId }).lean(),
    ]);

    const incomeCategories = [
      "Salary / Stipend",
      "Freelance Gig",
      "Investments Profit",
      "Business Revenue",
      "Rental Yield",
      "Grants / Rewards",
      "Other",
    ];

    const incomeItems = allTransactions.filter((item) =>
      incomeCategories.includes(item.category),
    );

    const expenseItems = allTransactions.filter(
      (item) => !incomeCategories.includes(item.category),
    );

    const totalIncome = incomeItems.reduce(
      (sum, item) => sum + Number(item.magnitude || 0),
      0,
    );

    const totalExpenses = expenseItems.reduce(
      (sum, item) => sum + Number(item.magnitude || 0),
      0,
    );

    const totalBankBalance = accounts.reduce(
      (sum, item) => sum + Number(item.balance || 0),
      0,
    );

    const totalGoalsTarget = goals.reduce(
      (sum, item) => sum + Number(item.targetAmount || 0),
      0,
    );

    const totalGoalsAchieved = goals.reduce(
      (sum, item) => sum + Number(item.currentAmount || 0),
      0,
    );

    const colors = [
      "#5892C0",
      "#75B587",
      "#B55EA8",
      "#F3B96B",
      "#7A6FD1",
      "#9AC7D8",
      "#D98CCF",
      "#C8D98A",
    ];

    const incomeMap = {};

    incomeItems.forEach((item) => {
      incomeMap[item.category] =
        (incomeMap[item.category] || 0) + Number(item.magnitude || 0);
    });

    const incomePie = Object.keys(incomeMap).map((key, index) => ({
      name: key,
      value: incomeMap[key],
      color: colors[index % colors.length],
    }));

    const expenseMap = {};

    expenseItems.forEach((item) => {
      expenseMap[item.category] =
        (expenseMap[item.category] || 0) + Number(item.magnitude || 0);
    });

    const expensePie = Object.keys(expenseMap).map((key, index) => ({
      name: key,
      value: expenseMap[key],
      color: colors[index % colors.length],
    }));

    const histogramMap = {};

    allTransactions.forEach((item) => {
      const txnDate = new Date(item.date);

      let label = "";

      if (timeframe === "day") {
        label = txnDate.toLocaleDateString("en-IN");
      } else if (timeframe === "year") {
        label = txnDate.getFullYear().toString();
      } else {
        label = txnDate.toLocaleString("en-US", {
          month: "short",
        });
      }

      if (!histogramMap[label]) {
        histogramMap[label] = {
          label,
          income: 0,
          expense: 0,
        };
      }

      if (incomeCategories.includes(item.category)) {
        histogramMap[label].income += Number(item.magnitude || 0);
      } else {
        histogramMap[label].expense += Number(item.magnitude || 0);
      }
    });

    const histogramData = Object.values(histogramMap);

    return res.status(200).json({
      success: true,

      metrics: {
        totalBankBalance,
        totalIncome,
        totalExpenses,
        totalGoalsTarget,
        totalGoalsAchieved,
      },

      incomePie,
      expensePie,
      histogramData,
    });
  } catch (error) {
    console.error("Overview Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
