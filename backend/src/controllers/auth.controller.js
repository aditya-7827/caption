const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerController(req, res) {
  const { username, password } = req.body;

  try {
    const isUserAlreadyExists = await userModel.findOne({ username });

    if (isUserAlreadyExists) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function loginController(req, res) {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: 'User logged in successfully',
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  registerController,
  loginController
};
