import { Request , Response} from "express";
import { createTaskDto, updateTaskDto } from "./task.dto";
import { TaskModel } from "./task.model";
import { taskService, TaskService } from "./task.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export class TaskController{
    async createTask( req : AuthRequest, res : Response){
        const body = createTaskDto.parse(req.body);

        const task = await TaskModel.create({
            ...body,
            
            creatorId : (req as any).userId,
        })
        return res.status(201).json(task);
    }


    async getMyTask(req : AuthRequest, res: Response){
        const task = await TaskModel.find({
            creatorId: (req as any).userId,
        });
        res.status(201).json(task);
    }

    async update(req: AuthRequest, res: Response){
        try {
            const data =  updateTaskDto.parse(req.body);
        // @ts-ignore
            const task = await taskService.update({
                taskId :  req.params.id,
                data : data,
                userId : (req as any).userId,
            })
            return res.json(task)
        } catch (e : any) {
            return res.status(400).json({message : e.message})
        }
    }

    async delete(req: AuthRequest, res : Response){
        try {
            await taskService.delete(req.params.id , req.userId!);
            return res.status(200).json({message : "Task Deleted !"})
        } catch ( e :any) {
            return res.status(400).json({message : e.message});
        }
    }
}