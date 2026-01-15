import jwt from 'jsonwebtoken'
// Access Token Helper
export const generateAccessToken = (payload)=>{
    const token = jwt.sign({userId: payload}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30m'
    });
    return token;
}

// Refresh Token Helper
export const generateRefreshToken = (payload)=>{
    const token = jwt.sign({userId: payload}, process.env.REFRESH_TOKEN_SECERET, {
        expiresIn: '30d'
    });
    return token
}
