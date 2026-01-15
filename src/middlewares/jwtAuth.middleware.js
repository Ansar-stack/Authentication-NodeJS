import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { generateAccessToken } from "../utils/genToken.util.js";

export const jwtAuth = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken)
    return res
      .status(401)
      .json({ success: false, message: "No access token provided" });
  //  Verfiy the access token
  try {
    const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decode.userId;
    next();
  } catch (error) {
    if (error.name !== "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }

    //  Try To Refresh Token
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    //   Find token in DB
    const userFound = await User.findOne({ refreshToken });
    if (!userFound)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    //  Validate the refresh token
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECERET);
    if (
      !userFound.id === payload.userId ||
      !userFound.refreshToken === refreshToken
    )
      return res.status(401).json({
        success: false,
        message: "Invalid Refresh Token",
      });
    const accessToken = generateAccessToken(userFound.id);
    console.log(accessToken)
    next();
  }
};
