import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from '@obitickets/common';
import {User} from '../models/user'

const router = express.Router();

router.post('/api/users/signup',[
    body('email')
    .isEmail()
    .withMessage("Email must be valid"),

    body("password")
    .trim()
    .isLength({min:4, max:20})
    .withMessage("Password must be between 4 and 20 characters")

],validateRequest,async (req:Request,res:Response)=>{
    const {email,password} = req.body;
    const existingUser = await User.findOne({email});

    if (existingUser) {
        throw new BadRequestError('Email in use');
    }
    const user = User.build({email,password})
    await user.save()
    //  Generate JWT

    // if(!process.env.JWT_KEY){
    //     // This condition is to ensure the JWT_KEY is not undefined
    //     throw new Error('JWT_KEY is undefined')
    // }

    const userJwt = jwt.sign({
        id:user.id,
        email:user.email
    }, process.env.JWT_KEY!);
    // store it on session object
    req.session = {
        jwt:userJwt 
    }

    res.status(201).send(user)
});

export {router as signupRouter}