import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "multiply-server",
  version: "1.0.0",
});

server.registerTool(
  "multiply",
  {
    inputSchema: z.object({ a: z.number(), b: z.number() }),
    outputSchema: z.object({ result: z.number() }),
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a * b) }],
    structuredContent: { result: a * b },
  })
);

await server.connect(new StdioServerTransport());
