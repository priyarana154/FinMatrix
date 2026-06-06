const express = require("express");
const router = express.Router();
const {
  addBankAccount,
  getBankAccounts,
} = require("../controllers/bank.controllers");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/add", authMiddleware, addBankAccount);
router.get("/all", authMiddleware, getBankAccounts);

module.exports = router;
