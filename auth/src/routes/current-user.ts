import express,{Request,Response} from 'express';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
const router = express.Router();

// router.get('/api/users/currentuser',(req:Request,res:Response)=>{
//     if(!req.session || !req.session?.jwt){
//         return res.send({currentUser:null})
//     }
//     try {
//         const payload = jwt.verify(
//         req.session.jwt, 
//             process.env.JWT_KEY!);
//           res.send({currentUser:payload})  
//     } catch(err) {
//         res.send({currentUser:null})
//     }  
// });

router.get('/api/users/currentuser',currentUser,requireAuth,(req:Request,res:Response)=>{
    res.send({currentUser: req.currentUser || null}); 
});
export {router as currentUserRouter} 