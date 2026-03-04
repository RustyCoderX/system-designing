import { z } from 'zod';
import { router, publicProcedure } from '../../trpc.js';
export const todoRouter = router({
    getAllTodos: publicProcedure
        .input()
        .output()
        .query(() => {
    })
});
//# sourceMappingURL=todo.routes.js.map