import { z } from "zod";

export const taskSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().max(500, "Description is too long").optional(),
  completed: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Modified this schema to exclude completed field from creation
export const createTaskSchema = taskSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true, 
  completed: true 
});

export const updateTaskSchema = taskSchema.partial().extend({ id: z.string().cuid() });
export const deleteTaskSchema = z.object({ id: z.string().cuid() });

export type Task = z.infer<typeof taskSchema>;
export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;