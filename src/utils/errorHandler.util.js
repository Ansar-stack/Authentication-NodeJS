// Custom Error Handler
class ErrorHanlder extends Error{
    constructor(message, statusCode = "Something went wrong"){
        super(message), 
        this.statusCode = statusCode;
        this.success = false
    }
}
export default ErrorHanlder