
export const sentToken = (cookeiName, token, res)=>{
    res.cookie(cookeiName, token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: true
    });
}