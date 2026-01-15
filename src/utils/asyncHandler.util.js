import ErrorHanlder from "./errorHandler.util.js";

// Handle the async funtion
export const asyncHandler = (fn)=> async (req, res, next)=>{
    try {
        await fn(req, res, next);
    } catch (error) {
        return next(new ErrorHanlder(error.message, error.code || 500))
    }
}