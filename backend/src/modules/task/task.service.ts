import { getErrorMap, object } from "zod";
import { TaskModel } from "./task.model";

interface UpdateTaskInput {
  taskId: string;
  userId: string;
  data: Partial<{
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: Date;
    assignedToId?: string;
  }>;
}

export class TaskService {
  async create(data: any, userId: string) {
    return TaskModel.create({
      ...data,
      creatorId: userId,
    });
  }

  async getMyTasks(userId: string) {
    return TaskModel.find({
      $or: [{ creatorId: userId }, { assignedToId: userId }],
    }).sort({ dueDate: 1 });
  }

  async update({ taskId, userId, data }: UpdateTaskInput) {
    const task = await TaskModel.findOneAndUpdate(
      {
        _id: taskId,
        creatorId : userId, 
      },
      {
        $set: data,
      },
      {
        new: true,
      }
    );

    if (!task) {
      throw new Error("Task not found or unauthorized");
    }

    return task;
  }

  async delete(taskId: string, userId: string) {
    const task = await TaskModel.findOneAndDelete({
      _id: taskId,
       creatorId : userId,
    });

    if (!task) {
      throw new Error("Task not found or unauthorized");
    }

    return task;
  }
}

export const taskService = new TaskService();
