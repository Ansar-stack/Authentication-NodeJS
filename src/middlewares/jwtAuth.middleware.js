import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { generateAccessToken } from "../utils/genToken.util.js";
// jwt authentication middleware
export const jwtAuth = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken)
    return res.respond(401,"No access token provided");
  //  Verfiy the access token
  try {
    const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decode.userId;
    next();
  } catch (error) {
    if (error.name !== "TokenExpiredError") {
      return res.respond(401, "Invalid Token");
    }

    //  Try To Refresh Token
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.respond(401, "Unauthorized");
    //   Find token in DB
    const userFound = await User.findOne({ refreshToken });
    if (!userFound)
      return res.respond(401, "Unauthorized");
    //  Validate the refresh token
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECERET);
    if (
      !userFound.id === payload.userId ||
      !userFound.refreshToken === refreshToken
    )
      return res.respond(401, "Unauthorized");
    const accessToken = generateAccessToken(userFound.id);
    next();
  }
};
