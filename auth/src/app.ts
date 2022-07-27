import express,{Request, Response} from 'express';
import 'express-async-errors';
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
    secure: process.env.NODE_ENV !=='test' 
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

export {app};


