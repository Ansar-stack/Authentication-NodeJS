import jwt from 'jsonwebtoken'
// Access Token 
export const generateAccessToken = (payload)=>{
    const token = jwt.sign({userId: payload}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1m'
    });
    return token;
}

// Refresh Token
export const generateRefreshToken = (payload)=>{
    const token = jwt.sign({userId: payload}, process.env.REFRESH_TOKEN_SECERET, {
        expiresIn: '20d'
    });
    return token
}
