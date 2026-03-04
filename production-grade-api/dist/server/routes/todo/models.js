import { z } from 'zod';
export const todoModel = z.object({
    id: z.string().describe('uuid of the todo'),
    title: z.string().describe('title of the todo'),
    description: z.string().optional().nullable().describe('description of the todo'),
    isCompleted: z.boolean().optional().default(false).describe('if todo is completed or not')
});
//# sourceMappingURL=models.js.map