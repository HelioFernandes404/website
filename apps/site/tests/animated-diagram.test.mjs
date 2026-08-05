import assert from "node:assert/strict";
import { describe, it } from "node:test";

// blog-scenarios.test.mjs already covers gossip edge `tone` differences across
// am-healthy/am-degraded/am-fixed and the active `-slack` edge count per
// scenario. AnimatedDiagram additionally reads the `animated` field to decide
// whether an edge pulses or renders as a static line, which nothing asserts
// yet — that's the gap this file closes.
const loadScenarios = () => import("../src/data/blog-scenarios/index.js");

describe("AnimatedDiagram edge motion (`animated` field)", () => {
  it("marks the degraded gossip edge as non-animated (a static broken link)", async () => {
    const { amHealthyScenario, amDegradedScenario, amFixedScenario } = await loadScenarios();
    const gossipEdge = (scenario) => scenario.edges.find((edge) => edge.id === "gossip");

    assert.equal(gossipEdge(amHealthyScenario).animated, true);
    assert.equal(gossipEdge(amDegradedScenario).animated, false);
    assert.equal(gossipEdge(amFixedScenario).animated, true);
  });

  it("marks the suppressed -slack edge as muted and inactive, not merely absent", async () => {
    const { amHealthyScenario, amFixedScenario } = await loadScenarios();
    for (const scenario of [amHealthyScenario, amFixedScenario]) {
      const suppressed = scenario.edges.find((edge) => edge.id === "oh-slack");
      assert.equal(suppressed.active, false);
      assert.equal(suppressed.tone, "muted");
    }
  });

  it("leaves `animated` unset (defaulting to true) on the danger -slack edges, unlike the danger gossip edge", async () => {
    const { amDegradedScenario } = await loadScenarios();
    const slackEdges = amDegradedScenario.edges.filter((edge) => edge.id.endsWith("-slack"));
    assert.equal(slackEdges.length, 2);
    for (const edge of slackEdges) {
      assert.equal(edge.tone, "danger");
      assert.equal(edge.animated, undefined);
    }
  });
});
