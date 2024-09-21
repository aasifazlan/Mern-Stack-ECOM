import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const protectRoute= async (req, res, next) =>{
    try {
        const accessToken = req.cookies.accessToken
        if(!accessToken){
            return res.status(401).json({message: 'Not authorized, access token is required'})
        }
        try {
            const decoded= jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decoded.userId).select('-password')
        if(!user){
            return res.status(401).json({message: 'Not authorized, user not found'})
        }
        req.user=user
        next()
        } catch (error) {
            if(error.name=== 'TokenExpiredError'){
                return res.status(401).json({message: 'Token expired, please login again'})
            }
            throw error
        }
    } catch (error) {
        console.log('Error in protectRoute middleware', error.message)
    }
}

export const adminRoute= async (req, res, next) => {
    if(req.user && req.user.role=='admin'){
        next()
    }
    return res.status(403).json({message: 'Not authorized, only admin can access this page'})
}
