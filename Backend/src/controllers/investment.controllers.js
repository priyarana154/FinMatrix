const Investment = require("../models/investment.model");

exports.addInvestment = async (req, res) => {
  try {
    const { assetName, assetType, investedAmount, currentValue } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User authentication failed" });
    }

    const newInvestment = new Investment({
      userId: req.user.id,
      assetName,
      assetType,
      investedAmount: Number(investedAmount),
      currentValue: Number(currentValue),
    });

    const savedInvestment = await newInvestment.save();
    res.status(201).json(savedInvestment);
  } catch (error) {
    console.error("Error in addInvestment:", error);
    res
      .status(500)
      .json({
        message: "Server error while adding investment",
        error: error.message,
      });
  }
};

exports.getInvestments = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User authentication failed" });
    }

    const investments = await Investment.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(investments);
  } catch (error) {
    console.error("Error in getInvestments:", error);
    res
      .status(500)
      .json({
        message: "Server error while fetching investments",
        error: error.message,
      });
  }
};
