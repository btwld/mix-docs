/* Code snippets shared between the hero window and the trust split. */

export const AUTHOR_TS = `export const conditional = createFlowControl({
  name: "flow.conditional",
  parameters: {
    condition: createParameter({
      schema: z.string().min(1), // CEL
    }),
  },
  input: z.object({ data: z.unknown() }),
  output: z.object({
    true: z.unknown(), // ← port
    false: z.unknown(), // ← port
  }),
  handler: (ctx) => routeBranch(ctx),
});`;

export const SPEC_JSON = `{
  "id": "qa-agent-demo",
  "nodes": [
    { "id": "prompt", "componentName": "data.transform" },
    { "id": "agent", "componentName": "agent.default",
      "capabilities": {
        "model": { "name": "model.google" } } }
  ],
  "connections": [
    { "sourceNodeId": "prompt", "sourcePortId": "output",
      "targetNodeId": "agent", "targetPortId": "input" }
  ]
}`;

export const RUN_CMD = `$ stargate run qa-agent-demo.json

✅ Loaded workflow: QA Agent Demo
✅ Workflow structure valid (2 nodes, 1 connections)
📊 Registry: data.transform, agent.default,
   model.google

🎉 Status: completed · 1240ms`;

/* Evals spotlight: faithful to the @stargate/evals API —
   runEval + built-in scorers, persisted as a run artifact. */
export const EVAL_TS = `import {
  runEval, writeEvalRun,
  outputEquals, nodeStatus,
} from "@stargate/evals";
import { NodeExecutionStatus } from "@stargate/engine";

const run = await runEval({
  workflow,
  dataset, // 12 cases: { id, input, expected }
  scorers: [
    outputEquals({ nodeId: "greet" }),
    nodeStatus({
      nodeId: "greet",
      expected: NodeExecutionStatus.Completed,
    }),
  ],
});

await writeEvalRun(run); // .evals/runs/<id>.json`;

/* Studio prototype: node-category colors as rendered by the
   Stargate studio canvas (Refined Cyan theme). */
export const STUDIO_NODE_COLORS = {
  info: "#5dadff",
  flow: "#a78bfa",
  agent: "#f5b544",
  action: "#3eb8c9",
} as const;

/* Trust split: what actually travels in the artifact —
   graph, bindings, references. Secrets stay env-var names. */
export const WORKFLOW_SPEC_JSON = `{
  "id": "wf_demo_001",
  "name": "Ask the agent",
  "nodes": [
    {
      "id": "agent-1",
      "componentName": "agent.qa",
      "parameters": { "instructions": "Answer briefly." },
      "capabilities": {
        "model": {
          "name": "model.openai",
          "parameters": {
            "apiKey": {
              "sourceType": "environment",
              "envVar": "OPENAI_API_KEY"
            }
          }
        }
      }
    }
  ]
}`;
