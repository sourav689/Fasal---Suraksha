const User = require("../models/User");

const saveKissanID = async (req, res) => {
  const { userID, kissanID } = req.body;

  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.kissanID = kissanID;
    await user.save();
    res.status(200).json({ message: "Kissan ID saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save Kissan ID", error });
  }
};

module.exports = { saveKissanID };
