import { Request , Response } from "express";
import { AuthService } from "./auth.service";
import { registerDto , loginDto } from "./auth.dto";


const authService = new AuthService();

export class AuthController{
    async register(req: Request, res: Response){
        try{
            const data = registerDto.parse(req.body);
            console.log(data);
            const user = await authService.register(
                data.name,
                data.email,
                data.password
            );

            return res.status(201).json({
                message: "User registered Successfully!",
                user
            });
        }catch(e :any){
            return res.status(400).json({
                message: e.message
            });
        }
    };

    async login(req:Request , res: Response){
        try{
            const data = loginDto.parse(req.body);

            const { token } = await authService.login(
                data.email,
                data.password
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: false, 
                sameSite: "lax"
            });

            return res.status(201).json({
                message:"Logged in Successfully!"
            });
        }catch(e :any){
            return res.status(401).json({
                message: e.message
            })
        }
    };

    async logout(req: Request, res: Response) {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out" });
    }
}