import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create MCP server
const server = new McpServer({
  name: "my-mcp-server",
  version: "1.0.0",
});

// Register tool
server.registerTool(
  "add_number",
  {
    title: "Add Numbers",
    description: "Add two numbers",
    inputSchema: z.object({
      a: z.number().describe("First number"),
      b: z.number().describe("Second number"),
    }),
    outputSchema: z.object({
      result: z.number().describe("Result of addition"),
    }),
  },
  async ({ a, b }) => {
    const output = { result: a + b };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(output),
        },
      ],
      structuredContent: output,
    };
  }
);

// Start MCP server using stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("✅ MCP Server running via stdio");
}

main().catch(console.error);
