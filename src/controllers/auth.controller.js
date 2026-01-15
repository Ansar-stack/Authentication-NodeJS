import { User } from '../models/user.model.js';
import {asyncHandler} from '../utils/asyncHandler.util.js'
import ErrorHanlder from '../utils/errorHandler.util.js';
import { generateAccessToken, generateRefreshToken } from '../utils/genToken.util.js';
import { sentToken} from '../utils/sentToken.util.js';

// Register a user
export const handleRegister = asyncHandler(async (req, res, next)=>{
    const {name, email, password} = req.body;
    // Create and save the user
    const user = await User.create({name, email, password});
    // Generate refresh token 
    const refreshToken = generateRefreshToken(user._id);
    // Save refresh token in db
    user.refreshToken = refreshToken;
    await user.save();
    const accessToken = generateAccessToken(user._id); // Generate access token
    sentToken('refreshToken', refreshToken, res); // sent refresh token in cookei
    res.respond(201, "User registered successfully", {accessToken})
});

// Login the user
export const handleLogin = asyncHandler(async (req, res, next)=>{
    const {email, password} = req.body;
    // Check user in DB
    const userFound = await User.findOne({email});
    if(!userFound)return next(new ErrorHanlder('Email does not exist', 400));
    const isPasswordMatch = await userFound.comparePassword(password);
    if(!isPasswordMatch)return next(new ErrorHanlder('Incorrect Password', 400));
      // Generate refresh token 
    const refreshToken = generateRefreshToken(userFound._id);
    // Save refresh token in db
    userFound.refreshToken = refreshToken;
    await userFound.save();
    const accessToken = generateAccessToken(userFound._id);
    sentToken('refreshToken', refreshToken, res);
    res.respond(200, "User logged in successfully", {accessToken});
});

