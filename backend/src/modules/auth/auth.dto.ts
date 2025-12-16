import { z } from "zod"; 

export const registerDto = z.object({
    name : z.string().min(4),
    email : z.email(),
    password : z.string().min(6)
});

export const loginDto = z.object({
    email : z.email(),
    password : z.string()
});