import express,{Request, Response} from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
const app = express()

app.set('trust proxy', true)
app.use(express.json())
app.use(express.urlencoded({
    extended:true  
}))
app.use(cookieSession({
    signed:false,
    secure:true 
})) 
app.use(currentUserRouter);
app.use(signupRouter);   
app.use(signinRouter);
app.use(signoutRouter);

// using the express-async-errors
app.all('*',async(req:Request,res:Response)=>{ 
    throw new NotFoundError(); 
});
// or using the next function
/* app.all("*",(req,res,next)=>{
    next(new NotFoundError())
}) */    

app.use(errorHandler) 

const start = async () =>{
    if (!process.env.JWT_KEY){
        throw new Error("JWT_KEY is undefined") 
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log("Connected to auth mongoDb");
    } catch (err){   
        console.log(err);
    }
    app.listen(3000,()=>{
        
        console.log("Listening on port 3000:auth") 
    })
}
start(); 
