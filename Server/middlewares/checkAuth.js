const jwt = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.body.token || req.header("Authorization");

    if (!token) {
      return res.status(404).json({ message: "Token missing" });
    }
    try {
      const decode = await jwt.verify(token, "SECRET");
      req.user = decode;
      console.log("Decode", decode);
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Token is invalid", error: error.message });
    }
    next();
  } catch (error) {
    console.error("Something went while validating token", error.message);
    res
      .status(400)
      .json({
        message: "Something went wrong while validating token",
        error: error.message,
      });
  }
};
