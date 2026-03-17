import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const server = new McpServer({
  name: "gemini-mcp-server",
  version: "1.0.0",
});

server.registerTool(
  "ask_gemini",
  {
    title: "Ask Gemini",
    description: "Send a prompt to Gemini and get a response",
    inputSchema: z.object({
      prompt: z.string().describe("User prompt for Gemini"),
    }),
    outputSchema: z.object({
      response: z.string().describe("Gemini response"),
    }),
  },
  async ({ prompt }) => {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const output = { response: text };

    return {
      content: [
        {
          type: "text",
          text,
        },
      ],
      structuredContent: output,
    };
  }
);


async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("✅ Gemini MCP Server running via stdio");
}

main().catch(console.error);


// QUICK TEST MODE (for beginners)
if (process.env.TEST === "true") {
  (async () => {
    const prompt = "Explain MCP in one line";
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    process.exit(0);
  })();
}

