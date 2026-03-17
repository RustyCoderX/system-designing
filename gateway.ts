import express from "express";
import { spawn } from "child_process";

const app = express();
app.use(express.json());

/**
 * MCP upstreams (like Nginx upstream blocks)
 */
const MCP_UPSTREAMS: Record<string, string> = {
  add: "node servers/add-server.js",
  multiply: "node servers/multiply-server.js",
};

/**
 * Reverse proxy endpoint
 */
app.post("/mcp/:service", async (req, res) => {
  const service = req.params.service;
  const command = MCP_UPSTREAMS[service];

  if (!command) {
    return res.status(404).json({ error: "Unknown MCP service" });
  }

  const [cmd, ...args] = command.split(" ");
  const child = spawn(cmd, args);

  let output = "";

  child.stdout.on("data", (data) => {
    output += data.toString();
  });

  child.stderr.on("data", (err) => {
    console.error(err.toString());
  });

  child.stdin.write(JSON.stringify(req.body));
  child.stdin.end();

  child.on("close", () => {
    res.json({
      gateway: "mcp-gateway",
      service,
      response: output.trim(),
    });
  });
});

app.listen(3000, () => {
  console.log("🚀 MCP Gateway running on http://localhost:3000");
});
