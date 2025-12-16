import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../user/user.model";
import { is } from "zod/v4/locales";
import { env } from "../../config/env";


const SALT_ROUND = 10;

export class AuthService{
    async register(name :string, email:string, password:string){
        const existingUser = await UserModel.findOne({ email });
        if(existingUser){
            throw new Error("User already exists! ");
        }
        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
        const user = await UserModel.create({
            name ,
            email,
            password: hashedPassword,
        });
        return {
           id : user._id,
           name : user.name,
           email : user.email

        };
    }

    async login(email : string, password : string){
        const user = await UserModel.findOne({ email });
        if(!user){
            throw new Error("User not exist!")
        }
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            throw new Error("Invalid Credentials !");
        }
        
        const token = jwt.sign(
            {userId : user._id},
            env.JWT_SECRET,
            {expiresIn : "7d"}
        );
        return{token};
    }
}