import express,{Request, Response} from 'express';
import 'express-async-errors';
import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended:true 
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
    next(new NotFoundError());
}) */

app.use(errorHandler) 

app.listen(3000,()=>{
    console.log("Listening on port 3000:auth")
})