import { validationResult } from "express-validator"
import ErrorHanlder from "../utils/errorHandler.util.js";

export const handleValidationErrors = (req, res, next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty())return next();
    const firstError = errors.array()[0];
    return next(new ErrorHanlder(firstError.msg, 400));
}