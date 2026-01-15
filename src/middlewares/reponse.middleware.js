export const ResponseMiddlware = (req, res, next)=>{
    res.respond = function(code, message="Success", resources=null){
        const body = {
            success: code =>200 && code <300,
            message,
        }
        if(resources && typeof resources === "object"){
            Object.assign(body, resources)
        };
        return res.status(code).json(body);
    }
    next()
}