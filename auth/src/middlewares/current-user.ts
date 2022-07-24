import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
interface UserPayload {
    id:String;
    email:String;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?:UserPayload
        }
    }
}

// middleware to extract the JWT payload and set it on 'req.currentUser'
export const currentUser = (req:Request,res:Response,next:NextFunction) => {
    if (!req.session?.jwt) {
        return next();
    }
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
    } catch (error) {
        
    }
    next();
}