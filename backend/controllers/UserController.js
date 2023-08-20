const User = require("../models/UserModel");

exports.signup = async (req, res, next) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "There is already a registered user for the specified email.",
    });
  }

  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
