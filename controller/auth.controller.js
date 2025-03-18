const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt =require("jsonwebtoken")
const registerUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    const checkExistingUser = await User.findOne({
      $or: [{ userName }, { email }],
    });
    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message:
          'user already exist either with same username or same email, please try again with other username or email',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    //create new user and save it in your
    const newlyCreatedUser = new User({
      userName,
      email,
      password: hashPassword,
      role: role || 'user',
    });
    await newlyCreatedUser.save();
    if (newlyCreatedUser) {
      res
        .status(201)
        .json({ success: true, message: 'user registered successfully' });
    } else {
      res.status(400).json({
        success: false,
        message: 'unable to user registertion please try again',
      });
    }
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ success: false, message: 'some error is occured try agian' });
  }
};
const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'user does not exsit' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'invalid credentials' });
    }
    const accessToken = jwt.sign(
      {
        userId: user._id,
        userName: user.userName,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30m' }
    );
    res
      .status(200)
      .json({
        success: true,
        message: 'user logged in successfully',
        accessToken,
      });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ success: false, message: 'some error is occured try agian' });
  }
};
module.exports = { registerUser, loginUser };
