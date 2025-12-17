import { z } from "zod";
import { TaskPriority, TaskStatus } from "./task.model";

export const createTaskDto = z.object({
  title: z.string().max(100),
  description: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  priority: z.enum(TaskPriority).optional(),
  status: z.enum(TaskStatus).optional(),
  assignedToId: z.string().optional(),
});

export const updateTaskDto = createTaskDto.partial();
