const Bank = require("../models/bank.model");

exports.addBankAccount = async (req, res) => {
  try {
    const { bankName, accountType, balance } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User authentication failed" });
    }

    const newAccount = new Bank({
      userId: req.user.id,
      bankName,
      accountType,
      balance: Number(balance),
    });

    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (error) {
    console.error("Error in addBankAccount:", error);
    res
      .status(500)
      .json({
        message: "Server error while adding bank account",
        error: error.message,
      });
  }
};

exports.getBankAccounts = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User authentication failed" });
    }

    const accounts = await Bank.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(accounts);
  } catch (error) {
    console.error("Error in getBankAccounts:", error);
    res
      .status(500)
      .json({
        message: "Server error while fetching bank accounts",
        error: error.message,
      });
  }
};
