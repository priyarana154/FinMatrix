const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goalName: {
      type: String,
      required: true,
      trim: true,
    },
    targetAmount: {
      type: Number,
      required: true,
    },
    currentAmount: {
      type: Number,
      default: 0, 
    },
    targetDate: {
      type: Date,
      required: true,
    },
    aiInsight: {
      type: String,
      default: "", 
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Goal", goalSchema);
