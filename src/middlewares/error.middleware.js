export const ErrorMiddleware = (err, req, res, next)=>{
    let statusCode= err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false, 
        message
    })
}