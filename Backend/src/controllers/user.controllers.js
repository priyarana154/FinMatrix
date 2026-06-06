const User = require("../models/user.model");

exports.updateProfile = async (req, res) => {
  try {
    console.log("REQ.USER =", req.user);

 
    
    const userId = req.user.id; 
    const { name, language, allowDataSharing } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name field khaali nahi ho sakti.",
      });
    }

       const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        language: language || "en",
        allowDataSharing:
          allowDataSharing !== undefined ? allowDataSharing : false,
      },
      { new: true, runValidators: true }, 
    ).select("-password"); 
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User nahi mila.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Settings saved successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile Update Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server profile update nahi kar paya: " + error.message,
    });
  }
};
