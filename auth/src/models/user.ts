import mongoose from "mongoose";
import {Password} from '../services/password';
/* An interface that describes the properties 
that are required to create a new user */

interface UserAttrs {
    email:string;
    password:string;
}
   
/* An interface that describes the properties/methods that  a User 
model has. This tells typescript a build function is a available on the model 
*/
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs:UserAttrs):UserDoc;
}

/*  An interface that describes the properties 
    that a saved User document(single User) has
*/
interface UserDoc extends mongoose.Document {
    email:string;
    password:string;
} 


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    }
}, {
    toJSON:{
       transform(doc,ret){
            // transforms the output stays consistent among different services
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v
       } 
    }
})
userSchema.pre('save', async function(done){
    if (this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password',hashed);
    }
    done();
})
// Get a custom function built into a model
userSchema.statics.build = (attrs:UserAttrs) =>{
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User',userSchema)

export { User };