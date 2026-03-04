import { z } from 'zod';
export declare const todoModel: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    isCompleted: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export type Todo = z.infer<typeof todoModel>;
//# sourceMappingURL=models.d.ts.map