import { Schema , model , Types } from "mongoose";
import { maxLength } from "zod";
import { required } from "zod/v4/core/util.cjs";

export enum TaskPriority{
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
    URGENT = "Urgent"
}

export enum TaskStatus{
    TODO = "To Do",
    IN_PROGRESS = "In Progress",
    REVIEW = "Review",
    COMPLETED = "Completed"
}

const taskSchema = new Schema({
    title : {
        type : String,
        required : true,
        maxlength : 100
    },
    description : {
        type : String
    },
    dueDate :{
        type: Date
    },
    priority :{
        type : String,
        enum : Object.values(TaskPriority),
        default : TaskPriority.MEDIUM,
    },
    status :{
        type : String,
        enum : Object.values(TaskStatus),
        default : TaskStatus.TODO
    },
    creatorId :{
        type : Types.ObjectId,
        ref : "User",
        required : true
    },
    assignedToId :{
        type : Types.ObjectId,
        ref : "User"
    },
},
    {timestamps : true}
)

export const TaskModel = model("Task", taskSchema);