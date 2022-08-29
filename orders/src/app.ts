 import express,{Request, Response} from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@obitickets/common';
import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes/index';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';

const app = express()

app.set('trust proxy', true)
app.use(express.json())
app.use(express.urlencoded({
    extended:true  
}))
app.use(cookieSession({
    signed:false,
    secure: process.env.NODE_ENV !=='test' 
}));
app.use(currentUser);

app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);
// using the express-async-errors
app.all('*',async(req:Request,res:Response)=>{ 
    throw new NotFoundError(); 
});

app.use(errorHandler) 

export {app};


