const express = require("express");
const router = express.Router();

const {
  getExpenses,
  addExpense,
} = require("../controllers/expense.controllers");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/all", authMiddleware, getExpenses);
router.post("/add", authMiddleware, addExpense);

module.exports = router;
