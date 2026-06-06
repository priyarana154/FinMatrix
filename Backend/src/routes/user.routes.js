const express = require("express");
const router = express.Router();



const { updateProfile } = require("../controllers/user.controllers");
const isAuthenticatedUser  = require("../middleware/auth.middleware"); 
router.get("/me", isAuthenticatedUser, async (req, res) => {
  try {
    const User = require("../models/user.model");
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/update-profile", isAuthenticatedUser, updateProfile);

module.exports = router;
