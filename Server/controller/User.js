const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(403).json({ message: "All input fields are required" });
    }

    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(203).json({ message: "User already exists " });
    }
    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hash,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error("Error creating user", error.message);
    return res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found," });
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = await jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    user.token = token;
    user.password = undefined;

    res.status(200).json({ message: "User login successfully", token, user });
  } catch (error) {
    console.error("Error login user", error.message);
    res
      .status(500)
      .json({ message: "User login failed", error: error.message });
  }
};

exports.checkUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    //Checks if user is authenticated

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error checking user", error.message);
    res
      .status(500)
      .json({ message: "Error checking user", error: error.message });
  }
};
