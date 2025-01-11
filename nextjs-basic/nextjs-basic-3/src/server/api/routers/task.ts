import { createTRPCRouter, publicProcedure } from "../trpc";
import { createTaskSchema, updateTaskSchema, deleteTaskSchema } from "~/schemas/task";
import { TRPCError } from "@trpc/server";

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.task.findMany({
        orderBy: { createdAt: "desc" },
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch tasks",
      });
    }
  }),

  create: publicProcedure
    .input(createTaskSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.task.create({
          data: input,
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create task",
        });
      }
    }),

  update: publicProcedure
    .input(updateTaskSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      try {
        return await ctx.prisma.task.update({
          where: { id },
          data,
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Task not found",
        });
      }
    }),

  delete: publicProcedure
    .input(deleteTaskSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.task.delete({
          where: { id: input.id },
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Task not found",
        });
      }
    }),
});