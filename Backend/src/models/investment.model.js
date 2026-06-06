const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assetName: {
      type: String,
      required: true,
      trim: true, 
    },
    assetType: {
      type: String,
      enum: ["Mutual Funds", "Stocks", "Gold", "Crypto"],
      required: true,
    },
    investedAmount: {
      type: Number,
      required: true,
    },
    currentValue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Investment", investmentSchema);
