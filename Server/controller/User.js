const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(403).json({ message: "All input fields are required" });
    }

    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(401).json({ message: "User already exists " });
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
    const token = await jwt.sign({ email: user.email, id: user.id }, "SECRET", {
      expiresIn: "24h",
    });

    user.token = token;
    user.password = undefined;
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .cookie("token", token, options)
      .status(200)
      .json({ message: "User login successfully", token, user });
  } catch (error) {
    console.error("Error login user", error.message);
    res
      .status(500)
      .json({ message: "User login failed", error: error.message });
  }
};

exports.checkUser = async (req, res) => {
  try {
    if (req.user) {
      //Checks if user is authenticated
      return res
        .status(200)
        .json({ message: "User is checked", user: req.user });
    } else {
      res.status(401);
    }
  } catch (error) {
    console.error("Error checking user", error.message);
    res
      .status(500)
      .json({ message: "Error checking user", error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .cookie("token", "", {
        expires: new Date(0),
        httpOnly: true,
      })
      .sendStatus(200);
  } catch (error) {
    console.error("Error logging out", error.message);
    res
      .status(500)
      .json({ message: "Error logout user", error: error.message });
  }
};
